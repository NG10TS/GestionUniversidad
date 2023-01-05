import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CateProductoPoasService {
  ruta=environment.ruta;
    constructor() { }
    ObtenerCateProductoPoas(){
      return axios.get(this.ruta+'api/CateProductoPoa/');
    }
    AgregarCateProductoPoas(cateproductopoas){
      return axios.post(this.ruta+'api/CateProductoPoa/',cateproductopoas);
    }
    ModificarCateProductoPoas(cateproductopoas, id){
      return axios.put(this.ruta+'api/CateProductoPoa/'+id,cateproductopoas);
    }
    SeleccionarCateProductoPoas(id){
      return axios.get(this.ruta+'api/CateProductoPoa/'+id);
    }
    EliminarCateProductoPoas(id){
      return axios.delete(this.ruta+'api/CateProductoPoa/'+id);
    }
}
//C:\xampp\htdocs\Unior\Angular\src\app\core\services\SistemaPoa\cateproductopoas.service.ts
