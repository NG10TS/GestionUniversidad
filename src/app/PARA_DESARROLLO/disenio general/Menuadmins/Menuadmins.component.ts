import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Menuadmins',
  templateUrl: './Menuadmins.component.html',
  styleUrls: ['./Menuadmins.component.css']
})
export class MenuadminsComponent implements OnInit {
  ruta = environment.service
  constructor() { }

  ngOnInit() {
  }

}
