/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    this.beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    });

    it('prrenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Angélica');
        cy.get('#lastName').type('Flores');
        cy.get('#email').type('angelicadrum97@gmail.com');
        cy.get('#open-text-area').type('Teste');
        cy.contains('button', 'Enviar').click();
        cy.get('[class="success"]').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Angélica');
        cy.get('#lastName').type('Flores');
        cy.get('#email').type('angelicadrum97');
        cy.get('#open-text-area').type('Teste');
        cy.contains('button', 'Enviar').click();
        cy.get('[class="error"]').should('be.visible');
    });

    it('campo de telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone')
            .type('abc')
            .should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Angélica');
        cy.get('#lastName').type('Flores');
        cy.get('#email').type('angelicadrum97@gmail.com');
        cy.get('#phone-checkbox').click();
        cy.get('#open-text-area').type('Teste');
        cy.contains('button', 'Enviar').click();
        cy.get('[class="error"]').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Angélica')
            .should('have.value', 'Angélica')
            .clear()
            .should('have.value', '');
        cy.get('#lastName')
            .type('Flores')
            .should('have.value', 'Flores')
            .clear()
            .should('have.value', '');
        cy.get('#email')
            .type('angelicadrum97@gmail.com')
            .should('have.value', 'angelicadrum97@gmail.com')
            .clear()
            .should('have.value', '');
        cy.get('#phone')
            .type('51989468727')
            .should('have.value', '51989468727')
            .clear()
            .should('have.value', '');
        cy.get('#open-text-area')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '');
        cy.contains('button', 'Enviar').click();
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click();
        cy.get('[class="error"]').should('be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('[class="success"]').should('be.visible');
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog');
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback');
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) => {
            cy.wrap($radio)
            .check()
            .should('be.checked');
        });
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked');
    });

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Angélica');
        cy.get('#lastName').type('Flores');
        cy.get('#email').type('angelicadrum97@gmail.com');
        cy.get('#phone-checkbox').check();
        cy.contains('button', 'Enviar').click();
        cy.get('[class="error"]').should('be.visible');
    });
});