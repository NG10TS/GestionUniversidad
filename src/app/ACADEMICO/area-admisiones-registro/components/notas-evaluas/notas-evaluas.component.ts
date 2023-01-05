import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { AsignacionEstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/asignacion-estudiantes.service';
import { NotasEvaluasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/NotasEvaluas.service';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';

@Component({
  selector: 'app-notas-evaluas',
  templateUrl: './notas-evaluas.component.html',
  styleUrls: ['./notas-evaluas.component.css']
})
export class NotasEvaluasComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  ShowSigla=false;
   constructor(protected _est:EstudiantesService, protected _carr:CarrerasService,
    protected _AsigEst:AsignacionEstudiantesService, protected _notas:NotasEvaluasService,
    protected _mat:MateriasService
 ) { }

  ngOnInit(): void {
    // let rootVar = window['rutacion'];
    // this.ruta = rootVar;
    this.CargarCarrera();
    this.CargarAsignacionEstudiantes();
    this.CargarEstudiantes();
    this.CargarNotasEvaluas();
    this.CargarMateria();
  }
//CRUD V3: idPK=> id_nota_eval, nomService=> NotasEvaluas, nombreCRUD=> NotasEvaluas,  dataP=> nota, isSubmitted=>isSubmitted
  nota=[];
  est=[];
  carre=[];
  AEst=[];
  mat=[];
  isSubmitted = false;
  newNotasEvaluas =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_nota_eval:new FormControl(0),
    id_est:new FormControl(''),
    id_materia:new FormControl(''),
    id_carre:new FormControl(''),
    id_asig_mat_est:new FormControl(''),
    eval_p1:new FormControl(''),
    eval_p2:new FormControl(''),
    eval_fin:new FormControl(''),
    eval_2t:new FormControl(''),
    nota_final:new FormControl(''),
    nota_literal:new FormControl(''),
    obs_nota_eval:new FormControl(''),
  })
  CargarNotasEvaluas(){
    this._notas.ObtenerNotasEvaluas()
    .then(res => {
      console.log(res.data);
      this.nota = res.data;
    }).catch(err =>  {
    console.log("err",err);
    });
  }
  resetNotasEvaluas(){
    this.newNotasEvaluas.reset();
    this.isSubmitted =false;
  }
  CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log(res.data);
      this.est = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarAsignacionEstudiantes(){
    this._AsigEst.ObtenerAsignacionEstudiantes()
    .then(res => {
      console.log(res.data);
      this.AEst = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarCarrera(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log(res.data);
      this.carre = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarMateria(){
    this._mat.ObtenerMaterias()
    .then(res => {
      console.log(res.data);
      this.mat = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  // CODEst;
  // AutocompletarAsignacionEstudiante(){
  //   this._AsigEst.SeleccionarAsignacionEstudiante(this.CODEst)
  //   .then(res => {
  //     this.newAsignacionEstudiantes.patchValue({
  //       // ejemplo: :'',
  //       id_asig_mat_est:res.data.id_asig_mat_est
  //     })
  //   }).catch(err =>  {
  //   console.log("err");
  //   });
  // }
  AgregarModificarNotasEvaluas(){
    this.isSubmitted=true;
    if (this.newNotasEvaluas.invalid) {
      return;
    } else {
      let id = this.newNotasEvaluas.controls.id_nota_eval.value;
      console.log(this.newNotasEvaluas.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._notas.AgregarNotasEvaluas(this.newNotasEvaluas.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE',res.data);
          this.CargarNotasEvaluas();
          this.resetNotasEvaluas();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR NotasEvaluas');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._notas.ModificarNotasEvaluas(this.newNotasEvaluas.value,this.newNotasEvaluas.value.id_nota_eval)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE',res.data);
          this.CargarNotasEvaluas();
          this.resetNotasEvaluas();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarNotasEvaluas(id){
    if(id){
      const dataNotasEvaluas = this.nota.find(x => x.id_nota_eval === id)
      if(!dataNotasEvaluas) return;
      this._notas.SeleccionarNotasEvaluas(id)
      .then(res=>{
        Object.keys(this.newNotasEvaluas.controls).forEach(key => {
          this.newNotasEvaluas.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION EXITOSA',this.newNotasEvaluas.value);
          document.getElementById("btnCrudNotasEvaluas").click();
      });
    }
  }
  EliminarNotasEvaluas(id){
    this._notas.EliminarNotasEvaluas(id)
    .then(res => {
      console.log(res.data);
      this.CargarNotasEvaluas();
    }).catch(err =>  {
    console.log("err",err);
    });
}
}
