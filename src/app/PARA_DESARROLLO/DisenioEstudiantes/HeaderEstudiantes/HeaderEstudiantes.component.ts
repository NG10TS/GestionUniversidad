import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-HeaderEstudiantes',
  templateUrl: './HeaderEstudiantes.component.html',
  styleUrls: ['./HeaderEstudiantes.component.css']
})
export class HeaderEstudiantesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.consultarlog()
  }
  SesionActiva=false;
  private consultarlog() {
    var tipo = localStorage.getItem('Tipo')
    switch (tipo) {
      case 'Posgrante':
          (localStorage.getItem('userData') != null)?this.SesionActiva=true:this.SesionActiva=false;
          this.SesionActiva=true
          console.log('consultacion')
        break;

      default:
        console.log('NO LOG')
        // this.router.navigate(['/']);
        break;
    }
  }
  private closeSesion()
  {
    localStorage.clear();
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('Tipo');
  }
  OpenNav(){
    //HACER QUE AL ESCOGER ALGUNA OPCION DE LA PARTE DE ARRIBA, ESTE SE ENCOJA
    console.log('ES:', document.getElementById("navbarSupportedContent").classList.value);
    if (document.getElementById("navbarSupportedContent").classList.value == "collapse navbar-collapse show" || document.getElementById("navbarSupportedContent").classList.value == "navbar-collapse collapse show") {
      document.getElementById('navbarSupportedContent').classList.value = "collapse navbar-collapse";
    }
    else
    {
      document.getElementById('navbarSupportedContent').classList.value = "collapse navbar-collapse show";
    }

  }

}
