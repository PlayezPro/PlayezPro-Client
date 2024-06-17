// cypress/e2e/noticeV.cy.ts
describe('NoticeV Page', () => {
  beforeEach(() => {
    // Escuchar excepciones no capturadas para evitar que Cypress falle automáticamente
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Devuelve false para evitar que Cypress falle en excepciones no capturadas
      return false;
    });

    // Asegurarse de visitar la página de inicio de sesión y realizar el inicio de sesión
    cy.visit('http://localhost:4200/');
    cy.viewport('iphone-6');

    // Asegurarse de que el formulario de inicio de sesión esté disponible antes de interactuar
    cy.get('form').should('be.visible').within(() => {
      cy.get('[formControlName="email"]').type('ramon@gmail.com');
      cy.get('[formControlName="password"]').type('Ramon123@');
    });

    cy.contains('entrar').click(); // Cambiar según el texto del botón en tu aplicación

    // Verificar que se haya iniciado sesión correctamente
    cy.contains('¡Bienvenido!').should('be.visible');
    cy.url().should('include', '/home'); // Verificar que se redirige a la página de inicio (/home)
  });

  it('should display the NoticeV page with posts after successful login', () => {
    // Verifica que la sección de muro de publicaciones esté presente y contenga al menos un post visible
    cy.get('section.reels_section').should('be.visible');
    cy.get('.reels_video').should('be.visible');
  });

  it('should interact with post functionalities like like, comment, and share', () => {
    // Selecciona un post específico para interactuar
    cy.get('.reels_video').eq(0).within(() => {
      // Interactúa con el botón de like
      cy.get('.options div:nth-child(1) img').click();
      cy.get('.options div:nth-child(1) span').should('contain', '1'); // Verifica que el contador de likes se actualizó

      // Interactúa con el botón de comentario
      cy.get('.bi-chat').click();
      // Verifica que se abrió el modal de comentarios
      cy.get('ion-modal').should('be.visible');

      // Escribe un comentario
      cy.get('ion-input input').type('¡Gran publicación!');
      cy.get('ion-icon[name="arrow-up-outline"]').click();
      cy.contains('¡Gran publicación!').should('be.visible'); // Verifica que el comentario se agregó correctamente
    });

    // Comprueba la funcionalidad de compartir un post
    cy.get('.reels_video').eq(0).within(() => {
      cy.get('button').click(); // Haz clic en el botón de compartir
    });
    // Verifica que se abrió el action sheet para compartir
    cy.get('ion-action-sheet').should('be.visible');
    // Puedes continuar verificando más detalles específicos de la funcionalidad de compartir según la implementación real
  });

  it('should navigate to user profile page on clicking user name', () => {
    // Selecciona el nombre de usuario en un post específico para navegar a su perfil
    cy.get('.reels_video').eq(0).within(() => {
      cy.get('h4').click(); // Haz clic en el nombre de usuario
    });
    // Verifica que la URL haya cambiado a la página de perfil del usuario
    cy.url().should('include', '/manage-user');
  });

  // Puedes agregar más pruebas para otras funcionalidades del muro de publicaciones según las necesidades de tu aplicación

});
