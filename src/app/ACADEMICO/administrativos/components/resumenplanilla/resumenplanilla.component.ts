import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PagoextraService } from 'src/app/core/services/ACADEMICO/administrativos/pagoextra.service';
import { PlanillaAdminsService } from 'src/app/core/services/ACADEMICO/administrativos/PlanillaAdmins.service';
import { ResumenplanillaService } from 'src/app/core/services/ACADEMICO/administrativos/resumenplanilla.service';
import { GestionService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/gestion.service';

@Component({
  selector: 'app-resumenplanilla',
  templateUrl: './resumenplanilla.component.html',
  styleUrls: ['./resumenplanilla.component.css']
})
export class ResumenplanillaComponent implements OnInit {

  constructor(protected _resu_plani:ResumenplanillaService, protected _plani:PlanillaAdminsService,protected _pag_ex:PagoextraService, protected _ges:GestionService) { }

  ruta = 'http://localhost:8000/';
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarResumenplanilla();
    this.CargarPlanillaAdmins();
    this.CargarPagoextra();
    this.CargarGestion();
    
  }
//CRUD V3: idPK=> id_resumen_planilla, nomService=> _resu_plani, nombreCRUD=> Resumenplanilla,  dataP=> resu_plani, isSubmitted=>isSubmitted
  resu_plani=[];
  plani=[];
  pago_ex=[];
  ges=[];
  isSubmitted = false;
  newResumenplanilla =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_resumen_planilla:new FormControl(0),
    id_planilla_admin:new FormControl(''),
    id_pago_extra:new FormControl(''),
    fec_resumen_planilla:new FormControl(''),
    id_gestion:new FormControl(''),
  })
  CargarPlanillaAdmins(){
    this._plani.ObtenerPlanillaAdmins()
    .then(res => {
      console.log('PlanillaAdmins CARGADO',res.data);
      this.plani= res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR PlanillaAdmins',err.response.data.message);
    });
  }
  CargarPagoextra(){
    this._pag_ex.ObtenerPagoextra()
    .then(res => {
      console.log('Pagoextra CARGADO',res.data);
      this.pago_ex = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Pagoextra',err.response.data.message);
    });
  }
  CargarGestion(){
    this._ges.ObtenerGestions()
    .then(res => {
      console.log(' GESTION CARGADO',res.data);
      this.ges = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR GESTIONES',err.response.data.message);
    });
  }
  CargarResumenplanilla(){
    this._resu_plani.ObtenerResumenplanilla()
    .then(res => {
      console.log('Resumenplanilla CARGADO',res.data);
      this.resu_plani = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Resumenplanilla',err.response.data.message);
    });
  }
  resetResumenplanilla(){
    this.newResumenplanilla.reset();
    this.isSubmitted =false;
  }
  AgregarModificarResumenplanilla(){
    this.isSubmitted=true;
    if (this.newResumenplanilla.invalid) {
      return;
    } else {
      let id = this.newResumenplanilla.controls.id_resumen_planilla.value;
      console.log(this.newResumenplanilla.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._resu_plani.AgregarResumenplanilla(this.newResumenplanilla.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Resumenplanilla',res.data);
          this.CargarResumenplanilla();
          this.resetResumenplanilla();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Resumenplanilla');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._resu_plani.ModificarResumenplanilla(this.newResumenplanilla.value,this.newResumenplanilla.value.id_resumen_planilla)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Resumenplanilla',res.data);
          this.CargarResumenplanilla();
          this.resetResumenplanilla();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Resumenplanilla');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarResumenplanilla(id){
    if(id){
      const dataResumenplanilla = this.resu_plani.find(x => x.id_resumen_planilla === id)
      if(!dataResumenplanilla) return;
      this._resu_plani.SeleccionarResumenplanilla(id)
      .then(res=>{
        Object.keys(this.newResumenplanilla.controls).forEach(key => {
          this.newResumenplanilla.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Resumenplanilla EXITOSA',this.newResumenplanilla.value);
          document.getElementById("btnCrudResumenplanilla").click();
      });
    }
  }
  EliminarResumenplanilla(id){
    this._resu_plani.EliminarResumenplanilla(id)
    .then(res => {
      console.log(res.data);
      this.CargarResumenplanilla();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Resumenplanilla',err.response.data.message);
    });
}
}
