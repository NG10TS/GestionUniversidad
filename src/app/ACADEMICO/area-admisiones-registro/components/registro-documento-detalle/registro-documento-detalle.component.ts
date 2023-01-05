import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';
import { RegisdocumentoService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/regisdocumento.service';
import { RegisdocumentodocenteService } from 'src/app/core/services/ACADEMICO/area-admisiones-registro/regisdocumentodocente.service';

@Component({
  selector: 'app-registro-documento-detalle',
  templateUrl: './registro-documento-detalle.component.html',
  styleUrls: ['./registro-documento-detalle.component.css']
})
export class RegistroDocumentoDetalleComponent implements OnInit {

    ruta = 'http://localhost:8000/';
    reg=[];
    regdoc=[];
    doc=[];

    newRegistroDocumentoDetalle = new FormGroup({
      // id_reg_det_docu_y_docs:new FormControl(''),
      id_reg_docum_doc:new FormControl(''),
      // id_regis_documen :new FormControl(''),
      codigo_reg :new FormControl(''),
      entrega_reg :new FormControl(''),
      detalle_reg :new FormControl(''),
      vencido_reg :new FormControl(''),
      tipo_documen_docs :new FormControl(''),
    });
    RegistroDocumentoDetalleSeleccionado = {
      id_reg_det_docu_y_docs:'',
      id_reg_docum_doc:'',
      codigo_reg:'',
      entrega_reg:'',
      detalle_reg :'',
      vencido_reg :'',
      tipo_documen_docs :'',
    }
    constructor(protected _regDocDetalle: RegisdocumentodocenteService,
      protected _regdocDoc: RegisdocumentodocenteService
    ) { }

    ngOnInit(): void {
      let rootVar = window['rutacion'];
      this.ruta = rootVar;
      this.CargarRegistroDocumentoDetalles();
      this.CargarRegisdocumentodocentes();
    }
    LimpiarRegistroDocumentoDetalles(){
      this.RegistroDocumentoDetalleSeleccionado = {
        id_reg_det_docu_y_docs:'',
        id_reg_docum_doc:'',
        // id_regis_documen:'',
        codigo_reg:'',
        entrega_reg:'',
        detalle_reg :'',
        vencido_reg :'',
        tipo_documen_docs :'',
      };
      this.newRegistroDocumentoDetalle.patchValue({
      id_reg_det_docu_y_docs:'',
      id_reg_docum_doc:'',
      // id_regis_documen:'',
      codigo_reg:'',
      entrega_reg:'',
      detalle_reg :'',
      vencido_reg :'',
      tipo_documen_docs :'',
      })
     }

    CargarRegistroDocumentoDetalles(){
      this._regDocDetalle.Obtenerregisdocumentodocentes()
      .then(res => {
        console.log(res.data);
        this.reg = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }
    CargarRegisdocumentodocentes(){
      this._regdocDoc.Obtenerregisdocumentodocentes()
      .then(res => {
        console.log(res.data);
        this.regdoc = res.data;
      }).catch(err =>  {
      console.log("err");
      });
    }

    AgregarRegistroDocumentoDetalle(){
      const formData = new FormData();
      formData.append('id_reg_docum_doc',this.newRegistroDocumentoDetalle.value.id_reg_docum_doc);
      formData.append('codigo_reg',this.newRegistroDocumentoDetalle.value.codigo_reg);
      formData.append('entrega_reg',this.newRegistroDocumentoDetalle.value.entrega_reg);
      formData.append('detalle_reg',this.newRegistroDocumentoDetalle.value.detalle_reg);
      formData.append('vencido_reg',this.newRegistroDocumentoDetalle.value.vencido_reg);
      formData.append('tipo_documen_docs',this.newRegistroDocumentoDetalle.value.tipo_documen_docs);
      this._regDocDetalle.Agregarregisdocumentodocente(formData)
      .then(res=>{
        console.log('SE AÑADIO CORRECTAMENTE',res.data);
        this.CargarRegistroDocumentoDetalles();
      })
      .catch(error=>{
        console.log('ERROR AL AÑADIR DOCENTE');
        console.log(error);
      })
    }

    SeleccionarRegistroDocumentoDetalle(id,Modo){
      this._regDocDetalle.Seleccionarregisdocumentodocente(id)
      .then(res => {
        var a = res.data;
        this.RegistroDocumentoDetalleSeleccionado = a;
        console.log('INFO EST SELECCIONADO',this.RegistroDocumentoDetalleSeleccionado);
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
    ModificarRegistroDocumentoDetalle(RegistroDocumentoDetalle){
      console.log('DATOS A ACTUALIZAR',RegistroDocumentoDetalle)
      const formData = new FormData();
      formData.append('id_reg_det_docu_y_docs',RegistroDocumentoDetalle.id_reg_det_docu_y_docs);
      formData.append('id_reg_docum_doc',RegistroDocumentoDetalle.id_reg_docum_doc);
      formData.append('codigo_reg',RegistroDocumentoDetalle.codigo_reg);
      formData.append('entrega_reg',RegistroDocumentoDetalle.entrega_reg);
      formData.append('detalle_reg',RegistroDocumentoDetalle.detalle_reg);
      formData.append('vencido_reg',RegistroDocumentoDetalle.vencido_reg);
      formData.append('tipo_documen_docs',RegistroDocumentoDetalle.tipo_documen_docs);
      this._regDocDetalle.Modificarregisdocumentodocente(formData,RegistroDocumentoDetalle.id_reg_det_docu_y_docs)
      .then(res=>{
        console.log('SE MODIFICO CORRECTAMENTE');
        console.log(res);
        this.CargarRegistroDocumentoDetalles();
      })
      .catch(error=>{
        console.log('HAY ERROR AL MODIFICAR');
        console.log(error);
        this.CargarRegistroDocumentoDetalles();
      })
    }
    EliminarRegistroDocumentoDetalle(id){
      this._regDocDetalle.Eliminarregisdocumentodocente(id)
      .then(res => {
        console.log(res.data);
        this.CargarRegistroDocumentoDetalles();
      }).catch(err =>  {
      console.log("err");
      });
    }
  }


