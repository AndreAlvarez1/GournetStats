import {HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MemoriaService {

empresa: any;
locales: any;

  constructor(public http: HttpClientModule,
              private storage: Storage) { }

  limpiar(){
    this.empresa = undefined;
    this.locales = undefined;
  }

  guardarDato(campo,valor){
    this.storage.set(campo, valor);
  }

  leerDato(campo){
    return this.storage.get(campo).then((val) => {
    return val
    });
  }



}
