import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConvEstudiantesService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/conv-estudiantes.service';
import { ConvRegistrarService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/conv-registrar.service';
import { EstadoConvService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/estado-conv.service';
import {HerramientasService} from 'src/app/core/services/herramientas.service';

@Component({
  selector: 'app-estado-conv',
  templateUrl: './estado-conv.component.html',
  styleUrls: ['./estado-conv.component.css']
})
export class EstadoConvComponent implements OnInit {

  ConvReg=[];
  EstConv=[];
  constructor(protected _estConvUnivs:EstadoConvService,
    protected _ConvReg: ConvRegistrarService, protected _ConvEst: ConvEstudiantesService,
    private _Tools:HerramientasService,
    protected _tool:HerramientasService
  ) {
    this._Tools.CargarScript(["Tools"]);
  }
  ngOnInit(): void {

    this.CargarUniCarreMats();
    this.CargarConvEstudiante();
    this.CargarEstadoConvUnivs();

    this.iniciarSearchConvEstado();
  }

  MensajeInformacion(titulo,descripcion,icono){
    this._tool.MensajeInformacion(titulo,descripcion,icono)
  }


  //#region CARGA EXTRAS

  CargarUniCarreMats(){
    this._ConvReg.ObtenerUniCarreMats()
    .then(res => {
      console.log("loadUnivCarreMats",res.data);
      this.ConvReg = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarConvEstudiante(){
    this._ConvEst.ObtenerConvEstudiantes()
    .then(res => {

      res.data.forEach(element => {
        element.NomC=element.nombre_est+' '+element.ape_p_est+' '+element.nombre_est
      });
      console.log("loadCargarConvEstudiante",res.data);
      this.EstConv = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion CARGA EXTRAS

  //#region ESTADO CONV , CRUD PRINCIPAL
    estConv=[];
    estConvRespaldo=[];
    isSubmitted = false;
    newEstadoConvUnivs =new FormGroup({
      id_estado_conv:new FormControl(0),
      id_conv_est:new FormControl(''),
      id_univ_carre_mater:new FormControl(''),
      desc_conv:new FormControl(''),

    })
    CargarEstadoConvUnivs(){
      this._estConvUnivs.ObtenerEstadoConvUnivs()
      .then(res => {
        console.log("cargarEstadoConvUnivs",res.data);
        this.estConv = res.data;
        this.estConvRespaldo = res.data;

      }).catch(err =>  {
      console.log("err");
      });
    }
    resetEstadoConvUnivs(){
      this.newEstadoConvUnivs.reset();
      this.isSubmitted =false;
    }
    AgregarModificarEstadoConvUnivs(){
      this.isSubmitted=true;
      if (this.newEstadoConvUnivs.invalid) {
        return;
      } else {
        let id = this.newEstadoConvUnivs.controls.id_estado_conv.value;
        console.log(this.newEstadoConvUnivs.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._estConvUnivs.AgregarEstadoConvUniv(this.newEstadoConvUnivs.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE',res.data);
            this.CargarEstadoConvUnivs();
            this.resetEstadoConvUnivs();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR EstadoConvUnivs');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._estConvUnivs.ModificarEstadoConvUniv(this.newEstadoConvUnivs.value,this.newEstadoConvUnivs.value.id_estado_conv)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE',res.data);
            this.CargarEstadoConvUnivs();
            this.resetEstadoConvUnivs();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarEstadoConvUnivs(id){
      if(id){
        const dataEstadoConvUnivs = this.estConv.find(x => x.id_estado_conv === id)
        if(!dataEstadoConvUnivs) return;
        this._estConvUnivs.SeleccionarEstadoConvUniv(id)
        .then(res=>{
          Object.keys(this.newEstadoConvUnivs.controls).forEach(key => {
            this.newEstadoConvUnivs.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION EXITOSA',this.newEstadoConvUnivs.value);
            document.getElementById("btnCrudEstadoConvUnivs").click();
        });
      }
    }
    EliminarEstadoConvUnivs(id){
      this._estConvUnivs.EliminarEstadoConvUniv(id)
      .then(res => {
        console.log(res.data);
        this.CargarEstadoConvUnivs();
      }).catch(err =>  {
      console.log("err",err);
      });
  }

   //#region BUSCADOR
 	filtradosSearchConvEst = []
	 filterSearchConvEstadoForm = new FormGroup({
 	    txt: new FormControl('')
	 })
	 iniciarSearchConvEstado(){
 	   this.filterSearchConvEstadoForm.get('txt').valueChanges
 	   .subscribe(res => {
  	      console.log('PALABRA A BUSCAR convEst', res)
  	    if(res && res.length){
  	      this.estConv = this.estConvRespaldo.filter(a => (a.desc_conv.indexOf	(res)) > -1 )
   	   }
   	   else{
    	    this.estConv =this.estConvRespaldo;
   	   }
   	 })
 	}
 	//#endregion BUSCADOR

  //#endregion CRUD PRINCIPAL
}
