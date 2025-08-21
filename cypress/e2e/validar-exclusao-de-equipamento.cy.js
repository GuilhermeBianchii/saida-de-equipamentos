describe('Exclusão de equipamento/Validar exclusão de equipamento cadastrado', () => {
  it('Deve permitir a exclusão de um equipamento cadastrado com a confirmação de exclusão', () => {
    //Arrange
    cy.visit('https://guilhermebianchii.github.io/saida-de-equipamentos/')
    //Act
      cy.get('#nome').click().type('Anestesia')
    cy.get('#ordemServico').click().type('12345')
    cy.get('#numeroSerie').click().type('12345')
    cy.get('#patrimonio').click().type('123')
    cy.get('#fabricante').click().type('Drager')
    cy.get('#modelo').click().type('Fabius')
    cy.get('#dataEnvio').click().type('2023-06-20')
    cy.get('#descricao').click().type('Manutenção preventiva')
    cy.get('#empresa').click().type('Braun')
    cy.contains('button', 'Salvar').click()
    //Assert
    cy.contains('Anestesia').should('be.visible')

    //Act
    cy.get('.delete-btn').click()
    cy.contains('Sim').click()
    //Assert
    cy.contains('Anestesia').should('not.exist')

  })
  it('Não deve permitir a exclusão de um equipamento cadastrado com o cancelamento da exclusão', () => {
    //Arrange
    cy.visit('https://guilhermebianchii.github.io/saida-de-equipamentos/')
    //Act
      cy.get('#nome').click().type('Anestesia')
    cy.get('#ordemServico').click().type('12345')
    cy.get('#numeroSerie').click().type('12345')
    cy.get('#patrimonio').click().type('123')
    cy.get('#fabricante').click().type('Drager')
    cy.get('#modelo').click().type('Fabius')
    cy.get('#dataEnvio').click().type('2023-06-20')
    cy.get('#descricao').click().type('Manutenção preventiva')
    cy.get('#empresa').click().type('Braun')
    cy.contains('button', 'Salvar').click()
    //Assert
    cy.contains('Anestesia').should('be.visible')

    //Act
    cy.get('.delete-btn').click()
    cy.contains('Não').click()
    //Assert
    cy.contains('Anestesia').should('be.visible')
  })
  })