import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdministrativosService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/administrativos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrativos',
  templateUrl: './administrativos.component.html',
  styleUrls: ['./administrativos.component.css']
})
export class AdministrativosComponent implements OnInit {
  ruta = 'http://localhost:8000/';
  admin=[];
  //Para Validaciones
  @ViewChild('InputFoto') InputFoto: ElementRef;
  Mensaje;

  newAdministrativo = new FormGroup({
    ape_p_admin:new FormControl(''),
    ape_m_admin:new FormControl(''),
    nombre_admin:new FormControl(''),
    ci_admin:new FormControl(''),
    sexo_admin:new FormControl(''),
    dir_admin:new FormControl(''),
    tel_admin:new FormControl(''),
    cel_admin:new FormControl(''),
    email_admin:new FormControl(''),
    obs_admin:new FormControl(''),
    vigente_admin:new FormControl(''),
    fec_ingreso_admin:new FormControl(''),
    fec_nac_admin:new FormControl(''),
    nro_asegurado_admin:new FormControl(''),
    cargo_admin:new FormControl(''),
    foto_admin:new FormControl(''),
  });
  AdministrativoSeleccionado = {
    id_administrativo:'',
      ape_p_admin:'',
      ape_m_admin:'',
      nombre_admin:'',
      ci_admin:'',
      sexo_admin:'',
      dir_admin:'',
      tel_admin:'',
      cel_admin:'',
      email_admin:'',
      obs_admin:'',
      vigente_admin:'',
      fec_ingreso_admin:'',
      fec_nac_admin:'',
      nro_asegurado_admin:'',
      cargo_admin:'',
      foto_admin:'',
  }
  constructor(protected _admin:AdministrativosService) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarAdministrativos();
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
  onFileChangeFoto(event){
    if(event.target.files.length>0)
    {
      const file = event.target.files[0];

      this.newAdministrativo.patchValue({
        foto_admin: file
      })
      console.log(file)
    }
  }
  @ViewChild('FOTO_IMG_MOD') FOTO_IMG_MOD: ElementRef;
  @ViewChild('FOTO_IMG_ADD') FOTO_IMG_ADD: ElementRef;
  LimpiarAdministrativos(){
    this.AdministrativoSeleccionado = {
      id_administrativo:'',
      ape_p_admin:'',
      ape_m_admin:'',
      nombre_admin:'',
      ci_admin:'',
      sexo_admin:'',
      dir_admin:'',
      tel_admin:'',
      cel_admin:'',
      email_admin:'',
      obs_admin:'',
      vigente_admin:'',
      fec_ingreso_admin:'',
      fec_nac_admin:'',
      nro_asegurado_admin:'',
      cargo_admin:'',
      foto_admin:'',
    };
    this.newAdministrativo.patchValue({
      id_administrativo:'',
      ape_p_admin:'',
      ape_m_admin:'',
      nombre_admin:'',
      ci_admin:'',
      sexo_admin:'',
      dir_admin:'',
      tel_admin:'',
      cel_admin:'',
      email_admin:'',
      obs_admin:'',
      vigente_admin:'',
      fec_ingreso_admin:'',
      fec_nac_admin:'',
      nro_asegurado_admin:'',
      cargo_admin:'',
      foto_admin:'',
    })
    this.FOTO_IMG_ADD.nativeElement.value = '';
    this.FOTO_IMG_MOD.nativeElement.value = '';
   }
  LimpiarInputFotoMod(){
    this.newAdministrativo.patchValue({
      foto_admin: ''
    })
    this.FOTO_IMG_MOD.nativeElement.value = '';
   }
  CargarAdministrativos(){
    this._admin.ObtenerAdministrativos()
    .then(res => {
      console.log(res.data);
      this.admin = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarAdministrativo(){
      const formData = new FormData();
      formData.append('ape_p_admin',this.newAdministrativo.value.ape_p_admin);
      formData.append('ape_m_admin',this.newAdministrativo.value.ape_m_admin);
      formData.append('nombre_admin',this.newAdministrativo.value.nombre_admin);
      formData.append('ci_admin',this.newAdministrativo.value.ci_admin);
      formData.append('sexo_admin',this.newAdministrativo.value.sexo_admin);
      formData.append('dir_admin',this.newAdministrativo.value.dir_admin);
      formData.append('tel_admin',this.newAdministrativo.value.tel_admin);
      formData.append('cel_admin',this.newAdministrativo.value.cel_admin);
      formData.append('email_admin',this.newAdministrativo.value.email_admin);
      formData.append('obs_admin',this.newAdministrativo.value.obs_admin);
      formData.append('vigente_admin',this.newAdministrativo.value.vigente_admin);
      formData.append('fec_ingreso_admin',this.newAdministrativo.value.fec_ingreso_admin);
      formData.append('fec_nac_admin',this.newAdministrativo.value.fec_nac_admin);
      formData.append('nro_asegurado_admin',this.newAdministrativo.value.nro_asegurado_admin);
      formData.append('cargo_admin',this.newAdministrativo.value.cargo_admin);
      formData.append('foto_admin',this.newAdministrativo.value.foto_admin);
      this._admin.AgregarAdministrativo(formData)
      .then(res=>{
        //console.log('SE AÑADIO CORRECTAMENTE',res.data);
        this.CargarAdministrativos();
        this.MostrarMensaje('success','SE AÑADIO ADMINISTRATIVO');
      })
      .catch(error=>{
        //console.log('ERROR AL AÑADIR DOCENTE');
        console.log(error);
        this.MostrarMensaje('error','ERROR AL AÑADIR DOCENTE');
      })


  }

  VerificarFormatoFoto(obj){
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
    }

    if (!(/\.(jpg|png|jpeg)$/i).test(uploadFile.name)) {
        // alert('El archivo a adjuntar no es una imagen');
        //CUANDO NO RESPETA EL FORMATO REQUERIDO
        this.MostrarMensaje('error','FORMATO INVALIDO!. POR FAVOR SELECCIONAR SOLO IMAGENES');
        // this.Mensaje = "¡FORMATO INVALIDO!. POR FAVOR SELECCIONAR SOLO IMAGENES";
        // sessionStorage.setItem('Mensaje',this.Mensaje);
        // document.getElementById("BotonError").click(); //alternativa de hacer click()
        this.FOTO_IMG_MOD.nativeElement.value = "";
        this.FOTO_IMG_ADD.nativeElement.value = "";
    }
    else {
      if (uploadFile.size > 1500000)
      {
        this.MostrarMensaje('error','¡TAMAÑO EXCEDIDO!. EL TAMAÑO DE LA FOTO NO PUEDE EXCEDER LOS 1.5MB');
        // this.Mensaje = "¡TAMAÑO EXCEDIDO!. EL TAMAÑO DE LA FOTO NO PUEDE EXCEDER LOS 1.5MB";
        // sessionStorage.setItem('Mensaje',this.Mensaje);
        // document.getElementById("BotonWarning").click(); //alternativa de hacer click()
        this.FOTO_IMG_MOD.nativeElement.value = "";
        this.FOTO_IMG_ADD.nativeElement.value = "";
      }
      else {
        //LA IMAGEN CUMPLE CON TODOS LOS REQUISITOS
            this.MostrarMensaje('success','CAMBIO DE FOTO EXITOSA');
      }
    }
  }
  SeleccionarAdministrativo(id,Modo){
    this._admin.SeleccionarAdministrativo(id)
    .then(res => {
      var a = res.data;
      this.AdministrativoSeleccionado = a;
      console.log('INFO ADMIN SELECCIONADO',this.AdministrativoSeleccionado);
      switch (Modo) {
        case 'Editar':
          document.getElementById("btnOpenModalMod").click();
          break;
        case 'Mostrar':
          document.getElementById("btnOpenModalMos").click();
          break;
        default:
          break;
      }
    }).catch(err =>  {
    console.log("err");
    });

  }
  ModificarAdministrativo(Administrativos){
    console.log('DATO A ACTUALIZAR',Administrativos)
    const formData = new FormData();
    formData.append('id_administrativo',Administrativos.id_administrativo);
    formData.append('ape_p_admin',Administrativos.ape_p_admin);
    formData.append('ape_m_admin',Administrativos.ape_m_admin);
    formData.append('nombre_admin',Administrativos.nombre_admin);
    formData.append('ci_admin',Administrativos.ci_admin);
    formData.append('sexo_admin',Administrativos.sexo_admin);
    formData.append('dir_admin',Administrativos.dir_admin);
    formData.append('tel_admin',Administrativos.tel_admin);
    formData.append('cel_admin',Administrativos.cel_admin);
    formData.append('email_admin',Administrativos.email_admin);
    formData.append('obs_admin',Administrativos.obs_admin);
    formData.append('vigente_admin',Administrativos.vigente_admin);
    formData.append('fec_ingreso_admin',Administrativos.fec_ingreso_admin);
    formData.append('fec_nac_admin',Administrativos.fec_nac_admin);
    formData.append('nro_asegurado_admin',Administrativos.nro_asegurado_admin);
    formData.append('cargo_admin',Administrativos.cargo_admin);
    formData.append('foto_admin',this.newAdministrativo.value.foto_admin);
    this._admin.ModificarAdministrativo(formData,Administrativos.id_administrativo)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.CargarAdministrativos();
      this.MostrarMensaje('success','MODIFICACION EXITOSA');

    })
    .catch(error=>{
      //console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarAdministrativos();
    });
  }
  EliminarAdministrativo(id){
    Swal.fire({
      title: 'SEGURO QUE QUIERE ELIMINAR ADMINISTRATIVO?',
      color: '#FFFFFF',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonColor: "#DD6B55",
      cancelButtonText:'CANCELAR',
      confirmButtonText: 'ELIMINAR',
      confirmButtonColor: "#DD6B55",
      background: '#D62600',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._admin.EliminarAdministrativo(id)
        .then(res => {
          console.log(res.data);
          this.CargarAdministrativos();
          this.MostrarMensaje('success','ELIMINACION EXITOSA');
        }).catch(err =>  {
        console.log("err");
        this.MostrarMensaje('error','NO SE PUDO ELIMINAR');
        });

      //  Swal.fire('Saved!', '', 'success')
      }
    })



    // Swal.fire({
    //   title: 'SEGURO QUE QUIERE ELIMINAR ADMINISTRATIVO?',
    //   color: '#FFFFFF',
    //   showDenyButton: false,
    //   showCancelButton: true,
    //   cancelButtonColor: "#DD6B55",
    //   cancelButtonText:'CANCELAR',
    //   confirmButtonText: 'ELIMINAR',
    //   confirmButtonColor: "#DD6B55",
    //   background: '#D62600',

    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     //code...
    //   }
    // })
  }
}
