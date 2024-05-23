import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { SkillService } from 'src/app/services/skillService/skill.service';


@Component({
  selector: 'app-futcard',
  templateUrl: './futcard.component.html',
  styleUrls: ['./futcard.component.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule ]
})
export class FutcardComponent  implements OnInit, OnChanges {
  @Input() users_id: string | null = null;
  userId: string | null = null;
  userDetail: any [] = [];


  constructor(private userServices: UserService, private skillService:SkillService) { }

  ngOnInit() {
    if (this.users_id) {
      this.cardVisitor(this.users_id);
    } else {
      this.generateCard();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users_id'] && changes['users_id'].currentValue) {
      this.cardVisitor(changes['users_id'].currentValue);
    }
  }

  async generateCard() {
    try {
      // Obtener el valor de user de localStorage
      this.userId = localStorage.getItem('users_id');
      if (this.userId === null) {
       
        console.error('El valor de user en localStorage es null');
        return; 
      }
      const response = await this.userServices.getUserById(this.userId);
      this.userDetail = response;
      for(const detail of this.userDetail){
        const userSkill = await this.skillService.getUserSkill(this.userId)
        detail.userSkills= userSkill;
      }

    } catch (error) {
      console.error('Error al generar la tarjeta:', error);
      
    }
  }

  async cardVisitor(users_id: string) {
    try {
      const response = await this.userServices.getUserById(users_id);
      console.log(users_id);
      this.userDetail = response// Asegúrate de que estás accediendo correctamente a la propiedad `data` de la respuesta
      console.log(this.userDetail);
      for(const detail of this.userDetail){
        const userSkill = await this.skillService.getUserSkill(users_id)
        detail.userSkills= userSkill;
      }
    } catch (error) {
      console.error('Error al generar la tarjeta del visitante:', error);
    }
  }
}