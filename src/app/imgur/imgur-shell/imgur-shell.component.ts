import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImgurService } from '../data-access/imgur.service';

@Component({
  selector: 'app-imgur-shell',
  templateUrl: './imgur-shell.component.html',
  styleUrl: './imgur-shell.component.scss'
})
export class ImgurShellComponent {

  constructor(private route: ActivatedRoute, public imgur: ImgurService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    console.log(id);
  }
}
