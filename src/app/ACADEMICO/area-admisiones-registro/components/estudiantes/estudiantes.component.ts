import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  ruta = 'http://localhost:8000/';
  est=[];
  //Para Validaciones
  @ViewChild('InputFoto') InputFoto: ElementRef;
  Mensaje;

  newEstudiante = new FormGroup({
    cod_est:new FormControl(''),//
    nombre_est:new FormControl(''),
    ape_p_est:new FormControl(''),
    ape_m_est:new FormControl(''),
    ci_est:new FormControl(''),
    exp_est:new FormControl(''),//
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
    obs_est:new FormControl(''),
    foto_est:new FormControl(''),
  });
  EstudianteSeleccionado = {
    id_est:'',
    cod_est:'',
    nombre_est:'',
    ape_p_est:'',
    ape_m_est:'',
    ci_est:'',
    exp_est:'',
    fec_nac_est:'',
    lug_nac_est:'',
    sexo_est:'',
    dir_est:'',
    tel_dom_est:'',
    cel_est:'',
    email_est:'',
    tur_des_est:'',
    numsol_est:'',
    insc_est:'',
    dom_est:'',
    trab_dir_est:'',
    trab_fono_est:'',
    trab_nombre_est:'',
    cole_est:'',
    dato_bachi_est:'',
    tipo_cole_est:'',
    pais_cod_est:'',
    fec_regis_est:'',
    fec_emitb_est:'',
    sede_emit_est:'',
    fec_tranf_est:'',
    padre_del_est:'',
    madre_del_est:'',
    nombre_trab_padre_est:'',
    tel_trab_padre_est:'',
    dir_trab_padre_est:'',
    fact_doc_tipo_est:'',
    fact_doc_numero_est:'',
    fact_nombre_est:'',
    obs_est:'',
    foto_est:'',
  }
  constructor(protected _est:EstudiantesService) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarEstudiantes();
    this.filtroEstudianteS()
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

  @ViewChild('FOTO_IMG_MOD') FOTO_IMG_MOD: ElementRef;
  @ViewChild('FOTO_IMG_ADD') FOTO_IMG_ADD: ElementRef;
  LimpiarEstudiantes(){
    this.EstudianteSeleccionado = {
      id_est:'',
      cod_est:'',
      nombre_est:'',
      ape_p_est:'',
      ape_m_est:'',
      ci_est:'',
      exp_est:'',
      fec_nac_est:'',
      lug_nac_est:'',
      sexo_est:'',
      dir_est:'',
      tel_dom_est:'',
      cel_est:'',
      email_est:'',
      tur_des_est:'',
      numsol_est:'',
      insc_est:'',
      dom_est:'',
      trab_dir_est:'',
      trab_fono_est:'',
      trab_nombre_est:'',
      cole_est:'',
      dato_bachi_est:'',
      tipo_cole_est:'',
      pais_cod_est:'',
      fec_regis_est:'',
      fec_emitb_est:'',
      sede_emit_est:'',
      fec_tranf_est:'',
      padre_del_est:'',
      madre_del_est:'',
      nombre_trab_padre_est:'',
      tel_trab_padre_est:'',
      dir_trab_padre_est:'',
      fact_doc_tipo_est:'',
      fact_doc_numero_est:'',
      fact_nombre_est:'',
      obs_est:'',
      foto_est:'',
    };
    this.newEstudiante.patchValue({
      id_est:'',
      cod_est:'',
      nombre_est:'',
      ape_p_est:'',
      ape_m_est:'',
      ci_est:'',
      exp_est:'',
      fec_nac_est:'',
      lug_nac_est:'',
      sexo_est:'',
      dir_est:'',
      tel_dom_est:'',
      cel_est:'',
      email_est:'',
      tur_des_est:'',
      numsol_est:'',
      insc_est:'',
      dom_est:'',
      trab_dir_est:'',
      trab_fono_est:'',
      trab_nombre_est:'',
      cole_est:'',
      dato_bachi_est:'',
      tipo_cole_est:'',
      pais_cod_est:'',
      fec_regis_est:'',
      fec_emitb_est:'',
      sede_emit_est:'',
      fec_tranf_est:'',
      padre_del_est:'',
      madre_del_est:'',
      nombre_trab_padre_est:'',
      tel_trab_padre_est:'',
      dir_trab_padre_est:'',
      fact_doc_tipo_est:'',
      fact_doc_numero_est:'',
      fact_nombre_est:'',
      obs_est:'',
      foto_est:'',
    })
    this.FOTO_IMG_ADD.nativeElement.value = '';
    this.FOTO_IMG_MOD.nativeElement.value = '';
   }
  LimpiarInputFotoMod(){
    this.newEstudiante.patchValue({
      foto_est: ''
    })
    this.FOTO_IMG_MOD.nativeElement.value = '';
   }
   filterEstudianteSearch=new FormGroup({
    txt:new FormControl('')
   })
   filtroEstudianteS(){
    this.filterEstudianteSearch.get('txt').valueChanges
    .subscribe(res=>{

       this.est = this.est1.filter(x => (x.NombreCompleto.indexOf(res)) > -1 || (x.cod_est.indexOf(res)) > -1)
      //  console.log('ESTUDIANTE ENCONTRADO', dataEst)
    })
   }





  est1=[]
  CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log(res.data);
      res.data.forEach(e => {
        e.NombreCompleto = e.ape_p_est+' '+e.ape_m_est+' '+e.nombre_est
        e.cod_est = e.cod_est+''
      });
      this.est = res.data;
      this.est1 = res.data;
    }).catch(err =>  {
    console.log("err",err);
    });
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
      formData.append('exp_est',this.newEstudiante.value.exp_est);//
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
      formData.append('obs_est',this.newEstudiante.value.obs_est);

      formData.append('foto_est',this.newEstudiante.value.foto_est);
      // formData.append('Estado','INACTIVO');
      this._est.AgregarEstudiante(formData)
      .then(res=>{
        console.log('SE AÑADIO CORRECTAMENTE',res.data);
        this.CargarEstudiantes();
      })
      .catch(error=>{
        console.log('ERROR AL AÑADIR DOCENTE');
        console.log(error);
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
        this.Mensaje = "¡FORMATO INVALIDO!. POR FAVOR SELECCIONAR SOLO IMAGENES";
        sessionStorage.setItem('Mensaje',this.Mensaje);
        document.getElementById("BotonError").click(); //alternativa de hacer click()
        this.FOTO_IMG_ADD.nativeElement.value = "";
        this.FOTO_IMG_MOD.nativeElement.value = "";

    }
    else {
      if (uploadFile.size > 1500000)
      {
        // alert('El peso de la imagen no puede exceder los 200kb')
        this.Mensaje = "¡TAMAÑO EXCEDIDO!. EL TAMAÑO DE LA FOTO NO PUEDE EXCEDER LOS 1.5MB";
        sessionStorage.setItem('Mensaje',this.Mensaje);
        document.getElementById("BotonWarning").click(); //alternativa de hacer click()
        this.FOTO_IMG_ADD.nativeElement.value = "";
        this.FOTO_IMG_MOD.nativeElement.value = "";

      }
      else {
        //LA IMAGEN CUMPLE CON TODOS LOS REQUISITOS
      }
    }
  }
  SeleccionarEstudiante(idest,Modo){
    this._est.SeleccionarEstudiante(idest)
    .then(res => {
      var a = res.data;
      this.EstudianteSeleccionado = a;
      console.log('INFO EST SELECCIONADO',this.EstudianteSeleccionado);
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
  ModificarEstudiante(Estudiante){

    console.log('DATO A ACTUALIZAR',Estudiante)
    const formData = new FormData();
    formData.append('id_est',Estudiante.id_est);
    formData.append('cod_est',Estudiante.cod_est);
    formData.append('nombre_est',Estudiante.nombre_est);
    formData.append('ape_p_est',Estudiante.ape_p_est);
    formData.append('ape_m_est',Estudiante.ape_m_est);
    formData.append('ci_est',Estudiante.ci_est);
    formData.append('exp_est',Estudiante.exp_est);
    formData.append('fec_nac_est',Estudiante.fec_nac_est);
    formData.append('lug_nac_est',Estudiante.lug_nac_est);
    formData.append('sexo_est',Estudiante.sexo_est);
    formData.append('dir_est',Estudiante.dir_est);
    formData.append('tel_dom_est',Estudiante.tel_dom_est);
    formData.append('cel_est',Estudiante.cel_est);
    formData.append('email_est',Estudiante.email_est);
    formData.append('tur_des_est',Estudiante.tur_des_est);
    formData.append('numsol_est','');
    formData.append('insc_est',Estudiante.insc_est);
    formData.append('dom_est',Estudiante.dom_est);
    formData.append('trab_dir_est',Estudiante.trab_dir_est);
    formData.append('trab_fono_est',Estudiante.trab_fono_est);
    formData.append('trab_nombre_est',Estudiante.trab_nombre_est);
    formData.append('cole_est',Estudiante.cole_est);
    formData.append('dato_bachi_est',Estudiante.dato_bachi_est);
    formData.append('tipo_cole_est',Estudiante.tipo_cole_est);
    formData.append('pais_cod_est',Estudiante.pais_cod_est);
    formData.append('fec_regis_est',Estudiante.fec_regis_est);
    formData.append('fec_emitb_est',Estudiante.fec_emitb_est);
    formData.append('sede_emit_est',Estudiante.sede_emit_est);
    formData.append('fec_tranf_est',Estudiante.fec_tranf_est);
    formData.append('padre_del_est',Estudiante.padre_del_est);
    formData.append('madre_del_est',Estudiante.madre_del_est);
    formData.append('nombre_trab_padre_est',Estudiante.nombre_trab_padre_est);
    formData.append('tel_trab_padre_est',Estudiante.tel_trab_padre_est);
    formData.append('dir_trab_padre_est',Estudiante.dir_trab_padre_est);
    formData.append('fact_doc_tipo_est',Estudiante.fact_doc_tipo_est);
    formData.append('fact_doc_numero_est',Estudiante.fact_doc_numero_est);
    formData.append('fact_nombre_est',Estudiante.fact_nombre_est);
    formData.append('obs_est',Estudiante.obs_est);
    formData.append('foto_est',this.newEstudiante.value.foto_est);
    this._est.ModificarEstudiante(formData,Estudiante.id_est)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarEstudiantes();
    })
    .catch(error=>{
      console.log('HAY ERROR AL INTENTAR MODIFICAR');
      console.log(error);
      this.CargarEstudiantes();
    })
  }
  EliminarEstudiante(id){
    this._est.EliminarEstudiante(id)
    .then(res => {
      console.log(res.data);
      this.CargarEstudiantes();
    }).catch(err =>  {
    console.log("err");
    });
  }
}
