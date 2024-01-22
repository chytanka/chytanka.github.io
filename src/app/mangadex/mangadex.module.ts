import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangadexRoutingModule } from './mangadex-routing.module';
import { MangadexShellComponent } from './mangadex-shell/mangadex-shell.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        MangadexShellComponent
    ],
    imports: [
        CommonModule,
        MangadexRoutingModule,
        SharedModule
    ]
})
export class MangadexModule { }
