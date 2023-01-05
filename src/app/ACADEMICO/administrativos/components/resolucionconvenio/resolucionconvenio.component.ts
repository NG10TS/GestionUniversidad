import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConvenioService } from 'src/app/core/services/ACADEMICO/administrativos/convenio.service';
import { ResolucionconvenioService } from 'src/app/core/services/ACADEMICO/administrativos/Resolucionconvenio.service';

@Component({
  selector: 'app-resolucionconvenio',
  templateUrl: './resolucionconvenio.component.html',
  styleUrls: ['./resolucionconvenio.component.css']
})
export class ResolucionconvenioComponent implements OnInit {

  constructor(protected _resol:ResolucionconvenioService, protected _conve:ConvenioService ) { }

  ruta = 'http://localhost:8000/';
  ngOnInit(): void {
    
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarConvenio();
    this.CargarResolucionconvenio();
    
   
  }
//CRUD V3: idPK=> id_resol_convenio, nomService=> _resol, nombreCRUD=> Resolucionconvenio,  dataP=> resol, isSubmitted=>isSubmitted
  resol=[];
  conve=[];
  isSubmitted = false;
  newResolucionconvenio =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_resol_convenio:new FormControl(0),
    id_convenio:new FormControl(''),
    nro_resol_convenio:new FormControl(''),
    fec_convenio:new FormControl(''),
    periodo_convenio:new FormControl(''),
    gestion_convenio:new FormControl(''),
  })
  CargarConvenio(){
    this._conve.ObtenerConvenio()
    .then(res => {
      console.log('Convenio CARGADO',res.data);
      this.conve = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Convenio',err.response.data.message);
    });
  }
  CargarResolucionconvenio(){
    this._resol.ObtenerResolucionconvenio()
    .then(res => {
      console.log('Resolucionconvenio CARGADO',res.data);
      this.resol = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Resolucionconvenio',err.response.data.message);
    });
  }
  resetResolucionconvenio(){
    this.newResolucionconvenio.reset();
    this.isSubmitted =false;
  }
  AgregarModificarResolucionconvenio(){
    this.isSubmitted=true;
    if (this.newResolucionconvenio.invalid) {
      return;
    } else {
      let id = this.newResolucionconvenio.controls.id_resol_convenio.value;
      console.log(this.newResolucionconvenio.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._resol.AgregarResolucionconvenio(this.newResolucionconvenio.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Resolucionconvenio',res.data);
          this.CargarResolucionconvenio();
          this.resetResolucionconvenio();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Resolucionconvenio');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._resol.ModificarResolucionconvenio(this.newResolucionconvenio.value,this.newResolucionconvenio.value.id_resol_convenio)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Resolucionconvenio',res.data);
          this.CargarResolucionconvenio();
          this.resetResolucionconvenio();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Resolucionconvenio');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarResolucionconvenio(id){
    if(id){
      const dataResolucionconvenio = this.resol.find(x => x.id_resol_convenio === id)
      if(!dataResolucionconvenio) return;
      this._resol.SeleccionarResolucionconvenio(id)
      .then(res=>{
        Object.keys(this.newResolucionconvenio.controls).forEach(key => {
          this.newResolucionconvenio.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Resolucionconvenio EXITOSA',this.newResolucionconvenio.value);
          document.getElementById("btnCrudResolucionconvenio").click();
      });
    }
  }
  EliminarResolucionconvenio(id){
    this._resol.EliminarResolucionconvenio(id)
    .then(res => {
      console.log(res.data);
      this.CargarResolucionconvenio();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Resolucionconvenio',err.response.data.message);
    });
}
}
