// Importa cypress-file-upload
import 'cypress-file-upload';

const loginIfNeeded = () => {
    // Lógica para verificar si ya está autenticado
    const isLoggedIn = Cypress.env('isLoggedIn');

    if (!isLoggedIn) {
        // Simular inicio de sesión 
        cy.visit('http://localhost:4200/'); // Ajustar la URL según sea necesario
        cy.get('input[formControlName="email"]').type("antong@gmail.com");
        cy.get('input[formControlName="password"]').type("Anton123@");
        cy.get('app-button-playez').click(); // Ajustar el selector según tu aplicación

        // Esperar a que se complete la navegación después de iniciar sesión
        cy.url().should('include', '/home'); // Ajustar según la URL de la página de inicio

        // Almacenar estado de inicio de sesión en variables de entorno de Cypress
        Cypress.env('isLoggedIn', true);
    }
};

describe('Create Post Page', () => {
    beforeEach(() => {
        // Visitar la página principal y asegurarse de que se haya cargado
        cy.visit('http://localhost:4200/');
        cy.viewport(375, 780); // Ajustar según las necesidades de tu prueba

        // Iniciar sesión si es necesario
        loginIfNeeded();

        // Esperar a que se cargue la página de inicio
        cy.url().should('include', '/home').as('homePage'); // Esperar y asignar un alias a la URL de inicio
    });

    it('should display the modal when "Crea Detalles" button is clicked', () => {
        // Hacer clic en el botón de creación de post en el navbar
        cy.get('app-navbar app-button-add').click();

        // Verificar que el aviso inicial esté presente y cerrarlo
        cy.contains('Aviso').should('exist');
        cy.contains('Aceptar').click();

        // Esperar un momento después de hacer clic en "Aceptar" para que el modal se cierre
        cy.wait(2000); // Ajustar el tiempo según sea necesario

        // Verificar que el aviso ya no esté presente después de cerrarlo
        cy.contains('Aviso').should('not.exist');

        // Esperar a que se carguen los elementos del formulario
        cy.get('@homePage'); // Utilizar el alias para esperar a que la página de inicio se cargue completamente

        // Usar cy.fixture para cargar el archivo antes de adjuntarlo
        cy.fixture('sample-video.mp4').then(fileContent => {
            // Simular selección de archivo y llenar el formulario
            cy.get('[name="fileInput"]').attachFile({
                fileContent: fileContent,
                fileName: 'sample-video.mp4',
                mimeType: 'video/mp4'
            });
        });

        
        // Llenar los campos del formulario sin adjuntar un archivo
        cy.get('ion-input[ngModel="post.title"]').should('be.visible').type('Mi primer post');
        cy.get('ion-input[ngModel="post.description"]').should('be.visible').type('Descripción del video');
        cy.get('ion-select[ngModel="post.category"]').should('be.visible').select('Gol');

        // Hacer clic en el botón para guardar el post
        cy.contains('Guardar').click();

        // Verificar que el modal de éxito se muestra
        cy.contains('El post se ha subido correctamente.').should('exist');
    });
});
