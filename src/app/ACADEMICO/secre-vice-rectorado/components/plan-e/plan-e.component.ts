import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';
import { PrerrequisitosService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/prerrequisitos.service';
import { SemestreService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/semestre.service';
import { CodPlanesService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/cod-planes.service';
import { PlanEService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/plan-e.service';


@Component({
  selector: 'app-plan-e',
  templateUrl: './plan-e.component.html',
  styleUrls: ['./plan-e.component.css']
})
export class PlanEComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  carmat=[];
  carr=[ ];
  mat=[ ];
  sem=[ ];

  prerreq=[]; //para obtener prerrequisitos
  newCarreMat = new FormGroup({
    id_carre_mater:new FormControl(''),
    id_carre:new FormControl(''),
    id_materia:new FormControl(''),
    id_sem:new FormControl(''),
    cred_materia:new FormControl(''),
    ht_materia:new FormControl(''),
    hp_materia:new FormControl(''),
    tse_materia:new FormControl(''),
    tsm_materia:new FormControl(''),
    cat_materia:new FormControl(''),
    are_materia:new FormControl(''),
    ord_materia:new FormControl(''),
    pos_x_materia:new FormControl(''),
    pos_y_materia:new FormControl(''),
    obs_materia:new FormControl(''),
    id_planE:new FormControl('')
  });
  CarreMatseleccionado = {
    id_carre_mater:'',
    id_carre:'',
    id_materia:'',
    id_sem:'',
    cred_materia:'',
    ht_materia:'',
    hp_materia:'',
    tse_materia:'',
    tsm_materia:'',
    cat_materia:'',
    are_materia:'',
    ord_materia:'',
    pos_x_materia:'',
    pos_y_materia:'',
    obs_materia:'',
    id_planE:''

  }


  constructor(protected _carrMatPlanE: PlanEService,
    protected _carr: CarrerasService, protected _mat: MateriasService, protected _sem: SemestreService,
    protected _prerreq: PrerrequisitosService, protected _codPlan:CodPlanesService
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarCarreMats();
    this.CargarPrerrequisito();
    this.CargarCarrera();
    this.CargarMateria();
    this.CargarSemestre();
    this.CargarCodPlanes();
    this.iniciarFormfilterSemestre();
    this.iniciarFormfilterCarrera();
    this.iniciarFormfilterMateria();
  }
  //#region FILTRADORES
//FILTRADOR V3: NombreFiltro => Materia, dataP=> mat
  matFiltrado=[]; //LISTA ENCONTRADA
  MateriaSelect={//VALOR SELECCIONADO
    id_materia:'',
    nombre_mat:'',
    codigo_mat:'',
  };
  filtroMateria=false; //ESTADO ngIf Lista
  filterMateriaForm= new FormGroup({
    txt:new FormControl(''),
  });
  iniciarFormfilterMateria(){ //ESTO SE DEBE LLAMAR
    this.filterMateriaForm.get('txt').valueChanges
    // .pipe(debounceTime(1000))
    .subscribe(response => {
      console.log('entered data is ', response);
      this.filtroMateria=true;
      if(response && response.length){
        this.filterMateria(response);
      } else {
        this.matFiltrado = [];
      }
      console.log('DATA ENCONTRADO', this.matFiltrado)
    })
  }

  filterMateria(Datafilter){
    //PARA HACER BUSQUEDAS POR SEPARADO
    // this.matFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
    this.matFiltrado = this.mat.filter(a => (a.codigo_mat.indexOf(Datafilter)) > -1 || (a.nombre_mat.indexOf(Datafilter)) > -1)
  }

  carrFiltrado=[]; //LISTA ENCONTRADA
  CarreraSelect={//VALOR SELECCIONADO
    id_carre:'',
    nombre_carre:'',
    sigla_carre:'',
    habi_carre:''
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
    this.carrFiltrado = this.carr.filter(a => a.nombre_carre.indexOf(Datafilter) > -1 || a.sigla_carre.indexOf(Datafilter) > -1)
  }

  semFiltrado=[]; //LISTA ENCONTRADA
  SemestreSelect={//VALOR SELECCIONADO
    id_sem:'',
    numero:'',
    desc_sem:''
  };
  filtroSemestre=false; //ESTADO ngIf Lista
  filterSemestreForm= new FormGroup({
    txt:new FormControl(''),
  });
  iniciarFormfilterSemestre(){ //ESTO SE DEBE LLAMAR
    this.filterSemestreForm.get('txt').valueChanges
    // .pipe(debounceTime(1000))
    .subscribe(response => {
      console.log('entered data is ', response);
      this.filtroSemestre=true;
      if(response && response.length){
        this.filterSemestre(response);
      } else {
        this.semFiltrado = [];
      }
      console.log('DATA ENCONTRADO', this.semFiltrado)
    })
  }

  filterSemestre(Datafilter){
    this.semFiltrado = this.sem.filter(a => a.desc_sem.indexOf(Datafilter) > -1 || a.numero.toString().indexOf(Datafilter) > -1 )
  }
  //#endregion FITLRADORES

  //#region CRUD PLANES V3
  codPlan=[];
  isSubmitted = false;
  newCodPlanes =new FormGroup({
    id_planE:new FormControl(0),
    cod_gestE:new FormControl('',[Validators.required])
  })
  CargarPrerrequisito(){
    this._prerreq.ObtenerPrerrequisitos()
    .then(res => {
      console.log(res.data);
      this.prerreq = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarCodPlanes(){
    this._codPlan.ObtenerPlanes()
    .then(res => {
      console.log(res.data);
      this.codPlan = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  resetCodPlanes(){
    this.newCodPlanes.reset();
    this.isSubmitted =false;
  }
  AgregarModificarCodPlanes(){
    this.isSubmitted=true;
    if (this.newCodPlanes.invalid) {
      return;
    } else {
      let id = this.newCodPlanes.controls.id_planE.value;
      console.log(this.newCodPlanes.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this._codPlan.AgregarPlanes(this.newCodPlanes.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE',res.data);
          this.CargarCodPlanes();
          this.resetCodPlanes();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR CodPlanes');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._codPlan.ModificarPlanes(this.newCodPlanes.value,this.newCodPlanes.value.id_planE)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE',res.data);
          this.CargarCodPlanes();
          this.resetCodPlanes();
        })
        .catch(error=>{
          console.log('ERROR AL MODIFICAR CARRERA');
          console.log(error.response.data.message);
        })
      }
    }
  }
  SeleccionarCodPlanes(id){
    //ESTA PARTE DE CODIGO SIRVE PARA CARGAR POR ID
    if(id){
      const dataCodPlanes = this.codPlan.find(x => x.id_planE === id)
      if(!dataCodPlanes) return;
      this._codPlan.SeleccionarPlanes(id)
      .then(res=>{
        Object.keys(this.newCodPlanes.controls).forEach(key => {
          this.newCodPlanes.controls[key].setValue(res.data[key]);
        });
        console.log('CARGACION EXITOSA',res);
        console.log(this.newCodPlanes.value);
      });
    }
  }
  EliminarCodPlanes(id){
    this._codPlan.EliminarPlanes(id)
    .then(res => {
      console.log(res.data);
      this.CargarCodPlanes();
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion CRUD PLANES


//#region  CARGA EXTRAS
  ObtenerPrerrequisitos(id){
    this._prerreq.ObtenerPrerrequisitosFK(id)
    .then(res => {
      this.prerreq = res.data;
      console.log('PRERREQUISITO CARGADO:',this.prerreq);
      document.getElementById("btnOpenModalMosPrerreq").click();
    }).catch(err =>  {
    console.log("err");
    });
  }
//#region  CARGA EXTRAS
  CargarMateria(){
    this._mat.ObtenerMaterias()
    .then(res => {
      console.log('lista de materias',res.data);
      this.mat = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarSemestre(){
    this._sem.ObtenerSemestres()
    .then(res => {
      console.log(res.data);
      this.sem = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarCarrera(){
    this._carr.ObtenerCarreras()
    .then(res => {

      this.carr = res.data;
      console.log('carr data',res.data);
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion CARGA EXTRAS

  //#region CRUD PRINCIPAL PLAN E
  LimpiarCarreMats(){
    this.filterCarreraForm.patchValue({txt:''})
    this.filterSemestreForm.patchValue({txt:''})
    this.filterMateriaForm.patchValue({txt:''})
    // this.SemestreSelect.desc_sem=''
    // this.CarreraSelect.nombre_carre=''
    // this.MateriaSelect.nombre_mat=''
    this.CarreMatseleccionado = {
      id_carre_mater:'',
      id_carre:'',
      id_materia:'',
      id_sem:'',
      cred_materia:'',
      ht_materia:'',
      hp_materia:'',
      tse_materia:'',
      tsm_materia:'',
      cat_materia:'',
      are_materia:'',
      ord_materia:'',
      pos_x_materia:'',
      pos_y_materia:'',
      obs_materia:'',
      id_planE:''
    };
    this.newCarreMat.patchValue({
      id_carre_mater:'',
      id_carre:'',
      id_materia:'',
      id_sem:'',
      cred_materia:'',
      ht_materia:'',
      hp_materia:'',
      tse_materia:'',
      tsm_materia:'',
      cat_materia:'',
      are_materia:'',
      ord_materia:'',
      pos_x_materia:'',
      pos_y_materia:'',
      obs_materia:'',
      id_planE:''
    })
   }


  CargarCarreMats(){
    this._carrMatPlanE.ObtenerCarreMats()
    .then(res => {
      console.log("CARRE MATs CARGADO",res.data);
      this.carmat = res.data;
    }).catch(err =>  {
    console.log("NO SE PUEDO CARGAR CARRE MATs",err.response.data.message);
    });
  }
  AgregarCarreMat(){
    const formData = new FormData();
    // formData.append('id_carre_mater',this.newCarreMat.value.id_carre_mater);
    formData.append('id_carre',this.newCarreMat.value.id_carre);
    formData.append('id_materia',this.newCarreMat.value.id_materia);
    formData.append('id_sem',this.newCarreMat.value.id_sem);
    formData.append('cred_materia',this.newCarreMat.value.cred_materia);
    formData.append('ht_materia',this.newCarreMat.value.ht_materia);
    formData.append('hp_materia',this.newCarreMat.value.hp_materia);
    formData.append('tse_materia',this.newCarreMat.value.tse_materia);
    formData.append('tsm_materia',this.newCarreMat.value.tsm_materia);
    formData.append('cat_materia',this.newCarreMat.value.cat_materia);
    formData.append('are_materia',this.newCarreMat.value.are_materia);
    formData.append('ord_materia',this.newCarreMat.value.ord_materia);
    formData.append('pos_x_materia',this.newCarreMat.value.pos_x_materia);
    formData.append('pos_y_materia',this.newCarreMat.value.pos_y_materia);
    formData.append('obs_materia',this.newCarreMat.value.obs_materia);
    formData.append('id_planE',this.newCarreMat.value.id_planE);
    this._carrMatPlanE.AgregarCarreMat(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarCarreMats();
      this.LimpiarCarreMats();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR PLAN E');
      console.log(error.response.data.message);
    })
  }

  SeleccionarCarreMat(data,Modo){
    this._carrMatPlanE.SeleccionarCarreMat(data.id_carre_mater)
    .then(res => {
      var a = res.data;
      this.CarreMatseleccionado = a;
      this.filterCarreraForm.patchValue({txt:data.nombre_carre})
      this.filterSemestreForm.patchValue({txt:data.desc_sem})
      this.filterMateriaForm.patchValue({txt:data.nombre_mat})
      this.filtroCarrera=false;
      this.filtroSemestre=false;
      this.filtroMateria=false;
      // this.SemestreSelect.desc_sem=data.desc_sem
      // this.CarreraSelect.nombre_carre=data.nombre_carre
      // this.MateriaSelect.nombre_mat=data.nombre_mat
      console.log('INFO EST SELECCIONADO',this.CarreMatseleccionado);
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
  ModificarCarreMat(CarreMat){
    console.log('DATOS A ACTUALIZAR',CarreMat)
    const formData = new FormData();
    formData.append('id_carre_mater',CarreMat.id_carre_mater);
    formData.append('id_carre',CarreMat.id_carre);
    formData.append('id_materia',CarreMat.id_materia);
    formData.append('id_sem',CarreMat.id_sem);
    formData.append('cred_materia',CarreMat.cred_materia);
    formData.append('ht_materia',CarreMat.ht_materia);
    formData.append('hp_materia',CarreMat.hp_materia);
    formData.append('tse_materia',CarreMat.tse_materia);
    formData.append('tsm_materia',CarreMat.tsm_materia);
    formData.append('cat_materia',CarreMat.cat_materia);
    formData.append('are_materia',CarreMat.are_materia);
    formData.append('ord_materia',CarreMat.ord_materia);
    formData.append('pos_x_materia',CarreMat.pos_x_materia);
    formData.append('pos_y_materia',CarreMat.pos_y_materia);
    formData.append('obs_materia',CarreMat.obs_materia);
    formData.append('id_planE',CarreMat.id_planE);
    this._carrMatPlanE.ModificarCarreMat(formData,CarreMat.id_carre_mater)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarCarreMats();
      this.LimpiarCarreMats();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarCarreMats();
    })
  }
  EliminarCarreMat(id){
    this._carrMatPlanE.EliminarCarreMat(id)
    .then(res => {
      console.log(res.data);
      this.CargarCarreMats();
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion CRUD PRINCIPAL
}


