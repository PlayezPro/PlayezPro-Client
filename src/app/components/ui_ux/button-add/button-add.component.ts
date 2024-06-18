import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class ButtonAddComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  @Input() formNewUser!: FormGroup; 
}
