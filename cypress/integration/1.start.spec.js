describe('Loads the layouts correctly', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Header loaded correctly', () => {
    cy.get('[data-cy=main_header]')
      .invoke('text')
      .should('equal', 'Finder')
  })

  it('Latitude 1 field started empty', () => {
    cy.get('[data-cy=latitude1]')
      .invoke('text')
      .should('equal', '')
  })

  it('Longitude 1 field started empty', () => {
    cy.get('[data-cy=longitude1]')
      .invoke('text')
      .should('equal', '')
  })

  it('Latitude 2 field started empty', () => {
    cy.get('[data-cy=latitude2]')
      .invoke('text')
      .should('equal', '')
  })
  
  it('Longitude 2 field started empty', () => {
    cy.get('[data-cy=longitude2]')
      .invoke('text')
      .should('equal', '')
  })
  
  it('Button loaded correctly', () => {
    cy.get('[data-cy=find_button]')
      .invoke('text')
      .should('contain', 'Find')
  })
  
  it('Map loaded correctly', () => {
    cy.get('[data-cy=main_map]')
      .invoke('text')
      .should('contain', '© Mapbox')
  })
})
