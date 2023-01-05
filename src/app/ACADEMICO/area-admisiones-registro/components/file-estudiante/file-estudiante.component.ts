import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AsignacionEstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/asignacion-estudiantes.service';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { FileEstudianteService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/FileEstudiante.service';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';
import { NotasEvaluasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/NotasEvaluas.service';

@Component({
  selector: 'app-file-estudiante',
  templateUrl: './file-estudiante.component.html',
  styleUrls: ['./file-estudiante.component.css']
})
export class FileEstudianteComponent implements OnInit {
  nota=[];
  est=[];
  carre=[];
  AEst=[];
  mat=[];
  file_est=[];
  ruta = 'http://localhost:8000/';
  constructor(protected _est:EstudiantesService, protected _carr:CarrerasService,
    protected _AsigEst:AsignacionEstudiantesService, protected _notas:NotasEvaluasService,
    protected _mat:MateriasService, protected _filest:FileEstudianteService ) { }

  ngOnInit(): void {
    // this.CargarFileEstudiante();
    this.CargarCarrera();
    this.CargarAsignacionEstudiantes();
    this.CargarEstudiantes();
    this.CargarNotasEvaluas();
    this.CargarMateria();
    this.CargarFileEstudiante();
  }
  isSubmitted = false;
  newFileEstudiante =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_est:new FormControl(''),
    id_carre:new FormControl(''),
    id_materia:new FormControl(''),
    id_nota_eval:new FormControl(''),
    id_asig_mat_est:new FormControl(''),

  })
  CargarNotasEvaluas(){
    this._notas.ObtenerNotasEvaluas()
    .then(res => {
      console.log(res.data);
      this.nota = res.data;
    }).catch(err =>  {
    console.log("err");
    });
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
  CargarFileEstudiante(){
    this._filest.ObtenerFileEstudiante()
    .then(res => {
      console.log(res.data);
      this.file_est = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  resetFileEstudiante(){
    this.newFileEstudiante.reset();
    this.isSubmitted =false;
  }
//   AgregarModificarFileEstudiante(){
//     this.isSubmitted=true;
//     if (this.newFileEstudiante.invalid) {
//       return;
//     } else {
//       let id = this.newFileEstudiante.controls.id_est.value;
//       console.log(this.newFileEstudiante.value)
//       if (!id) { //PREGUNTAMOS: SI NO TIENE id?
//         this._est.AgregarFileEstudiante(this.newFileEstudiante.value)
//         .then(res=>{
//           console.log('SE AÑADIO CORRECTAMENTE',res.data);
//           this.CargarFileEstudiante();
//           this.resetFileEstudiante();
//         })
//         .catch(error=>{
//           console.log('ERROR AL AÑADIR FileEstudiante');
//           console.log(error.response.data.message);
//         })
//       } else {
//         //SI TIENE ID POR LO TANTO MODIFICAR
//         this._est.ModificarFileEstudiante(this.newFileEstudiante.value,this.newFileEstudiante.value.id_est)
//         .then(res=>{
//           console.log('SE MODIFICO CORRECTAMENTE',res.data);
//           this.CargarFileEstudiante();
//           this.resetFileEstudiante();
//         })
//         .catch(error=>{
//           console.log('ERROR AL AÑADIR');
//           console.log(error.response.data.message);
//         })
//       }
//     }
//   }
//   SeleccionarFileEstudiante(id){
//     if(id){
//       const dataFileEstudiante = this.file_est.find(x => x.id_est === id)
//       if(!dataFileEstudiante) return;
//       this._est.SeleccionarFileEstudiante(id)
//       .then(res=>{
//         Object.keys(this.newFileEstudiante.controls).forEach(key => {
//           this.newFileEstudiante.controls[key].setValue(res.data[key]);
//         });
//         console.log('SELECCION EXITOSA',this.newFileEstudiante.value);
//           document.getElementById("btnCrudFileEstudiante").click();
//       });
//     }
//   }
//   EliminarFileEstudiante(id){
//     this._est.EliminarFileEstudiante(id)
//     .then(res => {
//       console.log(res.data);
//       this.CargarFileEstudiante();
//     }).catch(err =>  {
//     console.log("err",err);
//     });
// }
}
