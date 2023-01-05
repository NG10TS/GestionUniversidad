import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativosRoutingModule } from './administrativos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SalariosAdminComponent } from './components/salarios-admin/salarios-admin.component';
import { BancosComponent } from './components/bancos/bancos.component';
import { DepositosComponent } from './components/depositos/depositos.component';
import { ArchbancosComponent } from './components/archbancos/archbancos.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { EgresolaboralComponent } from './components/egresolaboral/egresolaboral.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { PlanillasadminComponent } from './components/planillasadmin/planillasadmin.component';
import { EgresoadminsComponent } from './components/egresoadmins/egresoadmins.component';
import { EgresosadminComponent } from './components/egresosadmin/egresosadmin.component';
import { EstudiantesRegularesComponent } from './components/estudiantes-regulares/estudiantes-regulares.component';
import { PagoDetallesEstudiantesComponent } from './components/pago-detalles-estudiantes/pago-detalles-estudiantes.component';
import { ComprobantesComponent } from './components/comprobantes/comprobantes.component';
import { BoletasComponent } from './components/boletas/boletas.component';
import { PapeletasComponent } from './components/papeletas/papeletas.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { PlanillaAdminComponent } from './components/planilla-admin/planilla-admin.component';
import { PagoefectivoComponent } from './components/pagoefectivo/pagoefectivo.component';
import { ConveniotrabajoComponent } from './components/conveniotrabajo/conveniotrabajo.component';
import { PagoextraComponent } from './components/pagoextra/pagoextra.component';
import { ResumenplanillaComponent } from './components/resumenplanilla/resumenplanilla.component';
import { ConvenioComponent } from './components/convenio/convenio.component';
import { ResolucionconvenioComponent } from './components/resolucionconvenio/resolucionconvenio.component';
import { DeudasComponent } from './components/deudas/deudas.component';
import { PlandeudaComponent } from './components/plandeuda/plandeuda.component';
import { PagopendientesComponent } from './components/pagopendientes/pagopendientes.component';
import { MateriaspendientesComponent } from './components/materiaspendientes/materiaspendientes.component';
import { PagopendestComponent } from './components/pagopendest/pagopendest.component';
import { VendetalleComponent } from './components/vendetalle/vendetalle.component';
import { VensemestreComponent } from './components/vensemestre/vensemestre.component';
import { VenvencimientoComponent } from './components/venvencimiento/venvencimiento.component';
import { MontomateriaComponent } from './components/montomateria/montomateria.component';
import { RetirosComponent } from './components/retiros/retiros.component';
import { PlanpagoComponent } from './components/planpago/planpago.component';
import { PlaninsbecaComponent } from './components/planinsbeca/planinsbeca.component';
import { PresupuestosIngresosComponent } from './components/presupuestos-ingresos/presupuestos-ingresos.component';
import { MatriculasComponent } from './components/matriculas/matriculas.component';
import { EgresoOperativosComponent } from './components/egreso-operativos/egreso-operativos.component';
import { PlanDetallesComponent } from './components/plan-detalles/plan-detalles.component';
import { PlanillaDocentesComponent } from './components/planilla-docentes/planilla-docentes.component';
import { ProdOperacionPoaComponent } from './components/POA/prod-operacion-poa/prod-operacion-poa.component';
import { PoaComponent } from './components/POA/poa/poa.component';
import { PresComponent } from './components/POA/pres/pres.component';
import { FodasComponent } from './components/POA/fodas/fodas.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AreasComponent } from './components/GTH/areas/areas.component';
import { MobiliariosComponent } from './components/GTH/mobiliarios/mobiliarios.component';
import { ReporteIngresosComponent } from './components/GTH/reporte-ingresos/reporte-ingresos.component';
import { ReporteEgresosComponent } from './components/reporte-egresos/reporte-egresos.component';
import { AlmacenesGTHComponent } from './components/GTH/almacenes-gth/almacenes-gth.component';
import { RegistroCajachicasComponent } from './components/registro-cajachicas/registro-cajachicas.component';
import { RequerimientosComponent } from './components/requerimientos/requerimientos.component';
import { DocenteseguiminetoComponent } from './components/docenteseguimineto/docenteseguimineto.component';
// import { ReporteEgresosComponent } from './components/reporte-egresos/reporte-egresos.component';
// import { AlmacenesComponent } from '../condominios-ontologicos/components/almacenes/almacenes.component';


@NgModule({
  declarations: [
    SalariosAdminComponent,
    BancosComponent,
    DepositosComponent,
    ArchbancosComponent,
    EmpresasComponent,
    EgresolaboralComponent,
    IngresosComponent,
    PlanillasadminComponent,
    EgresoadminsComponent,
    EgresosadminComponent,
    EstudiantesRegularesComponent,
    PagoDetallesEstudiantesComponent,
    FacturasComponent,
    PlanillaAdminComponent,
    PagoefectivoComponent,
    ConveniotrabajoComponent,
    PagoextraComponent,
    ResumenplanillaComponent,
    ConvenioComponent,
    ResolucionconvenioComponent,
    DeudasComponent,
    PlandeudaComponent,
    PagopendientesComponent,
    MateriaspendientesComponent,
    PagopendestComponent,
    VendetalleComponent,
    VensemestreComponent,
    VenvencimientoComponent,
    MontomateriaComponent,
    RetirosComponent,
    PlanpagoComponent,
    PlaninsbecaComponent,
    ComprobantesComponent,
    BoletasComponent,
    PapeletasComponent,
    PresupuestosIngresosComponent,
    MatriculasComponent,
    EgresoOperativosComponent,
    PlanDetallesComponent,
    PlanillaDocentesComponent,
    ProdOperacionPoaComponent,
    PoaComponent,
    PresComponent,
    FodasComponent,
    AreasComponent,
    MobiliariosComponent,
    ReporteIngresosComponent,
    // almacenesComponent.AlmacenesComponent,
    // AlmacenesComponent,
    ReporteEgresosComponent,
    AlmacenesGTHComponent,
    RegistroCajachicasComponent,
    RequerimientosComponent,
    DocenteseguiminetoComponent,
  ],
  imports: [
    CommonModule,
    AdministrativosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CoreModule
  ]
})
export class AdministrativosModule { }
