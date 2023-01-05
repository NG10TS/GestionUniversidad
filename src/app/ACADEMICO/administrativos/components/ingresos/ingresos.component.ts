import { EstudiantesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/estudiantes.service';
import { EstudianteComponent } from './../../../../PUBLICAS/estudiante/estudiante.component';
import { EmpresasService } from './../../../../core/services/ACADEMICO/administrativos/empresas.service';
import { EstadoConvService } from 'src/app/core/services/ACADEMICO/vice-rectorado/conv/estado-conv.service';
import { PersonasService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/personas.service';
import { DocentesService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/docentes.service';
import { AdministrativosService } from './../../../../core/services/ACADEMICO/area-admisiones-registro/administrativos.service';
import { CuentasService } from './../../../../core/services/ACADEMICO/administrativos/cuentas.service';
import { IngresosService } from './../../../../core/services/ACADEMICO/administrativos/ingresos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CuentaBancosService } from 'src/app/core/services/ACADEMICO/administrativos/cuenta-bancos.service';
import { BancosService } from 'src/app/core/services/ACADEMICO/administrativos/bancos.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  constructor(protected _ingreso:IngresosService,
      protected _cuenta: CuentasService,
      protected _admin:AdministrativosService,
      protected _doc:DocentesService,
      protected _persona:PersonasService,
      protected _est:EstudiantesService,
      protected _emp:EmpresasService, protected _cuentaBanco:CuentaBancosService, protected _banco:BancosService
 ) { }

  ngOnInit(): void {
    this.CargarIngreso();
    this.CargarAdministrativo();
    this.CargarCuenta();
    this.CargarDocente();
    this.CargarEmpresa();
    this.CargarEstudiante();
    this.CargarBanco()
    this.CargarCuentaBanco()

  }
  //#region CARGA EXTRAS
  // INTRODUCIR nombre CRUD, nombre dataPrincipal(Administrativo,admin)
  admin=[]
    CargarAdministrativo(){
      this._admin.ObtenerAdministrativos()
      .then(res => {
        console.log("Administrativo Cargado",res.data);
        this.admin = res.data;
      }).catch(error =>  {
      console.log('Error al Cargar Administrativo',error.response.data.message);
      });
    }

    doc=[]
      CargarDocente(){
      this._doc.ObtenerDocentes()
        .then(res => {
          console.log("Docente Cargado",res.data);
          this.doc = res.data;
        }).catch(error =>  {
        console.log('Error al Cargar Docente',error.response.data.message);
        });
      }
      persona=[]
        CargarPersona(){
          this._persona.ObtenerPersonas()
          .then(res => {
            console.log("Persona Cargado",res.data);
            this.persona = res.data;
          }).catch(error =>  {
          console.log('Error al Cargar Persona',error.response.data.message);
          });
        }
       est=[]
         CargarEstudiante(){
          this._est.ObtenerEstudiantes()
           .then(res => {
             console.log("Estudiante Cargado",res.data);
             this.est = res.data;
           }).catch(error =>  {
           console.log('Error al Cargar Estudiante',error.response.data.message);
           });
         }
       emp=[]
         CargarEmpresa(){
           this._emp.ObtenerEmpresa()
           .then(res => {
             console.log("Empresa Cargado",res.data);
             this.emp = res.data;
           }).catch(error =>  {
           console.log('Error al Cargar Empresa',error.response.data.message);
           });
         }
    banco=[]
  CargarBanco(){
    this._banco.ObtenerBancos()
    .then(res => {
      console.log("Banco Cargado",res.data);
      this.banco = res.data;
    }).catch(error =>  {
    console.log('Error al Cargar Banco',error.response.data.message);
    });
  }

  //#endregion CARGA EXTRAS

  //#region CRUD PRINCIPAL INGRESOS
  //CRUD V3: idPK=> id_ingreso, nomService=> _ingreso, nombreCRUD=> Ingreso,  dataP=> ingreso, isSubmitted=>isSubmitted
    ingreso=[];
    isSubmitted = false;

    newIngreso= new FormGroup({
      // ejemplo: id_ingreso:new FormControl(''),
      id_ingreso:new FormControl(0),
      fec_ingreso:new FormControl(''),
      refere_ingreso:new FormControl(''),
      detalle_ingreso:new FormControl(''),
      monto_ingreso:new FormControl(''),
      id_cuenta:new FormControl(''),
      id_administrativo:new FormControl(''),
      id_doc:new FormControl(''),
      id_persona:new FormControl(''),
      id_est:new FormControl(''),
      id_empresa:new FormControl(''),
      tipo_ingreso:new FormControl(''),
      fec_transf:new FormControl(''),
    });

    CargarIngreso(){
      this._ingreso.ObtenerIngresos()
      .then(res => {
        console.log('Ingreso CARGADO',res.data);
        this.ingreso = res.data;
      }).catch(err =>  {
      console.log('ERROR AL CARGAR Ingreso',err.response.data.message);
      });
    }
    resetIngreso(){
      this.newIngreso.reset();
      this.isSubmitted =false;
    }
    AgregarModificarIngreso(){
      this.isSubmitted=true;
      if (this.newIngreso.invalid) {
        return;
      } else {
        let id = this.newIngreso.controls.id_ingreso.value;
        console.log(this.newIngreso.value)
        if (!id) { //PREGUNTAMOS: SI NO TIENE id?
          this._ingreso.AgregarIngreso(this.newIngreso.value)
          .then(res=>{
            console.log('SE AÑADIO CORRECTAMENTE Ingreso',res.data);
            this.CargarIngreso();
            this.resetIngreso();
          })
          .catch(error=>{
            console.log('ERROR AL AÑADIR Ingreso');
            console.log(error.response.data.message);
          })
        } else {
          //SI TIENE ID POR LO TANTO MODIFICAR
          this._ingreso.ModificarIngreso(this.newIngreso.value,this.newIngreso.value.id_ingreso)
          .then(res=>{
            console.log('SE MODIFICO CORRECTAMENTE Ingreso',res.data);
            this.CargarIngreso();
            this.resetIngreso();
          })
          .catch(error=>{
            console.log('ERROR AL MODIFICAR Ingreso');
            console.log(error.response.data.message);
          })
        }
      }
    }
    SeleccionarIngreso(id){
      if(id){
        const dataIngreso = this.ingreso.find(x => x.id_ingreso === id)
        if(!dataIngreso) return;
        this._ingreso.SeleccionarIngreso(id)
        .then(res=>{
          Object.keys(this.newIngreso.controls).forEach(key => {
            this.newIngreso.controls[key].setValue(res.data[key]);
          });
          console.log('SELECCION DE Ingreso EXITOSA',this.newIngreso.value);
            document.getElementById("btnCrudIngreso").click();
        });
      }
    }
    EliminarIngreso(id){
      this._ingreso.EliminarIngreso(id)
      .then(res => {
        console.log(res.data);
        this.CargarIngreso();
      }).catch(err =>  {
      console.log('ERROR AL ELIMINAR Ingreso',err.response.data.message);
      });
  }
  //#endregion CRUD PRINCIPAL INGRESOS


  //#region CUENTAS
   //CRUD V3: idPK=> id_cuenta, nomService=> _cuenta, nombreCRUD=> Cuenta,  dataP=> cuenta, isSubmitted=>isSubmitted
     cuenta=[];

     newCuenta =new FormGroup({
       // attr:new FormControl('',[Validators.required])
       id_cuenta:new FormControl(0),
       banco:new FormControl(''),
       nro_cuenta:new FormControl(''),
       ab_cuenta:new FormControl(''),
     })
     CargarCuenta(){
       this._cuenta.ObtenerCuentas()
       .then(res => {
         console.log('Cuenta CARGADO',res.data);
         this.cuenta = res.data;
       }).catch(err =>  {
       console.log('ERROR AL CARGAR Cuenta',err.response.data.message);
       });
     }
     resetCuenta(){
       this.newCuenta.reset();
       this.isSubmitted =false;
     }
     AgregarModificarCuenta(){
       this.isSubmitted=true;
       if (this.newCuenta.invalid) {
         return;
       } else {
         let id = this.newCuenta.controls.id_cuenta.value;
         console.log(this.newCuenta.value)
         if (!id) { //PREGUNTAMOS: SI NO TIENE id?
           this._cuenta.AgregarCuenta(this.newCuenta.value)
           .then(res=>{
             console.log('SE AÑADIO CORRECTAMENTE Cuenta',res.data);
             this.CargarCuenta();
             this.resetCuenta();
           })
           .catch(error=>{
             console.log('ERROR AL AÑADIR Cuenta');
             console.log(error.response.data.message);
           })
         } else {
           //SI TIENE ID POR LO TANTO MODIFICAR
           this._cuenta.ModificarCuenta(this.newCuenta.value,this.newCuenta.value.id_cuenta)
           .then(res=>{
             console.log('SE MODIFICO CORRECTAMENTE Cuenta',res.data);
             this.CargarCuenta();
             this.resetCuenta();
           })
           .catch(error=>{
             console.log('ERROR AL MODIFICAR Cuenta');
             console.log(error.response.data.message);
           })
         }
       }
     }
     SeleccionarCuenta(id){
       if(id){
         const dataCuenta = this.cuenta.find(x => x.id_cuenta === id)
         if(!dataCuenta) return;
         this._cuenta.SeleccionarCuenta(id)
         .then(res=>{
           Object.keys(this.newCuenta.controls).forEach(key => {
             this.newCuenta.controls[key].setValue(res.data[key]);
           });
           console.log('SELECCION DE Cuenta EXITOSA',this.newCuenta.value);
             document.getElementById("btnCrudCuenta").click();
         });
       }
     }
     EliminarCuenta(id){
       this._cuenta.EliminarCuenta(id)
       .then(res => {
         console.log(res.data);
         this.CargarCuenta();
       }).catch(err =>  {
       console.log('ERROR AL ELIMINAR Cuenta',err.response.data.message);
       });
   }
   //#endregion CUENTAS

   //#region CUENTA_BANCOS (VINCULAR UNA CUENTA A BANCO)
   //CRUD V3: idPK=> id_cuenta_banco, nomService=> _cuentaBanco, nombreCRUD=> CuentaBanco,  dataP=> cuentaBanco, isSubmitted=>isSubmitted
     cuentaBanco=[];
     newCuentaBanco =new FormGroup({
       // attr:new FormControl('',[Validators.required])
       id_cuenta_banco:new FormControl(0),
       id_banco:new FormControl('',[Validators.required]),
       id_cuenta:new FormControl('')
     })
     CargarCuentaBanco(){
       this._cuentaBanco.ObtenerCuentaBancos()
       .then(res => {
         console.log('CuentaBanco CARGADO',res.data);
         this.cuentaBanco = res.data;
       }).catch(err =>  {
       console.log('ERROR AL CARGAR CuentaBanco',err.response.data.message);
       });
     }
     resetCuentaBanco(){
       this.newCuentaBanco.reset();
       this.isSubmitted =false;
     }
     AgregarModificarCuentaBanco(){

        this._cuenta.EncontrarCuenta(this.newCuenta.controls.nro_cuenta.value)
        .then(res=>{
            this.newCuentaBanco.patchValue({id_cuenta:res.data.id_cuenta})
            this.isSubmitted=true;
            if (this.newCuentaBanco.invalid) {
              return;
            } else {
              let id = this.newCuentaBanco.controls.id_cuenta_banco.value;
              console.log(this.newCuentaBanco.value)
              if (!id) { //PREGUNTAMOS: SI NO TIENE id?
                this._cuentaBanco.AgregarCuentaBanco(this.newCuentaBanco.value)
                .then(res=>{
                  console.log('SE AÑADIO CORRECTAMENTE CuentaBanco',res.data);
                  this.CargarCuentaBanco();
                  this.resetCuentaBanco();
                })
                .catch(error=>{
                  console.log('ERROR AL AÑADIR CuentaBanco');
                  console.log(error.response.data.message);
                })
              } else {
                //SI TIENE ID POR LO TANTO MODIFICAR
                this._cuentaBanco.ModificarCuentaBanco(this.newCuentaBanco.value,this.newCuentaBanco.value.id_cuenta_banco)
                .then(res=>{
                  console.log('SE MODIFICO CORRECTAMENTE CuentaBanco',res.data);
                  this.CargarCuentaBanco();
                  this.resetCuentaBanco();
                })
                .catch(error=>{
                  console.log('ERROR AL MODIFICAR CuentaBanco');
                  console.log(error.response.data.message);
                })
              }
            }

        })
        
       
     }
     SeleccionarCuentaBanco(id){
       if(id){
         const dataCuentaBanco = this.cuentaBanco.find(x => x.id_cuenta_banco === id)
         if(!dataCuentaBanco) return;
         this._cuentaBanco.SeleccionarCuentaBanco(id)
         .then(res=>{
           Object.keys(this.newCuentaBanco.controls).forEach(key => {
             this.newCuentaBanco.controls[key].setValue(res.data[key]);
           });
           console.log('SELECCION DE CuentaBanco EXITOSA',this.newCuentaBanco.value);
             document.getElementById("btnCrudCuentaBanco").click();
         });
       }
     }
     EliminarCuentaBanco(id){
       this._cuentaBanco.EliminarCuentaBanco(id)
       .then(res => {
         console.log(res.data);
         this.CargarCuentaBanco();
       }).catch(err =>  {
       console.log('ERROR AL ELIMINAR CuentaBanco',err.response.data.message);
       });
   }
   //#endregion CUENTA_BANCOS
}
