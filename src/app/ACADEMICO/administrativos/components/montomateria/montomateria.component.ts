import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MontomateriaService } from 'src/app/core/services/ACADEMICO/administrativos/Montomateria.service';

@Component({
  selector: 'app-montomateria',
  templateUrl: './montomateria.component.html',
  styleUrls: ['./montomateria.component.css']
})
export class MontomateriaComponent implements OnInit {

  constructor(protected  _monto: MontomateriaService,) { }

  ruta = 'http://localhost:8000/';
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    //this.CargarMontomateria();  
    //this.CargarOTROMontomateria();    
  }
//CRUD V3: idPK=> id_monto_materia, nomService=> _monto, nombreCRUD=> Montomateria,  dataP=> monto, isSubmitted=>isSubmitted
  monto=[];
  isSubmitted = false;
  newMontomateria =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_monto_materia:new FormControl(0),
    sigla_monto:new FormControl(''),
    descrip_monto:new FormControl(''),
    monto_mat:new FormControl(''),
    vigente_monto_mat:new FormControl(''),
    nro_pag_monto_mat:new FormControl(''),
    tipo_monto_mat:new FormControl(''),
  })
  CargarMontomateria(){
    this._monto.ObtenerMontomateria()
    .then(res => {
      console.log('Montomateria CARGADO',res.data);
      this.monto = res.data;
    }).catch(err =>  {
    console.log('ERROR AL CARGAR Montomateria',err.response.data.message);
    });
  }
  resetMontomateria(){
    this.newMontomateria.reset();
    this.isSubmitted =false;
  }
  AgregarModificarMontomateria(){
    this.isSubmitted=true;
    if (this.newMontomateria.invalid) {
      return;
    } else {
      let id = this.newMontomateria.controls.id_monto_materia.value;
      console.log(this.newMontomateria.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._monto.AgregarMontomateria(this.newMontomateria.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE Montomateria',res.data);
          this.CargarMontomateria();
          this.resetMontomateria();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Montomateria');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._monto.ModificarMontomateria(this.newMontomateria.value,this.newMontomateria.value.id_monto_materia)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE Montomateria',res.data);
          this.CargarMontomateria();
          this.resetMontomateria();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR Montomateria');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarMontomateria(id){
    if(id){
      const dataMontomateria = this.monto.find(x => x.id_monto_materia === id)
      if(!dataMontomateria) return;
      this._monto.SeleccionarMontomateria(id)
      .then(res=>{
        Object.keys(this.newMontomateria.controls).forEach(key => {
          this.newMontomateria.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION DE Montomateria EXITOSA',this.newMontomateria.value);
          document.getElementById("btnCrudMontomateria").click();
      });
    }
  }
  EliminarMontomateria(id){
    this._monto.EliminarMontomateria(id)
    .then(res => {
      console.log(res.data);
      this.CargarMontomateria();
    }).catch(err =>  {
    console.log('ERROR AL ELIMINAR Montomateria',err.response.data.message);
    });
}
}
