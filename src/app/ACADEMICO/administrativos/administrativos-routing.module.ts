import { RequerimientosComponent } from './components/requerimientos/requerimientos.component';
import { RegistroCajachicasComponent } from './components/registro-cajachicas/registro-cajachicas.component';
import { AlmacenesGTHComponent } from './components/GTH/almacenes-gth/almacenes-gth.component';
import { ReporteEgresosComponent } from './components/reporte-egresos/reporte-egresos.component';
// import { AlmacenesComponent } from './../condominios-ontologicos/components/almacenes/almacenes.component';
import { PapeletasComponent } from './components/papeletas/papeletas.component';
import { BoletasComponent } from './components/boletas/boletas.component';
import { ComprobantesComponent } from './components/comprobantes/comprobantes.component';
import { EgresoadminsComponent } from './components/egresoadmins/egresoadmins.component';
import { PlanillasadminComponent } from './components/planillasadmin/planillasadmin.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { EgresolaboralComponent } from './components/egresolaboral/egresolaboral.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ArchbancosComponent } from './components/archbancos/archbancos.component';
import { DepositosComponent } from './components/depositos/depositos.component';
import { BancosComponent } from './components/bancos/bancos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvenioComponent } from './components/convenio/convenio.component';
import { ConveniotrabajoComponent } from './components/conveniotrabajo/conveniotrabajo.component';
import { DeudasComponent } from './components/deudas/deudas.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { MateriaspendientesComponent } from './components/materiaspendientes/materiaspendientes.component';
import { MontomateriaComponent } from './components/montomateria/montomateria.component';
import { PagoefectivoComponent } from './components/pagoefectivo/pagoefectivo.component';
import { PagoextraComponent } from './components/pagoextra/pagoextra.component';
import { PagopendestComponent } from './components/pagopendest/pagopendest.component';
import { PagopendientesComponent } from './components/pagopendientes/pagopendientes.component';
import { PlandeudaComponent } from './components/plandeuda/plandeuda.component';
import { PlanillaAdminComponent } from './components/planilla-admin/planilla-admin.component';
import { PlaninsbecaComponent } from './components/planinsbeca/planinsbeca.component';
import { PlanpagoComponent } from './components/planpago/planpago.component';
import { ResolucionconvenioComponent } from './components/resolucionconvenio/resolucionconvenio.component';
import { ResumenplanillaComponent } from './components/resumenplanilla/resumenplanilla.component';
import { RetirosComponent } from './components/retiros/retiros.component';
import { EstudiantesRegularesComponent } from './components/estudiantes-regulares/estudiantes-regulares.component';
import { SalariosAdminComponent } from './components/salarios-admin/salarios-admin.component';
import { PagoDetallesEstudiantesComponent } from './components/pago-detalles-estudiantes/pago-detalles-estudiantes.component';
import { DocenteseguiminetoComponent } from './components/docenteseguimineto/docenteseguimineto.component';
// import { EgresosadminComponent } from './components/egresosadmin/egresosadmin.component';
import { VendetalleComponent } from './components/vendetalle/vendetalle.component';
import { VensemestreComponent } from './components/vensemestre/vensemestre.component';
import { VenvencimientoComponent } from './components/venvencimiento/venvencimiento.component';
import { PresupuestosIngresosComponent } from './components/presupuestos-ingresos/presupuestos-ingresos.component';
import { MatriculasComponent } from './components/matriculas/matriculas.component';
import { PlanillaDocentesComponent } from './components/planilla-docentes/planilla-docentes.component';
import { ProdOperacionPoaComponent } from './components/POA/prod-operacion-poa/prod-operacion-poa.component';
import { PoaComponent } from './components/POA/poa/poa.component';

import { PresComponent } from './components/POA/pres/pres.component';
import { FodasComponent } from './components/POA/fodas/fodas.component';

//GTH
import { AreasComponent } from './components/GTH/areas/areas.component';
import { MobiliariosComponent } from './components/GTH/mobiliarios/mobiliarios.component';
import { ReporteIngresosComponent } from './components/GTH/reporte-ingresos/reporte-ingresos.component';

const routes: Routes = [
  {path: 'salarioadmin', component:SalariosAdminComponent},
  {path: 'EstudiantesRegulares', component:EstudiantesRegularesComponent},
  {path: 'PagoDetallesEstudiantes', component:PagoDetallesEstudiantesComponent},
  {path: 'PresupuestosIngresos', component:PresupuestosIngresosComponent},
  {path: 'PlanillaDocentes', component:PlanillaDocentesComponent},
  {path: 'Matriculas', component:MatriculasComponent},
  {path: 'Bancos', component:BancosComponent},
  {path: 'Depositos', component:DepositosComponent},
  {path: 'ArchBanco', component:ArchbancosComponent},
  {path: 'Empresa', component:EmpresasComponent},
  {path: 'EgresoLaboral', component:EgresolaboralComponent},
  {path: 'Ingreso', component:IngresosComponent},
  {path: 'Docenteseguimineto', component:DocenteseguiminetoComponent},

  // {path: 'EgresoAdmin', component:EgresoadminsComponent},
  {path: 'PlanillaAdmin', component:PlanillasadminComponent},
  {path: 'Comprobante', component:ComprobantesComponent},
  {path: 'Boleta', component:BoletasComponent},
  {path: 'Papeleta', component:PapeletasComponent},
  {path: 'Facturas', component:FacturasComponent },
  // {path: 'PlanillaAdmin', component:PlanillaAdminComponent },
  {path: 'Pagoefectivo', component:PagoefectivoComponent },
  {path: 'Conveniotrabajo', component:ConveniotrabajoComponent},
  {path: 'Pagoextra', component:PagoextraComponent},
  {path: 'Resumenplanilla', component:ResumenplanillaComponent},
  {path: 'Convenio', component:ConvenioComponent},
  {path: 'Resolucionconvenio', component: ResolucionconvenioComponent},
  {path: 'Deudas', component: DeudasComponent},
  {path: 'Plandeuda', component: PlandeudaComponent},
  {path: 'Pagopendientes', component: PagopendientesComponent},
  {path: 'Materiaspendientes', component: MateriaspendientesComponent},
  {path: 'Pagopendest', component: PagopendestComponent},
  {path: 'Vendetalle', component: VendetalleComponent},
  {path: 'Vensemestre', component: VensemestreComponent},
  {path: 'Venvencimiento', component: VenvencimientoComponent},
  {path: 'Montomateria', component: MontomateriaComponent},
  {path: 'Retiros', component: RetirosComponent},
  {path: 'Planpago', component: PlanpagoComponent},
  {path: 'Planinsbeca', component: PlaninsbecaComponent},

  //SECCION POA
  {path: 'ProdOperacionPoa', component: ProdOperacionPoaComponent},
  {path: 'Pres', component: PresComponent},
  {path: 'Fodas', component: FodasComponent},

  {path: 'Poas', component: PoaComponent},

  //SECCION GTH
  {path: 'Areas', component:AreasComponent},
  {path: 'Mobiliarios', component:MobiliariosComponent},
  {path: 'ReporteIngresos', component:ReporteIngresosComponent},
  {path: 'Almacen', component:AlmacenesGTHComponent},
  {path: 'ReporteEgreso', component:ReporteEgresosComponent},
  {path: 'RegistroCajaChica', component:RegistroCajachicasComponent},
  {path: 'Requerimiento', component:RequerimientosComponent},
  // {path: 'ListaRequerimiento', component:ListaRe},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativosRoutingModule { }
