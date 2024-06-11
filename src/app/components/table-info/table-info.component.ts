import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
// import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SkillService } from 'src/app/services/skillService/skill.service';
import { FollowService } from 'src/app/services/followService/follows.service';
import { ButtonPlayezComponent } from 'src/app/components/ui_ux/button-playez/button-playez.component';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';
import { CountryService } from 'src/app/services/countryService/country.service';
import { TabService } from 'src/app/services/tabService/tab.service';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.scss'],
  standalone: true,
  imports: [ CommonModule, ButtonPlayezComponent,IonicModule]
})
export class TableInfoComponent  implements OnInit {
  countries: any[] = [];
  selectedCountry: any = null;
  dropdownOpen: boolean = false;
  activeTab: string = 'tab1'; // Para manejar la pestaña activa

  @Input() users_id: string | null = null;
  userId: string | null = null;
  userDetail: any[] = [];
  defaultImage: string = '../../../assets/userPic/profileIcon.png'; // Ruta a tu imagen predeterminada
  imageFile: File | null = null;
  isGeneratedCard: boolean = false;

  constructor(private detailsService: DetailUsersService, private userServices: UserService, private skillService: SkillService, private followService: FollowService, private cdr: ChangeDetectorRef,  private countryService: CountryService, private tabService: TabService) { }

  ngOnInit() {
    this.loadCountries();
    this.tabService.initializeFirstTab('tab1');
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
    } catch (error) {
      console.error('Error adding follower:', error);
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

  showTab(tabId: string): void {
    this.activeTab = tabId; // Cambia la pestaña activa
    this.tabService.showTab(tabId); // Llama al servicio si es necesario
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  calculateAge(dateString: string): number {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
