import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CongeladosService } from 'src/app/core/services/ACADEMICO/bienestar-estudiantil/Congelados.service';

import { AsignacionEstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/asignacion-estudiantes.service';
import { CarrerasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/carreras.service';
import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';

@Component({
  selector: 'app-congelados',
  templateUrl: './congelados.component.html',
  styleUrls: ['./congelados.component.css']
})
export class CongeladosComponent implements OnInit {

  constructor(protected _cong: CongeladosService,
    protected _est: EstudiantesService, protected _carr: CarrerasService, protected _AsigEst: AsignacionEstudiantesService
  ) {}

  ruta = 'http://localhost:8000/';

  ngOnInit(): void {

    this.CargarCongelados();
    this.CargarEstudiantes();
    this.CargarCarrera();
    this.CargarAsignacionEstudiantes();

    this.iniciarFormfilterEstudiante();
  }
  //#region FILTRADORES
  autoCompletar(a){
    this.EstudianteSelect.NomC=a.NomC;
    this.newCongelados.patchValue({id_est:a.id_est});
    this._carr.ObternerCarreraEstudiante(a.id_est)
    .then(res=>{
      this.newCongelados.patchValue({id_carre:res.data.id_carre})
    })
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
      this.estFiltrado = this.est.filter(a => (a.NomC.indexOf(Datafilter)) > -1)
    }
  //#endregion FILTRADORES


  //CRUD V3: idPK=> id_cong, nomService=> IDcong, nombreCRUD=> Congelados,  dataP=> cong, isSubmitted=>isSubmitted
  cong = [];
  est = [];
  carre = [];
  AEst = [];

  isSubmitted = false;
  myGroup = new FormGroup({
    firstName: new FormControl()
  });
  newCongelados = new FormGroup({
    // attr:new FormControl('',[Validators.required])
    id_cong: new FormControl(0),
    id_est: new FormControl(''),
    id_carre: new FormControl(''),
    id_asig_mat_est: new FormControl(''),
    tipo_cong: new FormControl(''),
    motivo_cong: new FormControl(''),
  })

  CargarEstudiantes() {
    this._est.ObtenerEstudiantes()
      .then(res => {
        console.log("DATOS CARGADO EST",res.data);
        res.data.forEach(e => {
          e.NomC=e.ape_p_est+' '+e.ape_m_est+' '+e.nombre_est
        });
        this.est = res.data;
      }).catch(err => {
        console.log("err");
      });
  }
  CargarCarrera() {
    this._carr.ObtenerCarreras()
      .then(res => {
        console.log(res.data);
        this.carre = res.data;
      }).catch(err => {
        console.log("err");
      });
  }
  CargarAsignacionEstudiantes() {
    this._AsigEst.ObtenerAsignacionEstudiantes()
      .then(res => {
        console.log(res.data);
        this.AEst = res.data;
      }).catch(err => {
        console.log("err");
      });
  }
  CargarCongelados() {
    this._cong.ObtenerCongeladoss()
    .then(res => {
      console.log(res.data);
      this.cong = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  resetCongelados() {
    this.newCongelados.reset();
    this.isSubmitted = false;
  }
  AgregarModificarCongelados() {
    this.isSubmitted = true;
    if (this.newCongelados.invalid) {
      return;
    } else {
      let id = this.newCongelados.controls.id_cong.value;
      console.log(this.newCongelados.value)
      if (!id) { //PREGUNTAMOS: SI NO TIENE id?
        console.log('SE QUIERE AGREGAR LO SGTE:', this.newCongelados.value)
        this._cong.AgregarCongelados(this.newCongelados.value)
          .then(res => {
            console.log('SE AÑADIO CORRECTAMENTE', res.data);
            this.CargarCongelados();
            this.resetCongelados();
          })
          .catch(error => {
            console.log('ERROR AL AÑADIR Congelados');
            console.log(error.response.data.message);
          })
      } else {
        //SI TIENE ID POR LO TANTO MODIFICAR
        this._cong.ModificarCongelados(this.newCongelados.value, this.newCongelados.value.id_cong)
          .then(res => {
            console.log('SE MODIFICO CORRECTAMENTE', res.data);
            this.CargarCongelados();
            this.resetCongelados();
          })
          .catch(error => {
            console.log('ERROR AL AÑADIR');
            console.log(error.response.data.message);
          })
      }
    }
  }

  SeleccionarCongelados(data) {
    if (data.id_cong) {
      const dataCongelados = this.cong.find(x => x.id_cong === data.id_cong)
      if (!dataCongelados) return;
      this._cong.SeleccionarCongelados(data.id_cong)
        .then(res => {
          Object.keys(this.newCongelados.controls).forEach(key => {
            this.newCongelados.controls[key].setValue(res.data[key]);
          });
          this.EstudianteSelect.NomC = data.ape_p_est +' '+  data.ape_m_est +' '+ data.nombre_est
          console.log('SELECCION EXITOSA', this.newCongelados.value);
          document.getElementById("btnCrudCongelados").click();
        });
    }
  }
  // SeleccionarnombreCrud?(data,Modo){
  //   _sd
  //   .then(res => {
  //     var a = res.data;
  //     this.CongeladosSeleccionado = a;
  //     this.EstudianteSelect.NomC =  data.ape_p_est +' '+  data.ape_m_est +' '+ data.nombre_est
  //     this.CongeladosSeleccionado.id_carre = data.id_carre
  //     console.log('INFO DATO SELECCIONADO',this.nombreCrud?Seleccionado);
  //     switch (Modo) {
  //       case 'Editar':
  //         document.getElementById("btnOpenModalMod").click();
  //         break;
  //       case 'Mostrar':
  //         document.getElementById("btnOpenModalMos").click();
  //         break;
  //       default:
  //         break;
  //     }
  //   }).catch(error =>  {
  //   console.log("error",error);
  //   });
  // }
  EliminarCongelados(id) {
    this._cong.EliminarCongelados(id)
      .then(res => {
        console.log(res.data);
        this.CargarCongelados();
      }).catch(err => {
        console.log("err", err);
      });
  }
}
