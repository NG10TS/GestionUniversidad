import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EgresadoTitulosService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/egresado-titulos.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { UniversidadesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/universidades.service';

@Component({
  selector: 'app-egresadotitulos',
  templateUrl: './egresadotitulos.component.html',
  styleUrls: ['./egresadotitulos.component.css']
})
export class EgresadotitulosComponent implements OnInit {

  constructor(protected _egT:EgresadoTitulosService,
    protected _est: EstudiantesService, protected _carr: CarrerasService, protected _univ : UniversidadesService

  ) { }
  ruta= 'http://localhost:8000/';
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarEgresadotitulos();
    this.CargarEstudiantes();
    this.CargarCarrera();
    this.CargarUniversidades();

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
      this.estFiltrado = this.est.filter(a => (a.NomC.indexOf(Datafilter)) > -1)
    }
    autoCompletar(a){
      this.EstudianteSelect.NomC=a.ape_p_est+' '+a.ape_m_est+' '+a.nombre_est;
      this.newEgresadotitulos.patchValue({id_est:a.id_est})
      this._carr.ObternerCarreraEstudiante(a.id_est)
      .then(res => {
        console.log(res.data);
        this.newEgresadotitulos.patchValue({id_carre:res.data.id_carre})
      }).catch(error =>  {
      console.log("error",error);
      });
    }
  //#endregion FILTRADORES

  //#region CARGA EXTRAS
  egr =[ ];
  est=[ ];
  carre=[ ];
  uni=[ ];

  CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log(res.data);
      res.data.forEach(e => {
        e.NomC=e.ape_p_est+' '+e.ape_m_est+' '+e.nombre_est
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
  CargarUniversidades(){
    this._univ.ObtenerUniversidades()
    .then(res => {
      console.log(res.data);
      this.uni = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion CARGA EXTRAS

  //#region EGRESADOS TITULOS

  EgresadotitulosSeleccionado = {
    //ejemplo... id_egr_titulo:'',
    id_egr_titulo:'',
    id_est:'',
    id_carre:'',
    tipo_titulo:'',
    nombre_titulo:'',
    id_univ:'',
    gestion_titulo:'',
    // NombreCompleto:'',
  };

  newEgresadotitulos= new FormGroup({
    // ejemplo: id_egr_titulo:new FormControl(''),
    // id_egr_titulo:new FormControl(''),
    id_est:new FormControl(''),
    id_carre:new FormControl(''),
    tipo_titulo:new FormControl(''),
    nombre_titulo:new FormControl(''),
    id_univ:new FormControl(''),
    gestion_titulo:new FormControl(''),
  });
  CargarEgresadotitulos(){
    this._egT.ObtenerEgresadotitulos()
    .then(res => {
      console.log(res.data);
      this.egr = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  AgregarEgresadotitulos(){
    const formData = new FormData();
    //ejemplo formData.append('atributo',this.newEgresadotitulos.value.atributo);
    formData.append('id_est',this.newEgresadotitulos.value.id_est);
    formData.append('id_carre',this.newEgresadotitulos.value.id_carre);
    formData.append('tipo_titulo',this.newEgresadotitulos.value.tipo_titulo);
    formData.append('nombre_titulo',this.newEgresadotitulos.value.nombre_titulo);
    formData.append('id_univ',this.newEgresadotitulos.value.id_univ);
    formData.append('gestion_titulo',this.newEgresadotitulos.value.gestion_titulo);
    console.log('Datos a agregar',this.newEgresadotitulos.value)
    this._egT.AgregarEgresadotitulos(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarEgresadotitulos();
      this.LimpiarEgresadotitulos();
    })
    .catch(error=>{
      console.log('ERROR AL INTENTAR AÑADIR DATO');
      console.log(error);
    })
  }
  SeleccionarEgresadotitulos(id,Modo){
    this._egT.SeleccionarEgresadotitulos(id)
    .then(res => {
      var a = res.data;
      this.EgresadotitulosSeleccionado = a;
      console.log('INFO DATO SELECCIONADO',this.EgresadotitulosSeleccionado);
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
  ModificarEgresadotitulos(Egresadotitulos){
    const formData = new FormData();
    //ejemplo... formData.append('id',this.newEgresadotitulos.value.id);
    formData.append('id_egr_titulo',Egresadotitulos.id_egr_titulo);
    formData.append('id_est',Egresadotitulos.id_est);
    formData.append('id_carre',Egresadotitulos.id_carre);
    formData.append('tipo_titulo',Egresadotitulos.tipo_titulo);
    formData.append('nombre_titulo',Egresadotitulos.nombre_titulo);
    formData.append('id_univ',Egresadotitulos.id_univ);
    formData.append('gestion_titulo',Egresadotitulos.gestion_titulo);
    this._egT.ModificarEgresadotitulos(formData, Egresadotitulos.id_egr_titulo)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarEgresadotitulos();
    })
    .catch(error=>{
      console.log('HAY ERROR AL INTENTAR MODIFICAR');
      console.log(error);
      this.CargarEgresadotitulos();
    })
  }
  EliminarEgresadotitulos(id){
    this._egT.EliminarEgresadotitulos(id)
    .then(res => {
      console.log(res.data);
      this.CargarEgresadotitulos();
    }).catch(error =>  {
    console.log("err",error);
    });
  }

  LimpiarEgresadotitulos()
  {
  this.EgresadotitulosSeleccionado = {
    // ejemplo: id_egr_titulo:'',
    id_egr_titulo:'',
    id_est:'',
    id_carre:'',
    tipo_titulo:'',
    nombre_titulo:'',
    id_univ:'',
    gestion_titulo:'',
    // NombreCompleto:'',

  };
  this.newEgresadotitulos.patchValue({
    // ejemplo: id_egr_titulo:'',
    // id_egr_titulo:'',
    id_est:'',
    id_carre:'',
    tipo_titulo:'',
    nombre_titulo:'',
    id_univ:'',
    gestion_titulo:'',
  })
 }
//#endregion EGRESADOS TITULOS

}
