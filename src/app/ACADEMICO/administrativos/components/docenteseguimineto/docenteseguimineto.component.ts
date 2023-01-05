// import { Component, OnInit } from '@angular/core';
import { Component,ElementRef,OnInit,ViewChild} from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { DocentesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/docentes.service';
import { NotasEvaluasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/NotasEvaluas.service';
import { docenteseguiminetoService } from 'src/app/core/services/ACADEMICO/administrativos/docenteseguimineto.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';
import { AsignacionEstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/asignacion-estudiantes.service';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { docenteseguimineto2Service } from 'src/app/core/services/ACADEMICO/administrativos/docenteseguimineto2.service';


@Component({
  selector: 'app-docenteseguimineto',
  templateUrl: './docenteseguimineto.component.html',
  styleUrls: ['./docenteseguimineto.component.css']
})
export class DocenteseguiminetoComponent implements OnInit {
    ruta = 'http://localhost:8000/';
    Mensaje;
    doc = [];
   
    constructor(protected _doc: DocentesService, protected _carr:CarrerasService,protected _AsigEst: AsignacionEstudiantesService,protected _est:EstudiantesService, protected _mat:MateriasService ,protected _notas:NotasEvaluasService, protected _doc_segui:docenteseguiminetoService, protected _doc_segui2:docenteseguimineto2Service) {}

    ngOnInit(): void {
      let rootVar = window['rutacion'];
      this.ruta = rootVar;
      this.CargarDocentes();
      this.CargarNotasEvaluas();
      this.Cargardocenteseguimineto();
      this.Cargardocenteseguimineto2();
      this.Cargardocenteseguimineto3();
    }

  CargarDocentes() {
    this._doc.ObtenerDocentes()
      .then(res => {
        console.log(res.data);
        this.doc = res.data;
      }).catch(err => {
        console.log("err");
      });
  }
  
 //CRUD V3: idPK=> id_doc_segui, nomService=> _doc_segui, nombreCRUD=> docenteseguimineto,  dataP=> seguir, isSubmitted=>isSubmitted
   seguir=[];
   seguir2=[];
   seguir3=[];
   isSubmitted = false;
   newdocenteseguimineto =new FormGroup({
     // attr:new FormControl('',[Validators.required])
     id_doc_segui:new FormControl(0),
     id_doc:new FormControl(''),
     id_nota_eval:new FormControl(''),
     nota_1p_se:new FormControl(''),
     nota_2p_se:new FormControl(''),
     nota_ex_se:new FormControl(''),
     nota_2t_se:new FormControl(''),
     nota_fi_se:new FormControl(''),
     obs_se:new FormControl(''),
   })
   Cargardocenteseguimineto(){
     this._doc_segui.Obtenerdocenteseguiminetos()
     .then(res => {
       console.log('docenteseguimineto CARGADO',res.data);
       this.seguir = res.data;
     }).catch(err =>  {
     console.log('ERROR AL CARGAR docenteseguimineto',err.response.data.response);
     });
   }
   Cargardocenteseguimineto2(){
    this._doc_segui.Obtenerlistaindex()
    .then(res => {
      console.log('docenteseguimineto CARGADO',res.data);
      this.seguir2 = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR docenteseguimineto',err.response.data.response);
    });
  }
  Cargardocenteseguimineto3(){
    this._doc_segui.Obtenernotaindex()
    .then(res => {
      console.log('docenteseguimineto CARGADO',res.data);
      this.seguir3 = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR docenteseguimineto',err.response.data.response);
    });
  }
   
   resetdocenteseguimineto(){
     this.newdocenteseguimineto.reset();
     this.isSubmitted =false;
   }
   AgregarModificardocenteseguimineto(){
     this.isSubmitted=true;
     if (this.newdocenteseguimineto.invalid) {
       return;
     } else {
       let id = this.newdocenteseguimineto.controls.id_doc_segui.value;
       console.log(this.newdocenteseguimineto.value)
       if (!id) { //PREGUNTAMOS: SI NO TIENE id?
         this._doc_segui.Agregardocenteseguimineto(this.newdocenteseguimineto.value)
         .then(res=>{
           console.log('SE AÑADIO CORRECTAMENTE docenteseguimineto',res.data);
           this.Cargardocenteseguimineto();
           this.resetdocenteseguimineto();
         })
         .catch(error=>{
           console.log('ERROR AL AÑADIR docenteseguimineto');
           console.log(error.response.data.response);
         })
       } else {
         //SI TIENE ID POR LO TANTO MODIFICAR
         this._doc_segui.Modificardocenteseguimineto(this.newdocenteseguimineto.value,this.newdocenteseguimineto.value.id_doc_segui)
         .then(res=>{
           console.log('SE MODIFICO CORRECTAMENTE docenteseguimineto',res.data);
           this.Cargardocenteseguimineto();
           this.resetdocenteseguimineto();
         })
         .catch(error=>{
           console.log('ERROR AL MODIFICAR docenteseguimineto');
           console.log(error.response.data.response);
         })
       }
     }
   }
   Seleccionardocenteseguimineto(id){
     if(id){
       const datadocenteseguimineto = this.seguir.find(x => x.id_doc_segui === id)
       if(!datadocenteseguimineto) return;
       this._doc_segui.Seleccionardocenteseguimineto(id)
       .then(res=>{
         Object.keys(this.newdocenteseguimineto.controls).forEach(key => {
           this.newdocenteseguimineto.controls[key].setValue(res.data[key]);
         });
         console.log('SELECCION DE docenteseguimineto EXITOSA',this.newdocenteseguimineto.value);
           document.getElementById("btnCruddocenteseguimineto").click();
       });
     }
   }
   Eliminardocenteseguimineto(id){
     this._doc_segui.Eliminardocenteseguimineto(id)
     .then(res => {
       console.log(res.data);
       this.Cargardocenteseguimineto();
     }).catch(err =>  {
     console.log('ERROR AL ELIMINAR docenteseguimineto',err.response.data.response);
     });
 } 
//
//CRUD V3: idPK=> id_nota_eval, nomService=> NotasEvaluas, nombreCRUD=> NotasEvaluas,  dataP=> nota, isSubmitted=>isSubmitted
nota=[];
est=[];
carre=[];
AEst=[];
mat=[];
// isSubmitted = false;
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


//
}
