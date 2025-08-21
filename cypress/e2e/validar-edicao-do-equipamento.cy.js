describe('Edição de equipamento/Validar edição de equipamento cadastrado', () => {
  it('Deve permitir a edição de um equipamento cadastrado', () => {
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
    cy.get('.edit-btn').click()
    cy.get('#nome').clear().type('Anestesia Editado')
    cy.contains('button', 'Atualizar').click()
    //Assert
    cy.contains('Anestesia Editado').should('be.visible')

  })

   it('Não deve permitir a edição de um equipamento cadastrado com campos obrigatórios em branco', () => {
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
    cy.get('.edit-btn').click()
    cy.get('#nome').clear().type('Anestesia Editado')
    cy.get('#ordemServico').clear()
    cy.contains('button', 'Atualizar').click()
    //Assert
    cy.contains('Anestesia Editado').should('not.exist')

  })
  
  })