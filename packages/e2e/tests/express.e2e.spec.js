/* eslint-disable */

context('Website 1', () => {
  it('should correctly resolve the regex for website 1', () => {
    cy.visit('http://localhost:3300/about', {
      headers: {
        'x-vhost': 'e2e.website-1.com',
      },
    });
    cy.contains('About website 1');
  });
});

context('Website 1', () => {
  it('should correctly resolve the regex for website 1', () => {
    cy.visit('http://localhost:3300/about', {
      headers: {
        'x-vhost': 'website-1.com',
      },
    });
    cy.contains('About website 1');
  });
});

context('Website 2', () => {
  it('should correctly load website 2', () => {
    cy.visit('http://localhost:3300/about', {
      headers: {
        'x-vhost': 'website-2.com',
      },
    });
    cy.contains('This is website 2');
  });
});
