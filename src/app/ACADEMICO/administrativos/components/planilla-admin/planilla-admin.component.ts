import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CargosAdminService } from 'src/app/core/services/ACADEMICO/administrativos/cargos-admin.service';
import { PlanillaAdminsService } from 'src/app/core/services/ACADEMICO/administrativos/PlanillaAdmins.service';
import { AdministrativosService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/administrativos.service';

@Component({
  selector: 'app-planilla-admin',
  templateUrl: './planilla-admin.component.html',
  styleUrls: ['./planilla-admin.component.css']
})
export class PlanillaAdminComponent implements OnInit {

  constructor(protected _plan_adm: PlanillaAdminsService, protected _adm: AdministrativosService, protected _cargo:CargosAdminService) { }
  ruta = 'http://localhost:8000/';
  ngOnInit(): void {
    
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarPlanillaAdmins();
    
    // this.CargarCargosAdmin();
    // this.CargarAdministrativos();
    // this.consultar();

    // this.iniciarFormfilterAdministrativo();
  }
//CRUD V3: idPK=> id_planilla_admin, nomService=> _plan_adm, nombreCRUD=> PlanillaAdmins,  dataP=> plan_adm, isSubmitted=>isSubmitted
  plan_adm=[];
  isSubmitted = false;
  newPlanillaAdmins =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_planilla_admin:new FormControl(0),
    nro_planilla:new FormControl(''),
    mes_planilla :new FormControl(''),
    gestion_planilla:new FormControl(''),
    id_administrativo :new FormControl(''),
    id_cargo_admin :new FormControl(''),
    haberes_admin :new FormControl(''),
    hb1_admin :new FormControl(''),
    incremento :new FormControl(''),
    hb2_admin :new FormControl(''),
    caja_admin :new FormControl(''),
    otroi_admin :new FormControl(''),
    bant_admin :new FormControl(''),
    bafi_admin :new FormControl(''),
    botro1_admin :new FormControl(''),
    botro2_admin :new FormControl(''),
    afp_admin :new FormControl(''),
    id_egreso_admin :new FormControl(''),
    liquido_admin :new FormControl(''),
    obs_admin :new FormControl(''),
    fec_planilla_admin :new FormControl(''),
    cons_admin :new FormControl(''),
  })
  CargarPlanillaAdmins(){
    this._plan_adm.ObtenerPlanillaAdmins()
    .then(res => {
      console.log('PlanillaAdmins CARGADO',res.data);
      this.plan_adm = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR PlanillaAdmins',err.response.data.message);
    });
  }
  resetPlanillaAdmins(){
    this.newPlanillaAdmins.reset();
    this.isSubmitted =false;
  }
  AgregarModificarPlanillaAdmins(){
    this.isSubmitted=true;
    if (this.newPlanillaAdmins.invalid) {
      return;
    } else {
      let id = this.newPlanillaAdmins.controls.id_planilla_admin.value;
      console.log(this.newPlanillaAdmins.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._plan_adm.AgregarPlanillaAdmins(this.newPlanillaAdmins.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE PlanillaAdmins',res.data);
          this.CargarPlanillaAdmins();
          this.resetPlanillaAdmins();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR PlanillaAdmins');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._plan_adm.ModificarPlanillaAdmins(this.newPlanillaAdmins.value,this.newPlanillaAdmins.value.id_planilla_admin)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE PlanillaAdmins',res.data);
          this.CargarPlanillaAdmins();
          this.resetPlanillaAdmins();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR PlanillaAdmins');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarPlanillaAdmins(id){
    if(id){
      const dataPlanillaAdmins = this.plan_adm.find(x => x.id_planilla_admin === id)
      if(!dataPlanillaAdmins) return;
      this._plan_adm.SeleccionarPlanillaAdmins(id)
      .then(res=>{
        Object.keys(this.newPlanillaAdmins.controls).forEach(key => {
          this.newPlanillaAdmins.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE PlanillaAdmins EXITOSA',this.newPlanillaAdmins.value);
          document.getElementById("btnCrudPlanillaAdmins").click();
      });
    }
  }
  EliminarPlanillaAdmins(id){
    this._plan_adm.EliminarPlanillaAdmins(id)
    .then(res => {
      console.log(res.data);
      this.CargarPlanillaAdmins();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR PlanillaAdmins',err.response.data.message);
    });
}
}


