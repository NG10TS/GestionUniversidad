import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlanEService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/plan-e.service';
import { ConvEstudiantesService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/conv-estudiantes.service';
import { ConvRegistrarService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/conv-registrar.service';
import { ConvalidacionesService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/Convalidaciones.service';
import { PlanDescConvService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/plan-desc-conv.service';
import { HerramientasService } from 'src/app/core/services/herramientas.service';

@Component({
  selector: 'app-conv-convalidar',
  templateUrl: './conv-convalidar.component.html',
  styleUrls: ['./conv-convalidar.component.css']
})
export class ConvConvalidarComponent implements OnInit {

  planDesc=[];
  constructor(protected _conv: ConvalidacionesService,
    protected _ConvEst: ConvEstudiantesService, protected _PDescConv: PlanDescConvService, protected _ConvRegO:ConvRegistrarService,
    protected _CarreMat: PlanEService,protected _cargarScrips: HerramientasService,
  ) {
    this._cargarScrips.CargarScript(["Tools"])
  }

  ngOnInit(): void {
    this.CargarConvalidacion();
    this.CargarConvEstudiante();
    this.CargarMateriasOrigen();
    this.CargarMateriasUnior();

    this.iniciarSearchConv();
    this.iniciarFormfilterMateriaUnior();
    this.iniciarFormfilterMateriaOrigen();
    this.iniciarFormfilterEstudiante();
  }
  MensajeInformacion(titulo,descripcion,icono){
    this._cargarScrips.MensajeInformacion(titulo,descripcion,icono)
  }
  //#region FILTRADORES
    //FILTRADOR V3: NombreFiltro => MateriaUnior, dataP=> matU
      matUFiltrado=[]; //LISTA ENCONTRADA
      MateriaUniorSelect={//VALOR SELECCIONADO
        nombre_mat:''
      };
      filtroMateriaUnior=false; //ESTADO ngIf Lista
      filterMateriaUniorForm= new FormGroup({
        txt:new FormControl(''),
      });
      iniciarFormfilterMateriaUnior(){ //ESTO SE DEBE LLAMAR
        this.filterMateriaUniorForm.get('txt').valueChanges
        // .pipe(debounceTime(1000))
        .subscribe(response => {
          console.log('entered data is ', response);
          this.filtroMateriaUnior=true;
          if(response && response.length){
            this.filterMateriaUnior(response);
          } else {
            this.matUFiltrado = [];
          }
          console.log('DATA ENCONTRADO', this.matUFiltrado)
        })
      }

      filterMateriaUnior(Datafilter){
        //PARA HACER BUSQUEDAS POR SEPARADO
        // this.matUFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
        this.matUFiltrado = this.matUnior.filter(a => (a.nombre_mat.indexOf(Datafilter)) > -1)
      }


    matOFiltrado=[]; //LISTA ENCONTRADA
    MateriaOrigenSelect={//VALOR SELECCIONADO
      nombre_mater_conv:''
    };
    filtroMateriaOrigen=false; //ESTADO ngIf Lista
    filterMateriaOrigenForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterMateriaOrigen(){ //ESTO SE DEBE LLAMAR
      this.filterMateriaOrigenForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroMateriaOrigen=true;
        if(response && response.length){
          this.filterMateriaOrigen(response);
        } else {
          this.matOFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.matOFiltrado)
      })
    }

    filterMateriaOrigen(Datafilter){
      //PARA HACER BUSQUEDAS POR SEPARADO
      this.matOFiltrado = this.matO.filter(a => (a.nombre_mater_conv.indexOf(Datafilter)) > -1)
    }
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
        console.log('NOMBRE A BUSCAR ', response);
        this.filtroEstudiante=true;
        if(response && response.length){
          this.filterEstudiante(response)
        } else {
          this.estFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.estFiltrado)
      })
    }

    filterEstudiante(Datafilter){
      //PARA HACER BUSQUEDAS POR SEPARADO
      this.estFiltrado = this.est.filter(a => (a.NomC.indexOf(Datafilter)) > -1 || (a.cod_est1.indexOf(Datafilter)) > -1)
    }
  //#endregion FILTRADORES

    //#region CARGA EXTRAS
    est=[];//ESTUDIANTES DE CONVALIDACION
    estRespaldo=[];//ESTUDIANTES DE CONVALIDACION RESPALDO
    CargarConvEstudiante(){
      this._ConvEst.ObtenerConvEstudiantes()
      .then(res=>{
        console.log("ESTUDIANTES CONV", res.data)
        res.data.forEach(e => {
          e.NomC = e.ape_p_est+' '+e.ape_m_est+' '+e.nombre_est
          e.cod_est1= e.cod_est+''
        });
        this.est=res.data;
        this.estRespaldo=res.data;
      })
    }
    CargarPlanDescConv(){

    }
    matO=[];
    CargarMateriasOrigen(){ //CONV REGISTRAR
      this._ConvRegO.ObtenerUniCarreMats()
      .then(res=>{
        this.matO=res.data
        console.log('CONV REG o MATERIAS ORIGEN: ',res.data)
      })
    }
    matUnior=[];
    CargarMateriasUnior(){ //CARRE MAT
      this._CarreMat.ObtenerCarreMats()
      .then(res=>{
        console.log("PLAN E o Carre mat Cargado",res.data)
        this.matUnior=res.data;
      })
      .catch(err=>{
        console.log(err)
      })
    }
    //#endregion CARGA EXTRAS
  //#region CONVALIDACIONES
    conv=[];
    convRespaldo = [];
    isSubmitted = false;
    newConvalidacion =new FormGroup({
      id_convalidacion:new FormControl(0),
      id_conv_est:new FormControl(''),
      id_plandesc_conv:new FormControl(''),
      id_univ_carre_mater:new FormControl(''),
      id_carre_mater:new FormControl(''),
      nota_conv:new FormControl(''),
      fec_conv:new FormControl(''),
      ap_conv:new FormControl(''),
      resol_conv:new FormControl(''),
      obs_conv:new FormControl(''),
    })
    CargarConvalidacion(){
      this._conv.ObtenerConvalidaciones()
      .then(res => {
        console.log("mi convalidacion: ",res.data);
        res.data.forEach(e => {
          e.NomC=e.ape_p_est+' '+e.ape_m_est+' '+e.nombre_est
          e.Editando=false
        });
        this.conv = res.data;
        this.convRespaldo = res.data;
      }).catch(err =>  {
      console.log("err",err);
      });
    }
    resetConvalidacion(){
      this.newConvalidacion.reset();
      this.isSubmitted =false;
    }
    AgregarModificarConvalidacion(){
      this.isSubmitted=true;
      if (this.newConvalidacion.invalid) {
        return;
      } else {
        let id = this.newConvalidacion.controls.id_convalidacion.value;
        console.log(this.newConvalidacion.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._conv.AgregarConvalidacion(this.newConvalidacion.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE',res.data);
            this.CargarConvalidacion();
            this.resetConvalidacion();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR Convalidacion');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._conv.ModificarConvalidacion(this.newConvalidacion.value,this.newConvalidacion.value.id_convalidacion)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE',res.data);
            this.CargarConvalidacion();
            this.resetConvalidacion();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarConvalidacion(id){
      if(id){
        const dataConvalidacion = this.conv.find(x => x.id_convalidacion === id)
        if(!dataConvalidacion) return;
        this._conv.SeleccionarConvalidacion(id)
        .then(res=>{
          Object.keys(this.newConvalidacion.controls).forEach(key => {
            this.newConvalidacion.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION EXITOSA',this.newConvalidacion.value);
            document.getElementById("btnCrudConvalidacion").click();
        });
      }
    }
    EliminarConvalidacion(id){
      this._conv.EliminarConvalidacion(id)
      .then(res => {
        console.log(res.data);
        this.CargarConvalidacion();
      }).catch(err =>  {
      console.log("err",err);
      });
  }
   //#region BUSCADOR
 	filtradosSearchConv = []
	 filterSearchConvForm = new FormGroup({
 	    txt: new FormControl('')
	 })
	 iniciarSearchConv(){
 	   this.filterSearchConvForm.get('txt').valueChanges
 	   .subscribe(res => {
  	      console.log('PALABRA A BUSCAR Convalidacion', res)
  	    if(res && res.length){
  	      this.conv = this.convRespaldo.filter(a => (a.NomC.indexOf	(res)) > -1 )
   	   }
   	   else{
    	    this.conv =this.convRespaldo
   	   }
   	 })
 	}
 	//#endregion BUSCADOR
  //#endregion CONVALIDACIONES
}
