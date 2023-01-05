import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CategoriasService } from 'src/app/core/services/ACADEMICO/dir-interaccion-social/categorias.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  ruta;
  constructor(protected _cat: CategoriasService,
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarCategorias();
  }
  cate =[ ];
  CategoriasSeleccionado = {
    //ejemplo... id_categ:'',
    id_categ:'',
    nombre_categ:'',
  };

  newCategorias= new FormGroup({
    // ejemplo: id_categ:new FormControl(''),
    // id_categ:new FormControl(''),
    nombre_categ:new FormControl(''),
  });

  SeleccionarCategorias(id,Modo){
    this._cat.SeleccionarCategorias(id)
    .then(res => {
      var a = res.data;
      this.CategoriasSeleccionado = a;
      console.log('INFO Categorias SELECCIONADO',this.CategoriasSeleccionado);
      switch (Modo) {
        case 'Editar':
          document.getElementById("btnOpenModalMod").click();
          break;
        case 'Mostrar':
          document.getElementById("btnOpenModalMos").click();
          break;
        default:
          break;
      }
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  CargarCategorias(){
    this._cat.ObtenerCategorias()
    .then(res => {
      console.log(res.data);
      this.cate = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }

  AgregarCategorias(){
    let data = {
      // ejemplo: atributo:this.newCategorias.value.atributo,
      // id_categ:this.newCategorias.value.id_categ,
      nombre_categ:this.newCategorias.value.nombre_categ,
    };
    this._cat.AgregarCategorias(data)
    .then((result) => {
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE AGREGÓ CORRECTAMENTE')
      console.log(result);
      this.CargarCategorias();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      this.MostrarMensaje('error','NO SE PUDO AGREGAR')
      console.log(error);
    });
  }
  ModificarCategorias(Categorias){
    console.log('DATO A ACTUALIZAR',Categorias)
    let data = {
      // ejemplo: atributo:Categorias.atributo,
      id_categ:Categorias.id_categ,
      nombre_categ:Categorias.nombre_categ,
    };
    this._cat.ModificarCategorias(data,Categorias.id_categ)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE')
      this.CargarCategorias();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      this.MostrarMensaje('error','NO SE PUDO MODIFICAR')
      console.log(error);
      this.CargarCategorias();
    });
  }
  EliminarCategorias(id){
    Swal.fire({
      title: 'SEGURO QUE QUIERE ELIMINAR LA CATEGORIA?',
      color: '#FFFFFF',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonColor: "#DD6B55",
      cancelButtonText:'CANCELAR',
      confirmButtonText: 'ELIMINAR',
      confirmButtonColor: "#DD6B55",
      background: '#D62600',
    }).then((result) => {
      if (result.isConfirmed) {
         this._cat.EliminarCategorias(id)
         .then(res => {
         console.log(res.data);
         this.MostrarMensaje('success','CATEGORIA ELIMINADO SATISFACTORIAMENTE')
         this.CargarCategorias();
        }).catch(error =>  {
        console.log("err",error);
        this.MostrarMensaje('error','NO SE PUDO ELIMINAR LA CATEGORIA')
        });
          }
        })
  }

  LimpiarCategorias()
  {
  this.CategoriasSeleccionado = {
    // ejemplo: id_categ:'',
    id_categ:'',
    nombre_categ:'',

  };
  this.newCategorias.patchValue({
    // ejemplo: id_categ:'',
    id_categ:'',
    nombre_categ:'',
  })
 }
  //ALERTAS
   MostrarMensaje(iconText,tittleText){//PARA AGREGAR
    var Toast = Swal.mixin({
      toast: true,
    //  position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      icon: iconText, //success, info, error,warning,question
      title: tittleText
    })
  }


}
