import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';

@Component({
  selector: 'app-setting-details',
  templateUrl: './setting-details.component.html',
  styleUrls: ['./setting-details.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class SettingDetailsComponent  implements OnInit {
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

  constructor(private detailService: DetailUsersService) { }

  ngOnInit(): void {
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
  async updateDetails() {
    if (this.userDetails && this.userDetails._id) {
      try {
        const updateDetail = await this.detailService.updateDetailById(this.userDetails._id, this.userDetails);
        console.log('Details updated successfully:', updateDetail);
        // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
      } catch (error) {
        console.error('Error updating user details:', error);
        // Aquí puedes manejar el error mostrando un mensaje al usuario
      }
    } else {
      console.error('No user details found or user details does not have an _id.');
    }
  }
  
}
