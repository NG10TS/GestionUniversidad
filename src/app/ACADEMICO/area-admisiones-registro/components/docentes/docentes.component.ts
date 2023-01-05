import { Component,ElementRef,OnInit,ViewChild} from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { DocentesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/docentes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  ruta = 'http://localhost:8000/';
  Mensaje;
  doc = [];

  DocenteSeleccionado = {
    id_doc: '',
    nombre_doc: '',
    ape_p_doc: '',
    ape_m_doc: '',
    cod_doc: '',
    ci: '',
    expedido: '',
    grado: '',
    fec_nac_doc: '',
    tel_dom_doc: '',
    cel_doc: '',
    lug_doc: '',
    email_doc: '',
    dom_doc: '',
    estado_civ_doc: '',
    nacional_doc: '',
    dir_trab_doc: '',
    tel_trab_doc: '',
    obser_doc: '',
    foto_doc: '',
    NombreCompleto: ''
  };


  newDocente = new FormGroup({
    nombre_doc: new FormControl(''),
    ape_p_doc: new FormControl(''),
    ape_m_doc: new FormControl(''),
    cod_doc: new FormControl(''),
    ci: new FormControl(''),
    expedido: new FormControl(''),
    grado: new FormControl(''),
    fec_nac_doc: new FormControl(''),
    tel_dom_doc: new FormControl(''),
    cel_doc: new FormControl(''),
    lug_doc: new FormControl(''),
    email_doc: new FormControl(''),
    dom_doc: new FormControl(''),
    estado_civ_doc: new FormControl(''),
    nacional_doc: new FormControl(''),
    dir_trab_doc: new FormControl(''),
    tel_trab_doc: new FormControl(''),
    obser_doc: new FormControl(''),
    foto_doc: new FormControl(''),
  });
  constructor(protected _doc: DocentesService) {}

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarDocentes();
  }
  MostrarMensaje(iconText, tittleText) {
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
  CargarDocentes() {
    this._doc.ObtenerDocentes()
      .then(res => {
        console.log(res.data);
        this.doc = res.data;
      }).catch(err => {
        console.log("err");
      });
  }
  onFileChangeFoto(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newDocente.patchValue({
        foto_doc: file
      })
      console.log(file)
    }
  }
  VerificarFormatoFoto(obj) {
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
      alert('El navegador no soporta la lectura de archivos');
      return;
    }

    if (!(/\.(jpg|png|jpeg)$/i).test(uploadFile.name)) {
      // alert('El archivo a adjuntar no es una imagen');
      //CUANDO NO RESPETA EL FORMATO REQUERIDO2 Y MODAL MEJORADO
      this.MostrarMensaje('error', '¡FORMATO INVALIDO!. POR FAVOR SELECCIONAR SOLO IMAGENES');
      //  this.Mensaje = "¡FORMATO INVALIDO!. POR FAVOR SELECCIONAR SOLO IMAGENES";
      sessionStorage.setItem('Mensaje', this.Mensaje);
      document.getElementById("BotonError").click(); //alternativa de hacer click()
      this.FOTO_IMG_ADD.nativeElement.value = "";
      this.FOTO_IMG_MOD.nativeElement.value = "";

    } else {
      if (uploadFile.size > 1500000) {
        // alert('El peso de la imagen no puede exceder los 200kb')
        this.MostrarMensaje('error', '¡TAMAÑO EXCEDIDO!. EL TAMAÑO DE LA FOTO NO PUEDE EXCEDER LOS 1.5MB');
        //this.Mensaje = "¡TAMAÑO EXCEDIDO!. EL TAMAÑO DE LA FOTO NO PUEDE EXCEDER LOS 1.5MB";
        sessionStorage.setItem('Mensaje', this.Mensaje);
        document.getElementById("BotonWarning").click(); //alternativa de hacer click()
        this.FOTO_IMG_ADD.nativeElement.value = "";
        this.FOTO_IMG_MOD.nativeElement.value = "";
      } else {
        //LA IMAGEN CUMPLE CON TODOS LOS REQUISITOS
      }
    }
  }
  AgregarDocente() {
    const formData = new FormData();
    formData.append('nombre_doc', this.newDocente.value.nombre_doc);
    formData.append('ape_p_doc', this.newDocente.value.ape_p_doc);
    formData.append('ape_m_doc', this.newDocente.value.ape_m_doc);
    formData.append('cod_doc', this.newDocente.value.cod_doc);
    formData.append('ci', this.newDocente.value.ci);
    formData.append('expedido', this.newDocente.value.expedido);
    formData.append('grado', this.newDocente.value.grado);
    formData.append('fec_nac_doc', this.newDocente.value.fec_nac_doc);
    formData.append('tel_dom_doc', this.newDocente.value.tel_dom_doc);
    formData.append('cel_doc', this.newDocente.value.cel_doc);
    formData.append('lug_doc', this.newDocente.value.lug_doc);
    formData.append('email_doc', this.newDocente.value.email_doc);
    formData.append('dom_doc', this.newDocente.value.dom_doc);
    formData.append('estado_civ_doc', this.newDocente.value.estado_civ_doc);
    formData.append('nacional_doc', this.newDocente.value.nacional_doc);
    formData.append('dir_trab_doc', this.newDocente.value.dir_trab_doc);
    formData.append('tel_trab_doc', this.newDocente.value.tel_trab_doc);
    formData.append('obser_doc', this.newDocente.value.obser_doc);
    formData.append('foto_doc', this.newDocente.value.foto_doc);

    this._doc.AgregarDocente(formData)
      .then(res => {
        this.MostrarMensaje('success', 'SE AÑADIO DOCENTE EXITOSAMENTE');
        console.log('SE AÑADIO CORRECTAMENTE', res.data);
        // console.log(res.data);
        this.CargarDocentes();
      })
      .catch(error => {
        console.log('ERROR AL AÑADIR DOCENTE');
        this.MostrarMensaje('error', 'ERROR AL AÑADIR DOCENTE REVISE EL FORMATO');
        console.log(error);
      })
  }
  ModificarDocente(Docente) {
    const formData = new FormData();
    //ejemplo... formData.append('id',this.newDocente.value.id);
    formData.append('id_doc', Docente.id_doc);
    formData.append('nombre_doc', Docente.nombre_doc);
    formData.append('ape_p_doc', Docente.ape_p_doc);
    formData.append('ape_m_doc', Docente.ape_m_doc);
    formData.append('cod_doc', Docente.cod_doc);
    formData.append('ci', Docente.ci);
    formData.append('expedido', Docente.expedido);
    formData.append('grado', Docente.grado);
    formData.append('fec_nac_doc', Docente.fec_nac_doc);
    formData.append('tel_dom_doc', Docente.tel_dom_doc);
    formData.append('cel_doc', Docente.cel_doc);
    formData.append('lug_doc', Docente.lug_doc);
    formData.append('email_doc', Docente.email_doc);
    formData.append('dom_doc', Docente.dom_doc);
    formData.append('estado_civ_doc', Docente.estado_civ_doc);
    formData.append('nacional_doc', Docente.nacional_doc);
    formData.append('dir_trab_doc', Docente.dir_trab_doc);
    formData.append('tel_trab_doc', Docente.tel_trab_doc);
    formData.append('obser_doc', Docente.obser_doc);
    formData.append('foto_doc', this.newDocente.value.foto_doc);
    this._doc.ModificarDocente(formData,Docente.id_doc)
      .then(res => {
        console.log('SE MODIFICO CORRECTAMENTE');
        this.MostrarMensaje('success', 'SE MODIFICO DOCENTE EXITOSAMENTE');
        console.log(res);
        this.CargarDocentes();
      })
      .catch(error => {
        console.log('HAY ERROR AL INTENTAR MODIFICAR');
        this.MostrarMensaje('error', 'ERROR AL MODIFICAR REVISE EL FORMATO');
        console.log(error);
        this.CargarDocentes();
      })
  }
  EliminarDocente(docID) {

    Swal.fire({
      title: 'SEGURO QUE QUIERE ELIMINAR DOCENTE?',
      color: '#FFFFFF',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonColor: "#DD6B55",
      cancelButtonText: 'CANCELAR',
      confirmButtonText: 'ELIMINAR',
      confirmButtonColor: "#DD6B55",
      background: '#D62600',

    }).then((result) => {
      //   /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._doc.EliminarDocente(docID)
          .then(res => {
            console.log(res.data);
            this.CargarDocentes();
          }).catch(err => {
            console.log("err");
          });
      }
    })

  }

  @ViewChild('FOTO_IMG_MOD') FOTO_IMG_MOD: ElementRef;
  @ViewChild('FOTO_IMG_ADD') FOTO_IMG_ADD: ElementRef;
  LimpiarDocentes() {
    this.DocenteSeleccionado = {
      id_doc: '',
      nombre_doc: '',
      ape_p_doc: '',
      ape_m_doc: '',
      cod_doc: '',
      ci: '',
      expedido: '',
      grado: '',
      fec_nac_doc: '',
      tel_dom_doc: '',
      cel_doc: '',
      lug_doc: '',
      email_doc: '',
      dom_doc: '',
      estado_civ_doc: '',
      nacional_doc: '',
      dir_trab_doc: '',
      tel_trab_doc: '',
      obser_doc: '',
      foto_doc: '',
      NombreCompleto: ''
    };
    this.newDocente.patchValue({
      id_doc: '',
      nombre_doc: '',
      ape_p_doc: '',
      ape_m_doc: '',
      cod_doc: '',
      ci: '',
      expedido: '',
      grado: '',
      fec_nac_doc: '',
      tel_dom_doc: '',
      cel_doc: '',
      lug_doc: '',
      email_doc: '',
      dom_doc: '',
      estado_civ_doc: '',
      nacional_doc: '',
      dir_trab_doc: '',
      tel_trab_doc: '',
      obser_doc: '',
      foto_doc: '',
      NombreCompleto: ''
    })
    this.FOTO_IMG_ADD.nativeElement.value = '';
    this.FOTO_IMG_MOD.nativeElement.value = '';
  }
  LimpiarInputFotoMod() {
    this.newDocente.patchValue({
      foto_doc: ''
    })
    this.FOTO_IMG_MOD.nativeElement.value = '';
  }
}
