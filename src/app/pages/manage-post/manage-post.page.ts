import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { DetailUsersService } from 'src/app/services/detailUsers/detail-users.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.page.html',
  styleUrls: ['./manage-post.page.scss'],
  imports: [ CommonModule, FormsModule, NavbarComponent, IonicModule],
  standalone: true
})
export class ManagePostPage implements OnInit {
  details: any[] = [];
  filteredDetails: any[] = [];
  searchTerm: string = '';
  constructor(private DetailService: DetailUsersService, private userService: UserService) { }

  ngOnInit() {
    this.userAllDetails();
  }

  async userAllDetails() {
    try {
      const response = await this.DetailService.getAllDetails();
      this.details = response.data;
      console.log(response.data);

      for (const detail of this.details) {
        const userDetails = await this.userService.getUserById(detail.userId);
        detail.userDetails = userDetails;
      }
    } catch (error) {
      console.error(error);
    }
    this.filteredDetails = this.details;
    console.log(this.filterDetails)
  }
  
  filterDetails(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === '') {
      // Si el término de búsqueda está vacío, mostrar todos los detalles
      this.filteredDetails = this.details;
    } else {
      // Filtrar los detalles basándose en el término de búsqueda
      this.filteredDetails = this.details.filter(detail => 
        detail.userDetails && detail.userDetails[0] && detail.userDetails[0].name &&
        detail.userDetails[0].name.toLowerCase().includes(searchTerm)
      );
    }
    console.log(this.filteredDetails); // Aquí imprimimos los resultados filtrados
  }
}
