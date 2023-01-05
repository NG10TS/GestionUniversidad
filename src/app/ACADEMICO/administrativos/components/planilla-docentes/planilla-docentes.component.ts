import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EgresoadminsService } from 'src/app/core/services/ACADEMICO/administrativos/egresoadmins.service';
import { PlanillaDocsService } from 'src/app/core/services/ACADEMICO/administrativos/planilla-docs.service';
import { DocentesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/docentes.service';

@Component({
  selector: 'app-planilla-docentes',
  templateUrl: './planilla-docentes.component.html',
  styleUrls: ['./planilla-docentes.component.css']
})
export class PlanillaDocentesComponent implements OnInit {

  constructor(protected _planillaDoc: PlanillaDocsService,
    protected _docente: DocentesService, protected _egresoAdmin:EgresoadminsService
  ) { }

  ngOnInit(): void {
    this.CargarDocente()
    this.CargarEgresoAdmin()
  }
//#region carga extras
// INTRODUCIR nombre CRUD, nombre dataPrincipal(Docente,docente)
    docente=[]
  CargarDocente(){
    this._docente.ObtenerDocentes()
    .then(res => {
      console.log("Docente Cargado",res.data);
      this.docente = res.data;
    }).catch(error =>  {
    console.log('Error al Cargar Docente',error.response.data.message);
    });
  }
  egresoAdmin=[]
  CargarEgresoAdmin(){
    this._egresoAdmin.ObtenerEgresoAdmins()
      .then(res => {
        console.log("EgresoAdmin Cargado",res.data);
        this.egresoAdmin = res.data;
      }).catch(error =>  {
      console.log('Error al Cargar EgresoAdmin',error.response.data.message);
      });
    }
  

//#endregion CARGA EXTRAS

//#region   CRUD PRINCIPAL PLANILLA DOCENTES
//CRUD V3: idPK=> id_planilla_doc, nomService=> _planillaDoc, nombreCRUD=> PlanillaDoc,  dataP=> planilladoc, isSubmitted=>isSubmitted
  planillaDoc=[];
  isSubmitted = false;
  newPlanillaDoc =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_planilla_doc:new FormControl(0),
    nro_plani_doc:new FormControl(''),
    domic_plani_doc:new FormControl(''),
    id_doc:new FormControl(''),
    total_plani:new FormControl(''),
    monto_plani:new FormControl(''),
    ret_plani:new FormControl(''),
    inc_plani:new FormControl(''),
    desc_plani:new FormControl(''),
    liquido_plani:new FormControl(''),
    obs_plani:new FormControl(''),
    id_egreso_admin:new FormControl(''),
    sel_plani:new FormControl(''),

    
  })
  CargarPlanillaDoc(){
    this._planillaDoc.ObtenerPlanillaDocs()
    .then(res => {
      console.log('PlanillaDoc CARGADO',res.data);
      this.planillaDoc = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR PlanillaDoc',err.response.data.message);
    });
  }
  resetPlanillaDoc(){
    this.newPlanillaDoc.reset();
    this.isSubmitted =false;
  }
  AgregarModificarPlanillaDoc(){
    this.isSubmitted=true;
    if (this.newPlanillaDoc.invalid) {
      return;
    } else {
      let id = this.newPlanillaDoc.controls.id_planilla_doc.value;
      console.log(this.newPlanillaDoc.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._planillaDoc.AgregarPlanillaDoc(this.newPlanillaDoc.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE PlanillaDoc',res.data);
          this.CargarPlanillaDoc();
          this.resetPlanillaDoc();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR PlanillaDoc');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._planillaDoc.ModificarPlanillaDoc(this.newPlanillaDoc.value,this.newPlanillaDoc.value.id_planilla_doc)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE PlanillaDoc',res.data);
          this.CargarPlanillaDoc();
          this.resetPlanillaDoc();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR PlanillaDoc');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarPlanillaDoc(id){
    if(id){
      const dataPlanillaDoc = this.planillaDoc.find(x => x.id_planilla_doc === id)
      if(!dataPlanillaDoc) return;
      this._planillaDoc.SeleccionarPlanillaDoc(id)
      .then(res=>{
        Object.keys(this.newPlanillaDoc.controls).forEach(key => {
          this.newPlanillaDoc.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE PlanillaDoc EXITOSA',this.newPlanillaDoc.value);
          document.getElementById("btnCrudPlanillaDoc").click();
      });
    }
  }
  EliminarPlanillaDoc(id){
    this._planillaDoc.EliminarPlanillaDoc(id)
    .then(res => {
      console.log(res.data);
      this.CargarPlanillaDoc();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR PlanillaDoc',err.response.data.message);
    });
}
//#endregion CRUD PRINCIPAL  PLANILA DOCENTES
}
