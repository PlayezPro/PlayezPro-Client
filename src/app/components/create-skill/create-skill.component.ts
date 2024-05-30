import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkillService } from 'src/app/services/skillService/skill.service';
@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreateSkillComponent  implements OnInit {

modalOpen = false;

SkillData: any = {
users_id: '',
pace: '',
shot: '',
pas: '',
dribble: '',
defense: '',
physical: '',
}

  constructor( private skillService: SkillService) { }

  ngOnInit(): void {
    const users_id = localStorage.getItem('users_id');
    if (users_id) {
      this.SkillData.users_id = users_id;
    } else {
      console.error('User ID not found in local storage');
    }
  }


  openModal(): void {
    this.modalOpen = true
  }

  closeModal(): void{
    this.modalOpen = false
  }

  async CreateSkill(): Promise<void> {
    try {
      const savedSkill = await this.skillService.createUserSkill(this.SkillData);
      console.log('Skill user created successfully', savedSkill);
      this.closeModal();
    } catch (error) {
      console.error('Error al crear la skill del usuario:', error);
    }
  }
  }
  
