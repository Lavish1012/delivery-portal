describe('Login Page', () => {
  it('should load the login page', () => {
    cy.visit('/login'); // Visit the login page
    cy.contains('Login').should('be.visible'); // Check if "Login" text is visible
  });

  it('should allow a user to log in', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com'); // Enter email
    cy.get('input[name="password"]').type('password123'); // Enter password
    cy.get('button[type="submit"]').click(); // Click the login button
    cy.url().should('include', '/dashboard'); // Verify redirection to the dashboard
  });
});