import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatriculasService } from 'src/app/core/services/ACADEMICO/administrativos/matriculas.service';
import { MensualidadesService } from 'src/app/core/services/ACADEMICO/administrativos/mensualidades.service';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css']
})
export class MatriculasComponent implements OnInit {

  constructor(protected _matricula:MatriculasService,
    protected _mensualidad:MensualidadesService
    ) { }

  ngOnInit(): void {
    this.CargarMatricula()
    this.CargarMensualidad()

  }
  //#region CRUD PRINCIPAL MATRICULAS
  //CRUD V3: idPK=> id_matricula, nomService=> _matricula, nombreCRUD=> Matricula,  dataP=> matricula, isSubmitted=>isSubmitted
    matricula=[];
    isSubmitted = false;
    newMatricula =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_matricula:new FormControl(0),
      cod_matricula:new FormControl(''),
      desc_matricula:new FormControl(''),
      monto_matricula:new FormControl(''),
      fec_matricula:new FormControl(''),
      id_mensualidad:new FormControl(''),
    })
    CargarMatricula(){
      this._matricula.ObtenerMatriculas()
      .then(res => {
        console.log('Matricula CARGADO',res.data);
        this.matricula = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR Matricula',err.response.data.message);
      });
    }
    resetMatricula(){
      this.newMatricula.reset();
      this.isSubmitted =false;
    }
    AgregarModificarMatricula(){
      this.isSubmitted=true;
      if (this.newMatricula.invalid) {
        return;
      } else {
        let id = this.newMatricula.controls.id_matricula.value;
        console.log(this.newMatricula.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._matricula.AgregarMatricula(this.newMatricula.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE Matricula',res.data);
            this.CargarMatricula();
            this.resetMatricula();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR Matricula');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._matricula.ModificarMatricula(this.newMatricula.value,this.newMatricula.value.id_matricula)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE Matricula',res.data);
            this.CargarMatricula();
            this.resetMatricula();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR Matricula');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarMatricula(id){
      if(id){
        const dataMatricula = this.matricula.find(x => x.id_matricula === id)
        if(!dataMatricula) return;
        this._matricula.SeleccionarMatricula(id)
        .then(res=>{
          Object.keys(this.newMatricula.controls).forEach(key => {
            this.newMatricula.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE Matricula EXITOSA',this.newMatricula.value);
            document.getElementById("btnCrudMatricula").click();
        });
      }
    }
    EliminarMatricula(id){
      this._matricula.EliminarMatricula(id)
      .then(res => {
        console.log(res.data);
        this.CargarMatricula();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR Matricula',err.response.data.message);
      });
  }
  //#endregion  CRUD PRINCIPAL MATRICULAS

//#region MENSUALIDADES
//CRUD V3: idPK=> id_mensualidad, nomService=> _mensualidad, nombreCRUD=> Mensualidad,  dataP=> mensualidad, isSubmitted=>isSubmitted
  mensualidad=[];
  newMensualidad =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_mensualidad:new FormControl(0),
    cod_mensualidad:new FormControl(''),
    desc_mensualidad:new FormControl(''),
    monto_mensualidad:new FormControl(''),
    fec_mensualidad:new FormControl(''),
  })
  CargarMensualidad(){
    this._mensualidad.ObtenerMensualidads()
    .then(res => {
      console.log('Mensualidad CARGADO',res.data);
      this.mensualidad = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Mensualidad',err.response.data.message);
    });
  }
  resetMensualidad(){
    this.newMensualidad.reset();
    this.isSubmitted =false;
  }
  AgregarModificarMensualidad(){
    this.isSubmitted=true;
    if (this.newMensualidad.invalid) {
      return;
    } else {
      let id = this.newMensualidad.controls.id_mensualidad.value;
      console.log(this.newMensualidad.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._mensualidad.AgregarMensualidad(this.newMensualidad.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Mensualidad',res.data);
          this.CargarMensualidad();
          this.resetMensualidad();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Mensualidad');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._mensualidad.ModificarMensualidad(this.newMensualidad.value,this.newMensualidad.value.id_mensualidad)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Mensualidad',res.data);
          this.CargarMensualidad();
          this.resetMensualidad();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Mensualidad');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarMensualidad(id){
    if(id){
      const dataMensualidad = this.mensualidad.find(x => x.id_mensualidad === id)
      if(!dataMensualidad) return;
      this._mensualidad.SeleccionarMensualidad(id)
      .then(res=>{
        Object.keys(this.newMensualidad.controls).forEach(key => {
          this.newMensualidad.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Mensualidad EXITOSA',this.newMensualidad.value);
          document.getElementById("btnCrudMensualidad").click();
      });
    }
  }
  EliminarMensualidad(id){
    this._mensualidad.EliminarMensualidad(id)
    .then(res => {
      console.log(res.data);
      this.CargarMensualidad();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Mensualidad',err.response.data.message);
    });
}
//#endregion MENSUALIDADES
}
