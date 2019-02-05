import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConectorService {
  url: string= "http://apipdv.clubgournet.cl/api/v1/";
  port: string= "3080";

  constructor(private http: HttpClient) {
  }

  traedatosGet(ruta){
    let url = this.url + ruta;
    return this.http.get(url)
  }


}
