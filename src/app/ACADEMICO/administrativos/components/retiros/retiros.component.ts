import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RetirosService } from 'src/app/core/services/ACADEMICO/administrativos/Retiros.service';

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.css']
})
export class RetirosComponent implements OnInit {

  constructor(protected  _ret: RetirosService,) { }

  ruta = 'http://localhost:8000/';
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    //this.CargarRetiros();  
    //this.CargarOTRORetiros();    
  }
//CRUD V3: idPK=> id_retiro, nomService=> _ret, nombreCRUD=> Retiro,  dataP=> ret, isSubmitted=>isSubmitted
  ret=[];
  isSubmitted = false;
  newRetiros =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_retiro:new FormControl(0),
    motivo_retiro:new FormControl(''),
    periodo_fin:new FormControl(''),
    gestion_fin:new FormControl(''),
    obs_retiro:new FormControl(''),
    fec_trans:new FormControl(''),
  })
  CargarRetiros(){
    this._ret.ObtenerRetiros()
    .then(res => {
      console.log('Retiro CARGADO',res.data);
      this.ret = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Retiro',err.response.data.message);
    });
  }
  resetRetiros(){
    this.newRetiros.reset();
    this.isSubmitted =false;
  }
  AgregarModificarRetiros(){
    this.isSubmitted=true;
    if (this.newRetiros.invalid) {
      return;
    } else {
      let id = this.newRetiros.controls.id_retiro.value;
      console.log(this.newRetiros.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._ret.AgregarRetiros(this.newRetiros.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Retiro',res.data);
          this.CargarRetiros();
          this.resetRetiros();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Retiro');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._ret.ModificarRetiros(this.newRetiros.value,this.newRetiros.value.id_retiro)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Retiro',res.data);
          this.CargarRetiros();
          this.resetRetiros();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Retiro');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarRetiro(id){
    if(id){
      const dataRetiro = this.ret.find(x => x.id_retiro === id)
      if(!dataRetiro) return;
      this._ret.SeleccionarRetiros(id)
      .then(res=>{
        Object.keys(this.newRetiros.controls).forEach(key => {
          this.newRetiros.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Retiro EXITOSA',this.newRetiros.value);
          document.getElementById("btnCrudRetiro").click();
      });
    }
  }
  EliminarRetiro(id){
    this._ret.EliminarRetiros(id)
    .then(res => {
      console.log(res.data);
      this.CargarRetiros();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Retiro',err.response.data.message);
    });
}
}
