import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlaninsbecaService } from 'src/app/core/services/ACADEMICO/administrativos/Planinsbeca.service';
import { BecasService } from 'src/app/core/services/ACADEMICO/bienestar-estudiantil/becas.service';
import { InscripcionService } from 'src/app/core/services/PUBLICAS/inscripcion.service';

@Component({
  selector: 'app-planinsbeca',
  templateUrl: './planinsbeca.component.html',
  styleUrls: ['./planinsbeca.component.css']
})
export class PlaninsbecaComponent implements OnInit {

    constructor(protected  _ret: PlaninsbecaService, protected _beca:BecasService, protected _ins:InscripcionService) { }

    ruta = 'http://localhost:8000/';
    ngOnInit(): void {
      let rootVar = window['rutacion'];
      this.ruta = rootVar;
      this.CargarPlaninsbeca();  
      this.CargarBeca();    
    }
  //CRUD V3: idPK=> id_ins_beca, nomService=> _ret, nombreCRUD=> Planinsbeca,  dataP=> ret, isSubmitted=>isSubmitted
    ret=[];
    beca=[];
    ins=[];
    isSubmitted = false;
    newPlaninsbeca =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_ins_beca:new FormControl(0),
      id_beca:new FormControl(''),
      id_ins:new FormControl(''),
    })
    CargarPlaninsbeca(){
      this._ret.ObtenerPlaninsbeca()
      .then(res => {
        console.log('Planinsbeca CARGADO',res.data);
        this.ret = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR Planinsbeca',err.response.data.message);
      });
    }
    CargarInscripcions(){
        this._ins.ObtenerInscripcions()
        .then(res => {
          console.log(res.data);
        //   res.data.forEach(element => {
        //     element.NomC=element.ape_p_est+' '+element.ape_m_est+' '+element.nombre_est
        //   });
          this.ins = res.data;
        }).catch(err =>  {
        console.log("err");
        });
      }
    CargarBeca(){
        this._beca.ObtenerBecas()
        .then(res => {
          console.log(res.data);
          this.beca = res.data;
        }).catch(err =>  {
        console.log("err");
        });
      }
    resetPlaninsbeca(){
      this.newPlaninsbeca.reset();
      this.isSubmitted =false;
    }
    AgregarModificarPlaninsbeca(){
      this.isSubmitted=true;
      if (this.newPlaninsbeca.invalid) {
        return;
      } else {
        let id = this.newPlaninsbeca.controls.id_ins_beca.value;
        console.log(this.newPlaninsbeca.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._ret.AgregarPlaninsbeca(this.newPlaninsbeca.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE Planinsbeca',res.data);
            this.CargarPlaninsbeca();
            this.resetPlaninsbeca();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR Planinsbeca');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._ret.ModificarPlaninsbeca(this.newPlaninsbeca.value,this.newPlaninsbeca.value.id_ins_beca)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE Planinsbeca',res.data);
            this.CargarPlaninsbeca();
            this.resetPlaninsbeca();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR Planinsbeca');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarPlaninsbeca(id){
      if(id){
        const dataPlaninsbeca = this.ret.find(x => x.id_ins_beca === id)
        if(!dataPlaninsbeca) return;
        this._ret.SeleccionarPlaninsbeca(id)
        .then(res=>{
          Object.keys(this.newPlaninsbeca.controls).forEach(key => {
            this.newPlaninsbeca.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE Planinsbeca EXITOSA',this.newPlaninsbeca.value);
            document.getElementById("btnCrudPlaninsbeca").click();
        });
      }
    }
    EliminarPlaninsbeca(id){
      this._ret.EliminarPlaninsbeca(id)
      .then(res => {
        console.log(res.data);
        this.CargarPlaninsbeca();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR Planinsbeca',err.response.data.message);
      });
  }
  }
