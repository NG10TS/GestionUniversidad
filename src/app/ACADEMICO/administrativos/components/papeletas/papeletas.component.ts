import { EgresoadminsService } from './../../../../core/services/ACADEMICO/administrativos/egresoadmins.service';
import { DocentesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/docentes.service';
import { EgresoadminsComponent } from './../egresoadmins/egresoadmins.component';
import { DocentesComponent } from './../../../area-admisiones-registro/components/docentes/docentes.component';
import { PapeletasService } from './../../../../core/services/ACADEMICO/administrativos/papeletas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-papeletas',
  templateUrl: './papeletas.component.html',
  styleUrls: ['./papeletas.component.css']
})
export class PapeletasComponent implements OnInit {

  constructor(protected _papeleta:PapeletasService,
               protected _doc:DocentesService,
               protected _egresoadmin:EgresoadminsService
  ) { }

  ngOnInit(): void {
    this.CargarDocente()
    this.CargarEgresoAdmin()
    this.CargarPapeleta()
  }
//#region CARGAS EXTRAS
  doc=[]
  CargarDocente(){
    this._doc.ObtenerDocentes()
    .then(res => {
      console.log("Docente Cargado",res.data);
      this.doc = res.data;
    }).catch(error =>  {
    console.log('Error al Cargar Docente',error.response.data.message);
    });
  }

  egresoadmin=[]
    CargarEgresoAdmin(){
      this._egresoadmin.ObtenerEgresoAdmins()
      .then(res => {
        console.log("EgresoAdmin Cargado",res.data);
        this.egresoadmin = res.data;
      }).catch(error =>  {
      console.log('Error al Cargar EgresoAdmin',error.response.data.message);
      });
    }

//#endregion CARGAS EXTRAS

  //#region CRUD PRINCIPAL PAPELETAS
    papeleta=[];
    isSubmitted = false;
    newPapeleta =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_papel:new FormControl(0),
      id_doc:new FormControl(''),
      mes_papel:new FormControl(''),
      anio_papel:new FormControl(''),
      fec_papel:new FormControl(''),
      ganado_papel:new FormControl(''),
      bono_papel:new FormControl(''),
      descuento_papel:new FormControl(''),
      adelanto_papel:new FormControl(''),
      liquido_papel:new FormControl(''),
      bs_papel:new FormControl(''),
      autorizado_papel:new FormControl(''),
      fec_pago_papel:new FormControl(''),
      id_egreso_admin:new FormControl(''),
      tasa_cambio_papel:new FormControl(''),
    })
    CargarPapeleta(){
      this._papeleta.ObtenerPapeletas()
      .then(res => {
        console.log('Papeleta CARGADO',res.data);
        this.papeleta = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR Papeleta',err.response.data.message);
      });
    }
    resetPapeleta(){
      this.newPapeleta.reset();
      this.isSubmitted =false;
    }
    AgregarModificarPapeleta(){
      this.isSubmitted=true;
      if (this.newPapeleta.invalid) {
        return;
      } else {
        let id = this.newPapeleta.controls.id_papel.value;
        console.log(this.newPapeleta.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._papeleta.AgregarPapeleta(this.newPapeleta.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE Papeleta',res.data);
            this.CargarPapeleta();
            this.resetPapeleta();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR Papeleta');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._papeleta.ModificarPapeleta(this.newPapeleta.value,this.newPapeleta.value.id_papel)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE Papeleta',res.data);
            this.CargarPapeleta();
            this.resetPapeleta();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR Papeleta');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarPapeleta(id){
      if(id){
        const dataPapeleta = this.papeleta.find(x => x.id_papel === id)
        if(!dataPapeleta) return;
        this._papeleta.SeleccionarPapeleta(id)
        .then(res=>{
          Object.keys(this.newPapeleta.controls).forEach(key => {
            this.newPapeleta.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE Papeleta EXITOSA',this.newPapeleta.value);
            document.getElementById("btnCrudPapeleta").click();
        });
      }
    }
    EliminarPapeleta(id){
      this._papeleta.EliminarPapeleta(id)
      .then(res => {
        console.log(res.data);
        this.CargarPapeleta();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR Papeleta',err.response.data.message);
      });
  }
  //#endregion CRUD PRINCIPAL PAPELETAS


}