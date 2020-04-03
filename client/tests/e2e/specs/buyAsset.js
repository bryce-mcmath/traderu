describe('Light mode toggle', () => {
	it("Logs in and buys an asset", () => {
    
    cy.visit('/');
		cy.get("button.v-app-bar__nav-icon").click();
		cy.contains("Login").click();
		cy.get('input[type="email"]').type('tu@gmail.com')
		cy.get('input[type="password"]').type('password')
    cy.contains('Submit').click();
    cy.contains('Ok').click();
    cy.contains('View Assets').click();

		cy.wait(2000);
    cy.contains("Aurora Cannabis").click();
    cy.get('[data-cy="portfolio-select"]').click({force: true});
    cy.contains("one").click()
    cy.get('[data-cy="quantity-select"]').type('1');
    cy.get('[data-cy="transaction-select"]').click({force: true});
    cy.contains("Buy").click();
    cy.get('[data-cy="place-order-btn"]').click();
    cy.contains("Success!")
	});
  
  it("Can't sell an un-owned asset", () => {
    
    cy.visit('/');
		cy.get("button.v-app-bar__nav-icon").click();
		cy.contains("Login").click();
		cy.get('input[type="email"]').type('tu@gmail.com')
		cy.get('input[type="password"]').type('password')
    cy.contains('Submit').click();
    cy.contains('Ok').click();
    cy.contains('View Assets').click();

		cy.wait(2000);
    cy.contains("Microsoft").click();
    cy.get('[data-cy="portfolio-select"]').click({force: true});
    cy.contains("two").click()
    cy.get('[data-cy="quantity-select"]').type('1');
    cy.get('[data-cy="transaction-select"]').click({force: true});
    cy.contains("Sell").click();
    cy.get('[data-cy="place-order-btn"]').click();
    cy.contains("Error")
	});
});