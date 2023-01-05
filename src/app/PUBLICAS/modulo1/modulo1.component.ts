import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulo1',
  templateUrl: './modulo1.component.html',
  styleUrls: ['./modulo1.component.css']
})
export class Modulo1Component implements OnInit {
  ruta = 'http://localhost:8000/';
  constructor() { }

  ngOnInit(): void {
    let rootVar = window['rutacion'];
    this.ruta = rootVar;
  }

}
