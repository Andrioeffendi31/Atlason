describe('template spec', () => {
    beforeEach(() => {
        cy.visit('/country/IDN');
    });

    it('should have a country detail info', () => {
        cy.get('[data-cy=country-name]').should('contain', 'Indonesia');
        cy.get('[data-cy=country-info]').should('be.visible');
        cy.get('[data-cy=country-info] > :nth-child(1) > :nth-child(2)').should('contain', 'Indonesia');
        cy.get('[data-cy=country-info] > :nth-child(2) > :nth-child(2)').should('contain', '273523621');
        cy.get('[data-cy=country-info] > :nth-child(3) > :nth-child(2)').should('contain', 'Asia');
    });

    it('allows the user to go back to home page', () => {
        cy.get('[data-cy=back-button]').should('be.visible').click();
        cy.get('#app-name').should('contain', 'ATLASON');
    });

    it('allows the user to go to view border country', () => {
        cy.get('[data-cy=border-countries]').should('be.visible');
        cy.get('[data-cy=border-countries] > :nth-child(2)').should('contain', 'TLS');
        cy.get('[data-cy=border-countries] > :nth-child(2)').click();
        cy.get('[data-cy=country-name]').should('contain', 'Timor-Leste');
    });
});