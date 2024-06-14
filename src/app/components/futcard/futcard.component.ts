import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonPopover, IonList,IonItem, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { SkillService } from 'src/app/services/skillService/skill.service';
import { FollowService } from 'src/app/services/followService/follows.service';
import { ButtonPlayezComponent } from 'src/app/components/ui_ux/button-playez/button-playez.component';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';
import { CountryService } from 'src/app/services/countryService/country.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-futcard',
  templateUrl: './futcard.component.html',
  styleUrls: ['./futcard.component.scss'],
  standalone: true,
  imports: [IonIcon, IonList, IonPopover, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButton, ButtonPlayezComponent, IonItem, RouterLink]
})
export class FutcardComponent implements OnInit, OnChanges {
  countries: any[] = [];
  selectedCountry: any = null;
  dropdownOpen: boolean = false;

  @Input() users_id: string | null = null;
  userId: string | null = null;
  userDetail: any[] = [];
  defaultImage: string = '../../../assets/userPic/profileIcon.png'; // Ruta a tu imagen predeterminada
  imageFile: File | null = null;
  isGeneratedCard: boolean = false;
  relation:boolean = false;

  constructor(private detailsService: DetailUsersService, private userServices: UserService, private skillService: SkillService, private followService: FollowService, private cdr: ChangeDetectorRef,  private countryService: CountryService,) { }

  ngOnInit() {
    this.loadCountries();
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

      for (const detail of this.userDetail) {
        const userSkill = await this.skillService.getUserSkill(this.userId)
        detail.userSkills = userSkill;
        const userDetails = await this.detailsService.getDetailById(this.userId)
        detail.userDetails = userDetails;
        console.log(userDetails)
      }
      this.isGeneratedCard = true;
    } catch (error) {
      console.error('Error al generar la tarjeta:', error);
    }
  }

  async loadCountries(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.countryService.getCountries().subscribe(
        countries => {
          this.countries = countries;
          resolve();
        },
        error => {
          console.error('Error loading countries:', error);
          reject(error);
        }
      );
    });
  }

  async cardVisitor(users_id: string) {
    try {
      const response = await this.userServices.getUserById(users_id);
      this.userDetail = response // Asegúrate de que estás accediendo correctamente a la propiedad `data` de la respuesta
      for (const detail of this.userDetail) {
        const userSkill = await this.skillService.getUserSkill(users_id)
        detail.userSkills = userSkill;
        const userDetails = await this.detailsService.getDetailById(users_id)
        detail.userDetails = userDetails;
        const follower = localStorage.getItem('users_id')!;
        const verifyRelation = await this.followService.checkRelation(detail._id, follower)
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
        await this.followService.addFollower(followedID, userFollower);
        console.log('Follower added successfully');
        
      } else {
        console.error('User ID or Followed ID is missing');
      }
      this.relation = true;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error adding follower:', error);
    }
  }

  async deleteRelation(followedID: string): Promise<void>{
    try {
      const userFollower = localStorage.getItem('users_id');
      if (userFollower && followedID) {
        await this.followService.deleteRelation(followedID, userFollower);
        
        console.log('Relacion Borrada');
      } else {
        console.error('User ID or Followed ID is missing');
      }
      this.relation = false;
      this.cdr.detectChanges();
    } catch (error) {
      
    }
  }

  handleImageError(detail: any) {
    detail.userDetails.photo = this.defaultImage;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      console.log('Archivo seleccionado:', this.imageFile);
    }
  }
  

  async uploadImage() {
    if (this.imageFile) {
      this.userId = localStorage.getItem('users_id');

      if (this.userId) {
        try {
          const userDetails = await this.detailsService.getDetailById(this.userId);
          console.log(userDetails)
          const detailId = userDetails._id; // Extrae el campo _id del response

          const formData = new FormData();
          formData.append('imagen', this.imageFile);
          formData.forEach((value, key) => {
            console.log(key, value);
          });

          const response = await this.detailsService.addImageProfile(detailId, formData);
          console.log('Imagen subida exitosamente', response);
          return response.data;
        } catch (error) {
          console.error('Error al subir la imagen', error);
        }
      } else {
        console.error('No se ha encontrado el userId en el localStorage');
      }
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  }

  getCountryFlag(nationality: string): string {
    const selectedCountry = this.countries.find(country => country.name === nationality);
    return selectedCountry ? `../../../assets/icon/flags/4x3/${selectedCountry.code}.svg` : '';
  }

}
