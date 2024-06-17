describe('Manage Post Page', () => {
  beforeEach(() => {
    // Asegurarse de iniciar sesión antes de acceder a la página de búsqueda
    cy.visit('http://localhost:4200/');
    cy.viewport('iphone-6');

    // Simular el inicio de sesión con credenciales válidas
    cy.get('form').within(() => {
      cy.get('[formControlName="email"]').type('ramon@gmail.com');
      cy.get('[formControlName="password"]').type('Ramon123@');
    });
    cy.contains('entrar').click(); 

    // Verificar que se redirija a la página de inicio después del inicio de sesión
    cy.url().should('include', '/home');

    // Manejar la excepción no capturada para evitar que las pruebas se interrumpan
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Returning false here prevents Cypress from
      // failing the test
      return false;
    });
  });

  it('should navigate to search', () => {
    // Asegurarse de que el botón de búsqueda esté presente antes de hacer clic
    cy.get('#search_btn').should('be.visible').click();

    // Verificar que estás en la página correcta
    cy.url().should('eq', 'http://localhost:4200/search');
  });

  it('should display search results based on input', () => {
    // Navegar a la página de búsqueda
    cy.get('#search_btn').click();

    // Esperar a que la página de búsqueda cargue completamente
    cy.url().should('eq', 'http://localhost:4200/search');
    cy.get('ion-searchbar').should('be.visible');

    // Filtrar por nombre de usuario
    cy.get('ion-searchbar').type('Madrid');

    // Dar más tiempo para que se carguen los resultados
    cy.get('.card', { timeout: 20000 }).should('contain.text', 'Madrid');

    // Limpiar el filtro
    cy.get('ion-searchbar input').clear();
    cy.get('.card', { timeout: 20000 }).should('have.length.above', 0);
  });

  it('should filter results by position', () => {
    // Navegar a la página de búsqueda
    cy.get('#search_btn').click();

    // Esperar a que la página de búsqueda cargue completamente
    cy.url().should('eq', 'http://localhost:4200/search');
    cy.get('ion-searchbar').should('be.visible');

    // Seleccionar una posición en el filtro
    cy.get('.custom-select-item').click();
    cy.contains('Defensa').click();

    // Verificar que solo se muestran resultados de jugadores en la posición de defensa
    cy.get('.card', { timeout: 20000 }).each(($card) => {
      cy.wrap($card).should('contain.text', 'Defensa');
    });

    // Limpiar el filtro seleccionado
    cy.get('.custom-select-item').click();
    cy.contains('Todos').click();

    // Verificar que se muestran todos los resultados nuevamente
    cy.get('.card', { timeout: 20000 }).should('have.length.above', 0);
  });

  it('should navigate to user details page on button click', () => {
    // Navegar a la página de búsqueda
    cy.get('#search_btn').click();

    // Esperar a que la página de búsqueda cargue completamente
    cy.url().should('eq', 'http://localhost:4200/search');
    cy.get('ion-searchbar').should('be.visible');

    // Hacer clic en el botón 'Ver' del primer resultado
    cy.get('.card', { timeout: 20000 }).first().contains('Ver').click();

    // Verificar que se redirige a la página de detalles del usuario
    cy.url().should('include', '/manage-user');
  });
});
