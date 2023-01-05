import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  constructor() {
  }
  CalcularEdad(fecha:Date): number {
    console.log('La Fecha es: '+new Date(fecha).getTime());
    console.log('La Fecha de hoy: '+Date.now());
    if (fecha) {
        var timeDiff = Math.abs(Date.now() - new Date(fecha).getTime());
        var resEdad:number =  Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365)-1;
        console.log('La edad RES: '+resEdad);
        return resEdad;
    } else {
        return null;
    }

  }
  NowDate:string;
  ObtenerFechaActual(){
     //OBTENER FECHA ACTUAL

     var now = moment().format().toString();
     now = now.substr(0,10)
    console.log(now)

    //  var dia  = new Date().getUTCDate();
    //  var mes  = new Date().getMonth();
    //  var anio  = new Date().getUTCFullYear();
    //  mes=mes+1
    //  if(dia<10){var diaReal='0'+dia}else{var diaReal=dia.toString()}
    //  if(mes<10){var mesReal='0'+mes}else{var mesReal=dia.toString()}

    //  this.NowDate = anio+'-'+mesReal+'-'+diaReal;
     return now;
    // return dia
  }
  CargarScript(archivos:string[]){
    for(let archivo of archivos){
      let script =document.createElement("script");
      script.src = "./assets/scripts_validation/" + archivo + ".min.js";
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
  MensajeInformacion(titulo:string,descripcion:string, icono){
    Swal.fire({
      title: titulo,
      icon: icono, //'success', error, warning,info
      text: descripcion,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Entendido!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
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

  //#region CONVERTIR NUMEROS A LETRAS
  Unidades(num){

    switch(num)
    {
        case 1: return 'UN';
        case 2: return 'DOS';
        case 3: return 'TRES';
        case 4: return 'CUATRO';
        case 5: return 'CINCO';
        case 6: return 'SEIS';
        case 7: return 'SIETE';
        case 8: return 'OCHO';
        case 9: return 'NUEVE';
    }

    return '';
}//Unidades()

Decenas(num){

    let decena = Math.floor(num/10);
    let unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return 'DIEZ';
                case 1: return 'ONCE';
                case 2: return 'DOCE';
                case 3: return 'TRECE';
                case 4: return 'CATORCE';
                case 5: return 'QUINCE';
                default: return 'DIECI' + this.Unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return 'VEINTE';
                default: return 'VEINTI' + this.Unidades(unidad);
            }
        case 3: return this.DecenasY('TREINTA', unidad);
        case 4: return this.DecenasY('CUARENTA', unidad);
        case 5: return this.DecenasY('CINCUENTA', unidad);
        case 6: return this.DecenasY('SESENTA', unidad);
        case 7: return this.DecenasY('SETENTA', unidad);
        case 8: return this.DecenasY('OCHENTA', unidad);
        case 9: return this.DecenasY('NOVENTA', unidad);
        case 0: return this.Unidades(unidad);
    }
}//Unidades()

DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
        return strSin + ' Y ' + this.Unidades(numUnidades)

    return strSin;
}//DecenasY()

Centenas(num) {
    let centenas = Math.floor(num / 100);
    let decenas = num - (centenas * 100);

    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return 'CIENTO ' + this.Decenas(decenas);
            return 'CIEN';
        case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
        case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
        case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
        case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
        case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
        case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
        case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
        case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
    }

    return this.Decenas(decenas);
}//Centenas()

Seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let letras = '';

    if (cientos > 0)
        if (cientos > 1)
            letras = this.Centenas(cientos) + ' ' + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += '';

    return letras;
}//Seccion()

Miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
    let strCentenas = this.Centenas(resto);

    if(strMiles == '')
        return strCentenas;

    return strMiles + ' ' + strCentenas;
}//Miles()

Millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
    let strMiles = this.Miles(resto);

    if(strMillones == '')
        return strMiles;

    return strMillones + ' ' + strMiles;
}//Millones()

numeroALetras(num, currency) {
    currency = currency || {};
    let data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: '',
        letrasMonedaPlural: currency.plural || 'BOLIVIANOS',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: currency.singular || 'BOLIVIANO', //'PESO', 'Dólar', 'Bolivar', 'etc'
        letrasMonedaCentavoPlural: currency.centPlural || 'CHIQUI PESOS CHILENO',
        letrasMonedaCentavoSingular: currency.centSingular || 'CHIQUI PESO CHILENO'
    };

    if (data.centavos > 0) {
        let centavos = ''
        if (data.centavos == 1)
            centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
        else
            centavos =  this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
        data.letrasCentavos = 'CON ' + centavos
    };

    if(data.enteros == 0)
        return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    if (data.enteros == 1)
        return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
    else
        return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
};
  //#endregion
}
