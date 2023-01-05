import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { ConvEstUniCarrerasService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/conv-est-uni-carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { CarreraOrigenService } from 'src/app/core/services/ACADEMICO/vice-rectorado/carrera-origen.service';
import { UniversidadOrigenService } from 'src/app/core/services/ACADEMICO/vice-rectorado/universidad-origen.service';
import { ConvEstudiantesService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/conv-estudiantes.service';
import { HerramientasService } from 'src/app/core/services/herramientas.service';

@Component({
  selector: 'app-conv-estudiantes',
  templateUrl: './conv-estudiantes.component.html',
  styleUrls: ['./conv-estudiantes.component.css']
})
export class ConvEstudiantesComponent implements OnInit {


  ruta = 'http://localhost:8000/';
  dataP=[]; //la variable principal de carga del principal Crud
  carr=[];
  newConvEstudiante = new FormGroup({
    id_est:new FormControl(''),
    id_carre:new FormControl(''),
    nro_form:new FormControl(''),
    fec_conv:new FormControl(''),
  });
  ConvEstudianteSeleccionado = {
    id_conv_est:'',
    id_est:'',
    id_carre:'',
    nro_form:'',
    fec_conv:'',

    NomC:''
  }
  constructor(protected _ConvEst:ConvEstudiantesService,
    protected _carr:CarrerasService, protected _est:EstudiantesService, protected _ceuCarr:ConvEstUniCarrerasService,
    protected _carrO:CarreraOrigenService, protected _univO:UniversidadOrigenService,
    protected _cargarScrips: HerramientasService,
  ) {
    this._cargarScrips.CargarScript(["Tools"])
  }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarConvEstudiante();
    this.CargarCarrera();
    this.CargarEstudiante();

    this.iniciarSearchEstudiante();
    this.iniciarFormfilterEstudiante();
    this.iniciarFormfilterCarrera();

    this.iniciarFormfilterUniversidadO();
    this.iniciarFormfilterCarreraO();
  }
  MensajeInformacion(titulo,descripcion,icono){
    this._cargarScrips.MensajeInformacion(titulo,descripcion,icono)
  }
   //#region FILTRADORES



  //DEL Conv_Est_Uni_Carreras
  //FILTRADOR V3: NombreFiltro => UniversidadO, dataP=> univO
    univOFiltrado=[]; //LISTA ENCONTRADA
    UniversidadOSelect={//VALOR SELECCIONADO
      nombre_univ:''
    };
    filtroUniversidadO=false; //ESTADO ngIf Lista
    filterUniversidadOForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterUniversidadO(){ //ESTO SE DEBE LLAMAR
      this.filterUniversidadOForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroUniversidadO=true;
        if(response && response.length){
          this.filterUniversidadO(response);
        } else {
          this.univOFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.univOFiltrado)
      })
    }

    filterUniversidadO(Datafilter){
      this.univOFiltrado = this.universidadO.filter(a => (a.nombre_univ.indexOf(Datafilter)) > -1)
    }

    //FILTRADOR V3: NombreFiltro => CarreraO, dataP=> carrO
      carrOFiltrado=[]; //LISTA ENCONTRADA
      CarreraOSelect={//VALOR SELECCIONADO
        nombre_carr_conv:''
      };
      filtroCarreraO=false; //ESTADO ngIf Lista
      filterCarreraOForm= new FormGroup({
        txt:new FormControl(''),
      });
      iniciarFormfilterCarreraO(){ //ESTO SE DEBE LLAMAR
        this.filterCarreraOForm.get('txt').valueChanges
        // .pipe(debounceTime(1000))
        .subscribe(response => {
          console.log('entered data is ', response);
          this.filtroCarreraO=true;
          if(response && response.length){
            this.filterCarreraO(response);
          } else {
            this.carrOFiltrado = [];
          }
          console.log('DATA ENCONTRADO', this.carrOFiltrado)
        })
      }

      filterCarreraO(Datafilter){
        this.carrOFiltrado = this.carreraO.filter(a => (a.nombre_carr_conv.indexOf(Datafilter)) > -1)
      }

  //DEL CRUD PRINCIPAL
  estFiltrado=[]; //LISTA ENCONTRADA
    EstudianteSelect={//VALOR SELECCIONADO
      NomC:''
    };
    filtroEstudiante=false; //ESTADO ngIf Lista
    filterEstudianteForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterEstudiante(){ //ESTO SE DEBE LLAMAR
      this.filterEstudianteForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroEstudiante=true;
        if(response && response.length){
          this.filterEstudiante(response);
        } else {
          this.estFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.estFiltrado)
      })
    }

    filterEstudiante(Datafilter){
      //PARA HACER BUSQUEDAS POR SEPARADO
      // this.estFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
      this.estFiltrado = this.est.filter(a => (a.NomC.indexOf(Datafilter)) > -1)
    }

    //FILTRADOR V3: NombreFiltro => Carrera, dataP=> carr
      carrFiltrado=[]; //LISTA ENCONTRADA
      CarreraSelect={//VALOR SELECCIONADO
        nombre_carre:''
      };
      filtroCarrera=false; //ESTADO ngIf Lista
      filterCarreraForm= new FormGroup({
        txt:new FormControl(''),
      });
      iniciarFormfilterCarrera(){ //ESTO SE DEBE LLAMAR
        this.filterCarreraForm.get('txt').valueChanges
        // .pipe(debounceTime(1000))
        .subscribe(response => {
          console.log('entered data is ', response);
          this.filtroCarrera=true;
          if(response && response.length){
            this.filterCarrera(response);
          } else {
            this.carrFiltrado = [];
          }
          console.log('DATA ENCONTRADO', this.carrFiltrado)
        })
      }

      filterCarrera(Datafilter){
        //PARA HACER BUSQUEDAS POR SEPARADO
        // this.carrFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
        this.carrFiltrado = this.carr.filter(a => (a.nombre_carre.indexOf(Datafilter)) > -1)
      }

      autoCompletar(a){
        this.EstudianteSelect.NomC=a.ape_p_est+' '+a.ape_m_est+' '+a.nombre_est;
        this.newConvEstudiante.patchValue({id_est:a.id_est})
        this._carr.ObternerCarreraEstudiante(a.id_est)
        .then(res =>{
          console.log("LA CARRERA DEL ESTUDIANTE ES:", res.data)
          this.newConvEstudiante.patchValue({id_carre:res.data.id_carre})
          this.CarreraSelect.nombre_carre= res.data.nombre_carre
        })
      }

    //#endregion FILTRADORES


  //#region Region PRINCIPAL CRUD CONV ESTUDIANTES

  LimpiarConvEstudiante(){
    this.ConvEstudianteSeleccionado = {
      id_conv_est:'',
      id_est:'',
      id_carre:'',
      nro_form:'',
      fec_conv:'',
      NomC:''
    };
    this.newConvEstudiante.patchValue({
      id_conv_est:'',
      id_est:'',
      id_carre:'',
      nro_form:'',
      fec_conv:'',
    })
   }
  SeleccionarConvEstudiante(data,Modo){
    this._ConvEst.SeleccionarConvEstudiante(data.id_conv_est)
    .then(res => {
      console.log("volor",res.data)
      var a = res.data;
      this.ConvEstudianteSeleccionado = a;
      this.EstudianteSelect.NomC= data.ape_p_est+' '+data.ape_m_est+' '+data.nombre_est;
      this.CarreraSelect.nombre_carre = data.nombre_carre
      console.log('INFO DATA SELECCIONADO',this.ConvEstudianteSeleccionado);
      switch (Modo) {
        case 'Editar':
          document.getElementById("btnOpenModalMod").click();
          break;
        case 'Mostrar':
          document.getElementById("btnOpenModalMos").click();
          break;
        case 'GestConv':
          document.getElementById("btnOpenModalGestConv").click();
          this.CargarConv_Est_Uni_Carreras();
          this.CargarConvUniversidades();
          this.CargarConvCarreras();
          break;
        case 'EstadoConv':
          document.getElementById("btnOpenModalEstadoConv").click();
          break;
        case 'InfoConv':
          document.getElementById("btnOpenModalInfoConv").click();
          break;
        default:
          break;
      }
    }).catch(err =>  {
    console.log("err");
    });
  }

	CargarConvEstudiante(){
    this._ConvEst.ObtenerConvEstudiantes()
    .then(res => {

      res.data.forEach(element => {
        element.NomC=element.nombre_est+' '+element.ape_p_est+' '+element.nombre_est
      });
      console.log(res.data,'CARGA CONV ESTUDIANTES');
      this.dataP = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }

  AgregarConvEstudiante(){
    let data = {
      // id_conv_est:this.newConvEstudiante.value.id_conv_est,
      id_est:this.newConvEstudiante.value.id_est,
      id_carre:this.newConvEstudiante.value.id_carre,
      nro_form:this.newConvEstudiante.value.nro_form,
      fec_conv:this.newConvEstudiante.value.fec_conv,
    };
    this._ConvEst.AgregarConvEstudiante(data)
    .then((result) => {
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(result);
      this.CargarConvEstudiante();
      this.LimpiarConvEstudiante()
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      console.log(error);
      this.CargarConvEstudiante();
    });
  }
  ModificarConvEstudiante(dato){
    console.log('DATOS A ACTUALIZAR',dato)
    let data = {
      id_conv_est:dato.id_conv_est,
      id_est:dato.id_est,
      id_carre:dato.id_carre,
      nro_form:dato.nro_form,
      fec_conv:dato.fec_conv,
    };
    this._ConvEst.ModificarConvEstudiante(data, dato.id_conv_est)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.CargarConvEstudiante();
      this.LimpiarConvEstudiante()
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarConvEstudiante();
    });
  }
  EliminarConvEstudiante(id){
    this._ConvEst.EliminarConvEstudiante(id)
    .then(res => {
      console.log(res.data);
      this.CargarConvEstudiante();
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion PRINCIPAL CRUD


  //#region CRUD ESTUDIANTES
  est =[ ];
  estRespaldo =[ ];
  EstudianteSeleccionado = {
    //ejemplo... id_est:'',
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

  newEstudiante= new FormGroup({
    // ejemplo: id_est:new FormControl(''),
    // id_est:new FormControl(''),
    cod_est:new FormControl(''),
    nombre_est:new FormControl(''),
    ape_p_est:new FormControl(''),
    ape_m_est:new FormControl(''),
    ci_est:new FormControl(''),
    exp_est:new FormControl(''),
    fec_nac_est:new FormControl(''),
    lug_nac_est:new FormControl(''),
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

  SeleccionarEstudiante(id,Modo){
    this._est.SeleccionarEstudiante(id)
    .then(res => {
      var a = res.data;
      this.EstudianteSeleccionado = a;
      console.log('INFO Estudiante SELECCIONADO',this.EstudianteSeleccionado);
      switch (Modo) {
        case 'Editar':
          document.getElementById("btnOpenModalModEst").click();
          break;
        case 'Mostrar':
          document.getElementById("btnOpenModalMosEst").click();
          break;
        default:
          break;
      }
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  CargarEstudiante(){
    this._est.ObtenerEstudiantes()
    .then(res => {


      res.data.forEach(element => {
        element.NomC=element.ape_p_est+' '+element.ape_m_est+' '+element.nombre_est
      });
      console.log(res.data,'ESTUDIANTE CARGAdO');
      this.est = res.data;
      this.estRespaldo = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }
   //#region BUSCADOR de estudiante
 	filtradosSearchFodas = []
	 filterSearchEstudianteForm = new FormGroup({
 	    txt: new FormControl('')
	 })
	 iniciarSearchEstudiante(){
 	   this.filterSearchEstudianteForm.get('txt').valueChanges
 	   .subscribe(res => {
  	      console.log('PALABRA A BUSCAR EStudiante', res)
  	    if(res && res.length){
  	      this.est = this.estRespaldo.filter(a => (a.NomC.indexOf	(res)) > -1 )
   	   }
   	   else{
    	    this.est =this.estRespaldo
   	   }
   	 })
 	}
 	//#endregion BUSCADOR

  AgregarEstudiante(){
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
    this._est.AgregarEstudiante(formData)
    .then((result) => {
      console.log('SE AGREGO CORRECTAMENTE');
      console.log(result);
      this.CargarEstudiante();
      this.LimpiarEstudiante()
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      console.log(error);
    });
  }
  EliminarEstudiante(id){
    this._est.EliminarEstudiante(id)
    .then(res => {
      console.log(res.data);
      this.CargarEstudiante();
    }).catch(error =>  {
    console.log("err",error);
    });
  }
  @ViewChild('FOTO_IMG_ADD') FOTO_IMG_ADD: ElementRef;
  VerificarFormatoFoto(obj){
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
    }
    else {
      if (uploadFile.size > 1500000)
      {
        // this.MostrarMensaje('success','¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        alert('¡TAMAÑO EXCEDIDO!. EL TAMAÑO DEL ARCHIVO NO PUEDE EXCEDER LOS 1.5MB');
        this.FOTO_IMG_ADD.nativeElement.value = "";
      }
      else {
        //EL ARCHIVO CUMPLE CON TODOS LOS REQUISITOS
      }
    }
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

  LimpiarEstudiante()
  {
  this.EstudianteSeleccionado = {
    // ejemplo: id_est:'',
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
    // ejemplo: id_est:'',
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
 }


//#endregion CRUD ESTUDIANTES



  //#region CRUD CONV EST UNI CARRERAS
  estunicarr =[ ];
  Conv_Est_Uni_CarrerasSeleccionado = {
    //ejemplo... id_conv_est_uni_carre:'',
    id_conv_est_uni_carre:'',
    id_conv_est:'',
    id_univ:'',
    id_convcarr:'',
  };

  newConv_Est_Uni_Carreras= new FormGroup({
    // ejemplo: id_conv_est_uni_carre:new FormControl(''),
    // id_conv_est_uni_carre:'',
    id_conv_est:new FormControl(''),
    id_univ:new FormControl(''),
    id_convcarr:new FormControl(''),
  });

  SeleccionarConv_Est_Uni_Carreras(id,Modo){
    this._ceuCarr.SeleccionarConv_Est_Uni_Carreras(id)
    .then(res => {
      var a = res.data;
      this.Conv_Est_Uni_CarrerasSeleccionado = a;
      console.log('INFO Conv_Est_Uni_Carreras SELECCIONADO',this.Conv_Est_Uni_CarrerasSeleccionado);
      switch (Modo) {
        case 'Editar':
          document.getElementById("btnOpenModalModificacionestunicarr").click();
          break;
        default:
          break;
      }
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  CargarConv_Est_Uni_Carreras(){
    this._ceuCarr.ObtenerConv_Est_Uni_Carrerass()
    .then(res => {
      console.log(res.data);
      this.estunicarr = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }

  AgregarConv_Est_Uni_Carreras(){
    let data = {
      // ejemplo: atributo:this.newConv_Est_Uni_Carreras.value.atributo,
      // id_conv_est_uni_carre:this.newConv_Est_Uni_Carreras.value.id_conv_est_uni_carre,
      id_conv_est:this.ConvEstudianteSeleccionado.id_conv_est,
      id_univ:this.newConv_Est_Uni_Carreras.value.id_univ,
      id_convcarr:this.newConv_Est_Uni_Carreras.value.id_convcarr,
    };
    this._ceuCarr.AgregarConv_Est_Uni_Carreras(data)
    .then((result) => {
      console.log('SE AGREGO CORRECTAMENTE');
      console.log(result);
      this.CargarConv_Est_Uni_Carreras();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      console.log(error);
    });
  }
  ModificarConv_Est_Uni_Carreras(Conv_Est_Uni_Carreras){
    console.log('DATO A ACTUALIZAR',Conv_Est_Uni_Carreras)
    let data = {
      // ejemplo: atributo:Conv_Est_Uni_Carreras.atributo,
      id_conv_est_uni_carre:Conv_Est_Uni_Carreras.id_conv_est_uni_carre,
      id_conv_est:Conv_Est_Uni_Carreras.id_conv_est,
      id_univ:Conv_Est_Uni_Carreras.id_univ,
      id_convcarr:Conv_Est_Uni_Carreras.id_convcarr,
    };
    this._ceuCarr.ModificarConv_Est_Uni_Carreras(data,Conv_Est_Uni_Carreras.id_conv_est_uni_carre)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.CargarConv_Est_Uni_Carreras();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarConv_Est_Uni_Carreras();
    });
  }
  EliminarConv_Est_Uni_Carreras(id){
    this._ceuCarr.EliminarConv_Est_Uni_Carreras(id)
    .then(res => {
      console.log(res.data);
      this.CargarConv_Est_Uni_Carreras();
    }).catch(error =>  {
    console.log("err",error);
    });
  }

  LimpiarConv_Est_Uni_Carreras()
  {
  this.Conv_Est_Uni_CarrerasSeleccionado = {
    // ejemplo: id_conv_est_uni_carre:'',
    id_conv_est_uni_carre:'',
    id_conv_est:'',
    id_univ:'',
    id_convcarr:'',

  };
  this.newConv_Est_Uni_Carreras.patchValue({
    // ejemplo: id_conv_est_uni_carre:'',
    id_conv_est_uni_carre:'',
    id_conv_est:'',
    id_univ:'',
    id_convcarr:'',
  })
 }


//#endregion CRUD CONV EST UNI CARRERAS
  CargarCarrera(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log(res.data);
      this.carr = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  universidadO; carreraO;
  CargarConvUniversidades(){
    this._univO.ObtenerUniConvs()
    .then(res => {
      console.log(res.data);
      this.universidadO = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  CargarConvCarreras(){
    this._carrO.ObtenerCarrConvs()
    .then(res => {
      console.log(res.data);
      this.carreraO = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }



}
