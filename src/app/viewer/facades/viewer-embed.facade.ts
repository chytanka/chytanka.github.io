import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { EmbedHalperService } from "../../shared/data-access/embed-halper.service";
import { ReadlistFacade } from "./readlist.facade";
import { isPlatformServer } from "@angular/common";
import { isPlaylist } from "../../playlist/data-access/playlist.service";

const CHTNK_LOAD_EVENT_NAME = 'chtnkload'
const CHTNK_CHANGE_PAGE_EVENT_NAME = 'changepage';
const CHTNK_NSFW_CHOICE_EVENT_NAME = 'nsfwchoice'
const CHTNK_LIST_RESPONCE_EVENT_NAME = 'listresponse'
const CHTNK_LIST_REQUEST_EVENT_NAME = 'listrequest'

@Injectable()
export class EmbedFacade {
    platformId = inject(PLATFORM_ID);
    readlist = inject(ReadlistFacade);
    embedHelper = inject(EmbedHalperService);

    initListFromParrentWindow() {
        if (!this.embedHelper.isEmbedded() || !isPlatformServer(this.platformId)) return

        this.embedHelper.postMessage(this.readlist.currentReadlistItem(), CHTNK_LIST_REQUEST_EVENT_NAME);

        window.addEventListener('message', ({ data }) => {
            if (data.event != CHTNK_LIST_RESPONCE_EVENT_NAME) return;

            if (isPlaylist(data.data)) {
                this.readlist.readlist.set(data.data);
            } else {
                console.warn('Received data is not a valid Playlist', data.data);
            }

        }, false);
    }

    loadCurrentPlaylistItem() {
        this.embedHelper.postMessage(this.readlist.currentReadlistItem(), CHTNK_LOAD_EVENT_NAME);
    }

    postPageChange(total: number, current: number[]) {
        this.embedHelper.postMessage({ total, current }, CHTNK_CHANGE_PAGE_EVENT_NAME);
    }

    postNsfwChoice(isNsfw: boolean) {
        this.embedHelper.postMessage(isNsfw, CHTNK_NSFW_CHOICE_EVENT_NAME);
    }

}