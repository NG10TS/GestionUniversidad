import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { BecasService } from 'src/app/core/services/ACADEMICO/bienestar-estudiantil/becas.service';
import { EstudiantebecaService } from 'src/app/core/services/ACADEMICO/bienestar-estudiantil/estudiantebeca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantebeca',
  templateUrl: './estudiantebeca.component.html',
  styleUrls: ['./estudiantebeca.component.css']
})
export class EstudiantebecaComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  esta=[];
  est=[];
  carre=[];
  beca=[];
  //Para Validaciones
  // @ViewChild('InputFoto') InputFoto: ElementRef;
  // Mensaje;
  newEstudiantebeca = new FormGroup({

  // id_becado:new FormControl(''),
  id_beca:new FormControl(''),
  prom_beca:new FormControl(''),
  id_est:new FormControl(''),
  id_carre:new FormControl(''),
  });
  EstudiantebecaSeleccionado = {
    id_becado:'',
    id_beca:'',
    prom_beca:'',
    id_est:'',
    id_carre:'',
    NombreCompleto:'',
  }
  constructor(protected _estBeca: EstudiantebecaService,
    protected _est: EstudiantesService, protected _carr: CarrerasService, protected _beca:BecasService
  ) { }
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarEstudiantebeca();
    this.CargarEstudiantes();
    this.CargarCarrera();
    this.CargarBeca();
    this.iniciarFormfilterEstudiante();
  }
  //#region FILTRADORES
      estFiltrado=[]; //LISTA ENCONTRADA
      EstudianteSelect={//VALOR SELECCIONADO
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
            this.estFiltrado = [];
          }
          console.log('DATA ENCONTRADO', this.estFiltrado)
        })
      }

      filterEstudiante(Datafilter){
        //PARA HACER BUSQUEDAS POR SEPARADO
        // this.estFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
        this.estFiltrado = this.est.filter(a => (a.NomC.indexOf(Datafilter)) > -1)
      }
      autoCompletar(a){
        this.EstudianteSelect.NomC=a.ape_p_est+ ' '+a.ape_m_est+' '+a.nombre_est;
        this.newEstudiantebeca.patchValue({id_est:a.id_est})
        this._carr.ObternerCarreraEstudiante(a.id_est)
        .then(res=>{
          this.newEstudiantebeca.patchValue({id_carre:a.id_carre})
        })
      }
  //#endregion
  CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log(res.data);
      res.data.forEach(e => {
        e.NomC= e.ape_p_est+ ' '+e.ape_m_est+' '+e.nombre_est
      });
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
  CargarBeca(){
    this._beca.ObtenerBecas()
    .then(res => {
      console.log(res.data);
      this.beca = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  LimpiarEstudiantebeca(){
    this.EstudiantebecaSeleccionado = {
      id_becado:'',
      id_beca:'',
      prom_beca:'',
      id_est:'',
      id_carre:'',
      NombreCompleto:''
    };
    this.newEstudiantebeca.patchValue({
      // id_becado:'',
      id_beca:'',
      prom_beca:'',
      id_est:'',
      id_carre:'',
      NombreCompleto:''
    })
    }
  CargarEstudiantebeca(){
    this._estBeca.ObtenerEstudiantebecas()
    .then(res => {
      console.log(res.data);
      this.esta = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarEstudiantebeca(){
    let data = {
      id_beca:this.newEstudiantebeca.value.id_beca,
      prom_beca:this.newEstudiantebeca.value.prom_beca,
      id_est:this.newEstudiantebeca.value.id_est,
      id_carre:this.newEstudiantebeca.value.id_carre,
    };
    this._estBeca.AgregarEstudiantebeca(data)
    .then((result) => {
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE AGREGÓ CORRECTAMENTE')//ESTO SE AGREGA
      console.log(result);
      this.CargarEstudiantebeca();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      this.MostrarMensaje('error','NO SE PUDO AGREGAR EL ESTUDIANTE BECARIO')//Y ESTO TAMBIEN
      console.log(error);
      this.CargarEstudiantebeca();
    });
  }

  SeleccionarEstudiantebeca(data,Modo){
    // Estudiantebecaseleccionado=a;
    this._estBeca.SeleccionarEstudiantebeca(data.id_becado)
    .then(res => {
      var a = res.data;
      this.EstudiantebecaSeleccionado = a;
      // this.EstudiantebecaSeleccionado.id_carre= a.id_carre
      this.EstudianteSelect.NomC = data.NombreCompleto
      console.log('INFO EST SELECCIONADO',this.EstudiantebecaSeleccionado);
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
  ModificarEstudiantebeca(Estudiantebeca){
    console.log('DATOS A ACTUALIZAR',Estudiantebeca)
    let data = {
        id_becado:Estudiantebeca.id_becado,
        id_beca:Estudiantebeca.id_beca,
        prom_beca:Estudiantebeca.prom_beca,
        id_est:Estudiantebeca.id_est,
        id_carre:Estudiantebeca.id_carre,
    };
    this._estBeca.ModificarEstudiantebeca(data,Estudiantebeca.id_becado)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE')//ESTO SE AGREGA
      this.CargarEstudiantebeca();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      this.MostrarMensaje('error','NO SE PUDO MODIFICAR')//ESTO SE AGREGA
      console.log(error);
      this.CargarEstudiantebeca();
    });
  }
  EliminarEstudiantebeca(id){
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
         this._estBeca.EliminarEstudiantebeca(id)
        .then(res => {
        console.log(res.data);
        this.MostrarMensaje('success','ESTUDIANTE ELIMINADO SATISFACTORIAMENTE')
        this.CargarEstudiantebeca();
        }).catch(err =>  {
        console.log("err");
        this.MostrarMensaje('error','NO SE PUDO ELIMINAREL ESTUDIANTE')
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
