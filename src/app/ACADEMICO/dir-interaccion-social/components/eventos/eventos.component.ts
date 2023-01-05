import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import Swal from 'sweetalert2';

import { CategoriasService } from 'src/app/core/services/ACADEMICO/dir-interaccion-social/categorias.service';
import { EventosService } from 'src/app/core/services/ACADEMICO/dir-interaccion-social/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  Mensaje;
  // INTRODUCIR nombre CRUD,Id y nombre dataPrincipal(Eventos,id_evento,even)
  even =[ ];
  cate=[ ];

   EventosSeleccionado = {
    //ejemplo... id_evento:'',
    id_evento:'',
    nombre_evento:'',
    id_categ:'',
    archivo:'',
    // nombre_categ:'',
  };
  newEventos= new FormGroup({
    // ejemplo: id_evento:new FormControl(''),
    // id_evento:new FormControl(''),
    nombre_evento:new FormControl(''),
    id_categ:new FormControl(''),
    archivo:new FormControl(''),
  }
  );

// @ViewChild('InputFoto') InputFoto: ElementRef;

  constructor(protected _eventos: EventosService,
    protected _cat: CategoriasService
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarEventos();
    this.CargarCategorias();
  }
  MostrarMensaje(iconText, tittleText) {
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
  CargarEventos(){
    this._eventos.ObtenerEventoss()
    .then(res => {
      console.log(res.data);
      this.even = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  CargarCategorias(){
    this._cat.ObtenerCategorias()
    .then(res => {
      console.log("Data Categ",res.data);
      this.cate = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  onFileChangeFoto(event){
    if(event.target.files.length>0)
    {
      const file = event.target.files[0];
      this.newEventos.patchValue({
        archivo: file
      })
      console.log(file)
    }
  }
  VerificarFormatoFoto(obj) {
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
      alert('El navegador no soporta la lectura de archivos');
      return;
    }

    if (!(/\.(jpg|png|jpeg)$/i).test(uploadFile.name)) {
      // alert('El archivo a adjuntar no es una imagen');
      //CUANDO NO RESPETA EL FORMATO REQUERIDO2 Y MODAL MEJORADO
      this.MostrarMensaje('error', '¡FORMATO INVALIDO!. POR FAVOR SELECCIONAR SOLO IMAGENES');
      //  this.Mensaje = "¡FORMATO INVALIDO!. POR FAVOR SELECCIONAR SOLO IMAGENES";
      sessionStorage.setItem('Mensaje', this.Mensaje);
      document.getElementById("BotonError").click(); //alternativa de hacer click()
      this.FOTO_IMG_ADD.nativeElement.value = "";
      this.FOTO_IMG_MOD.nativeElement.value = "";

    } else {
      if (uploadFile.size > 1500000) {
        // alert('El peso de la imagen no puede exceder los 200kb')
        this.MostrarMensaje('error', '¡TAMAÑO EXCEDIDO!. EL TAMAÑO DE LA FOTO NO PUEDE EXCEDER LOS 1.5MB');
        //this.Mensaje = "¡TAMAÑO EXCEDIDO!. EL TAMAÑO DE LA FOTO NO PUEDE EXCEDER LOS 1.5MB";
        sessionStorage.setItem('Mensaje', this.Mensaje);
        document.getElementById("BotonWarning").click(); //alternativa de hacer click()
        this.FOTO_IMG_ADD.nativeElement.value = "";
        this.FOTO_IMG_MOD.nativeElement.value = "";
      } else {
        //LA IMAGEN CUMPLE CON TODOS LOS REQUISITOS
      }
    }
  }
  SeleccionarEventos(id,Modo){
    this._eventos.SeleccionarEventos(id)
    .then(res => {
      var a = res.data;
      this.EventosSeleccionado = a;
      console.log('INFO DATO SELECCIONADO',this.EventosSeleccionado);
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

  AgregarEventos(){
    const formData = new FormData();
    //ejemplo formData.append('atributo',this.newEventos.value.atributo);
    // formData.append('id_evento',this.newEventos.value.id_evento);
    formData.append('nombre_evento',this.newEventos.value.nombre_evento);
    formData.append('id_categ',this.newEventos.value.id_categ);
    formData.append('archivo',this.newEventos.value.archivo);
    console.log("datos a agregar", this.newEventos.value)
    this._eventos.AgregarEventos(formData)
    .then(res=>{
      this.MostrarMensaje('success', 'SE AÑADIO EL EVENTO EXITOSAMENTE');
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarEventos();
    })
    .catch(error=>{
      console.log('ERROR AL INTENTAR AÑADIR DATO');
      this.MostrarMensaje('error', 'ERROR AL AÑADIR EVENTO REVISE EL FORMATO');
      console.log(error);
    })
  }

  ModificarEventos(Eventos){
    const formData = new FormData();
    //ejemplo... formData.append('id',this.newEventos.value.id);
    formData.append('id_evento',Eventos.id_evento);
    formData.append('nombre_evento',Eventos.nombre_evento);
    formData.append('id_categ',Eventos.id_categ);
    formData.append('archivo',Eventos.archivo);
    this._eventos.ModificarEventos(formData,Eventos.id_evento)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE')
      console.log(res);
      this.CargarEventos();
    })
    .catch(error=>{
      console.log('HAY ERROR AL INTENTAR MODIFICAR');
      this.MostrarMensaje('error','NO SE PUDO MODIFICAR')
      console.log(error);
      this.CargarEventos();
    })
  }
  EliminarEventos(id_even){
    Swal.fire({
      title: 'SEGURO QUE QUIERE ELIMINAR EL EVENTO?',
      color: '#FFFFFF',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonColor: "#DD6B55",
      cancelButtonText: 'CANCELAR',
      confirmButtonText: 'ELIMINAR',
      confirmButtonColor: "#DD6B55",
      background: '#D62600',

    }).then((result) => {
      //   /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._eventos.EliminarEventos(id_even)
    .then(res => {
      console.log(res.data);
      this.MostrarMensaje('success','EVENTO  ELIMINADO SATISFACTORIAMENTE')
      this.CargarEventos();
    }).catch(error =>  {
    console.log("err",error);
    this.MostrarMensaje('error','NO SE PUDO ELIMINAR EL EVENTO')
    });
      }
    })
  }
  @ViewChild('FOTO_IMG_MOD') FOTO_IMG_MOD: ElementRef;
  @ViewChild('FOTO_IMG_ADD') FOTO_IMG_ADD: ElementRef;
   LimpiarEventos()
  {
  this.EventosSeleccionado = {
    // ejemplo: id_evento:'',
    id_evento:'',
    nombre_evento:'',
    id_categ:'',
    archivo:'',
    // nombre_categ:'',

  };
  this.newEventos.patchValue({
    // ejemplo: id_evento:'',
    id_evento:'',
    nombre_evento:'',
    id_categ:'',
    archivo:'',
    // nombre_categ:'',
  })
  this.FOTO_IMG_ADD.nativeElement.value = '';
  this.FOTO_IMG_MOD.nativeElement.value = '';
 }
 LimpiarInputFotoMod(){
  this.newEventos.patchValue({
    archivo: ''
  })
  this.FOTO_IMG_MOD.nativeElement.value = '';
 }


}
