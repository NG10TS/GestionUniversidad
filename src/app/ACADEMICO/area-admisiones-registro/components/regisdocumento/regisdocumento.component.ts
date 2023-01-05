import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { RegisdocumentoService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/regisdocumento.service';


@Component({
  selector: 'app-regisdocumento',
  templateUrl: './regisdocumento.component.html',
  styleUrls: ['./regisdocumento.component.css']
})
export class RegisdocumentoComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  reg=[];
  est=[];
  carre=[];
  newRegisdocumento = new FormGroup({
    nro_registro:new FormControl(''),//
    documen:new FormControl(''),
    tipo_documen:new FormControl(''),
    id_est:new FormControl(''),
    id_carre:new FormControl(''),
  });
  RegisdocumentoSeleccionado = {
    id_regis_documen:'',
    nro_registro:'',
    documen:'',
    tipo_documen :'',
    id_est:'',
    id_carre:'',
  }
  constructor(protected _regisDoc:RegisdocumentoService,
    protected _est:EstudiantesService, protected _carr: CarrerasService
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarRegisdocumentos();
    this.CargarEstudiantes();
    this.CargarCarreras();

    this.iniciarFormfilterEstudiante();
  }
  //#region FILTRADORES
  //FILTRADOR V3: NombreFiltro => Estudiante, dataP=> est
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
      this.newRegisdocumento.patchValue({id_est:a.id_est})
      this._carr.ObternerCarreraEstudiante(a.id_est)
      .then(res=> {
        this.newRegisdocumento.patchValue({id_carre:res.data.id_carre})
      })

    }
  //#endregion FILTRADORES



  //#region CARGAR EXTRAS
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
  CargarCarreras(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log(res.data);
      this.carre = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }

  //#endregion CARGAR EXTRAS

//#region  regis DOCUMENTOS
  LimpiarRegisdocumentos(){
    this.RegisdocumentoSeleccionado = {
      id_regis_documen:'',
      nro_registro:'',
      documen:'',
      tipo_documen :'',
      id_est:'',
      id_carre:'',
    };
    this.newRegisdocumento.patchValue({
      id_regis_documen:'',
      nro_registro:'',
      documen:'',
      tipo_documen :'',
      id_est:'',
      id_carre:'',
    })
  }
  CargarRegisdocumentos(){
    this._regisDoc.ObtenerRegisdocumentos()
    .then(res => {
      console.log(res.data);
      this.reg = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarRegisdocumento(){
    const formData = new FormData();
    formData.append('nro_registro',this.newRegisdocumento.value.nro_registro);
    formData.append('documen',this.newRegisdocumento.value.documen);
    formData.append('tipo_documen',this.newRegisdocumento.value.tipo_documen);
    formData.append('id_est',this.newRegisdocumento.value.id_est);
    formData.append('id_carre',this.newRegisdocumento.value.id_carre);
    this._regisDoc.AgregarRegisdocumento(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarRegisdocumentos();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR DOCENTE');
      console.log(error);
    })
  }

  SeleccionarRegisdocumento(data,Modo){
    this._regisDoc.SeleccionarRegisdocumento(data.id_regis_documen)
    .then(res => {
      var a = res.data;
      this.RegisdocumentoSeleccionado = a;
      this.EstudianteSelect.NomC = data.ape_p_est+' '+data.ape_m_est+' '+data.nombre_est
      console.log('INFO EST SELECCIONADO',this.RegisdocumentoSeleccionado);
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
  ModificarRegisdocumento(Regisdocumento){
    console.log('DATOS A ACTUALIZAR',Regisdocumento)
    const formData = new FormData();
    formData.append('id_regis_documen',Regisdocumento.id_regis_documen);
    formData.append('nro_registro',Regisdocumento.nro_registro);
    formData.append('documen',Regisdocumento.documen);
    formData.append('tipo_documen',Regisdocumento.tipo_documen);
    formData.append('id_est',Regisdocumento.id_est);
    formData.append('id_carre',Regisdocumento.id_carre);
    this._regisDoc.ModificarRegisdocumento(formData,Regisdocumento.id_regis_documen)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarRegisdocumentos();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarRegisdocumentos();
    })
  }
  EliminarRegisdocumento(id){
    this._regisDoc.EliminarRegisdocumento(id)
    .then(res => {
      console.log(res.data);
      this.CargarRegisdocumentos();
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion regis docs
}

