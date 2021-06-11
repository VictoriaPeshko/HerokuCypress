import Data from '../fixtures/testData.json'


context('Login Page', () => {
  beforeEach(() => {
    cy.visit('login');
  })
  context('ELEMENTS SHOULD BE PRESENT AT THE LOGIN PAGE',()=>{
    it('Browser Title is "The Internet"', () => {
      cy.title().should('eq', 'The Internet');
      })

    it('SHOULD VERIFY PAGE NAME, INSTRUCTION AND POWERED BY', () => {
      cy.get('h2').should('have.text', 'Login Page');
      cy.get('h4').should('contain', 'This is where you can log into the secure area.' +
          ' Enter tomsmith for the username and SuperSecretPassword! for the password. ' +
          'If the information is wrong you should see error messages.');
      cy.xpath('//div[@class="large-4 large-centered columns"]').
      should('contain','Elemental Selenium' );
    })

    it('SHOULD VERIFY INPUT FIELDS Username AND Password ARE EXIST AND HAVE CORRECT NAME',()=>{
      cy.xpath('//label[contains(text(),"Username")]').should('have.text', 'Username');
      cy.get('#username').should('be.visible');
      cy.xpath('//label[contains(text(),"Password")]').should('have.text', 'Password');
      cy.get('#password').should('be.visible');
      expect('.radius').to.exist;
    })
  })

  context('LOG IN TO THE APP',()=>{
    it('USER COULD LOGIN WITH VALID USERNAME AND PASSWORD, SECURE PAGE SHOULD OPENS', () => {
      cy.get('#username').type(Data.login);
      cy.get('#password').type(Data.password);
      cy.get('.fa-sign-in').click();
      cy.get('#flash').should('contain', 'You logged into a secure area!');
      cy.get('h4').should('have.text', 'Welcome to the Secure Area. When you are done click logout below.');
    })

    it('AFTER LOG IN USER COULD LOGOUT',()=>{
      cy.get('#username').type(Data.login);
      cy.get('#password').type(Data.password);
      cy.get('.fa-sign-in').click();
      cy.xpath('//a[@class="button secondary radius"]').click();
      cy.url().should('equal','https://the-internet.herokuapp.com/login');
    })

    it('USER COULD not LOGIN WITH inVALID USERNAME', () => {
      cy.get('#username').type(Data.invalidLogin);
      cy.get('#password').type(Data.password);
      cy.get('.fa-sign-in').click();
      cy.get('#flash').should('contain', 'Your username is invalid!');
      cy.url().should('equal', 'https://the-internet.herokuapp.com/login');
    })

    it('USER COULD not LOGIN WITH inVALID PASSWORD', () => {
      cy.get('#username').type(Data.login);
      cy.get('#password').type(Data.invalidPassword);
      cy.get('.fa-sign-in').click();
      cy.get('#flash').should('contain', 'Your password is invalid!');
      cy.url().should('equal', 'https://the-internet.herokuapp.com/login');
    })

  })

})