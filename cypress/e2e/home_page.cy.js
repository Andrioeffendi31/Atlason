describe("Home Page", () => {
    beforeEach(() => {
        cy.visit("/"); // Assuming the home page is served at the root URL ("/")
    });

    it("successfully loads", () => {
        cy.get("#LottieLogo").should("be.visible");
        cy.get('#app-name').should('be.visible');
        cy.get('#app-name').should('contain', 'ATLASON');
    });

    it("allows the user to enter a search query", () => {
        const searchQuery = "United States";
        cy.get('#search-input').first().should("be.visible").type(searchQuery);
        cy.get('#search-input').first().should("have.value", searchQuery);
        cy.get('#search-input').first().type("{enter}");
    });

    it("allows the user to filter by region", () => {
        cy.get('[data-cy=region-filter-menu-button]').first().should("be.visible").click();
        cy.get('[data-cy=region-filter-menu]').first().should("be.visible");
        cy.get('[data-cy=region-filter-menu]').first().contains('Africa').click();
        const searchQuery = "Be";
        cy.get('#search-input').first().should("be.visible").type(searchQuery);
        cy.get('#search-input').first().should("have.value", searchQuery);
        cy.get('#search-input').first().type("{enter}");
    });

    it("allows the user to sort by name", () => {
        cy.get('[data-cy=sort-button]').first().should("be.visible").click();
        cy.get('[data-cy=countires-list]').children().should('have.length', 1).children().should('have.length', 250);
        cy.get('[data-cy=countires-list] > :nth-child(1) > :nth-child(1)').should('contain', 'Zimbabwe');
    });

    it("allows the user to view country details", () => {
        cy.get('[data-cy=countires-list] > :nth-child(1) > :nth-child(103)').click();
        cy.get('[data-cy=country-name]').should('contain', 'Indonesia');
    });
});
