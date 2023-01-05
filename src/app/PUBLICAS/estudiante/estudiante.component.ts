import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  ruta = 'http://localhost:8000/';

  //Para Validaciones
  @ViewChild('InputFoto') InputFoto: ElementRef;
  Mensaje;

  newEstudiante = new FormGroup({
    cod_est:new FormControl(''),//
    nombre_est:new FormControl(''),
    ape_p_est:new FormControl(''),
    ape_m_est:new FormControl(''),
    ci_est:new FormControl(''),
    expedido:new FormControl(''),//
    fec_nac_est:new FormControl(''),
    lug_nac_est:new FormControl(''),//
    sexo_est:new FormControl(''),
    dir_est:new FormControl(''),
    tel_dom_est:new FormControl(''),
    cel_est:new FormControl(''),
    email_est:new FormControl(''),
    tur_des_est:new FormControl(''),
    numsol_est:new FormControl(''),
    insc_est:new FormControl(''),
    dom_est:new FormControl(''),
    trab_dir_est:new FormControl(''),
    trab_fono_est:new FormControl(''),
    trab_nombre_est:new FormControl(''),
    cole_est:new FormControl(''),
    dato_bachi_est:new FormControl(''),
    tipo_cole_est:new FormControl(''),
    pais_cod_est:new FormControl(''),
    fec_regis_est:new FormControl(''),
    fec_emitb_est:new FormControl(''),
    sede_emit_est:new FormControl(''),
    fec_tranf_est:new FormControl(''),
    padre_del_est:new FormControl(''),
    madre_del_est:new FormControl(''),
    nombre_trab_padre_est:new FormControl(''),
    tel_trab_padre_est:new FormControl(''),
    dir_trab_padre_est:new FormControl(''),
    fact_doc_tipo_est:new FormControl(''),
    fact_doc_numero_est:new FormControl(''),
    fact_nombre_est:new FormControl(''),
    observaciones:new FormControl(''),
    foto_est:new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
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
      this.newEstudiante.patchValue({
        foto_est: file
      })
      console.log(file)
    }
  }
  AgregarEstudiante(){
    var datasession= sessionStorage.getItem('dataCompleted');
    console.log('DATA SESSION VALOR',datasession);
    // if (sessionStorage.getItem('dataCompleted')=='si') {
      const formData = new FormData();
      formData.append('cod_est',this.newEstudiante.value.cod_est);//
      formData.append('nombre_est',this.newEstudiante.value.nombre_est);
      formData.append('ape_p_est',this.newEstudiante.value.ape_p_est);
      formData.append('ape_m_est',this.newEstudiante.value.ape_m_est);
      formData.append('ci_est',this.newEstudiante.value.ci_est);
      formData.append('expedido',this.newEstudiante.value.expedido);//
      formData.append('fec_nac_est',this.newEstudiante.value.fec_nac_est);
      formData.append('lug_nac_est',this.newEstudiante.value.lug_nac_est);//
      formData.append('sexo_est',this.newEstudiante.value.sexo_est);
      formData.append('dir_est',this.newEstudiante.value.dir_est);
      formData.append('tel_dom_est',this.newEstudiante.value.tel_dom_est);
      formData.append('cel_est',this.newEstudiante.value.cel_est);
      formData.append('email_est',this.newEstudiante.value.email_est);

      formData.append('tur_des_est',this.newEstudiante.value.tur_des_est);
      formData.append('numsol_est',this.newEstudiante.value.numsol_est);
      formData.append('insc_est',this.newEstudiante.value.insc_est);
      formData.append('dom_est',this.newEstudiante.value.dom_est);
      formData.append('trab_dir_est',this.newEstudiante.value.trab_dir_est);
      formData.append('trab_fono_est',this.newEstudiante.value.trab_fono_est);
      formData.append('trab_nombre_est',this.newEstudiante.value.trab_nombre_est);

      formData.append('cole_est',this.newEstudiante.value.cole_est);
      formData.append('dato_bachi_est',this.newEstudiante.value.dato_bachi_est);
      formData.append('tipo_cole_est',this.newEstudiante.value.tipo_cole_est);
      formData.append('pais_cod_est',this.newEstudiante.value.pais_cod_est);
      formData.append('fec_regis_est',this.newEstudiante.value.fec_regis_est);
      formData.append('fec_emitb_est',this.newEstudiante.value.fec_emitb_est);
      formData.append('sede_emit_est',this.newEstudiante.value.sede_emit_est);
      formData.append('fec_tranf_est',this.newEstudiante.value.fec_tranf_est);
      formData.append('padre_del_est',this.newEstudiante.value.padre_del_est);
      formData.append('madre_del_est',this.newEstudiante.value.madre_del_est);

      formData.append('nombre_trab_padre_est',this.newEstudiante.value.nombre_trab_padre_est);
      formData.append('tel_trab_padre_est',this.newEstudiante.value.tel_trab_padre_est);
      formData.append('dir_trab_padre_est',this.newEstudiante.value.dir_trab_padre_est);
      formData.append('fact_doc_tipo_est',this.newEstudiante.value.fact_doc_tipo_est);
      formData.append('fact_doc_numero_est',this.newEstudiante.value.fact_doc_numero_est);
      formData.append('fact_nombre_est',this.newEstudiante.value.fact_nombre_est);
      formData.append('observaciones',this.newEstudiante.value.observaciones);

      formData.append('foto_est',this.newEstudiante.value.foto_est);
      // formData.append('Estado','INACTIVO');
      axios({
        method:'post',
        url:this.ruta+'api/Estudiante',
        data:formData,
        headers:{'Content-Type':'multipart/form-data'}
      })
      .then(res=>{
        this.MostrarMensaje('success','SE AÑADIO ESTUDIANTE');
      //  console.log('SE AÑADIO CORRECTAMENTE',res.data);
      })
      .catch(error=>{
      //  console.log('ERROR AL AÑADIR DOCENTE');
        this.MostrarMensaje('success','ERROR AL AÑADIR DOCENTE REVISE EL FORMATO');
        console.log(error);
      })
    // } else {
    //   //NO SE PUEDE GUARDAR PORQUE FALTA LLENAR ALGUNOS INPUTS
    //   console.log('FALTA COMPLETAR EL FORMULARIO')
    // }


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
        this.MostrarMensaje('error','¡FORMATO INVALIDO!. POR FAVOR SELECCIONAR SOLO IMAGENES');
        //this.Mensaje = "¡FORMATO INVALIDO!. POR FAVOR SELECCIONAR SOLO IMAGENES";
        document.getElementById("btnModalFormatoInvalido").click(); //alternativa de hacer click()
        this.InputFoto.nativeElement.value = "";
    }
    else {
      if (uploadFile.size > 1500000)
      {
        // alert('El peso de la imagen no puede exceder los 200kb')
        this.MostrarMensaje('error','¡TAMAÑO EXCEDIDO!. EL TAMAÑO DE LA FOTO NO PUEDE EXCEDER LOS 1.5MB');
        //this.Mensaje = "¡TAMAÑO EXCEDIDO!. EL TAMAÑO DE LA FOTO NO PUEDE EXCEDER LOS 1.5MB";
        document.getElementById("btnModalFormatoInvalido").click(); //alternativa de hacer click()
        this.InputFoto.nativeElement.value = "";
      }
      else {
        //LA IMAGEN CUMPLE CON TODOS LOS REQUISITOS
      }
    }
  }
  // VerificarFormatoPDFBoleta(obj) {
  //   var uploadFile = obj.files[0];
  //   if (!window.FileReader) {
  //       alert('El navegador no soporta la lectura de archivos');
  //       return;
  //   }

  //   if (!(/\.(pdf)$/i).test(uploadFile.name)) {
  //       // alert('El archivo a adjuntar no es una imagen');
  //       //CUANDO NO RESPETA EL FORMATO REQUERIDO
          //this.MostrarMensaje('error','¡FORMATO INVALIDO!. Solo se Admite el Formato de Archivo PDF');    
  //       this.MensajeContenido = "¡FORMATO INVALIDO!. Solo se Admite el Formato de Archivo PDF";
  //       document.getElementById("btnModalFormatoInvalido").click(); //alternativa de hacer click()
  //       this.myInputBoleta.nativeElement.value = "";
  //   }
  //   else {
  //     if (uploadFile.size > 2500000)
  //     {
  //       // alert('El peso de la imagen no puede exceder los 200kb')
  //       this.MostrarMensaje('error','¡TAMAÑO EXCEDIDO!. Por favor el peso del Archivo no puede exceder 2.5MB');    
  //       this.MensajeContenido = "¡TAMAÑO EXCEDIDO!. Por favor el peso del Archivo no puede exceder 1.5MB";
  //       document.getElementById("btnModalFormatoInvalido").click(); //alternativa de hacer click()
  //       this.myInputBoleta.nativeElement.value = "";
  //     }
  //     else {
  //       //EL ARCHIVO CUMPLE CON TODOS LOS REQUISITOS
  //         // alert('PDF correcta :)')
  //     }
  //   }
  // }
}
