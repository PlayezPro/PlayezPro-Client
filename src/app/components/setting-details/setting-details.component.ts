import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';
import { ButtonPlayezComponent } from '../ui_ux/button-playez/button-playez.component';
import { IonItem, IonLabel } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/countryService/country.service';


@Component({
  selector: 'app-setting-details',
  templateUrl: './setting-details.component.html',
  styleUrls: ['./setting-details.component.scss'],
  standalone: true,
  imports: [FormsModule, ButtonPlayezComponent, IonicModule, CommonModule, IonItem, IonLabel]
})
export class SettingDetailsComponent  implements OnInit {
  countries: any[] = [];
  selectedCountry: any = null;
  dropdownOpen: boolean = false;

  userDetails: any = {
    birthYear: '',
    nationality: '',
    currentTeam: '',
    dorsal: '',
    favPosition: '',
    mainFoot: '',
    weight: '',
    height: '',
  };
  userId: string | null = null;

  constructor(private detailService: DetailUsersService,  private countryService: CountryService, private router: Router) {
    this.userDetails.birthYear = new Date().toISOString().slice(0, 10);
  }


  ngOnInit(): void {
    
    const userId = localStorage.getItem('users_id');
    if (userId !== null) {
      this.userId = userId;
      this.loadCountries();
      this.detailService.getAllDetails().then((data: any) => {
        // Filtra los detalles para encontrar aquellos con el userId deseado
        const userDetail = data.data.find((detail: any) => detail.userId === userId);
        if (userDetail) {
          this.userDetails = userDetail;
        } else {
          console.error('User details not found for userId:', userId);
        }
      }).catch(error => {
        console.error('Error fetching user details:', error);
      });
    } else {
      console.error('User ID not found in local storage.');
    }
  }

  reloadPage(): void {
    this.router.navigateByUrl('/profile').then(() => {
      window.location.reload();
    });
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


  async updateDetails() {
    if (this.userDetails && this.userDetails._id) {
      try {
        const updateDetail = await this.detailService.updateDetailById(this.userDetails._id, this.userDetails);
        this.reloadPage()
        // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
      } catch (error) {
        console.error('Error updating user details:', error);
        // Aquí puedes manejar el error mostrando un mensaje al usuario
        this.reloadPage()
      }
    } else {
      console.error('No user details found or user details does not have an _id.');
    }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.userDetails.nationality = country.name;
    this.dropdownOpen = false;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  getCountryFlag(nationality: string): string {
    const selectedCountry = this.countries.find(country => country.name === nationality);
    return selectedCountry ? `../../../assets/icon/flags/4x3/${selectedCountry.code}.svg` : '';
  }

  
}
