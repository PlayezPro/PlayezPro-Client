import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { DetailUsersService } from 'src/app/services/detailService/detail-users.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/userService/user.service';
import { Router } from '@angular/router';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';
import { ButtonPlayezComponent } from 'src/app/components/ui_ux/button-playez/button-playez.component';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.page.html',
  styleUrls: ['./manage-post.page.scss'],
  imports: [ CommonModule, FormsModule, NavbarComponent, TopbarComponent, IonicModule, ButtonPlayezComponent],
  standalone: true
})
export class ManagePostPage implements OnInit {
  details: any[] = [];
  filteredDetails: any[] = [];
  searchTerm: string = '';
  selectedPosition: string = '';
  defaultImage: string = '../../../assets/userPic/profileIcon.png'

  constructor(private DetailService: DetailUsersService, private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.userAllDetails();
  }

  async userAllDetails() {
    try {
      const response = await this.DetailService.getAllDetails();
      this.details = response.data;

      for (const detail of this.details) {
        const userDetails = await this.userService.getUserById(detail.userId);
        detail.userDetails = userDetails;
      }
    } catch (error) {
      console.error(error);
    }
    this.filteredDetails = this.details;
  }

  async handleImageError(detail: any) {
    try {
      detail.photo = this.defaultImage; // Assuming detail has a 'photo' property
    } catch (error) {
      console.error(error);
    }
  }

  filterDetails(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }

  filterByPosition(event: any) {
    this.selectedPosition = event.detail.value.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredDetails = this.details.filter(detail => {
      const matchesSearchTerm = this.searchTerm === '' || 
      (detail.userDetails && detail.userDetails[0] && detail.userDetails[0].name &&
        detail.userDetails[0].name.toLowerCase().includes(this.searchTerm)) ||
      (detail.currentTeam && detail.currentTeam.toLowerCase().includes(this.searchTerm)) ||
      (detail.nationality && detail.nationality.toLowerCase().includes(this.searchTerm));
      const matchesPosition = this.selectedPosition === '' || 
        (detail.favPosition && detail.favPosition.toLowerCase() === this.selectedPosition);
      return matchesSearchTerm && matchesPosition;
    });
  }
  passUserId(userId: string) {
    this.router.navigate(['/manage-user', userId]);
  } 
}
