
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { DocentesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/docentes.service';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';
import { SemestreService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/semestre.service';
import { TurnoService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/turno.service';
import { AsignacionMatService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/asignacion-mat.service';
import { GestionService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/gestion.service';
import { HerramientasService } from 'src/app/core/services/herramientas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-asignacion-docentes',
  templateUrl: './asignacion-docentes.component.html',
  styleUrls: ['./asignacion-docentes.component.css']
})
export class AsignacionDocentesComponent implements OnInit {
  ruta=environment.service;
  ADoc=[];
  doc=[];
  mat=[];
  sem=[];
  carr=[];
  gestSeleccionado;

  constructor(protected _asignacionMat: AsignacionMatService,
    protected _doc:DocentesService, protected _sem:SemestreService, protected _turno:TurnoService,
    protected _mat:MateriasService, protected _carr:CarrerasService, protected _gestion:GestionService, protected _Tools: HerramientasService
  ) { }
NowDate:string;
  ngOnInit(): void {
    this.NowDate= this._Tools.ObtenerFechaActual();
    this.CargarAsignacionMat();
    this.CargarTurno();
    this.CargarDocentes();
    this.CargarMaterias();
    this.CargarSemestres();
    this.CargarCarreras();
    this.CargarGestion();
    this.iniciarFormfilterDocente();
    this.iniciarFormfilterMateria();
    this.iniciarFormfilterGestion();

    // this.CargarInformacionFKCarreMat();
  }
  //#region CARGA EXTRAS
  // CargarInformacionFKCarreMat(){
  //   //cargamos algunos atributos de todos los FK de la tabla Carre_mat
  //   axios.get(this.ruta+'api/ObtenerInformacionFK')
  //   .then(res => {
  //     console.log(res.data);
  //     this.mat = res.data;
  //   }).catch(err =>  {
  //   console.log("err");
  //   });
  // }
  CargarDocentes(){
    this._doc.ObtenerDocentes()
    .then(res => {
      console.log(" DOCENTES CARGADO",res.data);
      res.data.forEach(e => {
        e.NomC= e.ape_p_doc+' '+e.ape_m_doc+' '+e.nombre_doc
      });
      this.doc = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarSemestres(){
    this._sem.ObtenerSemestres()
    .then(res => {
      console.log(" SEMESTRES CARGADO",res.data);
      this.sem = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarMaterias(){
    this._mat.ObtenerMaterias()
    .then(res => {
      console.log("MATERIAS CARGADO",res.data);
      this.mat = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarCarreras(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log("CARRERAS CARGADO",res.data);
      this.carr = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
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

  //#endregion CARGA EXTRAS

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


    matFiltrado=[]; //LISTA ENCONTRADA
    MateriaSelect={//VALOR SELECCIONADO
      codigo_mat:'',
      nombre_mat:'',
    };
    filtroMateria=false; //ESTADO ngIf Lista
    filterMateriaForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterMateria(){ //ESTO SE DEBE LLAMAR
      this.filterMateriaForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroMateria=true;
        if(response && response.length){
          this.filterMateria(response);
        } else {
          this.matFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.matFiltrado)
      })
    }

    filterMateria(Datafilter){
      this.matFiltrado = this.mat.filter(a => (a.nombre_mat.indexOf(Datafilter)) > -1||(a.codigo_mat.indexOf(Datafilter)) > -1)
    }
    docFiltrado=[]; //LISTA ENCONTRADA
    DocenteSelect={//VALOR SELECCIONADO
      NomC:''
    };
    filtroDocente=false; //ESTADO ngIf Lista
    filterDocenteForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterDocente(){ //ESTO SE DEBE LLAMAR
      this.filterDocenteForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroDocente=true;
        if(response && response.length){
          this.filterDocente(response);
        } else {
          this.docFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.docFiltrado)
      })
    }

    filterDocente(Datafilter){
      this.docFiltrado = this.doc.filter(a => (a.NomC.indexOf(Datafilter)) > -1 || (a.cod_doc.toString().indexOf(Datafilter)) > -1)
    }
  //#endregion FILTRADORES

  //#region ASIGNACION DE DOCENTES o MAts

    asignacionMat=[];
    isSubmitted = false;
    newAsignacionMat =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_asig_mat:new FormControl(0),
      nro_asig_mat:new FormControl(''), //-
      id_doc:new FormControl(''), //
      id_carre:new FormControl(''), //
      id_sem:new FormControl(''), //
      id_materia:new FormControl(''), //
      id_turno:new FormControl(''), //
      periodo_asig_mat:new FormControl(''), //-
      gestion_asig_mat:new FormControl(''), //-
      paralelo_asig_mat:new FormControl(''),
      nro_modulo:new FormControl(''),
      cro_tipo_mat_carr:new FormControl(''),
      doc_suel:new FormControl(''),
      doc_bs:new FormControl(''),
      doc_hab:new FormControl(''),
      fec_des:new FormControl(''), //-
      fec_ini:new FormControl(''),
      fec_fin:new FormControl(''),
      obs_asig_mat:new FormControl(''),
    })
    CargarAsignacionMat(){
      this._asignacionMat.ObtenerAsignacionMats()
      .then(res => {
        console.log('AsignacionMat CARGADO',res.data);
        this.asignacionMat = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR AsignacionMat',err.response.data.message);
      });
    }
    resetAsignacionMat(){
      this.filterGestionForm.patchValue({txt:''})
      this.filterMateriaForm.patchValue({txt:''})
      this.filterDocenteForm.patchValue({txt:''})
      this.newAsignacionMat.reset();
      this.isSubmitted =false;
    }
    AgregarModificarAsignacionMat(){
      this.isSubmitted=true;
      if (this.newAsignacionMat.invalid) {
        return;
      } else {
        let id = this.newAsignacionMat.controls.id_asig_mat.value;
        console.log(this.newAsignacionMat.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._asignacionMat.AgregarAsignacionMat(this.newAsignacionMat.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE AsignacionMat',res.data);
            this.CargarAsignacionMat();
            this.resetAsignacionMat();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR AsignacionMat');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._asignacionMat.ModificarAsignacionMat(this.newAsignacionMat.value,this.newAsignacionMat.value.id_asig_mat)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE AsignacionMat',res.data);
            this.CargarAsignacionMat();
            this.resetAsignacionMat();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR AsignacionMat');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarAsignacionMat(data){
      if(data.id_asig_mat){
        this.filterDocenteForm.patchValue({txt:data.ape_p_doc+' '+data.ape_m_doc+' '+data.nombre_doc});
        this.filterMateriaForm.patchValue({txt:data.nombre_mat})
        this.filtroDocente=false; this.filtroMateria=false;
        const dataAsignacionMat = this.asignacionMat.find(x => x.id_asig_mat === data.id_asig_mat)
        if(!dataAsignacionMat) return;
        this._asignacionMat.SeleccionarAsignacionMat(data.id_asig_mat)
        .then(res=>{
          Object.keys(this.newAsignacionMat.controls).forEach(key => {
            this.newAsignacionMat.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE AsignacionMat EXITOSA',this.newAsignacionMat.value);
            document.getElementById("btnCrudAsignacionMat").click();
        });
      }


    }
    EliminarAsignacionMat(id){
      this._asignacionMat.EliminarAsignacionMat(id)
      .then(res => {
        console.log(res.data);
        this.CargarAsignacionMat();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR AsignacionMat',err.response.data.message);
      });
  }
  //#endregion ASIGNACION DE DOCENTES

  //#region GESTIONES
  //CRUD V3: idPK=> id_gestion, nomService=> _gestion, nombreCRUD=> Gestion,  dataP=> gest, isSubmitted=>isSubmitted
    gest=[];
    ShowAddGestion=false; //para la parte de adicion en gestiones
    newGestion =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_gestion:new FormControl(0),
      periodo_gestion:new FormControl(''),
      anio_gestion:new FormControl(''),
    })
    CargarGestion(){
      this._gestion.ObtenerGestions()
      .then(res => {
        console.log('Gestion CARGADO',res.data);
        res.data.forEach(element => {
          element.Gestion = element.anio_gestion+'/'+element.periodo_gestion
        });
        this.gest = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR Gestion',err.response.data.message);
      });
    }
    resetGestion(){
      this.newGestion.reset();
      this.isSubmitted =false;
    }
    AgregarModificarGestion(){
      this.isSubmitted=true;
      if (this.newGestion.invalid) {
        return;
      } else {
        let id = this.newGestion.controls.id_gestion.value;
        console.log(this.newGestion.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._gestion.AgregarGestion(this.newGestion.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE Gestion',res.data);
            this.CargarGestion();
            this.resetGestion();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR Gestion');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._gestion.ModificarGestion(this.newGestion.value,this.newGestion.value.id_gestion)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE Gestion',res.data);
            this.CargarGestion();
            this.resetGestion();
          })
          .catch(error=>{
            this.CargarGestion();//
            this.resetGestion(); //
            console.log('ERROR AL MODIFICAR Gestion');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarGestion(id){
      if(id){
        const dataGestion = this.gest.find(x => x.id_gestion === id)
        if(!dataGestion) return;
        this._gestion.SeleccionarGestion(id)
        .then(res=>{
          Object.keys(this.newGestion.controls).forEach(key => {
            this.newGestion.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE Gestion EXITOSA',this.newGestion.value);
            // document.getElementById("btnCrudGestion").click(); //
        });
      }
    }
    EliminarGestion(id){
      this._gestion.EliminarGestion(id)
      .then(res => {
        console.log(res.data);
        this.CargarGestion();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR Gestion',err.response.data.message);
      });
  }
  //#endregion
}
