import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';

@Component({
  selector: 'app-create-details',
  templateUrl: './create-details.component.html',
  styleUrls: ['./create-details.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule ],
})
export class CreateDetailsComponent  implements OnInit {


  modalOpen = false;

  detailUserData: any = {
    userId: '', // Aquí puedes recuperar el userId del localStorage
    photo: '',
    birthYear: '',
    nationality: '',
    currentTeam: '',
    dorsal: '',
    favPosition: '',
    mainFoot: '',
    weight: '',
    height: ''
  };

  constructor(private detailUserService: DetailUsersService) { }

  ngOnInit(): void {
    // Aquí puedes recuperar el userId del localStorage
    this.detailUserData.userId = localStorage.getItem('users_id') || '';
    console.log(this.detailUserData.userId)
  }

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  async onSubmit(): Promise<void> {
    try {
      const savedDetails = await this.detailUserService.createDetailUser(this.detailUserData);
      console.log('Detail user created successfully:', savedDetails);
      this.closeModal();
    } catch (error) {
      console.error('Error creating detail user:', error);
    }
  }

}
