import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { IngresoPogramaService } from 'src/app/core/services/ACADEMICO/postgrado/ingreso-pograma.service';
import { InscritosProgramaService } from 'src/app/core/services/ACADEMICO/postgrado/inscritos-programa.service';
import { ProgramasService } from 'src/app/core/services/ACADEMICO/postgrado/programas.service';
import { HerramientasService } from 'src/app/core/services/herramientas.service';

@Component({
  selector: 'app-inscripciones-postgrado',
  templateUrl: './inscripciones-postgrado.component.html',
  styleUrls: ['./inscripciones-postgrado.component.css']
})
export class InscripcionesPostgradoComponent implements OnInit {

  constructor(protected _inscritosPrograma:InscritosProgramaService,
    protected _Tool:HerramientasService, protected _ingresoPrograma:IngresoPogramaService, protected _programa:ProgramasService) { }

  ngOnInit(): void {
    this.CargarPrograma()
    this.iniciarDetectorSelecttipo_pago()
  }

  //#region VERIFICADOR CP
  //carnet_docu
  @ViewChild('carnet_docu') carnet_docu: ElementRef;
  VerificarFormatocarnet_docu(obj){
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
    }

    if (!(/\.(jpg|png|jpeg|pdf)$/i).test(uploadFile.name)) {
        //CUANDO NO RESPETA EL FORMATO REQUERIDO
        // this.MostrarMensaje('success','FORMATO INVALIDO!.');
        alert('FORMATO INVALIDO!.');
        this.carnet_docu.nativeElement.value = "";
    }
    else {
      if (uploadFile.size > 1500000)
      {
        // this.MostrarMensaje('success','¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        alert('¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        this.carnet_docu.nativeElement.value = "";
      }
      else {
        //EL ARCHIVO CUMPLE CON TODOS LOS REQUISITOS
      }
    }
  }
  onFileChangecarnet_docu(event){
    if(event.target.files.length>0)
    {
      const file = event.target.files[0];
      this.newInscritosPrograma.patchValue({
        carnet_docu: file
      })
      console.log(file)
    }
  }

  //cv_docu
  @ViewChild('cv_docu') cv_docu: ElementRef;
  VerificarFormatocv_docu(obj){
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
    }

    if (!(/\.(jpg|png|jpeg|pdf)$/i).test(uploadFile.name)) {
        //CUANDO NO RESPETA EL FORMATO REQUERIDO
        // this.MostrarMensaje('success','FORMATO INVALIDO!.');
        alert('FORMATO INVALIDO!.');
        this.cv_docu.nativeElement.value = "";
    }
    else {
      if (uploadFile.size > 1500000)
      {
        // this.MostrarMensaje('success','¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        alert('¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        this.cv_docu.nativeElement.value = "";
      }
      else {
        //EL ARCHIVO CUMPLE CON TODOS LOS REQUISITOS
      }
    }
  }
  onFileChangecv_docu(event){
    if(event.target.files.length>0)
    {
      const file = event.target.files[0];
      this.newInscritosPrograma.patchValue({
        cv_docu: file
      })
      console.log(file)
    }
  }

  //titulo_acad_docu
  @ViewChild('titulo_acad_docu') titulo_acad_docu: ElementRef;
  VerificarFormatotitulo_acad_docu(obj){
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
    }

    if (!(/\.(jpg|png|jpeg|pdf)$/i).test(uploadFile.name)) {
        //CUANDO NO RESPETA EL FORMATO REQUERIDO
        // this.MostrarMensaje('success','FORMATO INVALIDO!.');
        alert('FORMATO INVALIDO!.');
        this.titulo_acad_docu.nativeElement.value = "";
    }
    else {
      if (uploadFile.size > 1500000)
      {
        // this.MostrarMensaje('success','¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        alert('¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        this.titulo_acad_docu.nativeElement.value = "";
      }
      else {
        //EL ARCHIVO CUMPLE CON TODOS LOS REQUISITOS
      }
    }
  }
  onFileChangetitulo_acad_docu(event){
    if(event.target.files.length>0)
    {
      const file = event.target.files[0];
      this.newInscritosPrograma.patchValue({
        titulo_acad_docu: file
      })
      console.log(file)
    }
  }

  //titulo_prov_nac_docu
  @ViewChild('titulo_prov_nac_docu') titulo_prov_nac_docu: ElementRef;
  VerificarFormatotitulo_prov_nac_docu(obj){
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
    }

    if (!(/\.(jpg|png|jpeg|pdf)$/i).test(uploadFile.name)) {
        //CUANDO NO RESPETA EL FORMATO REQUERIDO
        // this.MostrarMensaje('success','FORMATO INVALIDO!.');
        alert('FORMATO INVALIDO!.');
        this.titulo_prov_nac_docu.nativeElement.value = "";
    }
    else {
      if (uploadFile.size > 1500000)
      {
        // this.MostrarMensaje('success','¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        alert('¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        this.titulo_prov_nac_docu.nativeElement.value = "";
      }
      else {
        //EL ARCHIVO CUMPLE CON TODOS LOS REQUISITOS
      }
    }
  }
  onFileChangetitulo_prov_nac_docu(event){
    if(event.target.files.length>0)
    {
      const file = event.target.files[0];
      this.newInscritosPrograma.patchValue({
        titulo_prov_nac_docu: file
      })
      console.log(file)
    }
  }

  //fotos_docu
  @ViewChild('fotos_docu') fotos_docu: ElementRef;
  VerificarFormatofotos_docu(obj){
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
    }

    if (!(/\.(jpg|png|jpeg|pdf)$/i).test(uploadFile.name)) {
        //CUANDO NO RESPETA EL FORMATO REQUERIDO
        // this.MostrarMensaje('success','FORMATO INVALIDO!.');
        alert('FORMATO INVALIDO!.');
        this.fotos_docu.nativeElement.value = "";
    }
    else {
      if (uploadFile.size > 1500000)
      {
        // this.MostrarMensaje('success','¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        alert('¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        this.fotos_docu.nativeElement.value = "";
      }
      else {
        //EL ARCHIVO CUMPLE CON TODOS LOS REQUISITOS
      }
    }
  }
  onFileChangefotos_docu(event){
    if(event.target.files.length>0)
    {
      const file = event.target.files[0];
      this.newInscritosPrograma.patchValue({
        fotos_docu: file
      })
      console.log(file)
    }
  }

  //pago_doc
  @ViewChild('pago_doc') pago_doc: ElementRef;
  VerificarFormatopago_doc(obj){
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
    }

    if (!(/\.(jpg|png|jpeg|pdf)$/i).test(uploadFile.name)) {
        //CUANDO NO RESPETA EL FORMATO REQUERIDO
        // this.MostrarMensaje('success','FORMATO INVALIDO!.');
        alert('FORMATO INVALIDO!.');
        this.pago_doc.nativeElement.value = "";
    }
    else {
      if (uploadFile.size > 1500000)
      {
        // this.MostrarMensaje('success','¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        alert('¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        this.pago_doc.nativeElement.value = "";
      }
      else {
        //EL ARCHIVO CUMPLE CON TODOS LOS REQUISITOS
      }
    }
  }
  onFileChangepago_doc(event){
    if(event.target.files.length>0)
    {
      const file = event.target.files[0];
      this.newInscritosPrograma.patchValue({
        pago_doc: file
      })
      console.log(file)
    }
  }

  //#endregion VERIFICADOR CP

  //#region CP INSCRITOS PROGRAMA
  // dataInscritosPrograma=[];
  newInscritosPrograma =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_ins_programa:new FormControl(0),
    cod_ins_programa:new FormControl(''),
    ape_p_ins:new FormControl(''),
    ape_m_ins:new FormControl(''),
    nombre_ins:new FormControl(''),
    ci_ins:new FormControl(''),

    fech_nac_ins:new FormControl(''),
    dir_dom_ins:new FormControl(''),
    institucion_trab_ins:new FormControl(''),
    dir_trab_ins:new FormControl(''),
    telf_trab_ins:new FormControl(''),
    grado_acad_ins:new FormControl(''),

    profesion:new FormControl(''),
    telf_domicilio:new FormControl(''),
    telf_movil:new FormControl(''),
    correo:new FormControl(''),

    carnet:new FormControl('PENDIENTE'),
    cv:new FormControl('PENDIENTE'),
    titulo_acad:new FormControl('PENDIENTE'),
    titulo_prov_nac:new FormControl('PENDIENTE'),
    fotos:new FormControl('PENDIENTE'),
    // boletas:new FormControl('PENDIENTE'),

    carnet_docu:new FormControl(''),
    cv_docu:new FormControl(''),
    titulo_acad_docu:new FormControl(''),
    titulo_prov_nac_docu:new FormControl(''),
    fotos_docu:new FormControl(''),
    // boletas_docu:new FormControl(''),
    nro_folder:new FormControl(''),
    contrasenia:new FormControl(''),
  })


  resetInscritosPrograma(){
    // this.newInscritosPrograma.reset();
    this.newInscritosPrograma.patchValue({
      id_ins_programa:0,
      cod_ins_programa:'',
      ape_p_ins:'',
      ape_m_ins:'',
      nombre_ins:'',
      ci_ins:'',
      profesion:'',
      telf_domicilio:'',
      telf_movil:'',
      correo:'',

      carnet:'PENDIENTE',
      cv:'PENDIENTE',
      titulo_acad:'PENDIENTE',
      titulo_prov_nac:'PENDIENTE',
      fotos:'PENDIENTE',
      // boletas:'PENDIENTE',

      carnet_docu:'',
      cv_docu:'',
      titulo_acad_docu:'',
      titulo_prov_nac_docu:'',
      fotos_docu:'',
      // boletas_docu:'',
      nro_folder:'',
      contrasenia:'',
    })
    this.carnet_docu.nativeElement.value = "";
    this.cv_docu.nativeElement.value = "";
    this.titulo_acad_docu.nativeElement.value = "";
    this.titulo_prov_nac_docu.nativeElement.value = "";
    this.fotos_docu.nativeElement.value = "";
  }



  AgregarModificarInscritosPrograma(){
    const formData=new FormData();
    formData.append('id_ins_programa',this.newInscritosPrograma.value.id_ins_programa);
    formData.append('cod_ins_programa',this.newInscritosPrograma.value.cod_ins_programa);
    formData.append('ape_p_ins',this.newInscritosPrograma.value.ape_p_ins);
    formData.append('ape_m_ins',this.newInscritosPrograma.value.ape_m_ins);
    formData.append('nombre_ins',this.newInscritosPrograma.value.nombre_ins);
    formData.append('ci_ins',this.newInscritosPrograma.value.ci_ins);

    formData.append('fech_nac_ins',this.newInscritosPrograma.value.fech_nac_ins); //new
    formData.append('dir_dom_ins',this.newInscritosPrograma.value.dir_dom_ins); //new
    formData.append('institucion_trab_ins',this.newInscritosPrograma.value.institucion_trab_ins); //new
    formData.append('dir_trab_ins',this.newInscritosPrograma.value.dir_trab_ins); //new
    formData.append('telf_trab_ins',this.newInscritosPrograma.value.telf_trab_ins); //new
    formData.append('grado_acad_ins',this.newInscritosPrograma.value.telf_trab_ins); //new


    formData.append('profesion',this.newInscritosPrograma.value.profesion);
    formData.append('telf_domicilio',this.newInscritosPrograma.value.telf_domicilio);
    formData.append('telf_movil',this.newInscritosPrograma.value.telf_movil);
    formData.append('correo',this.newInscritosPrograma.value.correo);
    formData.append('carnet','PENDIENTE');
    formData.append('cv','PENDIENTE');
    formData.append('titulo_acad','PENDIENTE');
    formData.append('titulo_prov_nac','PENDIENTE');
    formData.append('fotos','PENDIENTE');
    // formData.append('boletas','PENDIENTE');
    formData.append('carnet_docu',this.newInscritosPrograma.value.carnet_docu);
    formData.append('cv_docu',this.newInscritosPrograma.value.cv_docu);
    formData.append('titulo_acad_docu',this.newInscritosPrograma.value.titulo_acad_docu);
    formData.append('titulo_prov_nac_docu',this.newInscritosPrograma.value.titulo_prov_nac_docu);
    formData.append('fotos_docu',this.newInscritosPrograma.value.fotos_docu);
    // formData.append('boletas_docu',this.newInscritosPrograma.value.boletas_docu);
    formData.append('nro_folder',this.newInscritosPrograma.value.nro_folder);
    formData.append('contrasenia',this.newInscritosPrograma.value.contrasenia);
    if (this.newInscritosPrograma.invalid) {
      return;
    } else {
      let id = this.newInscritosPrograma.controls.id_ins_programa.value;
      console.log(this.newInscritosPrograma.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._inscritosPrograma.AgregarInscritosPrograma(formData)
        .then(res=>{
          // var xd = res.data.mensaje
          // if(xd='NO SE PUDO')
          // this._Tool.MensajeInformacion(xd,'','error')
          console.log('SE AÑADIO CORRECTAMENTE InscritosPrograma',res.data);
          // this._Tool.MostrarMensaje('success','SE AGREGÓ CORRECTAMENTE')
          // this.CargarInscritosPrograma();


          this.AgregarIngresoPrograma(res.data.LastData.id_ins_programa)
          this.resetInscritosPrograma();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR InscritosPrograma');
          this.btnsubmit=false
          this._Tool.MostrarMensaje('error','NO SE PUDO AGREGAR')//Y ESTO TAMBIEN
          console.log(error.response.data.message);
        })
      }
    }
  }



  //#endregion CP INSCRITOS PROGRAMAS

  //#region INGRESO PROGRAMA -- PARA ADD UN INGRESO PROGRAMA
  newIngresoPrograma =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_ing_programa:new FormControl(0),
    pago:new FormControl(''),
    pago_doc:new FormControl(''),
    fech_pago:new FormControl(''),
    tipo_pago:new FormControl(''),
    descuento:new FormControl(''),
    estado_pago:new FormControl(''),
    id_programa:new FormControl(''),
    id_ins_programa:new FormControl(''),
  })

  iniciarDetectorSelecttipo_pago(){ //ESTO SE DEBE LLAMAR
    this.newIngresoPrograma.get('tipo_pago').valueChanges
    // .pipe(debounceTime(1000))
    .subscribe(response => {
      console.log('xd',response)
      if(response == 'AL CONTADO'){
        this.newIngresoPrograma.patchValue({descuento:'SI'})
      } else {
        //NO ES AL CONTADO
        this.newIngresoPrograma.patchValue({descuento:'NO'})
      }
    })
  }
  btnsubmit=false;
  AgregarIngresoPrograma(idInscrito){
    const formData = new FormData()
    formData.append('pago',this.newIngresoPrograma.value.pago);
    formData.append('pago_doc',this.newIngresoPrograma.value.pago_doc);
    formData.append('fech_pago',this._Tool.ObtenerFechaActual());
    formData.append('tipo_pago',this.newIngresoPrograma.value.tipo_pago);
    formData.append('descuento',this.newIngresoPrograma.value.descuento);
    formData.append('estado_pago','SIN VERIFICAR');
    formData.append('id_programa',this.newIngresoPrograma.value.id_programa);
    formData.append('id_ins_programa',idInscrito);
    // this.newIngresoPrograma.patchValue({
    //   estado_pago:'SIN VERIFICAR',
    //   fech_pago: this._Tool.ObtenerFechaActual(),
    //   tipo_pago:''
    // })
    this._ingresoPrograma.AgregarIngresoPrograma(formData)
    .then(res=>{
      console.log(res.data)

      this.resetIngresoPrograma();
      this.btnsubmit=false
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR ingreso_programa');
      this.btnsubmit=false
      console.log(error.response.data.message);
    })
  }
  resetIngresoPrograma(){
    this.newIngresoPrograma.patchValue({
      id_ing_programa:0,
      pago:'',
      pago_doc:'',
      fech_pago:'',
      tipo_pago:'',
      descuento:'',
      estado_pago:'',
      id_programa:'',
      id_ins_programa:'',
    })

    this.pago_doc.nativeElement.value = "";
  }
  programa=[]
  CargarPrograma(){ //CARGA LOS PROGRAMAS ACTIVOS
    this._programa.ObtenerPrograma()
    .then(res => {
      console.log("Programa Cargado",res.data);
      this.programa =  this._programa.FiltrarProgramasActivos(res.data)
    }).catch(error =>  {
    console.log('Error al Cargar IngresoPrograma',error.response.data.message);
    });
  }

  //#endregion INGRESO PROGRAMA
}
