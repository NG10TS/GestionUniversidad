import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EgresadosService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/Egresados.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';

@Component({
  selector: 'app-egresados',
  templateUrl: './egresados.component.html',
  styleUrls: ['./egresados.component.css']
})
export class EgresadosComponent implements OnInit {

  ruta;
  constructor(protected _eg: EgresadosService,
    protected _est:EstudiantesService, protected _carr:CarrerasService
  ) { }
  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarEgresados();
    this.CargarEstudiantes();
    this.CargarCarrera();
    this.iniciarFormfilterEstudiante();

  }
  //FILTRADOR V3: NombreFiltro => Estudiante, dataP=> est
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
      // || (a.cod_est.indexOf(Datafilter)) > -1
      this.estFiltrado = this.est.filter(a => (a.NomC.indexOf(Datafilter)) > -1 ||  (a.cod_est.indexOf(Datafilter)) > -1 )
    }
    autoCompletar(a){
      this.EstudianteSelect.NomC=a.ape_p_est+' '+a.ape_m_est+' '+a.nombre_est;
      this.newEgresados.patchValue({id_est:a.id_est});
      this._carr.ObternerCarreraEstudiante(a.id_est)
      .then(res => {
        console.log(res.data);
        this.newEgresados.patchValue({
          id_carre:res.data.id_carre
        })
      }).catch(error =>  {
      console.log("error",error);
      });
    }
