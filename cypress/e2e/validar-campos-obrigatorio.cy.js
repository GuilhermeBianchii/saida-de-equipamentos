describe('Cadastro de equipamento/Validar preenchimento de campos obrigatórios', () => {
  it('Cadastro preenchendo somente os campos obrigatórios, deve permitir cadastro do equipamento', () => {
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

  })
  
  it('Cadastro sem preencher os campos obrigatórios, não deve permitir cadastro do equipamento', () => {
    //Arrange
    cy.visit('https://guilhermebianchii.github.io/saida-de-equipamentos/')
    //Act
    cy.get('#tecnico').click().type('Guilherme')
    cy.get('#observacoes').click().type('Teste de cadastro')
    cy.contains('button', 'Salvar').click()
    //Assert
    cy.contains('Teste de cadastro').should('not.exist')

  })

  it('Cadastro preenchendo somente um campo obrigatório, não deve permitir cadastro do equipamento', () => {
    //Arrange
    cy.visit('https://guilhermebianchii.github.io/saida-de-equipamentos/')
    //Act
    cy.get('#nome').click().type('Anestesia')
    cy.get('#tecnico').click().type('Guilherme')
    cy.get('#observacoes').click().type('Teste de cadastro')
    cy.contains('button', 'Salvar').click()
    //Assert
    cy.contains('Anestesia').should('not.exist')

  })
  
})





