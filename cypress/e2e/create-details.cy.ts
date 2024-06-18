// cypress/component/create-details.cy.js

import { mount } from 'cypress/angular';
import { CreateDetailsComponent } from '../../src/app/components/create-details/create-details.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailUsersService } from '../../src/app/services/detailService/detail-users.service';
import { CountryService } from '../../src/app/services/countryService/country.service';

describe('CreateDetailsComponent', () => {
  beforeEach(() => {
    // Reemplaza esta URL con la URL de tu aplicación
    cy.visit("http://localhost:4200/");
    cy.viewport(375, 667);
    // Completa el formulario de inicio de sesión
    cy.get('input[formControlName="email"]').type("antong@gmail.com");
    cy.get('input[formControlName="password"]').type("Anton123@");
    cy.get('app-button-playez').click(); // Haz clic en el botón de inicio de sesión
    // Espera a que la navegación a la página de inicio se complete
    cy.url().should("include", "/home");
    
  });
  beforeEach(() => {
    cy.mount(CreateDetailsComponent, {
      imports: [CommonModule, IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [DetailUsersService, CountryService],
    });
  });

  it('should open the modal when "Crea Detalles" button is clicked', () => {
    cy.get('app-button-playez').click();
    cy.get('.fixed').should('be.visible'); // Verifica que el modal está visible
  });

  it('should close the modal when "Cancelar" button is clicked', () => {
    cy.get('app-button-playez').click();
    cy.get('.fixed').should('be.visible'); // Asegúrate de que el modal esté visible
    cy.contains('button', 'Cancelar').click();
    cy.get('.fixed').should('not.exist'); // Verifica que el modal no está visible
  });

  it('should submit the form when "Crear Detalles" button is clicked', () => {
    cy.get('app-button-playez').click();
    cy.get('.fixed').should('be.visible'); // Asegúrate de que el modal esté visible

    // Rellenar el formulario
    cy.get('input[name="photo"]').type('https://example.com/photo.jpg');
    cy.get('input[name="birthYear"]').type('2000-01-01');
    cy.get('select[name="country"]').select('Afghanistan'); // Ajustar según el valor
    cy.get('input[name="currentTeam"]').type('Team A');
    cy.get('input[name="dorsal"]').type('10');
    cy.get('input[name="favPosition"]').type('Forward');
    cy.get('input[name="mainFoot"]').type('Right');
    cy.get('input[name="weight"]').type('75');
    cy.get('input[name="height"]').type('180');

    // Hacer clic en el botón de enviar
    cy.contains('button', 'Crear Detalles').click();

    // Verifica que el modal se cierra
    cy.get('.fixed').should('not.exist');
  });

  it('should render the form fields correctly', () => {
    cy.get('app-button-playez').click();
    cy.get('.fixed').should('be.visible'); // Asegúrate de que el modal esté visible

    // Verificar la existencia de los campos del formulario
    cy.get('input[name="photo"]').should('exist');
    cy.get('input[name="birthYear"]').should('exist');
    cy.get('select[name="country"]').should('exist');
    cy.get('input[name="currentTeam"]').should('exist');
    cy.get('input[name="dorsal"]').should('exist');
    cy.get('input[name="favPosition"]').should('exist');
    cy.get('input[name="mainFoot"]').should('exist');
    cy.get('input[name="weight"]').should('exist');
    cy.get('input[name="height"]').should('exist');
  });
});
