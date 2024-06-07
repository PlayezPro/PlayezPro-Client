import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkillService } from 'src/app/services/skillService/skill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreateSkillComponent implements OnInit {

  modalOpen = false;
  hasSkillInfo = false; // Variable para controlar la visibilidad del botón

  SkillData: any = {
    users_id: '',
    pace: '',
    shot: '',
    pas: '',
    dribble: '',
    defense: '',
    physical: ''
  }

  constructor(private skillService: SkillService, private router: Router) { }

  ngOnInit(): void {
    const users_id = localStorage.getItem('users_id');
    if (users_id) {
      this.SkillData.users_id = users_id;
      // Verificar si ya existe información de habilidades para el usuario
      this.checkSkillInfo();
    } else {
      console.error('User ID not found in local storage');
    }
  }

  async checkSkillInfo(): Promise<void> {
    try {
      // Llamar al servicio para verificar si existe información de habilidades para el usuario
      const skillInfo = await this.skillService.getUserSkill(this.SkillData.users_id);
      console.log(skillInfo);
      this.hasSkillInfo = skillInfo && skillInfo.length > 0; // Asignar false si no hay información, true si hay información
    } catch (error) {
      console.error('Error fetching skill information:', error);
      // En caso de error, establecer hasSkillInfo en false para mostrar el botón
      this.hasSkillInfo = false;
    }
  }
  

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  reloadPage(): void {
    this.router.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  async CreateSkill(): Promise<void> {
    try {
      const savedSkill = await this.skillService.createUserSkill(this.SkillData);
      console.log('Skill user created successfully', savedSkill);
      this.closeModal();
      this.hasSkillInfo = true; // Actualizar la variable después de crear las habilidades
      this.reloadPage()
    } catch (error) {
      console.error('Error al crear la skill del usuario:', error);
    }
  }
}
