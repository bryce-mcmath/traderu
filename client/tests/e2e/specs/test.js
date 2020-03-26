// https://docs.cypress.io/api/introduction/api.html

describe('FooterNav', () => {
	it('Navigates correctly via the footer nav', () => {
		
		cy.visit('/');
		
		cy.contains('span', 'View Stocks');
		
		cy.get('.fa-balance-scale-left').click();
		cy.contains('h1', 'Select a Stock');

		cy.get('.fa-chart-line').click();
		cy.contains('h2', 'Portfolios');

		cy.get('.fa-trophy.footer-nav-button__icon').click();
		cy.contains('h1', 'Leaderboard');
	});
});

describe('Add a portfolio', () => {
	it('can login, make a portfolio, and delete portfolio', () => {

		cy.visit('/');
		cy.get("button.v-app-bar__nav-icon").click();
		cy.contains("Login").click();
		cy.get('input[type="email"]').type('tu@gmail.com')
		cy.get('input[type="password"]').type('password')
		cy.contains('Submit').click();

		cy.contains("Testington Userham")

		cy.visit('/portfolios');
		cy.contains('New Portfolio').click();
		cy.get('.v-dialog input').type('test portfolio'); 
		cy.contains('Save').click();

		cy.contains('test portfolio').click();
		cy.contains('Delete Portfolio').click();
		cy.get('.v-dialog').contains('Delete').click();

		//Wait for delete to go through
		cy.wait(1000);

		cy.contains('test portfolio').should('not.exist')

	});
});

//This should be a unit test, just keeping as example of cypress functions for now
// describe('Light mode toggle', () => {
// 	it("Defaults to light mode and toggles to dark when clicked", () => {
// 		cy.visit('/');
// 		cy.get('#app').should('have.class', 'app--light')

// 		cy.get('.vuemorphic-toggle__bar').click();
// 		cy.get('#app').should('have.class', 'app--dark')
// 	});
// });
