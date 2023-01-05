import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-inscripcionantiguo',
  templateUrl: './inscripcionantiguo.component.html',
  styleUrls: ['./inscripcionantiguo.component.css']
})
export class InscripcionantiguoComponent implements OnInit {
  ruta = 'http://localhost:8000/';
  [x: string]: any;

  constructor() { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
      this.ruta = rootVar;
      this.CargarInscripcionantiguo();
      this.CargarInscripcions();
      this.CargarPlanInscripcions();
      this.CargarCarrera();
      this.CargarEstudiantes();
    this.iniciarFormfilterEstudiante();
    this.iniciarFormfilterCarrera();
    this.iniciarFormfilterInscripcion();

    this.AutoCompletarDatosEst(3);
  }
  gg={
    nombre_carre:''
  }
// INTRODUCIR nombre CRUD, nombre dataPrincipal(nombreCrud?,dataP?)
AutoCompletarDatosEst(id){
  console.log("ssssss")
    axios.get(this.ruta+'api/InscripcionantiguoGetCarrera/'+id)
    .then(res => {

      this.gg = res.data;
      this.CarreraSelect.NomCarre=this.gg.nombre_carre
      console.log(this.gg);
    }).catch(error =>  {
    console.log("error",error);
    });
  }

ins=[];
planins=[];
est=[];
carre=[];
insant=[];
  isSubmitted = false;
  newInscripcionantiguo =new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_ins_ant:new FormControl(0),
    id_ins: new FormControl(''),
    id_plan_ins:new FormControl(''),
    ins_periodo:new FormControl(''),
    ins_gestion:new FormControl(''),
    turno_ins:new FormControl(''),
    habi_ins:new FormControl(''),
    obs_ins:new FormControl(''),
    tipo_de_pago:new FormControl(''),
    fec_ins: new FormControl(''),
  })

  semFiltrado=[]; //LISTA ENCONTRADA
    EstudianteSelect={//VALOR SELECCIONADO
      id_est:'',
      nombre_est:'',
      ci_est:'',

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
          this.semFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.semFiltrado)
      })
    }

    filterEstudiante(Datafilter){

      this.semFiltrado = this.est.filter(a => (a.NomC.indexOf(Datafilter)) > -1)
      //PARA HACER BUSQUEDAS POR SEPARADO
      // this.semFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
    }

// Completar Carrera

semFiltrado1=[]; //LISTA ENCONTRADA
    CarreraSelect={//VALOR SELECCIONADO
      id_carre:'',
      nombre_carre:'',

      NomCarre:''
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
          this.semFiltrado1 = [];
        }
        console.log('DATA ENCONTRADO', this.semFiltrado1)
      })
    }

    filterCarrera(Datafilter){

      this.semFiltrado1 = this.carre.filter(a => (a.NomCarre.indexOf(Datafilter)) > -1)
      //PARA HACER BUSQUEDAS POR SEPARADO
      // this.semFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
    }
// Completar Inscripcion

semFiltrado2=[]; //LISTA ENCONTRADA
    InscripcionSelect={//VALOR SELECCIONADO
      id_ins:'',
      id_est:'',
      id_carre:'',

      NomIns:''
    };
    filtroInscripcion=false; //ESTADO ngIf Lista
    filterInscripcionForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterInscripcion(){ //ESTO SE DEBE LLAMAR
      this.filterInscripcionForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroInscripcion=true;
        if(response && response.length){
          this.filterInscripcion(response);
        } else {
          this.semFiltrado2= [];
        }
        console.log('DATA ENCONTRADO', this.semFiltrado2)
      })
    }

    filterInscripcion(Datafilter){

      this.semFiltrado2 = this.ins.filter(a => (a.NomIns.indexOf(Datafilter)) > -1)
      //PARA HACER BUSQUEDAS POR SEPARADO
      // this.semFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
    }

    CargarInscripcionantiguo(){
      axios.get(this.ruta+'api/Inscripcionantiguo')
      .then(res => {
        console.log(res.data);
        this.ins = res.data;
      }).catch(err =>  {
      console.log("err",err);
      });
    }
    CargarInscripcions(){
      axios.get(this.ruta+'api/Inscripcion')
      .then(res => {
        res.data.forEach(atributo2 =>{
          atributo2.NomIns= atributo2.nombre_est+' '+atributo2.ape_p_est+' '+atributo2.ape_m_est+' -> '+atributo2.nombre_carre

        }
        )
        console.log(res.data);
        this.ins = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    CargarPlanInscripcions(){
      axios.get(this.ruta+'api/Planinscripcion')
      .then(res => {
        console.log(res.data);
        this.planins = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    CargarCarrera(){
      axios.get(this.ruta+'api/Carrera')
      .then(res => {
        res.data.forEach(atributo1 =>{
          atributo1.NomCarre= atributo1.nombre_carre
        })

        console.log(res.data);
        this.carre = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    CargarEstudiantes(){
      axios.get(this.ruta+'api/Estudiante')
      .then(res => {

        res.data.forEach(atributo =>{
          atributo.NomC= atributo.nombre_est+' '+atributo.ape_p_est+' '+atributo.ape_m_est
        })
        this.est = res.data;
        console.log(this.est);
      }).catch(err =>  {
      console.log("err");
      });
    }
    CODEst;
    AutocompletarEstudiantes(){
      this._est.SeleccionarEstudiante(this.CODEst)
      .then(res => {
        this.newInscripcionantiguo.patchValue({
          // ejemplo: :'',
          id_est:res.data.id_est
        })
      }).catch(err =>  {
      console.log("err");
      });
    }

  AgregarModificarInscripcionantiguo(){
    this.isSubmitted=true;
    if (this.newInscripcionantiguo.invalid) {
      return;
    } else {
      let id = this.newInscripcionantiguo.controls.id_ins_ant.value;
      console.log(this.newInscripcionantiguo.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        this.Inscripcionantiguo.AgregarInscripcionantiguo(this.newInscripcionantiguo.value)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE',res.data);
          this.CargarInscripcionantiguo();
          this.resetInscripcionantiguo();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR Inscripcionantiguo');
          console.log(error.response.data.message);
        })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this.Inscripcionantiguo.ModificarInscripcionantiguo(this.newInscripcionantiguo.value,this.newInscripcionantiguo.value.id_ins_ant)
        .then(res=>{
          console.log('SE MODIFICO CORRECTAMENTE',res.data);
          this.CargarInscripcionantiguo();
          this.resetInscripcionantiguo();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR');
          console.log(error.response.data.message);
        })
      }
    }
  }
  // CargarInscripcionantiguo() {
  //   throw new Error('Method not implemented.');
  // }
  resetInscripcionantiguo(){
    this.newInscripcionantiguo.reset();
    this.isSubmitted =false;
  }
  SeleccionarInscripcionantiguo(id){
    if(id){
      const dataInscripcionantiguo = this.insant.find(x => x.id_ins_ant === id)
      if(!dataInscripcionantiguo) return;
      this.Inscripcionantiguo.SeleccionarInscripcionantiguo(id)
      .then(res=>{
        Object.keys(this.newInscripcionantiguo.controls).forEach(key => {
          this.newInscripcionantiguo.controls[key].setValue(res.data[key]);
        });
        console.log('SELECCION EXITOSA',this.newInscripcionantiguo.value);
          document.getElementById("btnCrudInscripcionantiguo").click();
      });
    }
  }
}
