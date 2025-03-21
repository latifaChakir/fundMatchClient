  describe('Stages Page', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:9091/api/auth/login', {
          email: 'hiba@gmail.com',
          password: 'hiba@gmail.com'
        }).then((response) => {
          window.localStorage.setItem('token', response.body.token);
        });
      cy.intercept('GET', '/api/users/me', {
        statusCode: 200,
        body: {
          id: 1,
          email: 'hiba@gmail.com',
          roles: [{ name: 'ADMIN' }]
        }
      }).as('getCurrentUser');

      cy.intercept('GET', '/api/stages', {
        statusCode: 200,
        body: {
          message: "Opération réussie",
          statusCode: 200,
          data: [
            { "id": 1, "name": "Stage 1" },
            { "id": 25, "name": "Stage 2" },
            { "id": 2, "name": "Stage 3" }
          ],
        },
      }).as('getStages');

      cy.visit('/stages');
    });

    it('should display the Stages page title', () => {
      cy.get('.nk-block-title.page-title').should('contain', 'Stages');
    });

    it('should search for a Stage', () => {
      cy.get('#default-04').type('Stage 1');
      cy.wait(500);
      cy.get('.nk-tb-item').should('contain', 'Stage 1');
    });

    it('should open the add Stage modal', () => {
      cy.contains('Add Stage').click();
      cy.get('app-add-stage').should('be.visible');
    });

    it('should edit a Stage', () => {
      cy.get('.dropdown-toggle').first().click();
      cy.get('[data-test-id="edit-stage"]').first().click({ force: true });

      cy.get('app-add-stage').should('be.visible');
    });

    it('should delete a Stage', () => {
      cy.intercept('DELETE', '**/api/stages/1*').as('deleteStage');

      cy.get('.dropdown-toggle').first().click();
      cy.get('[data-test-id="delete-stage"]').first().click({ force: true });

      cy.get('p-dialog').should('be.visible');
      cy.contains('Yes!').click();

      cy.wait('@deleteStage');

      cy.get('p-dialog').should('not.be.visible');
    });
  });
