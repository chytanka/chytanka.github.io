import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangadexRoutingModule } from './mangadex-routing.module';
import { MangadexShellComponent } from './mangadex-shell/mangadex-shell.component';
import { CommonReadModule } from '../@common-read';


@NgModule({
    declarations: [
        MangadexShellComponent
    ],
    imports: [
        CommonModule,
        MangadexRoutingModule,
        CommonReadModule
    ]
})
export class MangadexModule { }
