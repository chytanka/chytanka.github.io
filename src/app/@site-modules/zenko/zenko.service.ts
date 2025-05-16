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
    return this.http.get<any>(environment.zenkoHost + id)
      .pipe(map((data) => { return this.map(data) }))
  }

  map(data: any): CompositionEpisode {
    const mappedResponse = {
      title: this.titleDecode(data.name),

      publisher: {
        id: data.publisher.id as string,
        site: `https://zenko.online/teams/`+data.publisher.id as string,
        name: data.publisher.name as string,
        avatar: this.proxy.proxyUrl(`https://zenko.b-cdn.net/${data.publisher.avatar}?optimizer=image&width=900&quality=90&height=auto`) as string,
        description: data.publisher.description as string,
        links: data.publisher.links?.map((l: any) => { return { link: l.link, title: l.title }; })
      } as unknown as CompositionPublisher,

      images: (data.pages.map((item: any) => {
        return {
          src: item.imgUrl || item.content
        };
      })).filter((i: any) => i.src).map((img: any) => { return { src: this.proxy.proxyUrl(`https://zenko.b-cdn.net/${img.src}?optimizer=image&width=900&quality=90&height=auto`) } })
      
    };

    return mappedResponse;
  }

  titleDecode(input: string) {
    const parts = input.split("@#%&;№%#&**#!@");

    const tom = parts[0];
    const chapter = parts[1];
    const name = parts[2] ?? 'Без назви';

    const output = `Том ${tom} Розділ ${chapter}: ${name}`;
    return output

  }
}
