import { Component, OnInit, Input, OnChanges, SimpleChanges,ChangeDetectorRef} from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { SkillService } from 'src/app/services/skillService/skill.service';
import { FollowService } from 'src/app/services/followService/follows.service';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';


@Component({
  selector: 'app-futcard',
  templateUrl: './futcard.component.html',
  styleUrls: ['./futcard.component.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,IonButton]
})
export class FutcardComponent  implements OnInit, OnChanges {
  @Input() users_id: string | null = null;
  userId: string | null = null;
  userDetail: any [] = [];


  constructor(private detailsService:DetailUsersService,private userServices: UserService, private skillService:SkillService, private followService:FollowService,private cdr: ChangeDetectorRef) { }

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
        const userDetails = await this.detailsService.getDetailById(this.userId)
        detail.userDetails = userDetails;
         console.log(userDetails)
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
        const userDetails = await this.detailsService.getDetailById(users_id)
        detail.userDetails = userDetails;
      const follower = localStorage.getItem('users_id')!;        
      const verifyRelation = await this.followService.checkRelation(detail._id,follower)
      detail.hasRelation = verifyRelation;
      // this.cdr.detectChanges();
      console.log(`Post ID: ${detail._id},followerID:${follower}, isRelation: ${verifyRelation}`);
      
      }
    } catch (error) {
      console.error('Error al generar la tarjeta del visitante:', error);
    }
  }
  async createRelation(followedID: string): Promise<void> {
    try {
      const userFollower = localStorage.getItem('users_id');
  
      // Verifica que los IDs no sean null antes de usarlos
      if (userFollower && followedID) {
        await this.followService.addFollower(followedID,userFollower); 
        console.log('Follower added successfully');
      } else {
        console.error('User ID or Followed ID is missing');
      }
    } catch (error) {
      console.error('Error adding follower:', error);
    }
  }
}