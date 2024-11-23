import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { LangService } from '../../data-access/lang.service';
import { ViewModeOption } from '../../data-access';



@Component({
    selector: 'app-lang-toggle',
    templateUrl: './lang-toggle.component.html',
    styleUrl: './lang-toggle.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LangToggleComponent {
  lang = inject(LangService)

  seed: WritableSignal<string> = signal((Math.ceil(Math.random() * 1000)).toString())

  optLangValue = () => this.lang.langOpt.filter((opt: any) => opt.code == this.lang.lang())[0]
}
