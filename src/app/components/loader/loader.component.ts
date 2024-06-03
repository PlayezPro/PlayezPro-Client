import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports:[IonContent],
  standalone: true
})
export class LoaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
