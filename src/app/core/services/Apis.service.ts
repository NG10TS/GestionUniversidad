import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  ruta=environment.service
constructor() { }
  ConsultaSQL(query:string){
    let data = {
      query:query
    };
    return axios.post(this.ruta+'api/QueryApi',data)
  }

}
