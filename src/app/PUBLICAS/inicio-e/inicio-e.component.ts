import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-e',
  templateUrl: './inicio-e.component.html',
  styleUrls: ['./inicio-e.component.css']
})
export class InicioEComponent implements OnInit {
  ruta = 'http://localhost:8000/';
  constructor() { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
  }

}
