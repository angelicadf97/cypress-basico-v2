Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Angélica');
    cy.get('#lastName').type('Flores');
    cy.get('#email').type('angelicadrum97@gmail.com');
    cy.get('#phone').type('51989468727');
    cy.get('#open-text-area').type('Teste');
    cy.contains('button', 'Enviar').click();
});