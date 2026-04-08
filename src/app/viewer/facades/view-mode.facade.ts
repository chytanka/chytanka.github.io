import { Injectable, computed, inject } from "@angular/core";
import { ViewerService } from "../services";

@Injectable()
export class ViewModeFacade {
    private _isViewOptToggle = false;
    public viewer = inject(ViewerService);

    toggleViewModeOption() {
        if (!this._isViewOptToggle) {
            this.viewer.toggleViewModeOption();
            this.viewer.saveViewModeOption();
            setTimeout(() => { this._isViewOptToggle = false }, 100);
        }

        this._isViewOptToggle = true;
    }

    mode = computed(() => this.viewer.viewModeOption().mode);
    dir = computed(() => this.viewer.viewModeOption().dir);
    code = computed(() => this.viewer.viewModeOption().code);

    setModeByCode(code: string) {
        this.viewer.setViewModeOptionByCode(code);
    }

    setLongStripMode() {
        const longPageCode = "3";
        if (this.code() != longPageCode) {
            this.setModeByCode(longPageCode);
        }
    }
}