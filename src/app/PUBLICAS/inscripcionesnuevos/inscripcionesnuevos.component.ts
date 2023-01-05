import { PlaninscripcionService } from 'src/app/core/services/ACADEMICO/vice-rectorado/planinscripcion.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { InscripcionService } from 'src/app/core/services/PUBLICAS/inscripcion.service';
import { GestionService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/gestion.service';
import { verifyHostBindings } from '@angular/compiler';
import { HerramientasService } from 'src/app/core/services/herramientas.service';

@Component({
  selector: 'app-inscripcionesnuevos',
  templateUrl: './inscripcionesnuevos.component.html',
  styleUrls: ['./inscripcionesnuevos.component.css']
})
export class InscripcionesnuevosComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  planins=[];
  ins=[];
  carre=[];
  est=[];
  FechNow:string;

  constructor(protected _ins: InscripcionService,
    protected _carr:CarrerasService, protected _est:EstudiantesService, protected _planIns: PlaninscripcionService, protected _gest:GestionService, protected _Tool:HerramientasService
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.FechNow=this._Tool.ObtenerFechaActual()
    this.CargarInscripcions();
    this.CargarPlanInscripcions();
    this.CargarCarrera();
    this.CargarEstudiantes();
    this.CargarGestiones();
    this.iniciarFormfilterEstudiante();
    this.iniciarFormfilterEstudianteM();
    this.iniciarFormfilterCarrera();
    this.iniciarFormfilterGestion();
  }
  //#region FILTRADORES
  //FILTRADOR V3: NombreFiltro => Gestion, dataP=> gest
    gestFiltrado=[]; //LISTA ENCONTRADA
    filtroGestion=false; //ESTADO ngIf Lista
    filterGestionForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterGestion(){ //ESTO SE DEBE LLAMAR
      this.filterGestionForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroGestion=true;
        if(response && response.length){
          this.filterGestion(response);
        } else {
          this.gestFiltrado = [];
        }
        console.log('DATA Gestion ENCONTRADO', this.gestFiltrado)
      })
    }

    filterGestion(Datafilter){
      this.gestFiltrado = this.gest.filter(a => (a.Gestion.indexOf(Datafilter)) > -1)
    }


  //FILTRADOR V3: NombreFiltro => EstudianteM, dataP=> estM
  estMFiltrado=[]; //LISTA ENCONTRADA
  EstudianteMSelect={//VALOR SELECCIONADO
    // attrib:''
  };
  filtroEstudianteM=false; //ESTADO ngIf Lista
  filterEstudianteMForm= new FormGroup({
    txt:new FormControl(''),
  });
  iniciarFormfilterEstudianteM(){ //ESTO SE DEBE LLAMAR
    this.filterEstudianteMForm.get('txt').valueChanges
    // .pipe(debounceTime(1000))
    .subscribe(response => {
      console.log('entered data is ', response);
      this.filtroEstudianteM=true;
      if(response && response.length){
        this.filterEstudianteM(response);
      } else {
        this.estMFiltrado = [];
      }
      console.log('DATA ENCONTRADO', this.estMFiltrado)
    })
  }

  filterEstudianteM(Datafilter){
    //PARA HACER BUSQUEDAS POR SEPARADO
    this.estMFiltrado = this.est.filter(a => a.NomC.indexOf(Datafilter) > -1 ||  a.cod_est.indexOf(Datafilter) > -1)
  }

  estFiltrado=[]; //LISTA ENCONTRADA
  EstudianteSelect={//VALOR SELECCIONADO
    id_est:'',
    nombre_est:'',
    ape_p_est:'',
    ape_m_est:'',
    NomC:'',

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
    this.estFiltrado = this.est.filter(a => a.NomC.indexOf(Datafilter) > -1)

  }


  //PARA FILTRAR CARRERAS
    carrFiltrado=[]; //LISTA ENCONTRADA
    CarreraSelect={//VALOR SELECCIONADO
      nombre_carre:''
    };
    filtroCarrera=false; //ESTADO ngIf Lista
    filterCarreraForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterCarrera(){ //ESTO SE DEBE LLAMAR
      this.filterCarreraForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroCarrera=true;
        if(response && response.length){
          this.filterCarrera(response);
        } else {
          this.carrFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.carrFiltrado)
      })
    }

    filterCarrera(Datafilter){
      this.carrFiltrado = this.carre.filter(a => (a.nombre_carre.indexOf(Datafilter)) > -1 || (a.sigla_carre.indexOf(Datafilter)) > -1)
    }
    //#endregion FILTRADORES


  //#region CARGAR TABLAS EXTRAS
  gest=[]
  CargarGestiones(){
    this._gest.ObtenerGestions()
    .then(res=>{
      console.log("GESTIONES CARGADO", res.data)
      res.data.forEach(e => {
        e.Gestion=e.periodo_gestion+'/'+e.anio_gestion
      });
      this.gest=res.data;
    })
  }
  CargarPlanInscripcions(){
    this._planIns.Obtenerplaninscripciones()
    .then(res => {
      console.log("PLAN INSCRIPCION CARGADO",res.data);
      this.planins = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarCarrera(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log("CARRERAS UNIOR CARGADO",res.data);
      this.carre = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log("ESTUDIANTES UNIOR CARGADO",res.data);
      res.data.forEach(element => {
        element.NomC=element.ape_p_est+' '+element.ape_m_est+' '+element.nombre_est+' '+element.cod_est

      });
      this.est = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion CARGAR TABLAS EXTRAS


  //#region  INSCRIPCIONES
  newInscripcion = new FormGroup({

    //  id_ins :new FormControl(''),
    ins_periodo :new FormControl(''),
    ins_gestion :new FormControl(''),
    turno_ins :new FormControl(''),
    // id_materia :new FormControl(''),
    habi_ins :new FormControl(''),
    obs_ins :new FormControl(''),
    nivel :new FormControl(''),
    convenio:new FormControl(''),
    antiguo_ins :new FormControl(''),
    tipo_de_pago :new FormControl(''),
    terminal_ins :new FormControl(''),
    id_est :new FormControl(''),
    id_carre :new FormControl(''),
    id_plan_ins:new FormControl(''),
    nombre_plan:new FormControl(''),
    fec_ins :new FormControl(''),

  });

  InscripcionSeleccionado = {
    id_ins :'',
    ins_periodo :'',
    ins_gestion :'',
    turno_ins :'',
    // id_materia :'',
    habi_ins :'',
    obs_ins :'',
    nivel :'',
    convenio:'',
    antiguo_ins :'',
    tipo_de_pago :'',
    terminal_ins :'',
    id_est :'',
    id_carre :'',
    id_plan_ins :'',
    nombre_plan:'',
    fec_ins :'',
    NomC:''
  }
  CargarInscripcions(){
    this._ins.ObtenerInscripcions()
    .then(res => {
      console.log("INSCRIPCIONES CARGADO",res.data);
      res.data.forEach(element => {
        element.NomC=element.ape_p_est+' '+element.ape_m_est+' '+element.nombre_est
      });
      this.ins = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  autoCompletarM(dataEst){
    this.InscripcionSeleccionado.NomC=dataEst.ape_p_est+' '+dataEst.ape_m_est+' '+dataEst.nombre_est;

    this.InscripcionSeleccionado.id_est=dataEst.id_est
    this._carr.ObternerCarreraEstudiante(dataEst.id_est)
    .then(res=>{
      console.log('CARRERA DEL ESTUDIANTE ES:',res.data);
      this.InscripcionSeleccionado.id_carre=res.data.id_carre
    })
    .catch(error=>{
      console.log('ERROR AL OBTENER');
      console.log(error);
    })
  }
  CODEst;
  AutocompletarEstudiantes(){
    this._est.SeleccionarEstudiante(this.CODEst)
    .then(res => {
      this.newInscripcion.patchValue({
        // ejemplo: :'',
        id_est:res.data.id_est
      })
    }).catch(err =>  {
    console.log("err");
    });
  }



  LimpiarInscripcions(){
    this.InscripcionSeleccionado = {

      id_ins :'',
      ins_periodo :'',
      ins_gestion :'',
      turno_ins :'',
    //  id_materia :'',
      habi_ins :'',
      obs_ins :'',
      nivel :'',
      convenio:'',
      antiguo_ins :'',
      tipo_de_pago :'',
      terminal_ins :'',
      id_est :'',
      id_carre :'',
      id_plan_ins :'',
      nombre_plan:'',
      fec_ins :'',
      NomC:''
    };

    this.newInscripcion.patchValue({

      id_ins :'',
      ins_periodo :'',
      ins_gestion :'',
      turno_ins :'',
    //  id_materia :'',
      habi_ins :'',
      obs_ins :'',
      nivel :'',
      convenio:'',
      antiguo_ins :'',
      tipo_de_pago :'',
      terminal_ins :'',
      id_est :'',
      id_carre :'',
      id_plan_ins :'',
      nombre_plan:'',
      fec_ins :'',
      NomC:''
    })
    }
  AgregarInscripcion(){
    const formData = new FormData();
    // formData.append('id_ins',this.newInscripcion.value.id_ins);
    formData.append('ins_periodo',this.newInscripcion.value.ins_periodo);
    formData.append('ins_gestion',this.newInscripcion.value.ins_gestion);
    formData.append('turno_ins',this.newInscripcion.value.turno_ins);
    formData.append('habi_ins',this.newInscripcion.value.habi_ins);
    formData.append('obs_ins',this.newInscripcion.value.obs_ins);
    formData.append('nivel',this.newInscripcion.value.nivel);
    formData.append('convenio',this.newInscripcion.value.convenio);
    // formData.append('antiguo_ins','NUEVO');
    formData.append('tipo_de_pago',this.newInscripcion.value.tipo_de_pago);
    formData.append('terminal_ins',this.newInscripcion.value.terminal_ins);
    formData.append('id_est',this.newInscripcion.value.id_est);
    formData.append('id_carre',this.newInscripcion.value.id_carre);
    formData.append('id_plan_ins',this.newInscripcion.value.id_plan_ins);
    formData.append('fec_ins',this.newInscripcion.value.fec_ins);
    this._ins.AgregarInscripcion(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarInscripcions();
      this.LimpiarInscripcions();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR ');
      console.log(error);
    })
  }

  SeleccionarInscripcion(data,Modo){
    console.log('INFO SELEC ', data)
    axios.get(this.ruta+'api/Inscripcion/'+data.id_ins)
    .then(res => {
      var a = res.data;
      this.InscripcionSeleccionado = a;
      // this.InscripcionSeleccionado.NomC = data.NomC

      this.filterEstudianteForm.patchValue({txt:data.NomC})
      this.filterGestionForm.patchValue({txt:data.ins_gestion+'/'+data.ins_periodo})
      this.filterCarreraForm.patchValue({txt:data.nombre_carre})
      this.filtroGestion=false;this.filtroEstudiante=false; this.filtroCarrera=false;
      console.log('INFO PER SELECCIONADO',this.InscripcionSeleccionado);
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
  ModificarInscripcion(Inscripcion){
    console.log('DATOS A ACTUALIZAR',Inscripcion)
    const formData = new FormData();
      formData.append('id_ins',Inscripcion.id_ins);
      formData.append('ins_periodo',Inscripcion.ins_periodo);
      formData.append('ins_gestion',Inscripcion.ins_gestion);
      formData.append('turno_ins',Inscripcion.turno_ins);
      formData.append('habi_ins',Inscripcion.habi_ins);
      formData.append('obs_ins',Inscripcion.obs_ins);
      formData.append('nivel',Inscripcion.nivel);
      formData.append('convenio',Inscripcion.convenio);
      formData.append('antiguo_ins',Inscripcion.antiguo_ins);
      formData.append('tipo_de_pago',Inscripcion.tipo_de_pago);
      formData.append('terminal_ins',Inscripcion.terminal_ins);
      formData.append('id_est',Inscripcion.id_est);
      formData.append('id_carre',Inscripcion.id_carre);
      formData.append('id_plan_ins',Inscripcion.id_plan_ins);
      formData.append('fec_ins',Inscripcion.fec_ins);
      this._ins.ModificarInscripcion(formData, Inscripcion.id_ins)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarInscripcions();
      this.LimpiarInscripcions();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarInscripcions();
    })
  }
  EliminarInscripcion(id){
    this._ins.EliminarInscripcion(id)
    .then(res => {
      console.log(res.data);
      this.CargarInscripcions();
    }).catch(err =>  {
    console.log("err");
    });
  }
    //#endregion INSCRIPCIONES
}

