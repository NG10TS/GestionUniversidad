import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdministrativosService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/administrativos.service';
import { CargosAdminService } from 'src/app/core/services/ACADEMICO/administrativos/cargos-admin.service';
import { SalariosAdminService } from 'src/app/core/services/ACADEMICO/administrativos/salarios-admin.service';
import Swal from 'sweetalert2';
import { ApisService } from 'src/app/core/services/Apis.service';

@Component({
  selector: 'app-salarios-admin',
  templateUrl: './salarios-admin.component.html',
  styleUrls: ['./salarios-admin.component.css']
})
export class SalariosAdminComponent implements OnInit {

  ruta = 'http://localhost:8000/';
  @ViewChild('modalCargo') modalCargo: ElementRef;
  sal=[];
  car=[];
  admin=[];
  LastCargoAdd={
    id_cargo_admin:'',
    id_administrativo:'',
    nombre_cargo_admin:''
  };
  idAdmin; //VARIABLE PARA PASAR EL ADMIN ENTRE MODALs
  idCargo; //VARIABLE PARA PASAR EL CARGO ENTRE MODALs
  //Para Validaciones
  Mensaje;

  newSalario = new FormGroup({
    id_cargo_admin:new FormControl(''),
    id_administrativo:new FormControl(''),
    haberes_admin:new FormControl(''),
    hb1_admin:new FormControl(''),
    hb2_admin:new FormControl(''),
    afp_admin:new FormControl(''),
    caja_admin:new FormControl(''),
    otrod_admin:new FormControl(''),
    bant_admin:new FormControl(''),
    botro1_admin:new FormControl(''),
    botro2_admin:new FormControl(''),
    fec_ini_admin:new FormControl(''),
    fec_reg_admin:new FormControl(''),
    tipo_trans_admin:new FormControl(''),
    horario_admin:new FormControl(''),
  });
  SalarioSeleccionado = {
    id_salario_admin:'',
    id_cargo_admin:'',
    id_administrativo:'',
    haberes_admin:'',
    hb1_admin:'',
    hb2_admin:'',
    afp_admin:'',
    caja_admin:'',
    otrod_admin:'',
    bant_admin:'',
    botro1_admin:'',
    botro2_admin:'',
    fec_ini_admin:'',
    fec_reg_admin:'',
    tipo_trans_admin:'',
    horario_admin:'',
    NombreCompleto:''
  }
  //PARA CARGO
  newCargo = new FormGroup({
    nombre_cargo_admin:new FormControl(''),
    id_administrativo:new FormControl(''),
  });
  CargoSeleccionado = {
    id_cargo_admin:'',
    nombre_cargo_admin:'',
    id_administrativo:'',
  }
  constructor(protected _Car: CargosAdminService, protected _Sal:SalariosAdminService,
    protected _admin: AdministrativosService, protected _sql:ApisService) { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
    this.CargarSalarios();
    this.CargarAdministrativos();
    this.consultar();

    this.iniciarFormfilterAdministrativo();
  }

