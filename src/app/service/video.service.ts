import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  postVideo(data){
    return this.http.post<any>('api/videos', data);
  }

  getVideo(){
    return this.http.get<any>('api/videos');
  }

}
