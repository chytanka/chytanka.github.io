import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImgurService } from '../../imgur/data-access/imgur.service';

@Component({
  selector: 'app-mangadex-shell',
  templateUrl: './mangadex-shell.component.html',
  styleUrl: './mangadex-shell.component.scss'
})
export class MangadexShellComponent {

  constructor(private route: ActivatedRoute, public imgur: ImgurService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);
  }
}
