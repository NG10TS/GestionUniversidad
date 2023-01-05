import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarreraOrigenService } from 'src/app/core/services/ACADEMICO/vice-rectorado/carrera-origen.service';
import { ConvRegistrarService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/conv-registrar.service';
import { ConvUnivCarsService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/conv-univ-cars.service';
import { MateriaOrigenService } from 'src/app/core/services/ACADEMICO/vice-rectorado/materia-origen.service';
import { UniversidadOrigenService } from 'src/app/core/services/ACADEMICO/vice-rectorado/universidad-origen.service';
import {HerramientasService} from 'src/app/core/services/herramientas.service';

@Component({
  selector: 'app-conv-registrar',
  templateUrl: './conv-registrar.component.html',
  styleUrls: ['./conv-registrar.component.css'],
})
export class ConvRegistrarComponent implements OnInit {


  ruta = 'http://localhost:8000/';
  dataP=[]; //la variable principal de carga del principal Crud
  //SECCION DE CARGA DE DATOS DE ORIGEN DE CARRERA ANTERIOR
  MatO=[];
  CarrO=[];

  UniverO=[];
  UniverORespaldo=[];

  newUniCarreMat = new FormGroup({
    id_univer:new FormControl(''),
    id_convcarr:new FormControl(''),
    id_convmat:new FormControl(''),
    tipo_mater:new FormControl(''),
    hora_carre:new FormControl(''),
  });
  UniCarreMatseleccionado = {
    id_univ_carre_mater:'',
    id_univer:'',
    id_convcarr:'',
    id_convmat:'',
    tipo_mater:'',
    hora_carre:'',
  }
  constructor(protected _ConvReg:ConvRegistrarService, private _Tools:HerramientasService,
    protected _carrO:CarreraOrigenService,protected _matO:MateriaOrigenService,protected _univO:UniversidadOrigenService,protected _convUnivCar:ConvUnivCarsService,
    protected _tool:HerramientasService
  ) {
    this._Tools.CargarScript(["Tools"]);
    // esta linea sirve para detectar click en alguna pagina
    // this.renderer.listen('window', 'click',(e:Event)=>{
    //   console.log("hizo click")
    //   this.filtroUniversidadO=false;
    //   this.filtroMAteriaO=false;
    //   this.filtroCarreraO=false;
    // });
  }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarUniCarreMats();
    this.CargarUniConv();
    this.CargarCarrConv();
    this.CargarMatConv();
    this.CargarConvUnivCar()

    this.iniciarFormfilterUniversidadO();
    this.iniciarFormfilterMAteriaO();
    this.iniciarFormfilterCarreraO();
    // this.MensajeInformacionUniCarreMats()

    this.iniciarSearchUniCarreMats()
  }
  MensajeInformacion(titulo,descripcion,icono){
    this._tool.MensajeInformacion(titulo,descripcion,icono)
  }

  //DETECTAR EL CLICK
  @HostListener('document:click',['$event.target'])
  handleClick($event:HTMLElement): void{
    //OBTENIENDO LA CLASE EN TEXTO PLANO
    console.log('Click',$event.classList.toString())
    const nameClass = $event.classList.toString()
    this.filtroUniversidadO=false;
    this.filtroMAteriaO=false;
    this.filtroCarreraO=false;
  }

  //ESTA PARTE DE CODIGO DETECTA EL BOTON ESCAPE
  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // this.counter++;
    console.log("presion escape")
    this.filtroUniversidadO=false;
    this.filtroMAteriaO=false;
    this.filtroCarreraO=false;
  }

  //#region CARGA EXTRAS

  //#endregion CARGA EXTRAS


  //#region FILTRADORES
  FiltradosSearchUniCarreMats=[] //LISTA ENCONTRADA
  filterSearchUniCarreMatsForm=new FormGroup({
    txt:new FormControl('')
  })
  iniciarSearchUniCarreMats(){
    this.filterSearchUniCarreMatsForm.get('txt').valueChanges
    // .pipe(debounceTime(1000))
    .subscribe(res=>{
      console.log('PALABRA A BUSCAR ', res);
      if(res && res.length){
        this.dataP = this.dataP.filter(a => (a.nombre_univ.indexOf(res)) > -1)
      }else{
        this.dataP = this.dataPRespaldo
      }
      console.log('lista encontrada', this.dataP);
    })
  }


  matOFiltrado=[]; //LISTA ENCONTRADA
  MAteriaOSelect={//VALOR SELECCIONADO
    nombre_mater_conv:''
  };
  filtroMAteriaO=false; //ESTADO ngIf Lista
  filterMAteriaOForm= new FormGroup({
    txt:new FormControl(''),
  });
  iniciarFormfilterMAteriaO(){ //ESTO SE DEBE LLAMAR
    this.filterMAteriaOForm.get('txt').valueChanges
    // .pipe(debounceTime(1000))
    .subscribe(response => {
      console.log('entered data materia ', response);
      this.filtroMAteriaO=true;
      if(response && response.length){
        this.MatO = this.MatORespaldo.filter(a => (a.nombre_mater_conv.indexOf	(response)) > -1 )
      } else {
        this.MatO = this.MatORespaldo;
      }
      console.log('DATA ENCONTRADO', this.matOFiltrado)
    })
  }

  filterMAteriaO(Datafilter){
    //PARA HACER BUSQUEDAS POR SEPARADO
    // this.matOFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
    this.matOFiltrado = this.MatO.filter(a => (a.nombre_mater_conv.indexOf(Datafilter)) > -1 || (a.sigla_mater_conv.indexOf(Datafilter)) > -1)
  }
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
      console.log('carrera convocatoria buscar ', response);
      this.filtroCarreraO=true;
      if(response && response.length){
        this.CarrO = this.CarrORespaldo.filter(a => (a.nombre_carr_conv.indexOf	(response)) > -1 )
      } else {
        this.CarrO =  this.CarrORespaldo;
      }
      console.log('DATA ENCONTRADO', this.carrOFiltrado)
    })
  }

  filterCarreraO(Datafilter){
    this.carrOFiltrado = this.CarrO.filter(a => (a.nombre_carr_conv.indexOf(Datafilter)) > -1)
  }
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
      console.log('universidad introducida ', response);
      this.filtroUniversidadO=true;
      if(response && response.length){
        this.UniverO = this.UniverORespaldo.filter(a => (a.nombre_univ.indexOf	(response)) > -1 )
      } else {
        this.UniverO = this.UniverORespaldo;
      }
      console.log('DATA ENCONTRADO', this.univOFiltrado)
    })
  }

  filterUniversidadO(Datafilter){
    this.univOFiltrado = this.UniverO.filter(a => (a.nombre_univ.indexOf(Datafilter)) > -1)
  }
  carrInput=false;
  filterCarrerasUniversidadO(Datafilter){
    this.convUnivCar = this.convUnivCarRespaldo.filter(a => (a.id_univ1.indexOf(Datafilter)) > -1);
    (this.convUnivCar.length==0)?this.carrInput=false:this.carrInput=true;

    console.log('CARRERAS ENCONTRADO', this.convUnivCar)
  }
  //#endregion FILTRADORES


  //#region Region PRINCIPAL CRUD


  public pagedataP:Number;
  LimpiarUniCarreMats(){
    this.filterUniversidadOForm.patchValue({txt:''})
    this.filterCarreraOForm.patchValue({txt:''})
    this.filterMAteriaOForm.patchValue({txt:''})
    this.filtroCarreraO=false; this.filtroMAteriaO=false; this.filtroUniversidadO=false;
    this.UniCarreMatseleccionado = {
      id_univ_carre_mater:'',
      id_univer:'',
      id_convcarr:'',
      id_convmat:'',
      tipo_mater:'',
      hora_carre:'',
    };
    this.newUniCarreMat.patchValue({
      id_univ_carre_mater:'',
      id_univer:'',
      id_convcarr:'',
      id_convmat:'',
      tipo_mater:'',
      hora_carre:'',
    })
   }

   dataPRespaldo=[]
  CargarUniCarreMats(){
    this._ConvReg.ObtenerUniCarreMats()
    .then(res => {
      console.log(res.data);
      this.dataP = res.data;
      this.dataPRespaldo = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }

  AgregarUniCarreMat(){
    console.log(this.newUniCarreMat.value)
    const formData = new FormData();
    // formData.append('id_univ_carre_mater',this.newUniCarreMat.value.id_univ_carre_mater);
    formData.append('id_univer',this.newUniCarreMat.value.id_univer);
    formData.append('id_convcarr',this.newUniCarreMat.value.id_convcarr);
    formData.append('id_convmat',this.newUniCarreMat.value.id_convmat);
    formData.append('tipo_mater',this.newUniCarreMat.value.tipo_mater);
    formData.append('hora_carre',this.newUniCarreMat.value.hora_carre);
    this._ConvReg.AgregarUniCarreMat(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarUniCarreMats();
      this.LimpiarUniCarreMats()
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      console.log(error);
    })
  }

  SeleccionarUniCarreMat(data,Modo){
    this.filterCarrerasUniversidadO(data.id_univ)
    this._ConvReg.SeleccionarUniCarreMat(data.id_univ_carre_mater)
    .then(res => {
      var a = res.data;
      this.UniCarreMatseleccionado = a;
      this.filterUniversidadOForm.patchValue({txt:data.nombre_univ})
      this.filterCarreraOForm.patchValue({txt:data.nombre_carr_conv})
      this.filterMAteriaOForm.patchValue({txt:data.nombre_mater_conv})
      this.filtroUniversidadO=false;
      this.filtroCarreraO=false;
      this.filtroMAteriaO=false;
      console.log('INFO DATA SELECCIONADO',this.UniCarreMatseleccionado);
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
  ModificarUniCarreMat(UniCarreMat){
    console.log('DATOS A ACTUALIZAR',UniCarreMat)
    const formData = new FormData();
    formData.append('id_univ_carre_mater',UniCarreMat.id_univ_carre_mater);
    formData.append('id_univer',UniCarreMat.id_univer);
    formData.append('id_convcarr',UniCarreMat.id_convcarr);
    formData.append('id_convmat',UniCarreMat.id_convmat);
    formData.append('tipo_mater',UniCarreMat.tipo_mater);
    formData.append('hora_carre',UniCarreMat.hora_carre);
    this._ConvReg.ModificarUniCarreMat(formData, UniCarreMat.id_univ_carre_mater)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarUniCarreMats();
      document.getElementById("btnCerrarModal").click(); //cerrar modal despues de haber guardado
      this.LimpiarUniCarreMats()
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarUniCarreMats();
    })
  }
  EliminarUniCarreMat(id){
    this._ConvReg.EliminarUniCarreMat(id)
    .then(res => {
      console.log(res.data);
      this.CargarUniCarreMats();
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion PRINCIPAL CRUD


  OpenModalAdiciones(NameModal){

    switch (NameModal) {
      case 'Universidad':
        // document.getElementById("CloseModalGestionUniConv").click();
        document.getElementById("OpenModalAddUniversidad").click();
        break;
      case 'Carrera':
        // document.getElementById("CloseModalGestionCarrConv").click();
        document.getElementById("OpenModalAddCarrera").click();
        break;
      case 'Materia':
        document.getElementById("OpenModalAddMateria").click();
        break;

      default:
        break;
    }
  }
  //#region Region UNIVERSIDAD ORIGEN
  public pageUniversidad:Number;
  newUniConv = new FormGroup({
    nombre_univ:new FormControl(''),
    sigla_univ:new FormControl(''),
  });
  UniConvseleccionado = {
    id_univ:'',
    nombre_univ:'',
    sigla_univ:'',
  }
  LimpiarUniConv()
    {
    this.UniConvseleccionado = {
      // ejemplo: :'',
      id_univ:'',
      nombre_univ:'',
      sigla_univ:'',

    };
    this.newUniConv.patchValue({
      // ejemplo: :'',
      id_univ:'',
      nombre_univ:'',
      sigla_univ:'',
    })
   }
	CargarUniConv(){
    this._univO.ObtenerUniConvs()
    .then(res => {
      console.log("CARGA CONV UNIVERSIDAD",res.data);

      this.UniverO = res.data;
      this.UniverORespaldo = res.data;
    }).catch(err =>  {
    console.log("err",err);
    });
  }
  AgregarUniConv(){
    let data = {
      // id_univ:this.newUniConv.value.id_univ,
      nombre_univ:this.newUniConv.value.nombre_univ,
      sigla_univ:this.newUniConv.value.sigla_univ,
    };
    this._univO.AgregarUniConv(data)
    .then((result) => {
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(result);
      this.CargarUniConv();
      this.OpenModalAdiciones("GestionarUniv"); //Regresar a Modal de Gestion
      this.LimpiarUniConv()
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      console.log(error);
      this.CargarUniConv();
    });
  }
  ModificarUniConv(dato){
    console.log('DATOS A ACTUALIZAR',dato)
    let data = {
      id_univ:dato.id_univ,
      nombre_univ:dato.nombre_univ,
      sigla_univ:dato.sigla_univ,
    };
    this._univO.ModificarUniConv(data,dato.id_univ)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.CargarUniConv();
      this.LimpiarUniConv()
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarUniConv();
    });
  }
  EliminarUniConv(id){
    this._univO.EliminarUniConv(id)
    .then(res => {
      console.log(res.data);
      this.CargarUniConv();
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion Region UNIVERSIDAD ORIGEN


  //#region Region CARRERA ORIGEN
  public pageCarrera:Number;
  newCarrConv = new FormGroup({
    nombre_carr_conv:new FormControl(''),
  });
  UniCarrseleccionado = {
    id_convcarr:'',
    nombre_carr_conv:'',
  }
  LimpiarCarrConv()
  {

    this.UniCarrseleccionado = {
      // ejemplo: :'',
      id_convcarr:'',
      nombre_carr_conv:'',
    };
    this.newCarrConv.patchValue({
      // ejemplo: :'',
      id_convcarr:'',
      nombre_carr_conv:'',
    })
  }
  CarrORespaldo=[]
  CargarCarrConv(){
    this._carrO.ObtenerCarrConvs()
    .then(res => {
      console.log('LISTA CARRERAS',res.data);
      this.CarrORespaldo = res.data;
      this.CarrO = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarCarrConv(){
    let data = {
      // id_convcarr:this.newCarrConv.value.id_convcarr,
      nombre_carr_conv:this.newCarrConv.value.nombre_carr_conv,
    };
    this._carrO.AgregarCarrConv(data)
    .then((result) => {
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(result);
      this.CargarCarrConv();
      this.LimpiarCarrConv()
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      console.log(error);
      this.CargarCarrConv();
    });
  }
  ModificarCarrConv(dato){
    console.log('DATOS A ACTUALIZAR',dato)
    let data = {
      id_convcarr:dato.id_convcarr,
      nombre_carr_conv:dato.nombre_carr_conv,
    };
    this._carrO.ModificarCarrConv(data, dato.id_convcarr)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.CargarCarrConv();
      this.LimpiarCarrConv()
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarCarrConv();
    });
  }
  EliminarCarrConv(id){
    this._carrO.EliminarCarrConv(id)
    .then(res => {
      console.log(res.data);
      this.CargarCarrConv();
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion Region CARRERA ORIGEN


  //#region Region MATERIAS ORIGEN
  public pageMateria:Number;
  newMatConv = new FormGroup({
    sigla_mater_conv:new FormControl(''),
    nombre_mater_conv:new FormControl(''),
  });
  MatConvseleccionado = {
    id_convmat:'',
    sigla_mater_conv:'',
    nombre_mater_conv:'',
  }
  LimpiarMatConv()
    {
    this.MatConvseleccionado = {
      // ejemplo: :'',
      id_convmat:'',
      sigla_mater_conv:'',
      nombre_mater_conv:'',

    };
    this.newMatConv.patchValue({
      // ejemplo: :'',
      id_convmat:'',
      sigla_mater_conv:'',
      nombre_mater_conv:'',
    })
   }
   MatORespaldo =[]
  CargarMatConv(){
    this._matO.ObtenerMatConvs()
    .then(res => {
      console.log("LISTA DE MATERIAS CARGADO",res.data);
      this.MatO = res.data;
      this.MatORespaldo = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarMatConv(){
    let data = {
      // id_convmat:this.newMatConv.value.id_convmat,
      sigla_mater_conv:this.newMatConv.value.sigla_mater_conv,
      nombre_mater_conv:this.newMatConv.value.nombre_mater_conv,
    };
    this._matO.AgregarMatConv(data)
    .then((result) => {
      console.log('SE AÑADIO CORRECTAMENTE');
      console.log(result);
      this.CargarMatConv();
      this.LimpiarMatConv()
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR');
      console.log(error);
      this.CargarMatConv();
    });
  }
  ModificarMatConv(dato){
    console.log('DATOS A ACTUALIZAR',dato)
    let data = {
      id_convmat:dato.id_convmat,
      sigla_mater_conv:dato.sigla_mater_conv,
      nombre_mater_conv:dato.nombre_mater_conv,
    };
    this._matO.ModificarMatConv(data, dato.id_convmat)
      .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.CargarMatConv();
      this.LimpiarMatConv()
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarMatConv();
    });
  }
  EliminarMatConv(id){
    this._matO.EliminarMatConv(id)
    .then(res => {
      console.log(res.data);
      this.CargarMatConv();
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion Region MATERIAS ORIGEN


  //#region GestionConvUnivCar
  public pageVinculacionUnivCar:number;
  isSubmitted;
  convUnivCar=[]
    newConvUnivCar =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_conv_univ_car:new FormControl(0),
      id_convcarr:new FormControl(''),
      id_univ:new FormControl(''),
    })
    convUnivCarRespaldo=[]
    CargarConvUnivCar(){
      this._convUnivCar.ObtenerConvUnivCars()
      .then(res => {
        console.log('ConvUnivCar CARGADO',res.data);
        res.data.forEach(e => {
          e.id_univ1=e.id_univ+''
        });
        this.convUnivCar = res.data;
        this.convUnivCarRespaldo = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR ConvUnivCar',err.response.data.message);
      });
    }
    resetConvUnivCar(){
      this.filterCarreraOForm.patchValue({txt:''})
      this.filterUniversidadOForm.patchValue({txt:''})
      this.filtroCarreraO=false;  this.filtroUniversidadO=false;
      this.newConvUnivCar.reset();
      this.isSubmitted =false;
    }
    AgregarModificarConvUnivCar(){
      this.isSubmitted=true;
      if (this.newConvUnivCar.invalid) {
        return;
      } else {
        let id = this.newConvUnivCar.controls.id_conv_univ_car.value;
        console.log(this.newConvUnivCar.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._convUnivCar.AgregarConvUnivCar(this.newConvUnivCar.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE ConvUnivCar',res.data);
            this.CargarConvUnivCar();
            this.resetConvUnivCar();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR ConvUnivCar');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._convUnivCar.ModificarConvUnivCar(this.newConvUnivCar.value,this.newConvUnivCar.value.id_conv_univ_car)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE ConvUnivCar',res.data);
            this.CargarConvUnivCar();
            this.resetConvUnivCar();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR ConvUnivCar');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarConvUnivCar(data){
      if(data.id_conv_univ_car){
        const dataConvUnivCar = this.convUnivCar.find(x => x.id_conv_univ_car === data.id_conv_univ_car)
        if(!dataConvUnivCar) return;
        this.filterCarreraOForm.patchValue({txt:data.nombre_carr_conv})
        this.filterUniversidadOForm.patchValue({txt:data.nombre_univ})
        this.filtroCarreraO=false;  this.filtroUniversidadO=false;
        this._convUnivCar.SeleccionarConvUnivCar(data.id_conv_univ_car)
        .then(res=>{
          Object.keys(this.newConvUnivCar.controls).forEach(key => {
            this.newConvUnivCar.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE ConvUnivCar EXITOSA',this.newConvUnivCar.value);
            document.getElementById("btnCrudConvUnivCar").click();
        });
      }
    }
    EliminarConvUnivCar(id){
      this._convUnivCar.EliminarConvUnivCar(id)
      .then(res => {
        console.log(res.data);
        this.CargarConvUnivCar();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR ConvUnivCar',err.response.data.message);
      });
  }

  //#endregion GestionConvUnivCar

}
