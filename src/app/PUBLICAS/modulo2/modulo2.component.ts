import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulo2',
  templateUrl: './modulo2.component.html',
  styleUrls: ['./modulo2.component.css']
})
export class Modulo2Component implements OnInit {
  ruta = 'http://localhost:8000/';
  constructor() { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
  }

}
