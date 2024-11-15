import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CompositionEpisode } from '../../@common-read';
import { environment } from '../../../../environments/environment';
import { Base64 } from '../../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class TelegraphService {

  constructor(private http: HttpClient) { }

  getComposition(id: string): Observable<CompositionEpisode> {
    const params = new HttpParams().set('return_content', 'true');
    return this.http.get<any>(environment.telegraphHost + id , { params: params })
      .pipe(map((data) => { return this.map(data) }))
  }


  map(data: any): CompositionEpisode {
    const mappedResponse = {
      title: data.result.title,
      images: (data.result.content.map((item: any) => {
        return {
          src: item.children.find((child: any) => child.tag === "img")?.attrs.src
        };
      })).filter((i: any) => i.src).map((img: any)=> {return {src: 
        environment.proxy + Base64.toBase64('https://telegra.ph'+ img.src)
      }})
    };

    return mappedResponse;
  }
}
