import { HerramientasService } from './../../../../core/services/herramientas.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
// interface Carrera{
//   numero:number,
//   desc_sem:string,
// }
@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  ruta = 'http://localhost:8000/';
  carr =[ ];
  // carr: Carrera[]
  isSubmitted = false;

  newCarrera= new FormGroup({

    id_carre:new FormControl(0),
    nombre_carre:new FormControl(''),
    sigla_carre:new FormControl('',[Validators.required]),
    habi_carre:new FormControl(''),
    fec_carre:new FormControl('',[Validators.required]),
    imp_carre:new FormControl(''),
    res_carre:new FormControl(''),
    // resquisito_carre:new FormControl('')

  });

  NowDate:string;
  constructor(protected _carr:CarrerasService, protected _Tool:HerramientasService
    )
    { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarCarrera();
    this.NowDate = this._Tool.ObtenerFechaActual()
    console.log("LA FECHA ACTUAL ES:",this.NowDate)
  }

  CargarCarrera(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log(res.data);
      this.carr = res.data;
      res.data.forEach(async element => {
        //REALIZACION DE VERIFICACION DE VALOR CHECKED
        if (element.habi_carre == "INHABILITADO" || element.habi_carre ==null) {
          element.Chequeo="";
        } else {
          element.Chequeo="checked";
        }
      });
    }).catch(err =>  {
    console.log("err");
    });
  }
  valorChecked;
  ControlChecked(event)
  {
    if ( event.target.checked ) {
      //CUANDO NO ESTA CHECKED AL HACER CLICK ESTE SE ACTIVA POR HABILITADO
      this.valorChecked=1;
    }else{
      //CUANDO ESTA CHECKED AL HACER CLICK ESTE SE DESACTIVA POR INHABILITADO
      this.valorChecked=0;
    }
    //SI SE DEJA POR DEFECTO EL VALOR E CHECKED SERA NULL
  }
  AgregarModificarCarrera(){
    this.isSubmitted=true;
    if (this.newCarrera.invalid) {
      return;
    } else {
      let id = this.newCarrera.controls.id_carre.value;

      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        //NO TIENE ID POR LO TANTO AGREGAR
        if (this.valorChecked==null) {
          this.newCarrera.patchValue({habi_carre:'INHABILITADO'})
        } else {
          this.newCarrera.patchValue({habi_carre:this.valorChecked})
        }
        this._carr.AgregarCarrera(this.newCarrera.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE',res.data);
          this.CargarCarrera();
          this.resetCarrera();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR CARRERA');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        if (this.valorChecked==null) {
          this.newCarrera.patchValue({habi_carre:'INHABILITADO'})
        } else {
          this.newCarrera.patchValue({habi_carre:this.valorChecked})
        }
        this._carr.ModificarCarrera(this.newCarrera.value,this.newCarrera.value.id_carre)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE',res.data);
          this.CargarCarrera();
          this.resetCarrera();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR CARRERA');
          console.log(error.response.data.message);
        })
      }
    }
  }
  resetCarrera(){
    this.newCarrera.reset();
    this.isSubmitted =false;
  }
  SeleccionarCarrera(id){
    //ESTA PARTE DE CODIGO SIRVE PARA CARGAR POR ID
    if(id){
      const carreracion = this.carr.find(x => x.id_carre === id)
      if(!carreracion) return;
      this._carr.SeleccionarCarrera(id)
      .then(res=>{
        Object.keys(this.newCarrera.controls).forEach(key => {
          this.newCarrera.controls[key].setValue(res.data[key]);
        });
        console.log('CARGACION EXITOSA',res);
        console.log(this.newCarrera.value);
      });
    }
  }
  ModificarCarrera(){ //si funciona
    this.isSubmitted=true;
    if (this.newCarrera.invalid) {
      return;
    } else {
      if (this.valorChecked==null) {
        this.newCarrera.patchValue({habi_carre:'INHABILITADO'})
      } else {
        this.newCarrera.patchValue({habi_carre:this.valorChecked})
      }
      this._carr.ModificarCarrera(this.newCarrera.value,this.newCarrera.value.id_carre)
      .then(res=>{
        console.log('SE MODIFICO CORRECTAMENTE',res.data);
        this.CargarCarrera();
        this.resetCarrera();
      })
      .catch(error=>{
        console.log('ERROR AL AÑADIR CARRERA');
        console.log(error.response.data.message);
      })
    }
  }
  EliminarCarrera(carrID){
    this._carr.EliminarCarrera(carrID)
    .then(res => {
      console.log(res.data);
      this.CargarCarrera();
    }).catch(err =>  {
    console.log("err");
    });
  }


}

