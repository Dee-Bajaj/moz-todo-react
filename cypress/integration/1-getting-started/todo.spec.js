
describe('Todo app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('can add task to todo list', () => {
    
    cy.get('[data-testid="Input-Text"]')
      .type('Test Task');

    cy.get('[data-testid="Submit-Button"]')
      .click();

    cy.get('[data-testid="Input-Text"]')
      .should('have.value', '');

    cy.contains('Test Task');
  });
  
  it('can check off an item as completed', () => {
    
    cy.contains('Sleep')
      .parent()
      .find('[data-testid="CheckBox-Toggle"]')
      .check() 
      
      cy.get('[data-testid="CheckBox-Toggle"]').should('be.checked');
  })

  it('can uncheck an item', () => {
    
    cy.contains('Eat')
      .parent()
      .find('[data-testid="CheckBox-Toggle"]')
      .uncheck()
    
      cy.get('[data-testid="CheckBox-Toggle"]').should('not.be.checked');
  })
  
    it('can filter for completed tasks', () => {
      cy.contains('Completed').click()

      cy.get('[data-testid="CheckBox-Toggle"]')
        .should('have.length', 1)
     
        cy.get('[data-testid="CheckBox-Label"]').should('have.text','Eat')
    })

    it('can delete a task', () => {
      cy.contains('Repeat').parent().parent()
      .find('[data-testid="Button-Delete"]').click()

      cy.get('.todo-list li')
        .should('not.have.text', 'Repeat')
    })

    it('can edit a task', () => {
      cy.contains('Repeat').parent().parent()
      .find('[data-testid="Button-Edit"]').click()

      cy.get('[data-testid="Input-Edit"]').type('Work')
      
      cy.contains('Repeat').parent().parent()
      .find('[data-testid="Button-EditSave"]').click()

      cy.get('.todo-list li')
        .should('not.have.text', 'Repeat')
      
        cy.get('[data-testid="CheckBox-Label"]').
        should('contains.text', 'Work')
    })
  })
