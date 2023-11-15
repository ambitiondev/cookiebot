describe('Cookiebot', () => {
	it('Renders consent banner', () => {
		cy.visit('/');
		cy.get('#CybotCookiebotDialog').should('be.visible');
	});

	it('Renders consent page', () => {
		cy.visit('/consentpage');
		cy.get('.CookieDeclaration').should('be.visible');
	});
});
