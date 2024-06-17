describe("Back Button Component", () => {
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
    cy.visit("/home"); // Ajusta esta ruta según tu aplicación
  });
  it("should navigate back when button is clicked", () => {
    cy.get("ion-buttons").click();
    cy.url().should("not.include", "/home"); // Ajusta según la ruta a la que debería navegar
  });

  it("should render the ion-back-button", () => {
    cy.get("ion-back-button").should("exist");
  });
});
