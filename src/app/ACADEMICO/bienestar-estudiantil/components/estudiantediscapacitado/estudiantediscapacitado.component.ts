import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { EstudiantediscapacitadoService } from 'src/app/core/services/ACADEMICO/bienestar-estudiantil/estudiantediscapacitado.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-estudiantediscapacitado',
  templateUrl: './estudiantediscapacitado.component.html',
  styleUrls: ['./estudiantediscapacitado.component.css']
})
export class EstudiantediscapacitadoComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  estd=[];
  est=[];
  carre=[];

  newEstudiantediscapacitado = new FormGroup({


    // id_discap:new FormControl(''),
    prom_discap:new FormControl(''),
    tipo_discap:new FormControl(''),
    desc_discap:new FormControl(''),
    nombre_tutor:new FormControl(''),
    id_est:new FormControl(''),
    id_carre:new FormControl(''),
  });
  EstudiantediscapacitadoSeleccionado = {
    id_discap:'',
    prom_discap:'',
    tipo_discap:'',
    desc_discap:'',
    nombre_tutor:'',
    id_est:'',
    id_carre:'',

  }
  constructor(protected _estDiscapas: EstudiantediscapacitadoService,
    protected _est:EstudiantesService, protected _carr: CarrerasService,
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarEstudiantediscapacitados();
    this.CargarEstudiantes();
    this.CargarCarrera();
    this.iniciarFormfilterEstudiante();
  }
  CODEst;
  AutocompletarEstudiantes(){
    this._est.SeleccionarEstudiante(this.CODEst)
    .then(res => {
      this.newEstudiantediscapacitado.patchValue({
        // ejemplo: :'',
        id_est:res.data.id_est
      })
    }).catch(err =>  {
    console.log("err");
    });
  }
  LimpiarEstudiantediscapacitados(){
    this.EstudiantediscapacitadoSeleccionado = {
      id_discap:'',
      prom_discap:'',
      tipo_discap:'',
      desc_discap:'',
      nombre_tutor:'',
      id_est:'',
      id_carre:'',

    };
    this.newEstudiantediscapacitado.patchValue({
      // id_discap:'',
      prom_discap:'',
      tipo_discap:'',
      desc_discap:'',
      nombre_tutor:'',
      id_est:'',
      id_carre:'',
    })
    }
    CargarEstudiantes(){
      this._est.ObtenerEstudiantes()
      .then(res => {
        res.data.forEach(atributo =>{
          atributo.NomC= atributo.nombre_est+' '+atributo.ape_p_est+' '+atributo.ape_m_est
        })
        console.log(res.data);
        this.est = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
  CargarCarrera(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log(res.data);
      this.carre = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarEstudiantediscapacitados(){
    this._estDiscapas.ObtenerEstudiantediscapacitados()
    .then(res => {
      console.log(res.data);
      this.estd = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarEstudiantediscapacitado(){
    const formData = new FormData();
    formData.append('prom_discap',this.newEstudiantediscapacitado.value.prom_discap);
    formData.append('tipo_discap',this.newEstudiantediscapacitado.value. tipo_discap);
    formData.append('desc_discap',this.newEstudiantediscapacitado.value.desc_discap);
    formData.append('nombre_tutor',this.newEstudiantediscapacitado.value.nombre_tutor);
    formData.append('id_est',this.newEstudiantediscapacitado.value.id_est);
    formData.append('id_carre',this.newEstudiantediscapacitado.value.id_carre);
    this._estDiscapas.AgregarEstudiantediscapacitado(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.MostrarMensaje('success','SE AGREGÓ CORRECTAMENTE')//ESTO SE AGREGA

      this.CargarEstudiantediscapacitados();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR DOCENTE');
      this.MostrarMensaje('error','NO SE PUDO AGREGAR')//Y ESTO TAMBIEN 

      console.log(error);
    })
  }
  semFiltrado=[]; //LISTA ENCONTRADA
  EstudianteSelect={//VALOR SELECCIONADO
    id_est:'',
    nombre_est:'',
    ape_p_est:'',
    ape_m_est:'',
    ci_est:'',

    NomC:''
  };
  filtroEstudiante=false; //ESTADO ngIf Lista
  filterEstudianteForm= new FormGroup({
    txt:new FormControl(''),
  });
  iniciarFormfilterEstudiante(){ //ESTO SE DEBE LLAMAR
    this.filterEstudianteForm.get('txt').valueChanges
    // .pipe(debounceTime(1000))
    .subscribe(response => {
      console.log('entered data is ', response);
      this.filtroEstudiante=true;
      if(response && response.length){
        this.filterEstudiante(response);
      } else {
        this.semFiltrado = [];
      }
      console.log('DATA ENCONTRADO', this.semFiltrado)
    })
  }

  filterEstudiante(Datafilter){

    this.semFiltrado = this.est.filter(a => (a.NomC.indexOf(Datafilter)) > -1)
    //PARA HACER BUSQUEDAS POR SEPARADO
    // this.semFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
  }
  SeleccionarEstudiantediscapacitado(id,Modo){
    this._estDiscapas.SeleccionarEstudiantediscapacitado(id)
    .then(res => {
      var a = res.data;
      this.EstudiantediscapacitadoSeleccionado = a;
      console.log('INFO EST SELECCIONADO',this.EstudiantediscapacitadoSeleccionado);
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
  ModificarEstudiantediscapacitado(Estudiantediscapacitado){
    console.log('DATOS A ACTUALIZAR',Estudiantediscapacitado)
    const formData = new FormData();
    formData.append('id_discap',Estudiantediscapacitado.id_discap);
    formData.append('prom_discap',Estudiantediscapacitado.prom_discap);
    formData.append('tipo_discap',Estudiantediscapacitado.tipo_discap);
    formData.append('desc_discap',Estudiantediscapacitado.desc_discap);
    formData.append('nombre_tutor',Estudiantediscapacitado.nombre_tutor);
    formData.append('id_est',Estudiantediscapacitado.id_est);
    formData.append('id_carre',Estudiantediscapacitado.id_carre);
    this._estDiscapas.ModificarEstudiantediscapacitado(formData,Estudiantediscapacitado.id_discap)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE')//ESTO SE AGREGA

      console.log(res);
      this.CargarEstudiantediscapacitados();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      this.MostrarMensaje('error','NO SE PUDO MODIFICAR')//ESTO SE AGREGA

      console.log(error);
      this.CargarEstudiantediscapacitados();
    })
  }
  EliminarEstudiantediscapacitado(id){

    Swal.fire({
      title: 'SEGURO QUE QUIERE ELIMINAR EL ESTUDIANTE?',
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
          this._estDiscapas.EliminarEstudiantediscapacitado(id)
          .then(res => {
          console.log(res.data);
          this.MostrarMensaje('success','ESTUDIANTE ELIMINADO SATISFACTORIAMENTE')
          this.CargarEstudiantediscapacitados();
        }).catch(err =>  {
        console.log("err");
        this.MostrarMensaje('error','NO SE PUDO ELIMINAR EL ESTUDIANTE')
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
