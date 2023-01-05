import { EgresocatService } from './../../../../core/services/ACADEMICO/administrativos/egresocat.service';
import { EgresoadminsService } from './../../../../core/services/ACADEMICO/administrativos/egresoadmins.service';
import { EgresadosService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/Egresados.service';
import { CargosAdminService } from './../../../../core/services/ACADEMICO/administrativos/cargos-admin.service';
import { AdministrativosService } from './../../../../core/services/ACADEMICO/area-admisiones-registro/administrativos.service';
import { PlanillasadminService } from './../../../../core/services/ACADEMICO/administrativos/planillasadmin.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-planillasadmin',
  templateUrl: './planillasadmin.component.html',
  styleUrls: ['./planillasadmin.component.css']
})
export class PlanillasadminComponent implements OnInit {

  constructor(protected _planillaadmin:PlanillasadminService,
              protected _admin:AdministrativosService,
              protected _cargoadmin:CargosAdminService,
              protected _egresoadmin:EgresoadminsService,
              protected _egresocat:EgresocatService
  ) { }

  ngOnInit(): void {
    this.CargarPlanillaAdmin();
    this.CargarAdministrativo();
    this.CargarEgresoAdmin();
    this.CargarCargoAdmin();
    this.CargarEgresoCategoria();
  }
  //#region CARGAS EXTRAS
  // INTRODUCIR nombre CRUD, nombre dataPrincipal(Administrativo,admin)
  admin=[]
    CargarAdministrativo(){
      this._admin.ObtenerAdministrativos()
      .then(res => {
        console.log("Administrativo Cargado",res.data);
        this.admin = res.data;
      }).catch(error =>  {
      console.log('Error al Cargar Administrativo',error.response.data.message);
      });
    }

    // INTRODUCIR nombre CRUD, nombre dataPrincipal(CargoAdmin,cargoadmin)
    cargoadmin=[]
      CargarCargoAdmin(){
        this._cargoadmin.ObtenerCargoAdmins()
        .then(res => {
          console.log("CargoAdmin Cargado",res.data);
          this.cargoadmin = res.data;
        }).catch(error =>  {
        console.log('Error al Cargar CargoAdmin',error.response.data.message);
        });
      }

  //#endregion CARGAS EXTRAS

