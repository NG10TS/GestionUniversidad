import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { BecasService } from 'src/app/core/services/ACADEMICO/bienestar-estudiantil/becas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-becas',
  templateUrl: './becas.component.html',
  styleUrls: ['./becas.component.css']
})
export class BecasComponent implements OnInit {


  ruta = 'http://localhost:8000/';
  esta=[];

  newBeca = new FormGroup({

  // id_beca :new FormControl(''),
  sigla_beca :new FormControl(''),
  nombre_beca:new FormControl(''),
  habi_beca :new FormControl(''),
  prom_beca :new FormControl(''),
  desc_beca :new FormControl(''),
  });

  BecaSeleccionado = {
    id_beca :'',
    sigla_beca :'',
    nombre_beca:'',
    habi_beca :'',
    prom_beca :'',
    desc_beca :'',
  }
  constructor(protected _beca:BecasService) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarBeca();

  }

  LimpiarBeca(){
    this.BecaSeleccionado = {
      id_beca :'',
      sigla_beca :'',
      nombre_beca:'',
      habi_beca :'',
      prom_beca :'',
      desc_beca :'',

    };
    this.newBeca.patchValue({
      // id_beca :'',
    sigla_beca :'',
    nombre_beca:'',
    habi_beca :'',
    prom_beca :'',
    desc_beca :'',

    })

    }

  CargarBeca(){
    this._beca.ObtenerBecas()
    .then(res => {
      console.log(res.data);
      this.esta = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }


  AgregarBeca(){
    let data = {

      // id_beca:this.newBeca.value.id_beca,
      sigla_beca:this.newBeca.value.sigla_beca,
      nombre_beca:this.newBeca.value.nombre_beca,
      habi_beca:this.newBeca.value.habi_beca,
      prom_beca :this.newBeca.value.prom_beca,
      desc_beca :this.newBeca.value.desc_beca,

    };
    this._beca.AgregarBecas(data)
    .then((result) => {
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE AGREGÓ CORRECTAMENTE')//ESTO SE AGREGA
      console.log(result);
      this.CargarBeca();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      this.MostrarMensaje('error','NO SE PUDO AGREGAR')//Y ESTO TAMBIEN
      console.log(error);
      this.CargarBeca();
    });
  }


  SeleccionarBeca(id,Modo){
    // Becaseleccionado=a;
    this._beca.SeleccionarBecas(id)
    .then(res => {
      var a = res.data;
      this.BecaSeleccionado = a;
      console.log('INFO EST SELECCIONADO',this.BecaSeleccionado);
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
    }).catch(err =>  {
    console.log("err");
    });

  }
  ModificarBeca(dato){
    console.log('DATOS A ACTUALIZAR',dato)
    let data = {

      id_beca:dato.id_beca,
      sigla_beca:dato.sigla_beca,
      nombre_beca:dato.nombre_beca,
      habi_beca:dato.habi_beca,
      prom_beca:dato.prom_beca,
      desc_beca:dato.desc_beca,

    };
    this._beca.ModificarBecas(data,dato.id_beca)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE')//ESTO SE AGREGA
      this.CargarBeca();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      this.MostrarMensaje('error','NO SE PUDO MODIFICAR')//ESTO SE AGREGA
      console.log(error);
      this.CargarBeca();
    });
  }
  EliminarBeca(id){
   Swal.fire({
      title: 'SEGURO QUE QUIERE ELIMINAR LA BECA?',
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
        this._beca.EliminarBecas(id)
        .then(res => {
        console.log(res.data);
        this.MostrarMensaje('success','BECA ELIMINADO SATISFACTORIAMENTE')
        this.CargarBeca();
         }).catch(err =>  {
         console.log("err");
         this.MostrarMensaje('error','NO SE PUDO ELIMINAR LA BECA')
        });
      }
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
