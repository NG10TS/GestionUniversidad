import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { DocentesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/docentes.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';
import { RevalidasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/Revalidas.service';
import { SemestreService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/semestre.service';

@Component({
  selector: 'app-revalidas',
  templateUrl: './revalidas.component.html',
  styleUrls: ['./revalidas.component.css']
})
export class RevalidasComponent implements OnInit {


  ruta = 'http://localhost:8000/';
  CodMatShow=false;
  est=[];
  carre=[];
  mat=[];
  doc=[];
  sem=[];
  rev=[ ];

    newRevalidas= new FormGroup({
    // ejemplo: id_revalida:new FormControl(''),
    // id_revalida:new FormControl(''),
    nro_revalida:new FormControl(''),
    id_est:new FormControl(''),
    id_materia:new FormControl(''),
    id_doc:new FormControl(''),
    id_carre:new FormControl(''),
    nota_revalida:new FormControl(''),
    turno_revalida:new FormControl(''),
    id_sem:new FormControl(''),
    paralelo_revalida:new FormControl(''),
    monto_revalida:new FormControl(''),
    periodo_revalida:new FormControl(''),
    gestion_revalida:new FormControl(''),
    fec_revalida:new FormControl(''),
    fec_trans_revalida:new FormControl(''),
  });

    RevalidasSeleccionado = {
      //ejemplo... id_revalida:'',
      id_revalida:'',
      nro_revalida:'',
      id_est:'',
      id_materia:'',
      id_doc:'',
      id_carre:'',
      nota_revalida:'',
      turno_revalida:'',
      id_sem:'',
      paralelo_revalida:'',
      monto_revalida:'',
      periodo_revalida:'',
      gestion_revalida:'',
      fec_revalida:'',
      fec_trans_revalida:'',

      // nombre_carre:'',
      // NombreCompletoE:'',
      // NombreCompletoD:'',
      // desc_sem:'',
      // numero:'',
      // nombre_mat:'',
      // codigo_mat:'',
    };

  constructor(protected _rev:RevalidasService,
    protected _est:EstudiantesService, protected _mat: MateriasService, protected _doc:DocentesService,
    protected _carr:CarrerasService,protected _sem: SemestreService

  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
      this.ruta = rootVar;
      this.CargarRevalidas();
      this.CargarEstudiantes();
      this.CargarMateria();
      this.CargarDocentes();
      this.CargarCarrera();
      this.CargarSemestre();
  }
  CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log(res.data);
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
  CargarDocentes(){
    this._doc.ObtenerDocentes()
    .then(res => {
      console.log(res.data);
      this.doc = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarMateria(){
    this._mat.ObtenerMaterias()
    .then(res => {
      console.log(res.data);
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

  //#region CRUD PRINCIPAL - REVALIDAS
  LimpiarRevalidas()
  {
  this.RevalidasSeleccionado = {
    // ejemplo: id_revalida:'',
    id_revalida:'',
    nro_revalida:'',
    id_est:'',
    id_materia:'',
    id_doc:'',
    id_carre:'',
    nota_revalida:'',
    turno_revalida:'',
    id_sem:'',
    paralelo_revalida:'',
    monto_revalida:'',
    periodo_revalida:'',
    gestion_revalida:'',
    fec_revalida:'',
    fec_trans_revalida:'',

    // nombre_carre:'',
    // NombreCompletoE:'',
    // NombreCompletoD:'',
    // desc_sem:'',
    // numero:'',
    // nombre_mat:'',
    // codigo_mat:'',

  };
  this.newRevalidas.patchValue({
    // ejemplo: id_revalida:'',
    id_revalida:'',
    nro_revalida:'',
    id_est:'',
    id_materia:'',
    id_doc:'',
    id_carre:'',
    nota_revalida:'',
    turno_revalida:'',
    id_sem:'',
    paralelo_revalida:'',
    monto_revalida:'',
    periodo_revalida:'',
    gestion_revalida:'',
    fec_revalida:'',
    fec_trans_revalida:'',

    // nombre_carre:'',
    // NombreCompletoE:'',
    // NombreCompletoD:'',
    // desc_sem:'',
    // numero:'',
    // nombre_mat:'',
    // codigo_mat:'',
  })
 }
  CargarRevalidas(){
    this._rev.ObtenerRevalidass()
    .then(res => {
      console.log(res.data);
      this.rev = res.data;
    }).catch(error =>  {
    console.log("error",error);
    });
  }
  AgregarRevalidas(){
    const formData = new FormData();
    //ejemplo formData.append('atributo',this.newRevalidas.value.atributo);
    // formData.append('id_revalida',this.newRevalidas.value.id_revalida);

    formData.append('nro_revalida',this.newRevalidas.value.nro_revalida);
    formData.append('id_est',this.newRevalidas.value.id_est);
    formData.append('id_materia',this.newRevalidas.value.id_materia);
    formData.append('id_doc',this.newRevalidas.value.id_doc);
    formData.append('id_carre',this.newRevalidas.value.id_carre);
    formData.append('nota_revalida',this.newRevalidas.value.nota_revalida);
    formData.append('turno_revalida',this.newRevalidas.value.turno_revalida);
    formData.append('id_sem',this.newRevalidas.value.id_sem);
    formData.append('paralelo_revalida',this.newRevalidas.value.paralelo_revalida);
    formData.append('monto_revalida',this.newRevalidas.value.monto_revalida);
    formData.append('periodo_revalida',this.newRevalidas.value.periodo_revalida);
    formData.append('gestion_revalida',this.newRevalidas.value.gestion_revalida);
    formData.append('fec_revalida',this.newRevalidas.value.fec_revalida);
    formData.append('fec_trans_revalida',this.newRevalidas.value.fec_trans_revalida);
    this._rev.AgregarRevalidas(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      this.CargarRevalidas();
    })
    .catch(error=>{
      console.log('ERROR AL INTENTAR AÑADIR DATO');
      console.log(error);
    })
  }

  SeleccionarRevalidas(id,Modo){
    this._rev.SeleccionarRevalidas(id)
    .then(res => {
      var a = res.data;
      this.RevalidasSeleccionado = a;
      console.log('INFO DATO SELECCIONADO',this.RevalidasSeleccionado);
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

  ModificarRevalidas(Revalidas){
    const formData = new FormData();
    formData.append('id_revalida',Revalidas.id_revalida);
    formData.append('nro_revalida',Revalidas.nro_revalida);
    formData.append('id_est',Revalidas.id_est);
    formData.append('id_materia',Revalidas.id_materia);
    formData.append('id_doc',Revalidas.id_doc);
    formData.append('id_carre',Revalidas.id_carre);
    formData.append('nota_revalida',Revalidas.nota_revalida);
    formData.append('turno_revalida',Revalidas.turno_revalida);
    formData.append('id_sem',Revalidas.id_sem);
    formData.append('paralelo_revalida',Revalidas.paralelo_revalida);
    formData.append('monto_revalida',Revalidas.monto_revalida);
    formData.append('periodo_revalida',Revalidas.periodo_revalida);
    formData.append('gestion_revalida',Revalidas.gestion_revalida);
    formData.append('fec_revalida',Revalidas.fec_revalida);
    formData.append('fec_trans_revalida',Revalidas.fec_trans_revalida);

    this._rev.ModificarRevalidas(formData,Revalidas.id_revalida)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarRevalidas();
    })
    .catch(error=>{
      console.log('HAY ERROR AL INTENTAR MODIFICAR');
      console.log(error);
      this.CargarRevalidas();
    })
  }
  EliminarRevalidas(id){
    this._rev.EliminarRevalidas(id)
    .then(res => {
      console.log(res.data);
      this.CargarRevalidas();
    }).catch(error =>  {
    console.log("err",error);
    });
  }




}
