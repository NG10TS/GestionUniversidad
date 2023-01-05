import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interfaces-base',
  templateUrl: './interfaces-base.component.html',
  styleUrls: ['./interfaces-base.component.css']
})
export class InterfacesBaseComponent implements OnInit {

  Texto;
  ruta = 'http://localhost:8000/';
  admin =[ ];

  AdministrativoSeleccionado = {
    id:'',
    Ap_Paterno:'',
    Ap_Materno:'',
    Nombre:'',
    Sexo:'',
    FechNac:'',
    CI:'',
    Password:'',
    Tipo:'',
    Estado:''
  };


  newAdministrativo = new FormGroup({
    Ap_Paterno:new FormControl(''),
    Ap_Materno:new FormControl(''),
    Nombre:new FormControl(''),
    Sexo:new FormControl(''),
    FechNac:new FormControl(''),
    CI:new FormControl(''),
    Password:new FormControl(''),
    Tipo:new FormControl(''),
    Estado:new FormControl('')
  });
  constructor() { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    console.log(this.ruta);
    this.CargarAdministrativo();
  }
  MostrarMensaje(iconText,tittleText){
    var Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      icon: iconText, //success, info, error,warning,question
      title: tittleText
    })
  }
  AddAdministrativo(){
    const formData = new FormData();
    // formData.append('Foto',this.newAdministrativo.value.Foto);
    formData.append('Ap_Paterno',this.newAdministrativo.value.Ap_Paterno);
    formData.append('Ap_Materno',this.newAdministrativo.value.Ap_Materno);
    formData.append('Nombre',this.newAdministrativo.value.Nombre);
    formData.append('Sexo',this.newAdministrativo.value.Sexo);
    formData.append('FechNac',this.newAdministrativo.value.FechNac);
    formData.append('CI',this.newAdministrativo.value.CI);
    formData.append('Password',this.newAdministrativo.value.Password);
    formData.append('Tipo',this.newAdministrativo.value.Tipo);
    formData.append('Estado','INACTIVO');
    axios({
      method:'post',
      url:this.ruta+'api/Administrativo',
      data:formData,
      headers:{'Content-Type':'multipart/form-data'}
    })
    .then(res=>{
      this.MostrarMensaje('success','SE AÑADIO CORRECTAMENTE');
     // console.log('SE AÑADIO CORRECTAMENTE',res.data);
      // console.log(res.data);
      this.CargarAdministrativo();
    })
    .catch(error=>{
      this.MostrarMensaje('error','SE PRODUJO UN ERROR REVISE EL FORMATO');
      //console.log('HAY ERROR XD');
      console.log(error);
    })
  }
  ModificarAdministrativo(Administrativo)
  {
    const formData = new FormData();
    formData.append('Ap_Paterno',Administrativo.Ap_Paterno);
    formData.append('Ap_Materno',Administrativo.Ap_Materno);
    formData.append('Nombre',Administrativo.Nombre);
    formData.append('Sexo',Administrativo.Sexo);
    formData.append('FechNac',Administrativo.FechNac);
    formData.append('CI',Administrativo.CI);
    formData.append('Password',Administrativo.Password);
    formData.append('Tipo',Administrativo.Tipo);
    formData.append('Estado',Administrativo.Estado);
    axios({
      method:'post',
      url:this.ruta+'api/actualizarAdministrativo/'+Administrativo.id,
      data:formData,
      headers:{'Content-Type':'multipart/form-data'}
    })


    .then(res=>{
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE');
     // console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarAdministrativo();
    })
    .catch(error=>{
      this.MostrarMensaje('error','HAY ERROR AL MODIFICAR');
    //  console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
    })
  }
  CargarAdministrativo() {
    axios.get(this.ruta+'api/Administrativo')
    .then(res => {
      console.log(res.data);
      this.admin = res.data;
      res.data.forEach(element => {
        element.Editando=false;
      });
    }).catch(err =>  {
    console.log("err");
    });
  }
  EliminarAdministrativo(adminID){
    axios.delete(this.ruta+'api/Administrativo/'+adminID)
    .then(res => {
      console.log(res.data);
      this.CargarAdministrativo();
    }).catch(err =>  {
    console.log("err");
    });
  }
}
