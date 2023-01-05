import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class materiasComponent implements OnInit {
  ruta = 'http://localhost:8000/';
  
  constructor(protected _mat:MateriasService) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarMateria();
  }
  ControlCheckedhabi_mat(event,modo)
  {
    switch (modo) {
      case 'Adicion':
        (event.target.checked)?this.newMateria.patchValue({habi_mat:'HABILITADO'}):this.newMateria.patchValue({habi_mat:'INHABILITADO'});
        break;
      case 'Modificacion':
        (event.target.checked)?this.MateriaSeleccionada.habi_mat='HABILITADO':this.MateriaSeleccionada.habi_mat='INHABILITADO';
        break;
      default:
        console.log('NO SE SELECCIONO NINGUN MODO')
        break;
    }

    // if ( event.target.checked ) {
    //   //CUANDO NO ESTA CHECKED AL HACER CLICK ESTE SE ACTIVA POR HABILITADO
    //   this.newMateria.patchValue({habi_mat:'HABILITADO'})
    // }else{
    //   //CUANDO ESTA CHECKED AL HACER CLICK ESTE SE DESACTIVA POR INHABILITADO
    //   this.newMateria.patchValue({habi_mat:'INHABILITADO'})
    // }
    //SI SE DEJA POR DEFECTO EL VALOR E CHECKED SERA NULL
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

//#region MATERIAS
  mat =[ ];

  MateriaSeleccionada = {
    id_materia:'',
    codigo_mat:'',
    nombre_mat:'',
    habi_mat:'',
  };

  newMateria= new FormGroup({
    codigo_mat:new FormControl(''),
    nombre_mat:new FormControl(''),
    habi_mat:new FormControl('INHABILITADO'),
  });
  CargarMateria(){
    this._mat.ObtenerMaterias()
    .then(res => {
      console.log(res.data);
      this.mat = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }

  AgregarMateria(){
    const formData = new FormData();
    // formData.append('id_materia',this.newmateria.value.id_materia);
    formData.append('codigo_mat',this.newMateria.value.codigo_mat);
    formData.append('nombre_mat',this.newMateria.value.nombre_mat);
    formData.append('habi_mat',this.newMateria.value.habi_mat);
    this._mat.AgregarMateria(formData)
    .then(res=>{
      this.MostrarMensaje('success','SE AÑADIO CORRECTAMENTE');
    //  console.log('SE AÑADIO CORRECTAMENTE',res.data);

      this.CargarMateria();
    })
    .catch(error=>{
      this.MostrarMensaje('success','ERROR AL AÑADIR MATERIA');
      //console.log('ERROR AL AÑADIR materia');
      console.log(error);
    })
  }

  ModificarMateria(Materia){
    let data = {
      id_materia:Materia.id_materia,
      codigo_mat:Materia.codigo_mat,
      nombre_mat:Materia.nombre_mat,
      habi_mat:Materia.habi_mat,
    };
    this._mat.ModificarMateria(data,Materia.id_materia)
    .then(res=>{
      this.MostrarMensaje('success','SE MODIFICO CORRECTAMENTE');
     // console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarMateria();
    })
    .catch(error=>{
      //console.log('HAY ERROR AL MODIFICAR');
      this.MostrarMensaje('error','HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarMateria();
    })
  }
  EliminarMateria(matID){
    this._mat.EliminarMateria(matID)
    .then(res => {
      console.log(res.data);
      this.CargarMateria();
    }).catch(err =>  {
    console.log("err");
    });
  }

  LimpiarMaterias()
  {
  this.MateriaSeleccionada = {
    id_materia:'',
    codigo_mat:'',
    nombre_mat:'',
    habi_mat:''


  };
  this.newMateria.patchValue({
    id_materia:'',
    codigo_mat:'',
    nombre_mat:'',
    habi_mat:'INHABILITADO',
  })

 }
 //#endregion MATERIAS
}

