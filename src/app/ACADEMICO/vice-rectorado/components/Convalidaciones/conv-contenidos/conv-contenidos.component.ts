import { VincularContenidosService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/TemasContenidos/VincularContenidos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConvContenidosService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/TemasContenidos/conv-contenidos.service';
import { ConvTemasService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/TemasContenidos/conv-temas.service';
import { TemaContenidosService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/TemasContenidos/tema-contenidos.service';
import { ConvRegistrarService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/conv-registrar.service';
import { HerramientasService } from 'src/app/core/services/herramientas.service';

@Component({
  selector: 'app-conv-contenidos',
  templateUrl: './conv-contenidos.component.html',
  styleUrls: ['./conv-contenidos.component.css']
})
export class ConvContenidosComponent implements OnInit {

  constructor(protected _TC: TemaContenidosService, protected _cargarScrips: HerramientasService,
  protected _ConvT: ConvTemasService, protected _ConvC:ConvContenidosService, protected _vinC: VincularContenidosService,
  protected _matO:ConvRegistrarService
  ) {
    this._cargarScrips.CargarScript(["Tools"])
  }

  ngOnInit(): void {
    this.CargarTemaContenidos();
    this.CargarConvContenidos();
    this.CargarConvTemas();
    this.CargarVincularContenidos();

    this.CargarMateriasOrigen()

    this.iniciarFormfilterConvTema();
    this.iniciarFormfilterConvContenido();
    this.iniciarFormfilterMateriaO();
    this.iniciarFormfilterTemaVin();
  }
  MensajeInformacion(titulo,descripcion,icono){
    this._cargarScrips.MensajeInformacion(titulo,descripcion,icono)
  }
  //#region FILTRADORES
    convTFiltrado=[]; //LISTA ENCONTRADA
    convTFiltradoRespaldo=[]; //LISTA ENCONTRADA
    ConvTemaSelect={//VALOR SELECCIONADO
      nombre_tema_conv:''
    };
    filtroConvTema=false; //ESTADO ngIf Lista
    filterConvTemaForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterConvTema(){ //ESTO SE DEBE LLAMAR
      this.filterConvTemaForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(res => {
        console.log('entered data is ', res);
        this.filtroConvTema=true;
        if(res && res.length){
          this.convT = this.convTRespaldo.filter(a => (a.nombre_tema_conv.indexOf	(res)) > -1 )
        } else {
          this.convT = this.convTRespaldo;
        }
        console.log('DATA ENCONTRADO', this.convTFiltrado)
      })
    }

    filterConvTema(Datafilter){
      this.convTFiltrado = this.convT.filter(a => (a.nombre_tema_conv.indexOf(Datafilter)) > -1)
    }

      convCFiltrado=[]; //LISTA ENCONTRADA
      ConvContenidoSelect={//VALOR SELECCIONADO
        nombre_conte:''
      };
      filtroConvContenido=false; //ESTADO ngIf Lista
      filterConvContenidoForm= new FormGroup({
        txt:new FormControl(''),
      });
      iniciarFormfilterConvContenido(){ //ESTO SE DEBE LLAMAR
        this.filterConvContenidoForm.get('txt').valueChanges
        // .pipe(debounceTime(1000))
        .subscribe(response => {
          console.log('entered data is ', response);
          this.filtroConvContenido=true;
          if(response && response.length){
            this.convC = this.convCRespaldo.filter(a => (a.nombre_conte.indexOf	(response)) > -1 )
          } else {
            this.convC = this.convCRespaldo;
          }
          console.log('DATA ENCONTRADO', this.convCFiltrado)
        })
      }

      filterConvContenido(Datafilter){
         this.convCFiltrado = this.convC.filter(a => (a.nombre_conte.indexOf(Datafilter)) > -1)
      }

      // FILTRADORES PARA VINCULAR CONTENIDOS
      //FILTRADOR V3: NombreFiltro => MateriaO, dataP=> matO
        matOFiltrado=[]; //LISTA ENCONTRADA
        MateriaOSelect={//VALOR SELECCIONADO
          nombre_mater_conv:''
        };
        filtroMateriaO=false; //ESTADO ngIf Lista
        filterMateriaOForm= new FormGroup({
          txt:new FormControl(''),
        });
        iniciarFormfilterMateriaO(){ //ESTO SE DEBE LLAMAR
          this.filterMateriaOForm.get('txt').valueChanges
          // .pipe(debounceTime(1000))
          .subscribe(response => {
            console.log('entered data is ', response);
            this.filtroMateriaO=true;
            if(response && response.length){
              this.filterMateriaO(response);
            } else {
              this.matOFiltrado = [];
            }
            console.log('DATA ENCONTRADO', this.matOFiltrado)
          })
        }

        filterMateriaO(Datafilter){
          //PARA HACER BUSQUEDAS POR SEPARADO
          this.matOFiltrado = this.matO.filter(a => (a.nombre_mater_conv.indexOf(Datafilter)) > -1)
        }

        //FILTRADOR V3: NombreFiltro => TemaVin, dataP=> temaVin
          temaVinFiltrado=[]; //LISTA ENCONTRADA
          TemaVinSelect={//VALOR SELECCIONADO
            nombre_tema_conv:''
          };
          filtroTemaVin=false; //ESTADO ngIf Lista
          filterTemaVinForm= new FormGroup({
            txt:new FormControl(''),
          });
          iniciarFormfilterTemaVin(){ //ESTO SE DEBE LLAMAR
            this.filterTemaVinForm.get('txt').valueChanges
            // .pipe(debounceTime(1000))
            .subscribe(response => {
              console.log('entered data is ', response);
              this.filtroTemaVin=true;
              if(response && response.length){
                this.vcm = this.vcmRespaldo.filter(a => (a.Buscar.indexOf	(response)) > -1 || (a.id_tema_univcarremater1.indexOf	(response)) > -1 )
              } else {
                this.vcm = this.vcmRespaldo;
              }
              console.log('DATA ENCONTRADO', this.temaVinFiltrado)
            })
          }

          filterTemaVin(Datafilter){
            this.temaVinFiltrado = this.convT.filter(a => (a.nombre_tema_conv.indexOf(Datafilter)) > -1)
          }
  //#endregion FILTRADORES

  //#region CARGA EXTRAS
  matO=[]
  CargarMateriasOrigen(){ //cargar materias de tb univer carre materias o ConvRegistrar
    this._matO.ObtenerUniCarreMats()
    .then(res=>{
      this.matO=res.data;
      console.log("LISTAR MATERIAS ORIGEN", this.matO)
    })
  }
  //#endregion CARGA EXTRAS

  //#region CRUD P, TEMA CONTENIDOS

  public pageCrudPrincipal:Number;
    tc=[];
    isSubmitted = false;
    newTemaContenidos =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_tema_conte:new FormControl(0),
      id_conv_tema: new FormControl(''),
      id_conv_conte:new FormControl(''),
    })
    CargarTemaContenidos(){
      this._TC.ObtenerTemaContenidos()
      .then(res => {
        console.log('LISTA TEMA CONTENIDOS',res.data);
        this.tc = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    resetTemaContenidos(){
      this.filterConvContenidoForm.patchValue({txt:''})
      this.filterConvTemaForm.patchValue({txt:''})
      this.newTemaContenidos.reset();
      this.isSubmitted =false;
    }
    AgregarModificarTemaContenidos(){
      this.isSubmitted=true;
      if (this.newTemaContenidos.invalid) {
        return;
      } else {
        let id = this.newTemaContenidos.controls.id_tema_conte.value;
        console.log(this.newTemaContenidos.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._TC.AgregarTemaContenidos(this.newTemaContenidos.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE',res.data);
            this.CargarTemaContenidos();
            this.resetTemaContenidos();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR TemaContenidos');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._TC.ModificarTemaContenidos(this.newTemaContenidos.value,this.newTemaContenidos.value.id_tema_conte)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE',res.data);
            this.CargarTemaContenidos();
            this.resetTemaContenidos();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarTemaContenidos(data){
      if(data.id_tema_conte){

        this.filterConvContenidoForm.patchValue({txt:data.nombre_conte})
        this.filterConvTemaForm.patchValue({txt:data.nombre_tema_conv})
        this.filtroConvTema=false; this.filtroConvContenido=false;
        const dataTemaContenidos = this.tc.find(x => x.id_tema_conte === data.id_tema_conte)
        if(!dataTemaContenidos) return;
        this._TC.SeleccionarTemaContenidos(data.id_tema_conte)
        .then(res=>{
          Object.keys(this.newTemaContenidos.controls).forEach(key => {
            this.newTemaContenidos.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION EXITOSA',this.newTemaContenidos.value);
            document.getElementById("btnCrudTemaContenidos").click();
        });
      }

    }
    EliminarTemaContenidos(id){
      this._TC.EliminarTemaContenidos(id)
      .then(res => {
        console.log(res.data);
        this.CargarTemaContenidos();
      }).catch(err =>  {
      console.log("err",err);
      });
  }
  //#endregion TEMA CONTENIDOS

  //#region CONV  TEMAS
  public pageTema:Number;
    AdicionShow=false;
    convT=[];
    convTRespaldo=[];
    newConvTemas =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_conv_tema:new FormControl(0),
      nombre_tema_conv: new FormControl(''),
    })
    CargarConvTemas(){
      this._ConvT.ObtenerConvTemas()
      .then(res => {
        console.log('LISTA CONV TEMAS',res.data);
        this.convT = res.data;
        this.convTRespaldo = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    resetConvTemas(){
      this.newConvTemas.reset();
      this.isSubmitted =false;
    }
    AgregarModificarConvTemas(){
      this.isSubmitted=true;
      if (this.newConvTemas.invalid) {
        return;
      } else {
        let id = this.newConvTemas.controls.id_conv_tema.value;
        console.log(this.newConvTemas.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._ConvT.AgregarConvTemas(this.newConvTemas.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE',res.data);
            this.CargarConvTemas();
            this.resetConvTemas();
            this.AdicionShow=false;
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR ConvTemas');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._ConvT.ModificarConvTemas(this.newConvTemas.value,this.newConvTemas.value.id_conv_tema)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE',res.data);
            this.CargarConvTemas();
            this.resetConvTemas();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarConvTemas(id){
      if(id){
        const dataConvTemas = this.convT.find(x => x.id_conv_tema === id)
        if(!dataConvTemas) return;
        this._ConvT.SeleccionarConvTemas(id)
        .then(res=>{
          Object.keys(this.newConvTemas.controls).forEach(key => {
            this.newConvTemas.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION EXITOSA',this.newConvTemas.value);
            // document.getElementById("btnCrudConvTemas").click();
        });
      }
    }
    EliminarConvTemas(id){
      this._ConvT.EliminarConvTemas(id)
      .then(res => {
        console.log(res.data);
        this.CargarConvTemas();
      }).catch(err =>  {
      console.log("err",err);
      });
  }
  //#endregion CONV TEMAS

  //#region CONV CONTENIDOS
  public pageContenido:Number;
  AdicionShowContenidos=false;
    convC=[];
    convCRespaldo=[];
    newConvContenidos =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_conv_conte:new FormControl(0),
      nombre_conte:new FormControl('')
    })
    CargarConvContenidos(){
      this._ConvC.ObtenerConvContenidos()
      .then(res => {
        console.log('LISTA CONV CONTENIDOS',res.data);
        this.convC = res.data;
        this.convCRespaldo = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    resetConvContenidos(){
      this.newConvContenidos.reset();
      this.isSubmitted =false;
    }
    AgregarModificarConvContenidos(datos){
      let data={
        id_conv_conte:datos.id_conv_conte,
        nombre_conte:datos.nombre_conte
      }
      this.isSubmitted=true;
      if (this.newConvContenidos.invalid) {
        return;
      } else {
        let id = this.newConvContenidos.controls.id_conv_conte.value;
        console.log(this.newConvContenidos.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._ConvC.AgregarConvContenidos(this.newConvContenidos.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE',res.data);
            this.CargarConvContenidos();
            this.resetConvContenidos();
            this.AdicionShowContenidos=false
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR ConvContenidos');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._ConvC.ModificarConvContenidos(data,data.id_conv_conte)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE',res.data);
            this.CargarConvContenidos();
            this.resetConvContenidos();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarConvContenidos(id){
      if(id){
        const dataConvContenidos = this.convC.find(x => x.id_conv_conte === id)
        if(!dataConvContenidos) return;
        this._ConvC.SeleccionarConvContenidos(id)
        .then(res=>{
          Object.keys(this.newConvContenidos.controls).forEach(key => {
            this.newConvContenidos.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION EXITOSA',this.newConvContenidos.value);
            // document.getElementById("btnCrudConvContenidos").click();
        });
      }
    }
    EliminarConvContenidos(id){
      this._ConvC.EliminarConvContenidos(id)
      .then(res => {
        console.log(res.data);
        this.CargarConvContenidos();
      }).catch(err =>  {
      console.log("err",err);
      });
  }
  //#endregion CONV CONTENIDOS

  //#region VINCULAR CONTENIDOS
  //CRUD V3: idPK=> id_tema_univcarremater, nomService=> _vinC, nombreCRUD=> VincularContenidos,  dataP=> vcm, isSubmitted=>isSubmitted
  public pageVincularContenido:Number;
    vcm=[];
    vcmRespaldo=[];
    newVincularContenidos =new FormGroup({
      // attr:new FormControl('',[Validators.required])
      id_tema_univcarremater:new FormControl(0),
      id_univ_carre_mater:new FormControl(''),
      id_conv_tema:new FormControl(''),
      nro_tema_conv:new FormControl(''),



    })
    CargarVincularContenidos(){
      this._vinC.ObtenerVincularContenidos()
      .then(res => {
        console.log("SE CARGO VINCULAR CONTENIDOS",res.data);
        res.data.forEach(e => {
          // if (e.nombre_cat_prod=='CATEGORIA 1') {
          //     e.nombre_cat_prod='HOLA XD'
          // }
          e.Buscar=e.nombre_mater_conv+" "+e.nombre_tema_conv;
          e.id_tema_univcarremater1 = e.id_tema_univcarremater+"";
          e.Editando=false
        });
        this.vcm = res.data;
        this.vcmRespaldo = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    resetVincularContenidos(){
      this.newVincularContenidos.reset();
      this.isSubmitted =false;
    }
    AgregarModificarVincularContenidos(){
      this.isSubmitted=true;
      if (this.newVincularContenidos.invalid) {
        return;
      } else {
        let id = this.newVincularContenidos.controls.id_tema_univcarremater.value;
        console.log(this.newVincularContenidos.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._vinC.AgregarVincularContenidos(this.newVincularContenidos.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE',res.data);
            this.CargarVincularContenidos();
            this.resetVincularContenidos();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR VincularContenidos');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._vinC.ModificarVincularContenidos(this.newVincularContenidos.value,this.newVincularContenidos.value.id_tema_univcarremater)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE',res.data);
            this.CargarVincularContenidos();
            this.resetVincularContenidos();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarVincularContenidos(data){
      //console.log("hiciste click",data)
      if(data.id_tema_conte){
        const dataVincularContenidos = this.vcm.find(x => x.id_tema_univcarremater === data.id_tema_conte)
        if(!dataVincularContenidos) return;
        this._vinC.SeleccionarVincularContenidos(data.id_tema_conte)
        .then(res=>{
          Object.keys(this.newVincularContenidos.controls).forEach(key => {
            this.newVincularContenidos.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION EXITOSA',this.newVincularContenidos.value);
            document.getElementById("btnCrudVincularContenidos").click();

        });
      }
    }
    EliminarVincularContenidos(id){
      this._vinC.EliminarVincularContenidos(id)
      .then(res => {
        console.log(res.data);
        this.CargarVincularContenidos();
      }).catch(err =>  {
      console.log("err",err);
      });
  }
 	//#endregion BUSCADOR

  //#endregion VINCULAR CONTENIDOS
}
