import { BehaviorSubject, MonoTypeOperatorFunction, Observable, OperatorFunction, Subscription, catchError, combineLatest, finalize, of, tap } from "rxjs";
import { CompositionEpisode } from "./composition";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { OnDestroy, WritableSignal, inject, signal } from "@angular/core";
import { LangService } from "../../../shared/data-access/lang.service";
import { HistoryService } from "../../../history/data-access/history.service";
import { ViewerService } from "../../../shared/data-access";
import { PlaylistItem, PlaylistService, isPlaylist } from "../../../playlist/data-access/playlist.service";

export abstract class ReadBaseComponent {
    protected refresh$: BehaviorSubject<null> = new BehaviorSubject<null>(null);
    error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    episode$: Observable<CompositionEpisode | null> = of(null);

    plObserv: Subscription | undefined;
    playlistLink = signal('')
    currentPlItem: WritableSignal<PlaylistItem | undefined> = signal(undefined)

    constructor() {
        this.route.pathFromRoot[0].queryParams.subscribe(q => {
            const vm = q['vm'] // view mode param
            this.viewerService.setViewModeOptionByCode(vm)

            const pl = q['list'] // playlist

            if (!pl) return;

            this.playlistLink.set(pl);
            this.playlistService.resetPlaylist();

            this.plObserv = this.playlistService.getPlaylist(pl).subscribe(data => {
                if (!isPlaylist) return;

                this.playlistService.setPlaylist(data)
            })
        })
    }

    private title: Title = inject(Title)
    protected route: ActivatedRoute = inject(ActivatedRoute)
    public lang: LangService = inject(LangService)

    private viewerService: ViewerService = inject(ViewerService);
    public playlistService: PlaylistService = inject(PlaylistService);

    public refreshData() {
        this.refresh$.next(null);
    }

    protected finalizeLoading(): MonoTypeOperatorFunction<any> {
        return finalize(() => this.loading$.next(false))
    }

    /**
     * The `tapStartLoading()` method sets a flag indicating the start of loading.
     * It updates the `loading$` stream by setting its value to `true` and resets
     * any previous errors by assigning `null` to the `error$` stream.
     * This method is used to signal the beginning of the data loading process
     * and prepare for handling the results.
     * 
     * @returns {MonoTypeOperatorFunction<[ParamMap, null]>} An RxJS operator that performs
     * the specified actions when the stream is called.
     */
    protected tapStartLoading(): MonoTypeOperatorFunction<[ParamMap, null]> {
        return tap(() => {
            // this.episode$ = of(null);
            this.loading$.next(true);   // Sets the loading flag to `true`
            this.error$.next(null);     // Resets any previous errors to `null`
        })
    }

    protected combineParamMapAndRefresh(): Observable<[ParamMap, null]> {
        return combineLatest([this.route.paramMap, this.refresh$])
    }

    protected catchError(): OperatorFunction<any, any> {
        return catchError(() => {
            this.error$.next(this.lang.phrases.dataLoadErr);
            return of(null);
        })
    }

    protected tapSetTitle(): MonoTypeOperatorFunction<CompositionEpisode> {
        return tap(async (episode: CompositionEpisode) => {
            if (episode) {
                this.title.setTitle(`${episode.title} | Chytanka`);
            }
        })
    }

    protected tapSaveToHistory(site: string, post_id: string): MonoTypeOperatorFunction<CompositionEpisode> {
        return tap(async (episode: CompositionEpisode) => {
            if (episode) {
                let e = structuredClone(episode);
                e.images = [];
                await this.saveToHistory(site, post_id, episode.title, episode.images[0]?.src, e);
            }
        })
    }

    public history: HistoryService = inject(HistoryService);

    async saveToHistory(site: string, post_id: string, title: string, cover: string, episode: any) {
        await this.history.addHistory(site, post_id, title, cover, episode);
    }


    protected tapSaveToCurrentPlaylistItem(site: string, post_id: string): MonoTypeOperatorFunction<CompositionEpisode> {
        return tap(async (episode: CompositionEpisode) => {
            if (episode) {
                this.currentPlItem.set({
                    id: post_id,
                    site: site
                })
            }
        })
    }
}