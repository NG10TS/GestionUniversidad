import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VendetalleService } from 'src/app/core/services/ACADEMICO/administrativos/Vendetalle.service';
import { VensemestreService } from 'src/app/core/services/ACADEMICO/administrativos/Vensemestre.service';
import { SemestreService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/semestre.service';

@Component({
  selector: 'app-vensemestre',
  templateUrl: './vensemestre.component.html',
  styleUrls: ['./vensemestre.component.css']
})
export class VensemestreComponent implements OnInit {

  constructor(protected  _vensem: VensemestreService, protected _vendet: VendetalleService, protected _sem:SemestreService) { }

  ruta = 'http://localhost:8000/';
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarVensemestre();  
    this.CargarSemestre();   
    this.CargarVendetalle(); 
  }
vendet=[];
sem=[];
//CRUD V3: idPK=> id_ven_semestre, nomService=> _vensem, nombreCRUD=> Vensemestre,  dataP=> vensem, isSubmitted=>isSubmitted
  vensem=[];
  isSubmitted = false;
  newVensemestre =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_ven_semestre:new FormControl(0),
    id_sem:new FormControl(''),
    id_ven_detalle:new FormControl(''),
    fec_ven_sem:new FormControl(''),
  })
  CargarVensemestre(){
    this._vensem.ObtenerVensemestre()
    .then(res => {
      console.log('Vensemestre CARGADO',res.data);
      this.vensem = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Vensemestre',err.response.data.message);
    });
  }
  CargarVendetalle(){
    this._vendet.ObtenerVendetalle()
    .then(res => {
      console.log('Vendetalle CARGADO',res.data);
      this.vendet = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Vendetalle',err.response.data.message);
    });
  }
  CargarSemestre(){
    this._sem.ObtenerSemestres()
    .then(res => {
      console.log(res.data);
      this.sem = res.data;
      // this.semFiltrado = res.data;
    }).catch(err =>  {
    console.log("err",err);
    });
  }
  resetVensemestre(){
    this.newVensemestre.reset();
    this.isSubmitted =false;
  }
  AgregarModificarVensemestre(){
    this.isSubmitted=true;
    if (this.newVensemestre.invalid) {
      return;
    } else {
      let id = this.newVensemestre.controls.id_ven_semestre.value;
      console.log(this.newVensemestre.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._vensem.AgregarVensemestre(this.newVensemestre.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Vensemestre',res.data);
          this.CargarVensemestre();
          this.resetVensemestre();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Vensemestre');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._vensem.ModificarVensemestre(this.newVensemestre.value,this.newVensemestre.value.id_ven_semestre)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Vensemestre',res.data);
          this.CargarVensemestre();
          this.resetVensemestre();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Vensemestre');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarVensemestre(id){
    if(id){
      const dataVensemestre = this.vensem.find(x => x.id_ven_semestre === id)
      if(!dataVensemestre) return;
      this._vensem.SeleccionarVensemestre(id)
      .then(res=>{
        Object.keys(this.newVensemestre.controls).forEach(key => {
          this.newVensemestre.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Vensemestre EXITOSA',this.newVensemestre.value);
          document.getElementById("btnCrudVensemestre").click();
      });
    }
  }
  EliminarVensemestre(id){
    this._vensem.EliminarVensemestre(id)
    .then(res => {
      console.log(res.data);
      this.CargarVensemestre();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Vensemestre',err.response.data.message);
    });
}

}
