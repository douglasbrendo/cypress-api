/// <reference types="cypress" />

beforeEach(() => {
    cy.resetAplication()
})

describe('Should test the home menu', () => {

    it('Should get all balances', () => {
        cy.getAllBalances()
        .as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
        })
    })
})

describe('Should test the accounts menu', () => {

    it('Should get all accounts', () => {
        cy.getAllAccounts()
        .as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
        })
    })

    it('Should create an account', () => {
        cy.createAccount('Conta criada via rest')
            .as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body.id).to.exist
            expect(res.body).to.have.property('nome', 'Conta criada via rest')
        })
    })

    it('Should update an account', () => {
        cy.updateAccount('Conta alterada via rest')
            .as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body.id).to.exist
            expect(res.body).to.have.property('nome', 'Conta alterada via rest')
        })
    })

    it('Should not create an account with same name', () => {
        cy.createAccount('Conta mesmo nome')
            .as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should remove an account', () => {
        cy.removeAccount()
            .as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(204)
            expect(res.body.id).not.to.exist
        })
    })
})

describe('Should test the movement menu', () => {

    it('Should create a movement', () => {
        cy.createMovement('Description', 'Mikasa', '800')
            .as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body.id).to.exist
        })
    })
})

describe('Should test the extract menu', () => {

    it('Should get all movements', () => {
        cy.getAllMovements()
            .as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
        })
    })

    it('Should remove a movement', () => {
        cy.removeMovement()
            .as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(204)
            expect(res.body.id).not.to.exist
        })  
    })
})
