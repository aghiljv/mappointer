describe('Processes Inputs and returns Outputs Correctly', () => {
  
  beforeEach(() => {
    cy.visit('/')
  })

  it('Returns Correct Distance between two entred coordinates 1', () => {
    cy.get('[data-cy=latitude1]').type('1')
    cy.get('[data-cy=longitude1]').type('2')
    cy.get('[data-cy=latitude2]').type('3')
    cy.get('[data-cy=longitude2]').type('4')
    cy.get('[data-cy=find_button]').click()
    cy.get('[data-cy=distance_container]')
      .invoke('text')
      .should('equal', 'Distance : 314.40kms')
  })

  it('Returns Correct Distance between two entred coordinates 2', () => {
    cy.get('[data-cy=latitude1]').type('23')
    cy.get('[data-cy=longitude1]').type('78')
    cy.get('[data-cy=latitude2]').type('-56')
    cy.get('[data-cy=longitude2]').type('-12')
    cy.get('[data-cy=find_button]').click()
    cy.get('[data-cy=distance_container]')
      .invoke('text')
      .should('equal', 'Distance : 12109.23kms')
  })


})
