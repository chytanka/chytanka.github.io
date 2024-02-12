import { BehaviorSubject, MonoTypeOperatorFunction, Observable, OperatorFunction, catchError, combineLatest, finalize, of, tap } from "rxjs";
import { CompositionEpisode } from "./composition";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { inject } from "@angular/core";
import { LangService } from "../../../shared/data-access/lang.service";

export abstract class ReadBaseComponent {
    protected refresh$: BehaviorSubject<null> = new BehaviorSubject<null>(null);
    error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    episode$: Observable<CompositionEpisode | null> = of(null);

    constructor( ) { }

    private title: Title = inject(Title)
    protected route: ActivatedRoute = inject(ActivatedRoute)
    public lang: LangService = inject(LangService)
    
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
        return tap((episode: CompositionEpisode) => {
            if (episode) {
                this.title.setTitle(`${episode.title} | Chytanka`);
            }
        })
    }
}