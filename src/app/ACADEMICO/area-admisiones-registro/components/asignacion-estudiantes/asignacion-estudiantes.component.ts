
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AsignacionEstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/asignacion-estudiantes.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { AsignacionMatService } from 'src/app/core/services/ACADEMICO/secre-vice-rectorado/asignacion-mat.service';


@Component({
  selector: 'app-asignacion-estudiantes',
  templateUrl: './asignacion-estudiantes.component.html',
  styleUrls: ['./asignacion-estudiantes.component.css']
})
export class AsignacionEstudiantesComponent implements OnInit {
  ruta = 'http://localhost:8000/';
  ADoc=[];
  AEst=[];
  est=[];
  mat=[];

  newAsignacionEstudiante = new FormGroup({

    id_est:new FormControl(''),
    id_asig_mat:new FormControl(''),
    nota_asig:new FormControl(''),
    literal_nota:new FormControl(''),
    apro_rep_con_est:new FormControl(''),
    modificado_asig:new FormControl(''),
    nueva_asig:new FormControl(''),
    autorizado_asig:new FormControl(''),
    obs_asig:new FormControl(''),
    fec_trans:new FormControl(''),
  });
  AsignacionEstudianteSeleccionado = {
    id_asig_mat_est:'',
    id_est:'',
    id_asig_mat:'',
    nota_asig:'',
    literal_nota:'',
    apro_rep_con_est:'',
    modificado_asig:'',
    nueva_asig:'',
    autorizado_asig:'',
    obs_asig:'',
    fec_trans:'',

  }
  constructor( protected _AsigEst:AsignacionEstudiantesService,
    protected _est:EstudiantesService, protected _asignacionMat: AsignacionMatService
  ) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarAsignacionEstudiantes();
    this.CargarEstudiantes();
    this.CargarFKAsignacionDocentes();
    this.iniciarFormfilterEstudiante();
    this.iniciarFormfilterMateria();
  }
  //#region FILTRADORES
  //FILTRADOR V3: NombreFiltro => Materia, dataP=> mat
    matFiltrado=[]; //LISTA ENCONTRADA
    MateriaSelect={//VALOR SELECCIONADO
      nombre_mat:''
    };
    filtroMateria=false; //ESTADO ngIf Lista
    filterMateriaForm= new FormGroup({
      txt:new FormControl(''),
      txt1:new FormControl(''), //GESTION
      txt2:new FormControl(''), //MATERIA
    });
    iniciarFormfilterMateria(){ //ESTO SE DEBE LLAMAR
      this.filterMateriaForm.valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroMateria=true;
        if((response.txt1 && response.txt1.length)||response.txt2 && response.txt2.length){
          this.filterMateria(response.txt1,response.txt2);
        } else {
          this.matFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.matFiltrado)
      })
    }

    filterMateria(Datafilter1, Datafilter2){
      var matFiltradoMomentaneo= this.ADoc.filter(a => (a.gestion.indexOf(Datafilter1)) > -1)


      this.matFiltrado = matFiltradoMomentaneo.filter(a => (a.nombre_mat.indexOf(Datafilter2) > -1 || (a.codigo_mat.indexOf(Datafilter2)) > -1))


    }


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
    this.estFiltrado = this.est.filter(a => (a.NomC.indexOf(Datafilter)) > -1 || (a.cod_est.indexOf(Datafilter)) > -1)
  }
  //#endregion FILTRADORES


  CargarEstudiantes(){
    this._est.ObtenerEstudiantes()
    .then(res => {
      console.log("ESTUDIANTE CARGADO",res.data);
      res.data.forEach(e => {
        e.NomC=e.ape_p_est+' '+e.ape_m_est+' '+e.nombre_est
        e.cod_est = e.cod_est+''
      });
      this.est = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  CargarFKAsignacionDocentes(){
    //cargar correctamente para añadir materias a los estudiantes
    this._asignacionMat.ObtenerFKAsignacionMat()
    .then(res => {
      console.log('LISTA CARGADA DE ADoc',res.data);
      res.data.forEach(e => {
        e.periodo_asig_mat=e.periodo_asig_mat.toString();
        e.gestion_asig_mat=e.gestion_asig_mat.toString();
        e.gestion=e.gestion_asig_mat.toString()+'/'+e.periodo_asig_mat.toString()
      });
      this.ADoc = res.data;
    }).catch(err =>  {
    console.log("err",err.response.data.message);
    });
  }

  //#region  ASIGNACION ESTUDIANTES
  LimpiarAsignacionEstudiantes(){
    this.AsignacionEstudianteSeleccionado = {
      id_asig_mat_est:'',
      id_est:'',
      id_asig_mat:'',
      nota_asig:'',
      literal_nota:'',
      apro_rep_con_est:'',
      modificado_asig:'',
      nueva_asig:'',
      autorizado_asig:'',
      obs_asig:'',
      fec_trans:'',
    };
    this.newAsignacionEstudiante.patchValue({
      id_asig_mat_est:'',
      id_est:'',
      id_asig_mat:'',
      nota_asig:'',
      literal_nota:'',
      apro_rep_con_est:'',
      modificado_asig:'',
      nueva_asig:'',
      autorizado_asig:'',
      obs_asig:'',
      fec_trans:'',
    })
   }

  CargarAsignacionEstudiantes(){
    this._AsigEst.ObtenerAsignacionEstudiantes()
    .then(res => {
      console.log("ASIGNACION EST CARGADO",res.data);
      this.AEst = res.data;
    }).catch(err =>  {
    console.log("err",err.response.data.message);
    });
  }
  AgregarAsignacionEstudiante(){
      const formData = new FormData();
      formData.append('id_est',this.newAsignacionEstudiante.value.id_est);
      formData.append('id_asig_mat',this.newAsignacionEstudiante.value.id_asig_mat);
      formData.append('nota_asig',this.newAsignacionEstudiante.value.nota_asig);
      formData.append('literal_nota',this.newAsignacionEstudiante.value.literal_nota);
      formData.append('apro_rep_con_est',this.newAsignacionEstudiante.value.apro_rep_con_est);
      formData.append('modificado_asig',this.newAsignacionEstudiante.value.modificado_asig);
      formData.append('nueva_asig',this.newAsignacionEstudiante.value.nueva_asig);
      formData.append('autorizado_asig',this.newAsignacionEstudiante.value.autorizado_asig);
      formData.append('obs_asig',this.newAsignacionEstudiante.value.obs_asig);
      formData.append('fec_trans',this.newAsignacionEstudiante.value.fec_trans);
      this._AsigEst.AgregarAsignacionEstudiante(formData)
      .then(res=>{
        console.log('SE AÑADIO CORRECTAMENTE',res.data);
        this.CargarAsignacionEstudiantes();
        this.LimpiarAsignacionEstudiantes();
      })
      .catch(error=>{
        console.log('ERROR AL AÑADIR Estudiante');
        console.log(error);
      })
  }

  SeleccionarAsignacionEstudiante(data,Modo){
    this._AsigEst.SeleccionarAsignacionEstudiante(data.id_asig_mat_est)
    .then(res => {
      var a = res.data;
      this.AsignacionEstudianteSeleccionado = a;
      this.EstudianteSelect.NomC = data.ape_p_est+' '+data.ape_m_est+' '+data.nombre_est
      console.log('INFO SELECCIONADO',this.AsignacionEstudianteSeleccionado);
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
  ModificarAsignacionEstudiante(AsignacionEstudiante){
    let data = {
      id_asig_mat_est:AsignacionEstudiante.id_asig_mat_est,
      id_est:AsignacionEstudiante.id_est,
      id_asig_mat:AsignacionEstudiante.id_asig_mat,
      nota_asig:AsignacionEstudiante.nota_asig,
      literal_nota:AsignacionEstudiante.literal_nota,
      apro_rep_con_est:AsignacionEstudiante.apro_rep_con_est,
      modificado_asig:AsignacionEstudiante.modificado_asig,
      nueva_asig:AsignacionEstudiante.nueva_asig,
      autorizado_asig:AsignacionEstudiante.autorizado_asig,
      obs_asig:AsignacionEstudiante.obs_asig,
      fec_trans:AsignacionEstudiante.fec_trans,
    };
    this._AsigEst.ModificarAsignacionEstudiante(data, data.id_asig_mat_est)
    .then(res=>{
      console.log('SE MODIFICO CORRECTAMENTE');
      console.log(res);
      this.CargarAsignacionEstudiantes();
      this.LimpiarAsignacionEstudiantes();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarAsignacionEstudiantes();
    })
  }
  EliminarAsignacionEstudiante(id){
    this._AsigEst.EliminarAsignacionEstudiante(id)
    .then(res => {
      console.log(res.data);
      this.CargarAsignacionEstudiantes();
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#endregion ASIGNACION ESTUDIANTES
}
