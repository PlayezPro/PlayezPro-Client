import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';
import { ButtonPlayezComponent } from '../ui_ux/button-playez/button-playez.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/countryService/country.service';
// import "/node_modules/flag-icons/css/flag-icons.min.css";

@Component({
  selector: 'app-setting-details',
  templateUrl: './setting-details.component.html',
  styleUrls: ['./setting-details.component.scss'],
  standalone: true,
  imports: [FormsModule, ButtonPlayezComponent, IonicModule, CommonModule]
})
export class SettingDetailsComponent implements OnInit {
  countries: any[] = [];


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

  constructor(private detailService: DetailUsersService,
    private countryService: CountryService,
    private router: Router) {
    this.userDetails.birthYear = new Date().toISOString().slice(0, 10);
  }


  ngOnInit(): void {
    this.loadCountries();//Esta aqui por que no puedo traer la lista de los paises, hay qu emeterlo en el if en cuanto se reciba el userDetail
    const userId = localStorage.getItem('users_id');
    if (userId !== null) {
      this.userId = userId;
     
      this.detailService.getAllDetails().then((data: any) => {
        // Filtra los detalles para encontrar aquellos con el userId deseado
        const userDetail = data.data.find((detail: any) => detail.userId === userId);
        if (userDetail) {
          this.userDetails = userDetail;
          console.log('Details data:', this.userDetails)
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

  async updateDetails() {
    if (this.userDetails && this.userDetails._id) {
      try {
        const updateDetail = await this.detailService.updateDetailById(this.userDetails._id, this.userDetails);
        console.log('Details updated successfully:', updateDetail);
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

}
