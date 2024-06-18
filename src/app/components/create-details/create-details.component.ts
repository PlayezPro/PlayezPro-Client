import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';
import { ButtonPlayezComponent } from 'src/app/components/ui_ux/button-playez/button-playez.component';
import { IonicModule } from '@ionic/angular';
import { CountryService } from 'src/app/services/countryService/country.service';
@Component({
  selector: 'app-create-details',
  templateUrl: './create-details.component.html',
  styleUrls: ['./create-details.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonPlayezComponent, IonicModule],
})
export class CreateDetailsComponent implements OnInit {
  countries: any[] = [];
  selectedCountry: any = null;
  modalOpen = false;
  hasDetailInfo = false;
  dropdownOpen: boolean = false;

  detailUserData: any = {
    userId: '', 
    photo: '',
    birthYear: '',
    nationality: '', // Cambiado a nationality
    currentTeam: '',
    dorsal: '',
    favPosition: '',
    mainFoot: '',
    weight: '',
    height: ''
  };

  constructor(private detailUserService: DetailUsersService, private countryService: CountryService) {}

  ngOnInit(): void {
    this.detailUserData.userId = localStorage.getItem('users_id') || '';
    this.checkDetailInfo();
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(
      countries => {
        this.countries = countries;
      },
      error => {
        console.error('Error loading countries:', error);
      }
    );
  }

  async checkDetailInfo(): Promise<void> {
    try {
      // Llamar al servicio para verificar si existe información de detalle para el usuario
      const detailInfo = await this.detailUserService.getDetailById(this.detailUserData.userId);
      this.hasDetailInfo = !!detailInfo; // Asignar true si hay información, false si no hay
    } catch (error) {
      console.error('Error fetching detail information:', error);
    }
  }

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  reloadPage(): void {
    window.location.reload();
  }

  async Crear(): Promise<void> {
    try {
      const savedDetails = await this.detailUserService.createDetailUser(this.detailUserData);
      console.log('Detail user created successfully:', savedDetails);
      this.closeModal();
      this.hasDetailInfo = true; // Actualizar la variable después de crear los detalles
      this.reloadPage()
    } catch (error) {
      console.error('Error creating detail user:', error);
    }
  }
  

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.detailUserData.nationality = country.name;
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
