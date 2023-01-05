import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { MateriasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/materias.service';
import { PrerrequisitosService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/prerrequisitos.service';

@Component({
  selector: 'app-Prerrequisito',
  templateUrl: './Prerrequisito.component.html',
  styleUrls: ['./Prerrequisito.component.css']
})
export class PrerrequisitoComponent implements OnInit {

    ruta = 'http://localhost:8000/';
    pre =[ ];
    mat =[ ];

    // carre =[ ];

    PrerrequisitoSeleccionado = {
      id_prerreq:'',
      id_materia:'',
      codigo_mat:'',
      nombre_mat:'',
      mat_prin:'',
      materia_sec:'',
      id_materia_p:'',
      id_materia_s:'',
      nombre_carre:'',

      cod_prin:'',
      cod_sec:'',
    };

    newPrerrequisito= new FormGroup({
      // id_prerreq:new FormControl(''),
      id_materia_p:new FormControl(''),
      id_materia_s:new FormControl(''),

    });
    constructor(protected _prerreq: PrerrequisitosService,
      protected _mat: MateriasService
    ) { }

    ngOnInit(): void {
      let rootVar = window['rutacion'];
      this.ruta = rootVar;
      this.CargarPrerrequisito();
      this.CargarMateria();
      // this.CargarCarrera();
      this.iniciarFormfilterMateria_P();
      this.iniciarFormfilterMateria_S();
      this.iniciarFormfilterMateria_PP();
      this.iniciarFormfilterMateria_SS();
    }
  //#region
      dataSFiltrado=[]; //LISTA ENCONTRADA
      Materia_SSSelect={//VALOR SELECCIONADO
        // attrib:''
      };
      filtroMateria_SS=false; //ESTADO ngIf Lista
      filterMateria_SSForm= new FormGroup({
        txt:new FormControl(''),
      });
      iniciarFormfilterMateria_SS(){ //ESTO SE DEBE LLAMAR
        this.filterMateria_SSForm.get('txt').valueChanges
        // .pipe(debounceTime(1000))
        .subscribe(response => {
          console.log('entered data is ', response);
          this.filtroMateria_SS=true;
          if(response && response.length){
            this.filterMateria_SS(response);
          } else {
            this.dataSFiltrado = [];
          }
          console.log('DATA ENCONTRADO', this.dataSFiltrado)
        })
      }

      filterMateria_SS(Datafilter){
        //PARA HACER BUSQUEDAS POR SEPARADO
        // this.dataSFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
        this.dataSFiltrado = this.mat.filter(a => (a.nombre_mat.indexOf(Datafilter)) > -1)
      }


      dataPFiltrado=[]; //LISTA ENCONTRADA

      filtroMateria_PP=false; //ESTADO ngIf Lista
      filterMateria_PPForm= new FormGroup({
        txt:new FormControl(''),
      });
      iniciarFormfilterMateria_PP(){ //ESTO SE DEBE LLAMAR
        this.filterMateria_PPForm.get('txt').valueChanges
        // .pipe(debounceTime(1000))
        .subscribe(response => {
          console.log('entered data is ', response);
          this.filtroMateria_PP=true;
          if(response && response.length){
            this.filterMateria_PP(response);
          } else {
            this.dataPFiltrado = [];
          }
          console.log('DATA ENCONTRADO', this.dataPFiltrado)
        })
      }

      filterMateria_PP(Datafilter){
        //PARA HACER BUSQUEDAS POR SEPARADO
        // this.dataPFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
        this.dataPFiltrado = this.mat.filter(a => (a.nombre_mat.indexOf(Datafilter)) > -1)
      }

  //#endregion





    //#region FILTRO EN AGREGACION
    matFiltrado=[]; //LISTA ENCONTRADA
    Materia_PSelect={//VALOR SELECCIONADO
      id_materia:'',
      nombre_mat:'',
      codigo_mat:'',
    };
    filtroMateria_P=false; //ESTADO ngIf Lista
    filterMateria_PForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterMateria_P(){ //ESTO SE DEBE LLAMAR
      this.filterMateria_PForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroMateria_P=true;
        if(response && response.length){
          this.filterMateria_P(response);
        } else {
          this.matFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.matFiltrado)
      })
    }

    filterMateria_P(Datafilter){
      //PARA HACER BUSQUEDAS POR SEPARADO
      // this.matFiltrado = this.est.filter(a => (a.nombre_est.indexOf(Datafilter) && a.ape_p_est.indexOf(Datafilter) && a.ape_m_est.indexOf(Datafilter)) > -1)
      this.matFiltrado = this.mat.filter(a => (a.codigo_mat.indexOf(Datafilter) && a.nombre_mat.indexOf(Datafilter)) > -1)
    }
    //FILTRADOR V3: NombreFiltro => Materia_S, dataP=> matS
    matSFiltrado=[]; //LISTA ENCONTRADA
    Materia_SSelect={//VALOR SELECCIONADO
      id_materia:'',
      nombre_mat:'',
      codigo_mat:'',
    };
    filtroMateria_S=false; //ESTADO ngIf Lista
    filterMateria_SForm= new FormGroup({
      txt:new FormControl(''),
    });

    iniciarFormfilterMateria_S(){ //ESTO SE DEBE LLAMAR
      this.filterMateria_SForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroMateria_S=true;
        if(response && response.length){
          this.filterMateria_S(response);
        } else {
          this.matSFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.matSFiltrado)
      })
    }

    filterMateria_S(Datafilter){
      //PARA HACER BUSQUEDAS POR SEPARADO
      this.matSFiltrado = this.mat.filter(a => (a.codigo_mat.indexOf(Datafilter) && a.nombre_mat.indexOf(Datafilter)) > -1)
    }
    //#endregion filtro agregacion
    CargarPrerrequisito(){
      this._prerreq.ObtenerPrerrequisitos()
      .then(res => {
        console.log(res.data);
        this.pre = res.data;
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

    AgregarPrerrequisito(){
      const formData = new FormData();
      // formData.append('id_prerreq',this.newPrerrequisito.value.id_prerreq);
      formData.append('id_materia_p',this.Materia_PSelect.id_materia);
      formData.append('id_materia_s',this.Materia_SSelect.id_materia);
      this._prerreq.AgregarPrerrequisito(formData)
      .then(res=>{
        console.log('SE AÑADIO CORRECTAMENTE',res.data);

        this.CargarPrerrequisito();
        this.LimpiarPrerrequisitos();
      })
      .catch(error=>{
        console.log('ERROR AL AÑADIR Prerrequisito');
        console.log(error);
      })
    }

    ModificarPrerrequisito(Prerrequisito){
      const formData = new FormData();
      formData.append('id_materia_p',Prerrequisito.id_materia_p);
      formData.append('id_materia_s',Prerrequisito.id_materia_s);
      this._prerreq.ModificarPrerrequisito(formData,Prerrequisito.id_prerreq)
      .then(res=>{
        console.log('SE MODIFICO CORRECTAMENTE');
        console.log(res);
        this.CargarPrerrequisito();
        this.LimpiarPrerrequisitos();
      })
      .catch(error=>{
        console.log('HAY ERROR AL MODIFICAR');
        console.log(error);
        this.CargarPrerrequisito();
      })
    }
    EliminarPrerrequisito(ID){
      this._prerreq.EliminarPrerrequisito(ID)
      .then(res => {
        console.log(res.data);
        this.CargarPrerrequisito();
        this.LimpiarPrerrequisitos();
      }).catch(err =>  {
      console.log("err");
      });
    }

    LimpiarPrerrequisitos()
    {
    this.PrerrequisitoSeleccionado = {
      id_prerreq:'',
      id_materia:'',
      codigo_mat:'',
      nombre_mat:'',
      mat_prin:'',
      materia_sec:'',
      id_materia_p:'',
      id_materia_s:'',
      nombre_carre:'',
      cod_prin:'',
      cod_sec:'',
    };

    this.newPrerrequisito.patchValue({
      id_prerreq:'',
      id_materia:'',
      codigo_mat:'',
      nombre_mat:'',
      mat_prin:'',
      materia_sec:'',
      id_materia_p:'',
      id_materia_s:'',
      nombre_carre:'',
      cod_prin:'',
      cod_sec:'',

    })

   }


  }



