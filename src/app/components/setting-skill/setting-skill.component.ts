import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillService } from 'src/app/services/skillService/skill.service';

@Component({
  selector: 'app-setting-skill',
  templateUrl: './setting-skill.component.html',
  styleUrls: ['./setting-skill.component.scss'],
  standalone: true,
  imports: [FormsModule]
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
  users_id: string | null = null
  constructor(private skillService: SkillService) { }

  ngOnInit(): void { 
    const users_id = localStorage.getItem('users_id')
    if (users_id !== null) {
      this.users_id = users_id;
      this.skillService.getAllUserSkill().then((data:any) => {
        const userSkill = data.find((skill: any) => skill.users_id)
        if (userSkill) {
          this.userSkill = userSkill
          console.log('skill data:', this.userSkill)
        } else {
          console.error('user skills not found for users_id')
        }
      }).catch(error => {
        console.error('error fetching user skills', error)
      })
    } else {
      console.error('User Id not fount in local storage')
    }
  }

  async updateSkills() {
    if (this.userSkill && this.userSkill._id) {
      try {
        const updateSkill = await this.skillService.updateUserSkill(this.userSkill._id, this.userSkill)
        console.log('skill updates successfully', updateSkill)
      } catch (error) {
        console.error('error updating user skills', error)
      }
    } else {
      console.error('no user skill found or user skill dont have _id')
    }
  }

}
