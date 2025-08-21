describe('Cadastro de equipamento/Validar campo ordem de serviço', () => {
  it('Cadastro preenchendo o campo ordem de serviço com caracteres especiais, não deve permitir cadastro do equipamento', () => {
    //Arrange
    cy.visit('https://guilhermebianchii.github.io/saida-de-equipamentos/')
    //Act
    cy.get('#nome').click().type('Anestesia')
    cy.get('#ordemServico').click().type('!@#$%')
    cy.get('#numeroSerie').click().type('12345')
    cy.get('#patrimonio').click().type('123')
    cy.get('#fabricante').click().type('Drager')
    cy.get('#modelo').click().type('Fabius')
    cy.get('#dataEnvio').click().type('2023-06-20')
    cy.get('#descricao').click().type('Manutenção preventiva')
    cy.get('#empresa').click().type('Braun')
    cy.contains('button', 'Salvar').click()
    //Assert
    cy.contains('Anestesia').should('not.exist')

  })
  it('Cadastro preenchendo o campo ordem de serviço com letras, não deve permitir cadastro do equipamento', () => {
    //Arrange
    cy.visit('https://guilhermebianchii.github.io/saida-de-equipamentos/')
    //Act
    cy.get('#nome').click().type('Anestesia')
    cy.get('#ordemServico').click().type('ABCDE')
    cy.get('#numeroSerie').click().type('12345')
    cy.get('#patrimonio').click().type('123')
    cy.get('#fabricante').click().type('Drager')
    cy.get('#modelo').click().type('Fabius')
    cy.get('#dataEnvio').click().type('2023-06-20')
    cy.get('#descricao').click().type('Manutenção preventiva')
    cy.get('#empresa').click().type('Braun')
    cy.contains('button', 'Salvar').click()
    //Assert
    cy.contains('Anestesia').should('not.exist')

  })
  it('Cadastro preenchendo o campo ordem de serviço com números, deve permitir cadastro do equipamento', () => {
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
})