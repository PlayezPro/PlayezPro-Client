import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillService } from 'src/app/services/skillService/skill.service';
import { ButtonPlayezComponent } from '../ui_ux/button-playez/button-playez.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-skill',
  templateUrl: './setting-skill.component.html',
  styleUrls: ['./setting-skill.component.scss'],
  standalone: true,
  imports: [FormsModule, ButtonPlayezComponent]
})
export class SettingSkillComponent implements OnInit {
  userSkill: any = {
    pace: '',
    shot: '',
    pas: '',
    dribble: '',
    defense: '',
    physical: '',
  }
  users_id: string | null = null;
  
  constructor(private skillService: SkillService, private router: Router) { }

  ngOnInit(): void {
    const users_id = localStorage.getItem('users_id');
    if (users_id !== null) {
      this.users_id = users_id;
      this.skillService.getAllUserSkill().then((data: any) => {
        const userSkill = data.find((skill: any) => skill.users_id === this.users_id);
        if (userSkill) {
          this.userSkill = userSkill;
          console.log('Skill data:', this.userSkill);
        } else {
          console.error('User skills not found for users_id:', this.users_id);
        }
      }).catch(error => {
        console.error('Error fetching user skills:', error);
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }

  reloadPage(): void {
    this.router.navigateByUrl('/profile').then(() => {
      window.location.reload();
    });
  }

  async updateSkills() {
    if (this.userSkill && this.userSkill._id) {
      try {
        console.log('Updating skills with:', this.userSkill);
        const updateSkill = await this.skillService.updateUserSkill(this.userSkill._id, this.userSkill);
        console.log('Skill updated successfully', updateSkill);
        // Actualizar los datos de userSkill después de la actualización
        this.userSkill = { ...this.userSkill, ...updateSkill };
        console.log(this.userSkill)
        this.reloadPage()
      } catch (error) {
        console.error('Error updating user skills', error);
      }
    } else {
      console.error('No user skill found or user skill does not have _id');
    }
  }
}
