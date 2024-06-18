describe('Login Page', () => {
    beforeEach(() => {
      // Asegurarse de visitar la página de inicio
      cy.visit('http://localhost:4200/');
      
      // Ajustar la vista a tamaño móvil
      cy.viewport('iphone-6');
    });
  
    it('should display error messages on invalid form submission', () => {
      // Hacer click en el botón de inicio de sesión sin llenar el formulario
      cy.get('form').within(() => {
        cy.get('[formControlName="email"]').type('Invalid@gmail.com'); 
        cy.get('[formControlName="password"]').type('InvalidPassword'); 
      });
      cy.contains('entrar').click(); 
  
      // Verificar que se muestren los mensajes de error
      cy.contains('Error al iniciar sesión').should('be.visible');
  
      // Verificar que no se redirige a /home
      cy.url().should('not.include', '/home');
    });
  
    it('should login successfully with correct credentials', () => {
      // Llenar el formulario con credenciales válidas
      cy.get('form').within(() => {
        cy.get('[formControlName="email"]').type('ramon@gmail.com');
        cy.get('[formControlName="password"]').type('Ramon123@');
      });
      cy.contains('entrar').click(); 
  
      // Verificar que se muestre el mensaje de bienvenida
      cy.contains('¡Bienvenido!').should('be.visible');
  
      // Verificar la redirección a la página de inicio
      cy.url().should('include', '/home');
    });
  });
  