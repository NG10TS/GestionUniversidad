import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DevolucionesService } from 'src/app/core/services/ACADEMICO/administrativos/AllPagosMoney/devoluciones.service';
import { GestionPagosService } from 'src/app/core/services/ACADEMICO/administrativos/AllPagosMoney/gestion-pagos.service';
import { PlanGestionPagosService } from 'src/app/core/services/ACADEMICO/administrativos/AllPagosMoney/plan-gestion-pagos.service';
import { PlanPagoProyeccionesService } from 'src/app/core/services/ACADEMICO/administrativos/AllPagosMoney/plan-pago-proyecciones.service';
import { PlanPagosService } from 'src/app/core/services/ACADEMICO/administrativos/AllPagosMoney/plan-pagos.service';
import { EstudiantesRegularesService } from 'src/app/core/services/ACADEMICO/administrativos/estudiantes-regulares.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { GestionService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/gestion.service';

@Component({
  selector: 'app-estudiantes-regulares',
  templateUrl: './estudiantes-regulares.component.html',
  styleUrls: ['./estudiantes-regulares.component.css']
})
export class EstudiantesRegularesComponent implements OnInit {

  constructor(protected _estRegular: EstudiantesRegularesService,
  protected _est: EstudiantesService, protected _planPago:PlanPagosService, protected _planPagoProyeccion:PlanPagoProyeccionesService,
  protected _devolucion: DevolucionesService, protected _plangestPago:PlanGestionPagosService,protected _gestPago:GestionPagosService,
  protected _gest: GestionService
  ) { }

  ngOnInit(): void {
    this.CargarEstudianteRegular()
    this.CargarGestion();
    this.CargarMatricula();
    this.CargarEstudiantes()
    this.CargarPlanPago()
    this.CargarGestionPago()
    this.CargarPlanPagoProyeccion();
    this.CargarDevolucion();
    this.CargarPlanGestionPago();
    this.iniciarFormfilterEstudiante();
    this.iniciarFormfilterEstudianteRegular();
  }

  //#region FILTRADORES

