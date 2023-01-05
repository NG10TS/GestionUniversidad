import { EgresoadminsService } from './../../../../core/services/ACADEMICO/administrativos/egresoadmins.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-egresoadmins',
  templateUrl: './egresoadmins.component.html',
  styleUrls: ['./egresoadmins.component.css']
})
export class EgresoadminsComponent implements OnInit {

  constructor(protected _egresoadmin:EgresoadminsService) { }

  ngOnInit(): void {
  }
  //CRUD V3: idPK=> id_egreso_admin, nomService=> _egresoadmin, nombreCRUD=> EgresoAdmin,  dataP=> egreso_admin, isSubmitted=>isSubmitted
    egreso_admin=[];
    isSubmitted = false;
    newEgresoAdmin =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_egreso_admin:new FormControl(0),
      categoria_egreso:new FormControl(''),
      subcategoria_egreso:new FormControl(''),
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
}