//#region EGRESADOS
  egre =[ ];
  est =[ ];
  carre =[ ];
  EgresadosSeleccionado = {
    //ejemplo... id_titulado:'',
    id_titulado:'',
    id_est:'',
    id_carre:'',
    fin_periodo_ti:'',
    fin_gestion_ti:'',
    nota_rot:'',
    fecha_rot:'',
    nota_pane1:'',
    fecha_pane1:'',
    nota_pane2:'',
    fecha_pane2:'',
    cite_habil:'',
    fecha_habil:'',
    cite_cnt:'',
    fecha_cnt:'',
    tipo_defensa:'',
    acta_defensa:'',
    nota_defensa:'',
    nro_dip:'',
    fec_dip :'',
    fec_trans_egr_ti:'',
    // NombreCompleto:'',
    // nombre_carre:'',

  };

  newEgresados= new FormGroup({
    // ejemplo: id_titulado:new FormControl(''),
    id_est:new FormControl(''),
    id_carre:new FormControl(''),
    fin_periodo_ti:new FormControl(''),
    fin_gestion_ti:new FormControl(''),
    nota_rot:new FormControl(''),
    fecha_rot:new FormControl(''),
    nota_pane1:new FormControl(''),
    fecha_pane1:new FormControl(''),
    nota_pane2:new FormControl(''),
    fecha_pane2:new FormControl(''),
    cite_habil:new FormControl(''),
    fecha_habil:new FormControl(''),
    cite_cnt:new FormControl(''),
    fecha_cnt:new FormControl(''),
    tipo_defensa:new FormControl(''),
    acta_defensa:new FormControl(''),
    nota_defensa:new FormControl(''),
    nro_dip:new FormControl(''),
    fec_dip:new FormControl(''),
    fec_trans_egr_ti:new FormControl(''),

  });

  SeleccionarEgresados(id,Modo){
    this._eg.SeleccionarEgresados(id)
    .then(res => {
      var a = res.data;
      this.EgresadosSeleccionado = a;
      console.log('INFO DATO SELECCIONADO',this.EgresadosSeleccionado);
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
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  CargarEgresados(){
    this._eg.ObtenerEgresados()
    .then(res => {
      console.log(res.data);
      this.egre = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log(res.data);
      res.data.forEach(e => {
        e.NomC=e.ape_p_est+' '+e.ape_m_est+' '+e.nombre_est
        e.cod_est = e.cod_est+''
      });
      this.est = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarCarrera(){
    this._carr.ObtenerCarreras()
    .then(res => {
      console.log(res.data);
      this.carre = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarEgresados(){
    const formData = new FormData();
    //ejemplo formData.append('atributo',this.newEgresados.value.atributo);
    formData.append('id_est',this.newEgresados.value.id_est);
    formData.append('id_carre',this.newEgresados.value.id_carre);
    formData.append('fin_periodo_ti',this.newEgresados.value.fin_periodo_ti);
    formData.append('fin_gestion_ti',this.newEgresados.value.fin_gestion_ti);
    formData.append('nota_rot',this.newEgresados.value.nota_rot);
    formData.append('fecha_rot',this.newEgresados.value.fecha_rot);
    formData.append('nota_pane1',this.newEgresados.value.nota_pane1);
    formData.append('fecha_pane1',this.newEgresados.value.fecha_pane1);
    formData.append('nota_pane2',this.newEgresados.value.nota_pane2);
    formData.append('fecha_pane2',this.newEgresados.value.fecha_pane2);
    formData.append('cite_habil',this.newEgresados.value.cite_habil);
    formData.append('fecha_habil',this.newEgresados.value.fecha_habil);
    formData.append('cite_cnt',this.newEgresados.value.cite_cnt);
    formData.append('fecha_cnt',this.newEgresados.value.fecha_cnt);
    formData.append('tipo_defensa',this.newEgresados.value.tipo_defensa);
    formData.append('acta_defensa',this.newEgresados.value.acta_defensa);
    formData.append('nota_defensa',this.newEgresados.value.nota_defensa);
    formData.append('nro_dip',this.newEgresados.value.nro_dip);
    formData.append('fec_dip',this.newEgresados.value.fec_dip);
    formData.append('fec_trans_egr_ti',this.newEgresados.value.fec_trans_egr_ti);
    console.log('datos a gregar',this.newEgresados.value)
    this._eg.AgregarEgresados(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarEgresados();
      this.LimpiarEgresados();
    })
    .catch(error=>{
      console.log('ERROR AL INTENTAR AÑADIR DATO');
      console.log(error);
    })
  }

  ModificarEgresados(Egresados){
    console.log('DATOS A ACTUALIZAR',Egresados)
    const formData = new FormData();
    //ejemplo... formData.append('id',Egresados.id);
    formData.append('id_titulado',Egresados.id_titulado);
    formData.append('id_est',Egresados.id_est);
    formData.append('id_carre',Egresados.id_carre);
    formData.append('fin_periodo_ti',Egresados.fin_periodo_ti);
    formData.append('fin_gestion_ti',Egresados.fin_gestion_ti);
    formData.append('nota_rot',Egresados.nota_rot);
    formData.append('fecha_rot',Egresados.fecha_rot);
    formData.append('nota_pane1',Egresados.nota_pane1);
    formData.append('fecha_pane1',Egresados.fecha_pane1);
    formData.append('nota_pane2',Egresados.nota_pane2);
    formData.append('fecha_pane2',Egresados.fecha_pane2);
    formData.append('cite_habil',Egresados.cite_habil);
    formData.append('fecha_habil',Egresados.fecha_habil);
    formData.append('cite_cnt',Egresados.cite_cnt);
    formData.append('fecha_cnt',Egresados.fecha_cnt);
    formData.append('tipo_defensa',Egresados.tipo_defensa);
    formData.append('acta_defensa',Egresados.acta_defensa);
    formData.append('nota_defensa',Egresados.nota_defensa);
    formData.append('nro_dip',Egresados.nro_dip);
    formData.append('fec_dip',Egresados.fec_dip);
    formData.append('fec_trans_egr_ti',Egresados.fec_trans_egr_ti);
    this._eg.ModificarEgresados(formData,Egresados.id_titulado)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarEgresados();
      this.LimpiarEgresados()
    })
    .catch(error=>{
      console.log('HAY ERROR AL INTENTAR MODIFICAR');
      console.log(error);
      this.CargarEgresados();
    })
  }
  EliminarEgresados(id){
    this._eg.EliminarEgresados(id)
    .then(res => {
      console.log(res.data);
      this.CargarEgresados();
    }).catch(error =>  {
    console.log("err",error);
    });
  }

  LimpiarEgresados()
  {
  this.EgresadosSeleccionado = {
    // ejemplo: id_titulado:'',
    id_titulado:'',
    id_est:'',
    id_carre:'',
    fin_periodo_ti:'',
    fin_gestion_ti:'',
    nota_rot:'',
    fecha_rot:'',
    nota_pane1:'',
    fecha_pane1:'',
    nota_pane2:'',
    fecha_pane2:'',
    cite_habil:'',
    fecha_habil:'',
    cite_cnt:'',
    fecha_cnt:'',
    tipo_defensa:'',
    acta_defensa:'',
    nota_defensa:'',
    nro_dip:'',
    fec_dip:'',
    fec_trans_egr_ti:'',
    // NombreCompleto:'',
    // nombre_carre:'',

  };
  this.newEgresados.patchValue({
    // ejemplo: id_titulado:'',
    id_est:'',
    id_carre:'',
    fin_periodo_ti:'',
    fin_gestion_ti:'',
    nota_rot:'',
    fecha_rot:'',
    nota_pane1:'',
    fecha_pane1:'',
    nota_pane2:'',
    fecha_pane2:'',
    cite_habil:'',
    fecha_habil:'',
    cite_cnt:'',
    fecha_cnt:'',
    tipo_defensa:'',
    acta_defensa:'',
    nota_defensa:'',
    nro_dip:'',
    fec_dip :'',
    fec_trans_egr_ti:'',
    // NombreCompleto:'',
    // nombre_carre:'',
  })
 }
//#endregion EGRESADOS

}
