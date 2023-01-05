import { environment } from 'src/environments/environment';
import { EmpresasService } from './../../../../core/services/ACADEMICO/administrativos/empresas.service';
import { Component,  ElementRef,  OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  @ViewChild('FOTO_IMG_ADD') FOTO_IMG_ADD: ElementRef;
  @ViewChild('FOTO_IMG_MOD') FOTO_IMG_MOD: ElementRef;
  ruta=environment.service
  constructor( protected _empresa:EmpresasService) { }

  ngOnInit(): void {
    this.CargarEmpresa();
  }
  // INTRODUCIR nombre CRUD,Id y nombre dataPrincipal(Empresa,id_empresa,empresa)
    empresa =[ ];
    EmpresaSeleccionado = {
      //ejemplo... id_empresa:'',
      id_empresa:'',
      nombre_emp:'',
      nit_emp:'',
      tel_emp:'',
      cel_emp:'',
      email_emp:'',
      img_logo_emp:'',
    };

    newEmpresa= new FormGroup({
      // ejemplo: id_empresa:new FormControl(''),
      // id_empresa:new FormControl(''),
      nombre_emp:new FormControl(''),
      nit_emp:new FormControl(''),
      tel_emp:new FormControl(''),
      cel_emp:new FormControl(''),
      email_emp:new FormControl(''),
      img_logo_emp:new FormControl(''),
    });

    SeleccionarEmpresa(id,Modo){
      this._empresa.SeleccionarEmpresa(id)
      .then(res => {
        var a = res.data;
        this.EmpresaSeleccionado = a;
        console.log('INFO Empresa SELECCIONADO',this.EmpresaSeleccionado);
        switch (Modo) {
          case 'Editar':
            document.getElementById("btnOpenModalModEmpresa").click();
            break;
          case 'Mostrar':
            document.getElementById("btnOpenModalMosEmpresa").click();
            break;
          default:
            console.log('NO SE SELECCIONO NINGUN MODO');
            break;
        }
      }).catch(error =>  {
      console.log('ERROR AL SELECCIONAR Empresa',error.response.data.message);
      });
    }
    CargarEmpresa(){
      this._empresa.ObtenerEmpresa()
      .then(res => {
        console.log('SE CARGO Empresa',res.data);
        this.empresa = res.data;
      }).catch(error =>  {
      console.log('ERROR AL CARGAR Empresa',error.response.data.message);
      });
    }
    onFileChangeFoto(event){
      if(event.target.files.length>0)
      {
        const file = event.target.files[0];
        this.newEmpresa.patchValue({
          img_logo_emp: file
        })
        console.log(file)
      }
    }
    VerificarTamanioFoto(obj){
        var uploadFile = obj.files[0];
        if (!window.FileReader) {
            alert('El navegador no soporta la lectura de archivos');
            return;
        }

        if (!(/\.(jpg|png|jpeg)$/i).test(uploadFile.name)) {
            //CUANDO NO RESPETA EL FORMATO REQUERIDO
            // this.MostrarMensaje('success','FORMATO INVALIDO!.');
            alert('FORMATO INVALIDO!.');
            this.FOTO_IMG_ADD.nativeElement.value = "";
            this.FOTO_IMG_MOD.nativeElement.value = "";
        }
        else {
          if (uploadFile.size > 100000)//1500000 == 1.5MB //100000 = 100KB
          {
            // this.MostrarMensaje('success','¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
            alert('¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
            this.FOTO_IMG_ADD.nativeElement.value = "";
            this.FOTO_IMG_MOD.nativeElement.value = "";
          }
          else {
            //EL ARCHIVO CUMPLE CON TODOS LOS REQUISITOS
          }
        }
      }

  AgregarEmpresa(){
    const formData = new FormData();
    formData.append('nombre_emp',this.newEmpresa.value.nombre_emp),
    formData.append('nit_emp',this.newEmpresa.value.nit_emp),
    formData.append('tel_emp',this.newEmpresa.value.tel_emp),
    formData.append('cel_emp',this.newEmpresa.value.cel_emp),
    formData.append('email_emp',this.newEmpresa.value.email_emp),
    formData.append('img_logo_emp',this.newEmpresa.value.img_logo_emp),

      // console.log("DATOS A AGREGAR",data)
      // this._empresa.AgregarEmpresa(this.newEmpresa.value)
      this._empresa.AgregarEmpresa(formData)
      .then((res) => {
        console.log('SE AGREGO CORRECTAMENTE Empresa', res.data);
        this.CargarEmpresa();
        this.LimpiarEmpresa();
      })
      .catch(error=>{
        console.log('ERROR AL AÑADIR Empresa',error);
      });
    }
    ModificarEmpresa(Empresa){
      console.log('DATO A ACTUALIZAR',Empresa)
      const formData = new FormData();
      formData.append('id_empresa',Empresa.id_empresa),
      formData.append('nombre_emp',Empresa.nombre_emp),
      formData.append('nit_emp',Empresa.nit_emp),
      formData.append('tel_emp',Empresa.tel_emp),
      formData.append('cel_emp',Empresa.cel_emp),
      formData.append('email_emp',Empresa.email_emp),
      formData.append('img_logo_emp',this.newEmpresa.value.img_logo_emp),
      this._empresa.ModificarEmpresa(formData, Empresa.id_empresa)
      .then((res) => {
        console.log('SE MODIFICO CORRECTAMENTE Empresa',res.data);
        this.CargarEmpresa();
        this.LimpiarEmpresa();
      })
      .catch(error=>{
        console.log('HAY ERROR AL MODIFICAR Empresa',error.response.data.message);
        this.CargarEmpresa();
      });
    }
    EliminarEmpresa(id){
      this._empresa.EliminarEmpresa(id)
      .then(res => {
        console.log('SE ELIMINO CORRECTAMENTE Empresa',res.data);
        this.CargarEmpresa();
      }).catch(error =>  {
      console.log('ERROR AL ELIMINAR Empresa',error.response.data.message);
      });
    }

    LimpiarEmpresa()
    {

    this.EmpresaSeleccionado = {
      // ejemplo: id_empresa:'',
      id_empresa:'',
      nombre_emp:'',
      nit_emp:'',
      tel_emp:'',
      cel_emp:'',
      email_emp:'',
      img_logo_emp:'',

    };
    this.newEmpresa.patchValue({
      // ejemplo: id_empresa:'',
      id_empresa:'',
      nombre_emp:'',
      nit_emp:'',
      tel_emp:'',
      cel_emp:'',
      email_emp:'',
      img_logo_emp:'',
    })
    this.FOTO_IMG_ADD.nativeElement.value = '';
    this.FOTO_IMG_MOD.nativeElement.value = '';
   }
}
