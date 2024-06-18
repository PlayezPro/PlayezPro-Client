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
  
      // Esperar a que la página de búsqueda cargue completamente
      cy.url().should('eq', 'http://localhost:4200/home'); // Asegurarse de que estás en la página correcta
      cy.get('search-bar').should('be.visible'); // Esperar a que la barra de búsqueda esté presente
      cy.get('card', { timeout: 10000 }).should('be.visible'); // Esperar hasta 10 segundos por los detalles de usuario
    });
  
    it('should display search results based on input', () => {
      // Filtrar por nombre de usuario
      cy.get('search-bar').type('Madrid');
      cy.get('card').should('contain.text', 'Madrid'); // Verificar que los resultados coinciden con la búsqueda
  
      // Limpiar el filtro
      cy.get('search-bar input').clear();
      cy.get('card').should('have.length.above', 0); // Verificar que se muestran todos los resultados nuevamente
    });
  
    it('should filter results by position', () => {
      // Seleccionar una posición en el filtro
      cy.get('custom-select-item').click(); // Abre el selector de posición
      cy.contains('Defensa').click(); // Seleccionar la opción 'Defensa'
  
      // Verificar que solo se muestran resultados de jugadores en la posición de defensa
      cy.get('card').each(($card) => {
        cy.wrap($card).should('contain.text', 'Defensa');
      });
  
      // Limpiar el filtro seleccionado
      cy.get('custom-select-item').click(); // Abre el selector de posición
      cy.contains('Todos').click(); // Seleccionar la opción 'Todos'
  
      // Verificar que se muestran todos los resultados nuevamente
      cy.get('card').should('have.length.above', 0);
    });
  
    it('should navigate to user details page on button click', () => {
      // Hacer clic en el botón 'Ver' del primer resultado
      cy.get('card').first().contains('Ver').click();
  
      // Verificar que se redirige a la página de detalles del usuario
      cy.url().should('include', '/manage-user');
    });
  });
  