import { Injectable, signal, computed, inject, Signal, effect } from "@angular/core";
import { Playlist, PlaylistItem } from "../../playlist/data-access/playlist.service";

@Injectable()
export class ReadlistFacade {
    readlist = signal<Playlist>([]);
    currentReadlistItem = signal<PlaylistItem | undefined>(undefined);

    connect(
        readlist: Signal<Playlist>,
        current: Signal<PlaylistItem | undefined>
    ) {
        effect(() => this.readlist.set(readlist()));
        effect(() => this.currentReadlistItem.set(current()));
    }

    getCurrentIndex() {
        for (let i = 0; i < this.readlist().length; i++) {
            const item = this.readlist()[i];
            if (this.currentReadlistItem()?.id == item.id && this.currentReadlistItem()?.site == item.site)
                return i;
        }

        return -1;
    }

    getNextIndex() {
        const index = this.getCurrentIndex();
        if (index < 0) return -1;

        return ((index + 1) < this.readlist().length) ? index + 1 : -1;
    }

    getPrevIndex() {
        const index = this.getCurrentIndex();
        if (index < 0) return -1;

        return ((index - 1) >= 0) ? (index - 1) : -1;
    }
}