  // funcion de ejemplo de query
  async consultar(){
    var request = await this._sql.ConsultaSQL("select * from tb_carreras")
    .then(res=>{
      console.log("Datos Retornacion",res.data)
      return res.data
    })
    .catch(err=>{
      console.log("error",err)
    })
    console.log("Datos igualados",request)
  }
  //#region FILTRADORES
  //FILTRADOR V3: NombreFiltro => Administrativo, dataP=> admin
    adminFiltrado=[]; //LISTA ENCONTRADA
    AdministrativoSelect={//VALOR SELECCIONADO
      NomC:''
    };
    filtroAdministrativo=false; //ESTADO ngIf Lista
    filterAdministrativoForm= new FormGroup({
      txt:new FormControl(''),
    });
    iniciarFormfilterAdministrativo(){ //ESTO SE DEBE LLAMAR
      this.filterAdministrativoForm.get('txt').valueChanges
      // .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        this.filtroAdministrativo=true;
        if(response && response.length){
          this.filterAdministrativo(response);
        } else {
          this.adminFiltrado = [];
        }
        console.log('DATA ENCONTRADO', this.adminFiltrado)
      })
    }

    filterAdministrativo(Datafilter){
      this.adminFiltrado = this.admin.filter(a => (a.NomC.indexOf(Datafilter)) > -1)//PONER PARA COD ADMIN
    }
  //#endregion FILTRADORES

  CargarAdministrativos(){
    this._admin.ObtenerAdministrativos()
    .then(res => {
      console.log('ADMINs',res.data);
      res.data.forEach(e => {
        e.NomC=e.ape_p_admin+' '+e.ape_m_admin+' '+e.nombre_admin
      });
      this.admin = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  //#region CARGOS
  //PARA CARGOS
  CargarCargos(){
    this._Car.ObtenerCargoAdmins()
    .then(res => {
      console.log('CARGOS',res.data);
      res.data.forEach(element => {
        element.Editando=false;
      });
      this.car = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }
  AgregarCargo(){
    const formData = new FormData();
    formData.append('nombre_cargo_admin',this.newCargo.value.nombre_cargo_admin);
    formData.append('id_administrativo',this.newCargo.value.id_administrativo);
    this._Car.AgregarCargoAdmin(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      document.getElementById("CloseModalAddcargo").click();
      this.CargarCargos();
    })
    .catch(error=>{
      console.log('ERROR AL AÑADIR CARGO');
      console.log(error);
    })
  }
  AgregarCargoOption(Modo){
    switch (Modo) {
      case 'Guardar':
        this.AgregarCargo();
        break;
      case 'GuardarAvanzar':
        const formData1 = new FormData();
        formData1.append('nombre_cargo_admin',this.newCargo.value.nombre_cargo_admin);
        formData1.append('id_administrativo',this.newCargo.value.id_administrativo);
        this._Car.AgregarCargoAdmin(formData1)
        .then(res=>{
          console.log('SE AÑADIO CORRECTAMENTE',res.data);
          document.getElementById("CloseModalAddcargo").click();
          this.LastCargoAdd = res.data;
          document.getElementById("btnOpenModalAddSalario").click();
        })
        .catch(error=>{
          console.log('ERROR AL AÑADIR CARGO');
          console.log(error);
        })
        break;
      default:
        break;
    }
  }

  SeleccionarCargo(id,Modo){
    // SalarioSeleccionado=a;
    this._Car.SeleccionarCargoAdmin(id)
    .then(res => {
      var a = res.data;
      this.CargoSeleccionado = a;
      console.log('INFO EST SELECCIONADO',this.CargoSeleccionado);
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
    console.log("err",err);
    });
  }
  MostrarMensaje(iconText,tittleText){
    var Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      icon: iconText, //success, info, error,warning,question
      title: tittleText
    })
  }
  ModificarCargo(CargoAdmin){
    console.log('DATO A ACTUALIZAR',CargoAdmin)
    let data = {
      id_cargo_admin:CargoAdmin.id_cargo_admin,
      id_administrativo:CargoAdmin.id_administrativo,
      nombre_cargo_admin:CargoAdmin.nombre_cargo_admin,
    };
    this._Car.ModificarCargoAdmin(data,CargoAdmin.id_cargo_admin)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.CargarCargos();
      this.CargarSalarios();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
    });
  }

  EliminarCargo(id){
    this._Car.EliminarCargoAdmin(id)
    .then(res => {
      console.log(res.data);
      this.CargarCargos();
      this.CargarSalarios();
    }).catch(err =>  {
    console.log("err");
    });
  }
  LimpiarCargos(){
    this.CargoSeleccionado = {
      id_cargo_admin:'',
      nombre_cargo_admin:'',
      id_administrativo:'',
    };
    this.newCargo.patchValue({
      id_cargo_admin:'',
      nombre_cargo_admin:'',
      id_administrativo:'',
    })

  }
  AgregarSalarioDesdeModal(dato){
    const formData = new FormData();
    formData.append('id_cargo_admin',dato.id_cargo_admin);
    formData.append('id_administrativo',dato.id_administrativo);
    formData.append('haberes_admin','');
    formData.append('hb1_admin','');
    formData.append('hb2_admin','');
    formData.append('afp_admin','');
    formData.append('caja_admin','');
    formData.append('otrod_admin','');
    formData.append('bant_admin','');
    formData.append('botro1_admin','');
    formData.append('botro2_admin','');
    formData.append('fec_ini_admin','');
    formData.append('fec_reg_admin','');
    formData.append('tipo_trans_admin','');
    formData.append('horario_admin','');
    this._Sal.AgregarSalarioAdmin(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      document.getElementById("CerrarModal").click();
      this.MostrarMensaje('success','SE AÑADIO SALARIO CORRECTAMENTE');
      this.CargarSalarios();
    })
    .catch(error=>{
    //  console.log('ERROR AL AÑADIR SALARIO');
      console.log(error);
      this.MostrarMensaje('success','ERROR AL AÑADIR SALARIO');
    })
  }
  //#endregion CARGOS

  //#region SALARIOS ADMIN
  //PARA SALARIOS
  CargarSalarios(){
    this._Sal.ObtenerSalarioAdmins()
    .then(res => {
      console.log(res.data);
      this.sal = res.data;
    }).catch(err =>  {
    console.log("err");
    });
  }

  AgregarSalario(){

    const formData = new FormData();
    formData.append('id_cargo_admin',this.LastCargoAdd.id_cargo_admin);
    formData.append('id_administrativo',this.LastCargoAdd.id_administrativo);
    formData.append('haberes_admin',this.newSalario.value.haberes_admin);
    formData.append('hb1_admin',this.newSalario.value.hb1_admin);
    formData.append('hb2_admin',this.newSalario.value.hb2_admin);
    formData.append('afp_admin',this.newSalario.value.afp_admin);
    formData.append('caja_admin',this.newSalario.value.caja_admin);
    formData.append('otrod_admin',this.newSalario.value.otrod_admin);
    formData.append('bant_admin',this.newSalario.value.bant_admin);
    formData.append('botro1_admin',this.newSalario.value.botro1_admin);
    formData.append('botro2_admin',this.newSalario.value.botro2_admin);
    formData.append('fec_ini_admin',this.newSalario.value.fec_ini_admin);
    formData.append('fec_reg_admin',this.newSalario.value.fec_reg_admin);
    formData.append('tipo_trans_admin',this.newSalario.value.tipo_trans_admin);
    formData.append('horario_admin',this.newSalario.value.horario_admin);
    this._Sal.AgregarSalarioAdmin(formData)
    .then(res=>{
      console.log('SE AÑADIO CORRECTAMENTE',res.data);
      document.getElementById("CerrarModal").click();
      this.MostrarMensaje('success','SE AÑADIO SALARIO CORRECTAMENTE');
      this.CargarSalarios();
    })
    .catch(error=>{
    //  console.log('ERROR AL AÑADIR SALARIO');
      console.log(error);
      this.MostrarMensaje('success','ERROR AL AÑADIR SALARIO');
    })
  }

  SeleccionarSalario(data,Modo){
    this._Sal.SeleccionarSalarioAdmin(data.id_salario_admin)
    .then(res => {
      var a = res.data;
      this.SalarioSeleccionado = a;
      this.AdministrativoSelect.NomC = data.ape_p_admin+' '+data.ape_m_admin+' '+data.nombre_admin;
      console.log('INFO SALARIO SELECCIONADO',this.SalarioSeleccionado);
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
    console.log("err",err);
    });

  }
  // INTRODUCIR nombre CRUD,NombreId(SalarioAdmin,id_salario_admin)
  ModificarSalario(SalarioAdmin){
    console.log('DATO A ACTUALIZAR',SalarioAdmin)
    let data = {
      id_salario_admin:SalarioAdmin.id_salario_admin,
      haberes_admin:SalarioAdmin.haberes_admin,
      hb1_admin:SalarioAdmin.hb1_admin,
      hb2_admin:SalarioAdmin.hb2_admin,
      afp_admin:SalarioAdmin.afp_admin,
      caja_admin:SalarioAdmin.caja_admin,
      otrod_admin:SalarioAdmin.otrod_admin,
      bant_admin:SalarioAdmin.bant_admin,
      botro1_admin:SalarioAdmin.botro1_admin,
      botro2_admin:SalarioAdmin.botro2_admin,
      fec_ini_admin:SalarioAdmin.fec_ini_admin,
      fec_reg_admin:SalarioAdmin.fec_reg_admin,
      tipo_trans_admin:SalarioAdmin.tipo_trans_admin,
      horario_admin:SalarioAdmin.horario_admin,
    };
    this._Sal.ModificarSalarioAdmin(data,data.id_salario_admin)
    .then((result) => {
      console.log(result);
      console.log('SE MODIFICO CORRECTAMENTE');
      this.CargarSalarios();
    })
    .catch(error=>{
      console.log('HAY ERROR AL MODIFICAR');
      console.log(error);
      this.CargarSalarios();
    });
  }
  EliminarSalario(id){
    Swal.fire({
      title: 'SEGURO QUE QUIERE ELIMINAR SALARIO?',
      color: '#FFFFFF',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonColor: "#DD6B55",
      cancelButtonText:'CANCELAR',
      confirmButtonText: 'ELIMINAR',
      confirmButtonColor: "#DD6B55",
      background: '#D62600',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._Sal.EliminarSalarioAdmin(id)
        .then(res => {
          console.log(res.data);
          this.CargarSalarios();
        }).catch(err =>  {
        console.log("err");
        });
      }
    })

  }
  //#endregion SALARIOS ADMIN
}
