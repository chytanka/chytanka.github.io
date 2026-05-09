import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProxyService } from '../../shared/data-access/proxy.service';
import { ChtnkEpisode } from '../../shared/models/chtnk-composition';

@Injectable({
  providedIn: 'root'
})
export class TelegraphService {
  proxy: ProxyService = inject(ProxyService)

  constructor(private http: HttpClient) { }

  getComposition(id: string): Observable<ChtnkEpisode> {
    const params = new HttpParams().set('return_content', 'true');
    return this.http.get<any>(environment.telegraphHost + id , { params: params })
      .pipe(map((data) => { return this.map(data) }))
  }


  map(data: any): ChtnkEpisode {
    const mappedResponse = {
      title: data.result.title,
      images: (data.result.content.map((item: any) => {
        return {
          src: item.children.find((child: any) => child.tag === "img")?.attrs.src
        };
      })).filter((i: any) => i.src).map((img: any)=> {return {src: 
        this.proxy.proxyUrl('https://telegra.ph'+ img.src)
      }})
    };

    return mappedResponse;
  }
}
