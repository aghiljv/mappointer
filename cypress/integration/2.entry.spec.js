describe('Processes Entries Correctly', () => {
  
  beforeEach(() => {
    cy.visit('/')
  })

  it('Latitude 1 field turns red if String entered', () => {
    cy.get('[data-cy=latitude1]').type('hello')
    cy.get('[data-cy=latitude1]')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  it('Latitude 2 field turns red if entered value > 90 or value < -90', () => {
    cy.get('[data-cy=latitude1]').type('100')
    cy.get('[data-cy=latitude1]')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  it('Longitude 1 field turns red if entered value > 180 or value < -180', () => {
    cy.get('[data-cy=latitude1]').type('-200')
    cy.get('[data-cy=latitude1]')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  it('Shows alert if Input is out of bounds', () => {
    cy.get('[data-cy=latitude1]').type('23')
    cy.get('[data-cy=longitude1]').type('45')
    cy.get('[data-cy=latitude2]').type('-200')
    cy.get('[data-cy=longitude2]').type('-60')
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get('[data-cy=find_button]').click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Input/Inputs out of bounds')
    })  
  })

  it('Shows alert if Incorrect inputs passed', () => {
    cy.get('[data-cy=latitude1]').type('23')
    cy.get('[data-cy=longitude1]').type('abcd')
    cy.get('[data-cy=latitude2]').type('-200')
    cy.get('[data-cy=longitude2]').type('-60')
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get('[data-cy=find_button]').click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Incorrect Input/Inputs')
    })  
  })

  it('Shows alert if Source and Destination are same', () => {
    cy.get('[data-cy=latitude1]').type('23')
    cy.get('[data-cy=longitude1]').type('56')
    cy.get('[data-cy=latitude2]').type('23')
    cy.get('[data-cy=longitude2]').type('56')
    const stub = cy.stub()  
    cy.on ('window:alert', stub)
    cy.get('[data-cy=find_button]').click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Same source and destination')
    }) 
  })

  it('Destination Latitude and Longitude turns red if Source and Destination are same', () => {
    cy.get('[data-cy=latitude1]').type('23')
    cy.get('[data-cy=longitude1]').type('56')
    cy.get('[data-cy=latitude2]').type('23')
    cy.get('[data-cy=longitude2]').type('56')
    cy.get('[data-cy=find_button]').click()
    cy.get('[data-cy=latitude2]')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('[data-cy=longitude2]')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })


})
