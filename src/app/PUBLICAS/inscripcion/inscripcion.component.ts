import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
// import { exists } from 'fs';
import { ConvConvalidarComponent } from 'src/app/ACADEMICO/vice-rectorado/components/Convalidaciones/conv-convalidar/conv-convalidar.component';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { TurnoService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/turno.service';
import { BecasService } from 'src/app/core/services/ACADEMICO/bienestar-estudiantil/becas.service';
import { PlaninscripcionService } from 'src/app/core/services/ACADEMICO/vice-rectorado/planinscripcion.service';
import { InscripcionService } from 'src/app/core/services/PUBLICAS/inscripcion.service';
@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {


  ruta = 'http://localhost:8000/';
  planins=[];
  ins=[];
  carre=[];
  est=[];

  newInscripcion = new FormGroup({

    //  id_ins :new FormControl(''),
    ins_periodo:new FormControl(''),
    ins_gestion:new FormControl(''),
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
    bec_por:new FormControl(''),
    id_beca:new FormControl(''),
    arch_env_bnb:new FormControl(''),
    id_turno:new FormControl(''),
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
    fec_ins :'', bec_por:'',id_beca:'' ,arch_env_bnb:'', id_turno:'',
    NomC:''
  }
  constructor(protected _ins: InscripcionService,
    protected _carr:CarrerasService, protected _est:EstudiantesService, protected _planIns:PlaninscripcionService,
    protected _beca:BecasService, protected _turno:TurnoService
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarInscripcions();
    this.CargarPlanInscripcions();
    this.CargarCarrera();
    this.CargarEstudiantes();
    this.CargarBeca()
    this.CargarTurno()
    this.iniciarFormfilterEstudiante();
    this.iniciarFormfilterEstudianteM();
  }


  //#region CARGAR TABLAS EXTRAS

  turno=[]
    CargarTurno(){
      this._turno.ObtenerTurnos()
      .then(res => {
        console.log("Turno Cargado",res.data);
        this.turno = res.data;
      }).catch(error =>  {
      console.log('Error al Cargar Turno',error.response.data.message);
      });
    }

  beca=[]
    CargarBeca(){
      this._beca.ObtenerBecas()
      .then(res => {
        console.log("Beca Cargado",res.data);
        this.beca = res.data;
      }).catch(error =>  {
      console.log('Error al Cargar Beca',error.response.data.message);
      });
    }

  CargarPlanInscripcions(){
    this._planIns.Obtenerplaninscripciones()
    .then(res => {
      console.log(res.data);
      this.planins = res.data;
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
  CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log(res.data);
      this.est = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion CARGAR TABLAS EXTRAS


  //#region  INSCRIPCIONES
  CargarInscripcions(){
    this._ins.ObtenerInscripcions()
    .then(res => {
      console.log(res.data);
      res.data.forEach(element => {
        element.NomC=element.ape_p_est+' '+element.ape_m_est+' '+element.nombre_est
      });
      this.ins = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  autoCompletart(idEst){
    var currentYear = new Date("2017");
    console.log(currentYear.getFullYear())
    this._carr.ObternerCarreraEstudiante(idEst)
    .then(res=>{
      console.log('CARRERA DEL ESTUDIANTE ES:',res.data);
      this.newInscripcion.patchValue({
        id_carre:res.data.id_carre,
        ins_gestion:currentYear.getFullYear().toString()
      })
    })
    .catch(error=>{
      console.log('ERROR AL OBTENER');
      console.log(error);
    })
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
    this.estMFiltrado = this.ins.filter(a => a.NomC.indexOf(Datafilter) > -1 ||  a.cod_est.indexOf(Datafilter) > -1)
  }

  estFiltrado=[]; //LISTA ENCONTRADA
  EstudianteSelect={//VALOR SELECCIONADO
    id_est:'',
    nombre_est:'',
    ape_p_est:'',
    ape_m_est:'',
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
    this.estFiltrado = this.ins.filter(a => a.NomC.indexOf(Datafilter) > -1 ||  a.cod_est.indexOf(Datafilter) > -1)

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
      fec_ins :'', bec_por:'',id_beca:'' ,arch_env_bnb:'', id_turno:'',
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
      fec_ins :'', bec_por:'',id_beca:'' ,arch_env_bnb:'', id_turno:'',
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
    formData.append('antiguo_ins','ANTIGUO');
    formData.append('tipo_de_pago',this.newInscripcion.value.tipo_de_pago);
    formData.append('terminal_ins',this.newInscripcion.value.terminal_ins);
    formData.append('id_est',this.newInscripcion.value.id_est);
    formData.append('id_carre',this.newInscripcion.value.id_carre);
    formData.append('id_plan_ins',this.newInscripcion.value.id_plan_ins);
    formData.append('fec_ins',this.newInscripcion.value.fec_ins);
    formData.append('id_turno',this.newInscripcion.value.id_turno);
    formData.append('arch_env_bnb',this.newInscripcion.value.arch_env_bnb);
    formData.append('bec_por',this.newInscripcion.value.bec_por);
    formData.append('id_beca',this.newInscripcion.value.id_beca);

    this._ins.AgregarInscripcion(formData)

    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarInscripcions();
      this.LimpiarInscripcions();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR ');
      console.log(error.response.data.message);
    })
  }

  SeleccionarInscripcion(data,Modo){
    console.log('INFO SELEC ', data)
    axios.get(this.ruta+'api/Inscripcion/'+data.id_ins)
    .then(res => {
      var a = res.data;
      this.InscripcionSeleccionado = a;
      this.InscripcionSeleccionado.NomC = data.NomC
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
      formData.append('id_turno',Inscripcion.id_turno);
      formData.append('arch_env_bnb',Inscripcion.arch_env_bnb);
      formData.append('bec_por',Inscripcion.bec_por);
      formData.append('id_beca',Inscripcion.id_beca);
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


