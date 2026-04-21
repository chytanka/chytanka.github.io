import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CompositionEpisode, CompositionPublisher } from '../@common-read';
import { ProxyService } from '../../shared/data-access/proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ZenkoService {
  http: HttpClient = inject(HttpClient)
  proxy: ProxyService = inject(ProxyService)

  getComposition(id: string): Observable<CompositionEpisode> {
    return this.http.get<any>(this.proxy.proxyUrl((environment.zenkoChapters + id)) + `&ref=${environment.zenkoHost}`)
      .pipe(map((data) => { return this.map(data) }))
  }

  map(data: any): CompositionEpisode {
    const imgParams = `?optimizer=image&width=900&quality=90&height=auto`;
    const { vol, ch, name, output } = this.titleDecode(data.name);
    const x = parseFloat(ch);
    const part = Math.round((x - Math.floor(x)) * 10)
    const mappedResponse = {
      volume: parseInt(vol),
      chapter: Math.floor(parseFloat(ch)),
      part: part,
      title: name,

      publisher: {
        id: data.publisher.id as string,
        site: environment.zenkoTeams + data.publisher.id as string,
        name: data.publisher.name as string,
        avatar: this.proxy.proxyUrl(environment.zenkoCdn + data.publisher.avatar + imgParams) + `&ref=${environment.zenkoHost}` as string,
        description: data.publisher.description as string,
        links: data.publisher.links?.map((l: any) => { return { link: l.link, title: l.title }; })
      } as unknown as CompositionPublisher,

      images: (data.pages.map((item: any) => {
        return {
          src: item.imgUrl || item.content
        };
      })).filter((i: any) => i.src).map((img: any) => { return { src: this.proxy.proxyUrl(environment.zenkoCdn + img.src + imgParams) + `&ref=${environment.zenkoHost}` } })

    };

    return mappedResponse;
  }

  titleDecode(input: string) {
    const parts = input.split("@#%&;№%#&**#!@");

    const vol = parts[0];
    const ch = parts[1];
    const name = parts[2] ?? 'Без назви';

    const output = `Том ${vol} Розділ ${ch}: ${name}`;
    return { vol, ch, name, output }

  }
}
