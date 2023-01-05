import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  contrasenia
  contraseniaN1; //NUEVA CONTRASEÑA 1
  contraseniaN2; //NUEVA CONTRASEÑA 2
  IncorrectaPassN=false; //MENSAJE DE NO COINCIDEN
}