  //estudiantes
  estFiltrado=[]; //LISTA ENCONTRADA
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
      console.log('DATA Estudiante ENCONTRADO', this.estFiltrado)
    })
  }
  filterEstudiante(Datafilter){
    this.estFiltrado = this.est.filter(a => (a.NomC.indexOf(Datafilter)) > -1 || (a.cod_est.indexOf(Datafilter)) > -1)
  }
  //estudiante regular
  //FILTRADOR V3: NombreFiltro => EstudianteRegular, dataP=> estRegular
    estRegularFiltrado=[]; //LISTA ENCONTRADA
    filtroEstudianteRegular=false; //ESTADO ngIf Lista
    filterEstudianteRegularForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterEstudianteRegular(){ //ESTO SE DEBE LLAMAR
      this.filterEstudianteRegularForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroEstudianteRegular=true;
        if(response && response.length){
          this.filterEstudianteRegular(response);
        } else {
          this.estRegularFiltrado = [];
        }
        console.log('DATA EstudianteRegular ENCONTRADO', this.estRegularFiltrado)
      })
    }

    filterEstudianteRegular(Datafilter){
      this.estRegularFiltrado = this.estRegular.filter(a => (a.NomC.indexOf(Datafilter)) > -1 || (a.cod_est.indexOf(Datafilter)) > -1)
    }


  //#endregion FILTRADORES

  //#region CARGA EXTRAS
  est=[]
  CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log("Estudiantes Cargado",res.data);
      res.data.forEach(e => {
        e.NomC=e.ape_p_est+' '+e.ape_m_est+' '+e.nombre_est;
        e.cod_est = e.cod_est+''
      });
      this.est = res.data;
    }).catch(error =>  {
    console.log('Error al Cargar Estudiantes',error.response.data.message);
    });
  }

  // INTRODUCIR nombre CRUD, nombre dataPrincipal(Gestion,gest)
  gest=[]
  CargarGestion(){
    this._gest.ObtenerGestions()
    .then(res => {
      console.log("Gestion Cargado",res.data);
      this.gest = res.data;
    }).catch(error =>  {
    console.log('Error al Cargar Gestion',error.response.data.message);
    });
  }
  matricula=[]
  CargarMatricula(){
    // axios.get('api/Matricula')
    // .then(res => {
    //   console.log("Matricula Cargado",res.data);
    //   this.matricula = res.data;
    // }).catch(error =>  {
    // console.log('Error al Cargar Matricula',error.response.data.message);
    // });
  }





  //#endregion CARGA EXTRAS

  //#region CRUD PRINCIPAL ESTUDIANTE-REGULAR
    estReg=[];
    estRegular=[]; //DE ESTE OTRO ES PARA NO INFLUIR EL BUSCADOR DEL CRUD PRINCIPAL CON LOS LOS OTROS CRUDS
    isSubmitted = false;
    newEstudianteRegular =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_est_reg:new FormControl(0),
      id_est:new FormControl(''),
      id_plan_pago:new FormControl(''),
    })
    CargarEstudianteRegular(){
      this._estRegular.ObtenerEstudianteRegulars()
      .then(res => {
        console.log('EstudianteRegular CARGADO',res.data);
        res.data.forEach(e => {
          e.NomC=e.ape_p_est+' '+e.ape_m_est+' '+e.nombre_est
          e.cod_est = e.cod_est+''
        });
        this.estReg = res.data;
        this.estRegular = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR EstudianteRegular',err.response.data.message);
      });
    }
    resetEstudianteRegular(){
      this.filterEstudianteForm.patchValue({txt:''});
      this.filtroEstudiante=false;
      this.newEstudianteRegular.reset();
      this.isSubmitted =false;
    }
    AgregarModificarEstudianteRegular(){
      this.isSubmitted=true;
      if (this.newEstudianteRegular.invalid) {
        return;
      } else {
        let id = this.newEstudianteRegular.controls.id_est_reg.value;
        console.log(this.newEstudianteRegular.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._estRegular.AgregarEstudianteRegular(this.newEstudianteRegular.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE EstudianteRegular',res.data);
            this.CargarEstudianteRegular();
            this.resetEstudianteRegular();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR EstudianteRegular');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._estRegular.ModificarEstudianteRegular(this.newEstudianteRegular.value,this.newEstudianteRegular.value.id_est_reg)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE EstudianteRegular',res.data);
            this.CargarEstudianteRegular();
            this.resetEstudianteRegular();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR EstudianteRegular');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarEstudianteRegular(data){
      if(data.id_est_reg){
        const dataEstudianteRegular = this.estReg.find(x => x.id_est_reg === data.id_est_reg)
        if(!dataEstudianteRegular) return;
        this._estRegular.SeleccionarEstudianteRegular(data.id_est_reg)
        .then(res=>{
          Object.keys(this.newEstudianteRegular.controls).forEach(key => {
            this.newEstudianteRegular.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE EstudianteRegular EXITOSA',this.newEstudianteRegular.value);
          this.filterEstudianteForm.patchValue({txt:data.ape_p_est+' '+data.ape_m_est+' '+data.nombre_est})
            document.getElementById("btnCrudEstudianteRegular").click();
        });
      }
    }
    EliminarEstudianteRegular(id){
      this._estRegular.EliminarEstudianteRegular(id)
      .then(res => {
        console.log(res.data);
        this.CargarEstudianteRegular();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR EstudianteRegular',err.response.data.message);
      });
  }
  //#endregion CRUD PRINCIPAL ESTUDIANTE-REGULAR

  //#region PLAN PAGOS
  ShowAddPlanPago;
    planPago=[];
    newPlanPago =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_plan_pago:new FormControl(0),
      tipo_plan_pagos:new FormControl(''),
      monto:new FormControl(''),
    })
    CargarPlanPago(){
      this._planPago.ObtenerPlanPagos()
      .then(res => {
        console.log('PlanPago CARGADO',res.data);
        this.planPago = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR PlanPago',err.response.data.message);
      });
    }
    resetPlanPago(){
      this.newPlanPago.reset();
      this.isSubmitted =false;
    }
    AgregarModificarPlanPago(){
      this.isSubmitted=true;
      if (this.newPlanPago.invalid) {
        return;
      } else {
        let id = this.newPlanPago.controls.id_plan_pago.value;
        console.log(this.newPlanPago.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._planPago.AgregarPlanPago(this.newPlanPago.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE PlanPago',res.data);
            this.CargarPlanPago();
            this.resetPlanPago();
            this.CargarEstudianteRegular();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR PlanPago');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._planPago.ModificarPlanPago(this.newPlanPago.value,this.newPlanPago.value.id_plan_pago)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE PlanPago',res.data);
            this.CargarPlanPago();
            this.resetPlanPago();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR PlanPago');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarPlanPago(id){
      if(id){
        const dataPlanPago = this.planPago.find(x => x.id_plan_pago === id)
        if(!dataPlanPago) return;
        this._planPago.SeleccionarPlanPago(id)
        .then(res=>{
          Object.keys(this.newPlanPago.controls).forEach(key => {
            this.newPlanPago.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE PlanPago EXITOSA',this.newPlanPago.value);
            // document.getElementById("btnCrudPlanPago").click();
        });
      }
    }
    EliminarPlanPago(id){
      this._planPago.EliminarPlanPago(id)
      .then(res => {
        console.log(res.data);
        this.CargarPlanPago();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR PlanPago',err.response.data.message);
      });
  }
  //#endregion plan pagos

  //#region PLAN PAGO PROYECCIONES
//CRUD V3: idPK=> id_plan_pago_proyec, nomService=> _planPagoProyeccion, nombreCRUD=> PlanPagoProyeccion,  dataP=> planPagoProyeccion, isSubmitted=>isSubmitted
  planPagoProyeccion=[];
  ShowAddPlanPagoProyeccion;
  newPlanPagoProyeccion =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_plan_pago_proyec:new FormControl(0),
    id_est_reg:new FormControl(''),
    monto_proy:new FormControl(''),
  })
  CargarPlanPagoProyeccion(){
    this._planPagoProyeccion.ObtenerPlanPagoProyeccions()
    .then(res => {
      console.log('PlanPagoProyeccion CARGADO',res.data);
      this.planPagoProyeccion = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR PlanPagoProyeccion',err.response.data.message);
    });
  }
  resetPlanPagoProyeccion(){
    this.newPlanPagoProyeccion.reset();
    this.isSubmitted =false;
  }
  AgregarModificarPlanPagoProyeccion(){
    this.isSubmitted=true;
    if (this.newPlanPagoProyeccion.invalid) {
      return;
    } else {
      let id = this.newPlanPagoProyeccion.controls.id_plan_pago_proyec.value;
      console.log(this.newPlanPagoProyeccion.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._planPagoProyeccion.AgregarPlanPagoProyeccion(this.newPlanPagoProyeccion.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE PlanPagoProyeccion',res.data);
          this.CargarPlanPagoProyeccion();
          this.resetPlanPagoProyeccion();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR PlanPagoProyeccion');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._planPagoProyeccion.ModificarPlanPagoProyeccion(this.newPlanPagoProyeccion.value,this.newPlanPagoProyeccion.value.id_plan_pago_proyec)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE PlanPagoProyeccion',res.data);
          this.CargarPlanPagoProyeccion();
          this.resetPlanPagoProyeccion();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR PlanPagoProyeccion');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarPlanPagoProyeccion(data){
    if(data.id_plan_pago_proyec){
      const dataPlanPagoProyeccion = this.planPagoProyeccion.find(x => x.id_plan_pago_proyec === data.id_plan_pago_proyec)
      if(!dataPlanPagoProyeccion) return;
      this._planPagoProyeccion.SeleccionarPlanPagoProyeccion(data.id_plan_pago_proyec)
      .then(res=>{
        Object.keys(this.newPlanPagoProyeccion.controls).forEach(key => {
          this.newPlanPagoProyeccion.controls[key].setValue(res.data[key]);
        });
        this.filterEstudianteRegularForm.patchValue({txt:data.ape_p_est+' '+data.ape_m_est+' '+data.nombre_est})
        this.filtroEstudianteRegular=false;
        console.log('SELECCION DE PlanPagoProyeccion EXITOSA',this.newPlanPagoProyeccion.value);
          // document.getElementById("btnCrudPlanPagoProyeccion").click();
      });
    }
  }
  EliminarPlanPagoProyeccion(id){
    this._planPagoProyeccion.EliminarPlanPagoProyeccion(id)
    .then(res => {
      console.log(res.data);
      this.CargarPlanPagoProyeccion();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR PlanPagoProyeccion',err.response.data.message);
    });
}
  //#endregion PLAN PAGO PROYECCIONES

  //#region DEVOLUCION
  //CRUD V3: idPK=> id_devolucion, nomService=> _devolucion, nombreCRUD=> Devolucion,  dataP=> devolucion, isSubmitted=>isSubmitted
    devolucion=[];
    newDevolucion =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_devolucion:new FormControl(0),
      id_est_reg:new FormControl(''),
      desc_devolucion:new FormControl(''),
      monto_devolucion:new FormControl(''),
    })
    CargarDevolucion(){
      this._devolucion.ObtenerDevolucions()
      .then(res => {
        console.log('Devolucion CARGADO',res.data);
        this.devolucion = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR Devolucion',err.response.data.message);
      });
    }
    resetDevolucion(){
      this.filterEstudianteRegularForm.patchValue({txt:''})
      this.newDevolucion.reset();
      this.isSubmitted =false;
    }
    AgregarModificarDevolucion(){
      this.isSubmitted=true;
      if (this.newDevolucion.invalid) {
        return;
      } else {
        let id = this.newDevolucion.controls.id_devolucion.value;
        console.log(this.newDevolucion.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._devolucion.AgregarDevolucion(this.newDevolucion.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE Devolucion',res.data);
            this.CargarDevolucion();
            this.resetDevolucion();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR Devolucion');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._devolucion.ModificarDevolucion(this.newDevolucion.value,this.newDevolucion.value.id_devolucion)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE Devolucion',res.data);
            this.CargarDevolucion();
            this.resetDevolucion();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR Devolucion');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarDevolucion(data){
      if(data.id_devolucion){
        const dataDevolucion = this.devolucion.find(x => x.id_devolucion === data.id_devolucion)
        if(!dataDevolucion) return;
        this._devolucion.SeleccionarDevolucion(data.id_devolucion)
        .then(res=>{
          Object.keys(this.newDevolucion.controls).forEach(key => {
            this.newDevolucion.controls[key].setValue(res.data[key]);
          });
          this.filterEstudianteRegularForm.patchValue({txt:data.ape_p_est+' '+data.ape_m_est+' '+data.nombre_est})
          this.filtroEstudianteRegular=false
          console.log('SELECCION DE Devolucion EXITOSA',this.newDevolucion.value);
            document.getElementById("btnCrudDevolucion").click();
        });
      }
    }
    EliminarDevolucion(id){
      this._devolucion.EliminarDevolucion(id)
      .then(res => {
        console.log(res.data);
        this.CargarDevolucion();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR Devolucion',err.response.data.message);
      });
  }
  //#endregion DEVOLUCION

  //#region PLAN GESTION PAGOS
  //CRUD V3: idPK=> id_plan_ges_pago, nomService=> _plangestPago, nombreCRUD=> PlanGestionPago,  dataP=> planGestionPago, isSubmitted=>isSubmitted
    planGestionPago=[];
    newPlanGestionPago =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_plan_ges_pago:new FormControl(0),
      id_est_reg:new FormControl(''),
      id_gestion_pago:new FormControl(''),
      id_ins:new FormControl(''),
      nombre_plan_pago:new FormControl(''),

    })
    CargarPlanGestionPago(){
      this._plangestPago.ObtenerPlanGestionPagos()
      .then(res => {
        console.log('PlanGestionPago CARGADO',res.data);
        this.planGestionPago = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR PlanGestionPago',err.response.data.message);
      });
    }
    resetPlanGestionPago(){
      this.newPlanGestionPago.reset();
      this.isSubmitted =false;
    }
    AgregarModificarPlanGestionPago(){
      this.isSubmitted=true;
      if (this.newPlanGestionPago.invalid) {
        return;
      } else {
        let id = this.newPlanGestionPago.controls.id_plan_ges_pago.value;
        console.log(this.newPlanGestionPago.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._plangestPago.AgregarPlanGestionPago(this.newPlanGestionPago.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE PlanGestionPago',res.data);
            this.CargarPlanGestionPago();
            this.resetPlanGestionPago();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR PlanGestionPago');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._plangestPago.ModificarPlanGestionPago(this.newPlanGestionPago.value,this.newPlanGestionPago.value.id_plan_ges_pago)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE PlanGestionPago',res.data);
            this.CargarPlanGestionPago();
            this.resetPlanGestionPago();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR PlanGestionPago');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarPlanGestionPago(id){
      if(id){
        const dataPlanGestionPago = this.planGestionPago.find(x => x.id_plan_ges_pago === id)
        if(!dataPlanGestionPago) return;
        this._plangestPago.SeleccionarPlanGestionPago(id)
        .then(res=>{
          Object.keys(this.newPlanGestionPago.controls).forEach(key => {
            this.newPlanGestionPago.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE PlanGestionPago EXITOSA',this.newPlanGestionPago.value);
            document.getElementById("btnCrudPlanGestionPago").click();
        });
      }
    }
    EliminarPlanGestionPago(id){
      this._plangestPago.EliminarPlanGestionPago(id)
      .then(res => {
        console.log(res.data);
        this.CargarPlanGestionPago();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR PlanGestionPago',err.response.data.message);
      });
  }
  //#endregion PLAN GESTION PAGOS

  //#region GESTION PAGOS
  //CRUD V3: idPK=> id_gestion_pago, nomService=> _gestPago, nombreCRUD=> GestionPago,  dataP=> gestPago, isSubmitted=>isSubmitted
    gestPago=[];
    newGestionPago =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_gestion_pago:new FormControl(0),
      id_gestion:new FormControl(''),
      tipo_pago:new FormControl(''),
      id_matricula:new FormControl(''),
    })
    CargarGestionPago(){
      this._gestPago.ObtenerGestionPagos()
      .then(res => {
        console.log('GestionPago CARGADO',res.data);
        this.gestPago = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR GestionPago',err.response.data.message);
      });
    }
    resetGestionPago(){
      this.newGestionPago.reset();
      this.isSubmitted =false;
    }
    AgregarModificarGestionPago(){
      this.isSubmitted=true;
      if (this.newGestionPago.invalid) {
        return;
      } else {
        let id = this.newGestionPago.controls.id_gestion_pago.value;
        console.log(this.newGestionPago.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._gestPago.AgregarGestionPago(this.newGestionPago.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE GestionPago',res.data);
            this.CargarGestionPago();
            this.resetGestionPago();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR GestionPago');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._gestPago.ModificarGestionPago(this.newGestionPago.value,this.newGestionPago.value.id_gestion_pago)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE GestionPago',res.data);
            this.CargarGestionPago();
            this.resetGestionPago();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR GestionPago');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarGestionPago(id){
      if(id){
        const dataGestionPago = this.gestPago.find(x => x.id_gestion_pago === id)
        if(!dataGestionPago) return;
        this._gestPago.SeleccionarGestionPago(id)
        .then(res=>{
          Object.keys(this.newGestionPago.controls).forEach(key => {
            this.newGestionPago.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE GestionPago EXITOSA',this.newGestionPago.value);
            document.getElementById("btnCrudGestionPago").click();
        });
      }
    }
    EliminarGestionPago(id){
      this._gestPago.EliminarGestionPago(id)
      .then(res => {
        console.log(res.data);
        this.CargarGestionPago();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR GestionPago',err.response.data.message);
      });
  }
  //#endregion GESTION PAGOS
}

