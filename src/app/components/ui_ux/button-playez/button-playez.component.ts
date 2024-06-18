import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-playez',
  templateUrl: './button-playez.component.html',
  styleUrls: ['./button-playez.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonPlayezComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  
  @Input() buttonText: string = '';  // Default text
  @Input() iconUrl: string | null = null;  // URL de la imagen
  @Input() svgContent: string | null = null;  // Contenido SVG
  @Input() formNewUser!: FormGroup; 
  
}
