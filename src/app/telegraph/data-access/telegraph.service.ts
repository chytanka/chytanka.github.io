import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CompositionEpisode } from '../../shared/utils';
import { environment } from '../../../environments/environment';

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
      })).filter((i: any) => i.src).map((img: any)=> {return {src: 'https://telegra.ph'+ img.src}})
    };

    
    

    return mappedResponse;
  }
}