  //#region CRUD PRINCIPAL PLANILLAS ADMIN
  //CRUD V3: idPK=> id_planilla_admin, nomService=> _planillaadmin, nombreCRUD=> PlanillaAdmin,  dataP=> planilla_admin, isSubmitted=>isSubmitted
    planilla_admin=[];
    isSubmitted = false;
    newPlanillaAdmin =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_planilla_admin:new FormControl(0),
      nro_planilla:new FormControl(''),
      mes_planilla:new FormControl(''),
      gestion_planilla:new FormControl(''),
      id_administrativo:new FormControl(''),
      id_cargo_admin:new FormControl(''),
      haberes_admin:new FormControl(''),
      hb1_admin:new FormControl(''),
      hb2_admin:new FormControl(''),
      afp_admin:new FormControl(''),
      caja_admin:new FormControl(''),
      otroi_admin:new FormControl(''),
      bant_admin:new FormControl(''),
      botro1_admin:new FormControl(''),
      botro2_admin:new FormControl(''),
      liquido_admin:new FormControl(''),
      obs_admin:new FormControl(''),
      fec_planilla_admin:new FormControl(''),
      id_egreso_admin:new FormControl(''),
      cons_admin:new FormControl(''),

    })
    CargarPlanillaAdmin(){
      this._planillaadmin.ObtenerPlanillaAdmins()
      .then(res => {
        console.log('PlanillaAdmin CARGADO',res.data);
        this.planilla_admin = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR PlanillaAdmin',err.response.data.message);
      });
    }
    resetPlanillaAdmin(){
      this.newPlanillaAdmin.reset();
      this.isSubmitted =false;
    }
    AgregarModificarPlanillaAdmin(){
      this.isSubmitted=true;
      if (this.newPlanillaAdmin.invalid) {
        return;
      } else {
        let id = this.newPlanillaAdmin.controls.id_planilla_admin.value;
        console.log(this.newPlanillaAdmin.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._planillaadmin.AgregarPlanillaAdmin(this.newPlanillaAdmin.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE PlanillaAdmin',res.data);
            this.CargarPlanillaAdmin();
            this.resetPlanillaAdmin();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR PlanillaAdmin');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._planillaadmin.ModificarPlanillaAdmin(this.newPlanillaAdmin.value,this.newPlanillaAdmin.value.id_planilla_admin)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE PlanillaAdmin',res.data);
            this.CargarPlanillaAdmin();
            this.resetPlanillaAdmin();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR PlanillaAdmin');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarPlanillaAdmin(id){
      if(id){
        const dataPlanillaAdmin = this.planilla_admin.find(x => x.id_planilla_admin === id)
        if(!dataPlanillaAdmin) return;
        this._planillaadmin.SeleccionarPlanillaAdmin(id)
        .then(res=>{
          Object.keys(this.newPlanillaAdmin.controls).forEach(key => {
            this.newPlanillaAdmin.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE PlanillaAdmin EXITOSA',this.newPlanillaAdmin.value);
            document.getElementById("btnCrudPlanillaAdmin").click();
        });
      }
    }
    EliminarPlanillaAdmin(id){
      this._planillaadmin.EliminarPlanillaAdmin(id)
      .then(res => {
        console.log(res.data);
        this.CargarPlanillaAdmin();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR PlanillaAdmin',err.response.data.message);
      });
  }
  //#endregion CRUD PRINCIPAL PLANILLAS ADMIN

  //#region  CRUD EGRESO ADMIN
   //CRUD V3: idPK=> id_egreso_admin, nomService=> _egresoadmin, nombreCRUD=> EgresoAdmin,  dataP=> egreso_admin, isSubmitted=>isSubmitted
     egreso_admin=[];
     newEgresoAdmin =new FormGroup({
       // attr:new FormControl('',[Validators.required])
       id_egreso_admin:new FormControl(0),

       id_egreso_cat:new FormControl(''),
       identi_adj_egreso:new FormControl(''),
       nombre_adj_egreso:new FormControl(''), 
       detalle_egreso:new FormControl(''),
       fec_egreso:new FormControl(''),
       monto_egreso:new FormControl(''),
       tasa_cambio_egreso:new FormControl(''),
       obs_egreso:new FormControl(''),
       fec_trans_egreso:new FormControl(''),
       nro_fac_egreso:new FormControl(''),
     })
     CargarEgresoAdmin(){
       this._egresoadmin.ObtenerEgresoAdmins()
       .then(res => {
         console.log('EgresoAdmin CARGADO',res.data);
         this.egreso_admin = res.data;
       }).catch(err =>  {
       console.log('ERROR AL CARGAR EgresoAdmin',err.response.data.message);
       });
     }
     resetEgresoAdmin(){
       this.newEgresoAdmin.reset();
       this.isSubmitted =false;
     }
     AgregarModificarEgresoAdmin(){
       this.isSubmitted=true;
       if (this.newEgresoAdmin.invalid) {
         return;
       } else {
         let id = this.newEgresoAdmin.controls.id_egreso_admin.value;
         console.log(this.newEgresoAdmin.value)
         if (!id) { //PREGUNTAMOS: SI NO TIENE id?
           this._egresoadmin.AgregarEgresoAdmin(this.newEgresoAdmin.value)
           .then(res=>{
             console.log('SE AÑADIO CORRECTAMENTE EgresoAdmin',res.data);
             this.CargarEgresoAdmin();
             this.resetEgresoAdmin();
           })
           .catch(error=>{
             console.log('ERROR AL AÑADIR EgresoAdmin');
             console.log(error.response.data.message);
           })
         } else {
           //SI TIENE ID POR LO TANTO MODIFICAR
           this._egresoadmin.ModificarEgresoAdmin(this.newEgresoAdmin.value,this.newEgresoAdmin.value.id_egreso_admin)
           .then(res=>{
             console.log('SE MODIFICO CORRECTAMENTE EgresoAdmin',res.data);
             this.CargarEgresoAdmin();
             this.resetEgresoAdmin();
           })
           .catch(error=>{
             console.log('ERROR AL MODIFICAR EgresoAdmin');
             console.log(error.response.data.message);
           })
         }
       }
     }
     SeleccionarEgresoAdmin(id){
       if(id){
         const dataEgresoAdmin = this.egreso_admin.find(x => x.id_egreso_admin === id)
         if(!dataEgresoAdmin) return;
         this._egresoadmin.SeleccionarEgresoAdmin(id)
         .then(res=>{
           Object.keys(this.newEgresoAdmin.controls).forEach(key => {
             this.newEgresoAdmin.controls[key].setValue(res.data[key]);
           });
           console.log('SELECCION DE EgresoAdmin EXITOSA',this.newEgresoAdmin.value);
             document.getElementById("btnCrudEgresoAdmin").click();
         });
       }
     }
     EliminarEgresoAdmin(id){
       this._egresoadmin.EliminarEgresoAdmin(id)
       .then(res => {
         console.log(res.data);
         this.CargarEgresoAdmin();
       }).catch(err =>  {
       console.log('ERROR AL ELIMINAR EgresoAdmin',err.response.data.message);
       });
   }



  //#endregion CRUD EGRESO ADMIN


  //#region CRUD EGRESO CATEGORIA
     egreso_cat=[];
     newEgresoCategoria =new FormGroup({
       // attr:new FormControl('',[Validators.required])
       id_egreso_cat:new FormControl(0),
       nombre_egre_cat:new FormControl(''),

     })
     CargarEgresoCategoria(){
       this._egresocat.ObtenerEgresoCategorias()
       .then(res => {
         console.log('EgresoCategoria CARGADO',res.data);
         this.egreso_cat = res.data;
       }).catch(err =>  {
       console.log('ERROR AL CARGAR EgresoCategoria',err.response.data.message);
       });
     }
     resetEgresoCategoria(){
       this.newEgresoCategoria.reset();
       this.isSubmitted =false;
     }
     AgregarModificarEgresoCategoria(){
       this.isSubmitted=true;
       if (this.newEgresoCategoria.invalid) {
         return;
       } else {
         let id = this.newEgresoCategoria.controls.id_egreso_cat.value;
         console.log(this.newEgresoCategoria.value)
         if (!id) { //PREGUNTAMOS: SI NO TIENE id?
           this._egresocat.AgregarEgresoCategoria(this.newEgresoCategoria.value)
           .then(res=>{
             console.log('SE AÑADIO CORRECTAMENTE EgresoCategoria',res.data);
             this.CargarEgresoCategoria();
             this.resetEgresoCategoria();
           })
           .catch(error=>{
             console.log('ERROR AL AÑADIR EgresoCategoria');
             console.log(error.response.data.message);
           })
         } else {
           //SI TIENE ID POR LO TANTO MODIFICAR
           this._egresocat.ModificarEgresoCategoria(this.newEgresoCategoria.value,this.newEgresoCategoria.value.id_egreso_cat)
           .then(res=>{
             console.log('SE MODIFICO CORRECTAMENTE EgresoCategoria',res.data);
             this.CargarEgresoCategoria();
             this.resetEgresoCategoria();
           })
           .catch(error=>{
             console.log('ERROR AL MODIFICAR EgresoCategoria');
             console.log(error.response.data.message);
           })
         }
       }
     }
     SeleccionarEgresoCategoria(id){
       if(id){
         const dataEgresoCategoria = this.egreso_cat.find(x => x.id_egreso_cat === id)
         if(!dataEgresoCategoria) return;
         this._egresocat.SeleccionarEgresoCategoria(id)
         .then(res=>{
           Object.keys(this.newEgresoCategoria.controls).forEach(key => {
             this.newEgresoCategoria.controls[key].setValue(res.data[key]);
           });
           console.log('SELECCION DE EgresoCategoria EXITOSA',this.newEgresoCategoria.value);
             document.getElementById("btnCrudEgresoCategoria").click();
         });
       }
     }
     EliminarEgresoCategoria(id){
       this._egresocat.EliminarEgresoCategoria(id)
       .then(res => {
         console.log(res.data);
         this.CargarEgresoCategoria();
       }).catch(err =>  {
       console.log('ERROR AL ELIMINAR EgresoCategoria',err.response.data.message);
       });
   }
  //#endregion CRUD EGRESO CATEGORIA


  
}
