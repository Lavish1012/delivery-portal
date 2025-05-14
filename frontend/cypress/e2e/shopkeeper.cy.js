describe('Shopkeeper Portal', () => {
    it('should display orders', () => {
      cy.visit('/shopkeeper');
      cy.get('.order-card').should('have.length.greaterThan', 0); // Check if orders are displayed
    });
  
    it('should update order status', () => {
      cy.visit('/shopkeeper');
      cy.get('.order-card').first().find('select').select('Delivered'); // Update status
      cy.get('.order-card').first().contains('Delivered').should('be.visible'); // Verify status update
    });
  });