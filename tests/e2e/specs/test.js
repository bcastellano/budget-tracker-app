// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the website and present login form', () => {
    cy.visit('/')
    cy.contains('div', 'Login')
  })
})
