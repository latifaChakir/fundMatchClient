describe('Sectors Page', () => {
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
    cy.intercept('GET', '/api/sectors/all', {
      statusCode: 200,
      body: {
        message: "Opération réussie",
        statusCode: 200,
        data: [
          {
            "id": 1,
            "name": "Education"
          },
          {
            "id": 25,
            "name": "sport"
          },
          {
            "id": 2,
            "name": "Santeo"
          }
        ],
      },
    }).as('getSectors');

    cy.visit('/sectors');
  });

  it('should display the sectors page title', () => {
    cy.get('.nk-block-title.page-title').should('contain', 'Sectors');
  });

  it('should search for a sector', () => {
    cy.get('#default-04').type('sport');
    cy.wait(500);
    cy.get('.nk-tb-item').should('contain', 'sport');
  });

  it('should open the add sector modal', () => {
    cy.contains('Add Sector').click();
    cy.get('app-add-sector').should('be.visible');
  });

  it('should edit a sector', () => {
    cy.get('.dropdown-toggle').first().click();
    cy.get('[data-test-id="edit-sector"]').first().click({ force: true });

    cy.get('app-add-sector').should('be.visible');
  });

  it('should delete a sector', () => {
    cy.intercept('DELETE', '**/api/sectors/1*').as('deleteSector');

    cy.get('.dropdown-toggle').first().click();
    cy.get('[data-test-id="delete-sector"]').first().click({ force: true });

    cy.get('p-dialog').should('be.visible');
    cy.contains('Yes!').click();

    cy.wait('@deleteSector');

    cy.get('p-dialog').should('not.be.visible');
  });

  it('should paginate through sectors', () => {
    cy.get('.pagination').should('be.visible');
    cy.get('.page-link').contains('1').click();
    cy.get('.nk-tb-item').should('exist');
  });
});
