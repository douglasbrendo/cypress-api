Cypress.Commands.add('getToken', (user, passwd) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user,
            redirecionar: false,
            senha: passwd
        }
    }).its('body.token').should('not.be.empty') 
        .then(token => {
            return token
        })
})

Cypress.Commands.add('getAccount', () => {
    let idConta
    cy.getToken('a@a', 'a').then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
        }).then(res => {
            idConta = res.body[0].id 
            return idConta
        })
    })
})

Cypress.Commands.add('getMovement', () => {
    let idMovement
    cy.getToken('a@a', 'a').then(token => {
        cy.request({
            method: 'GET',
            url: '/extrato/202103?orderBy=data_pagamento',
            headers: { Authorization: `JWT ${token}`},
        }).then(res => {
            idMovement = res.body[0].id 
            return idMovement
        })
    })
})

Cypress.Commands.add('resetAplication', () => {
    cy.getToken('a@a', 'a').then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}`},
        }).its('status').should('be.equal', 200)
    })
})

Cypress.Commands.add('getAllBalances', () => {
    cy.getToken('a@a', 'a').then(token => {
        cy.request({
            method: 'GET',
            url: '/saldo',
            headers: {Authorization: `JWT ${token}`}
        })
    })
})

Cypress.Commands.add('getAllAccounts', () => {
    cy.getToken('a@a', 'a').then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: {Authorization: `JWT ${token}`}
        })
    })
})

Cypress.Commands.add('createAccount', (name) => {
    cy.getToken('a@a', 'a').then(token => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: (name)
            }
        })
    })
})

Cypress.Commands.add('updateAccount', (name) => {
    cy.getToken('a@a', 'a').then(token => {
        cy.getAccount().then(idConta => {
            cy.request({    
                method: 'PUT',
                url: `/contas/${idConta}`,
                headers: { Authorization: `JWT ${token}`},
                body: {
                    nome: (name)
                }
            })
        })
    })
})

Cypress.Commands.add('removeAccount', () => {
    cy.getToken('a@a', 'a').then(token => {
        cy.getAccount().then(idConta => {
            cy.request({    
                method: 'DELETE',
                url: `/contas/${idConta}`,
                headers: { Authorization: `JWT ${token}`},
            })
        })
    })
})

Cypress.Commands.add('getAllMovements', () => {
    cy.getToken('a@a', 'a').then(token => {
        cy.request({
            method: 'GET',
            url: '/extrato/202103?orderBy=data_pagamento',
            headers: {Authorization: `JWT ${token}`}
        })
    })
})

Cypress.Commands.add('createMovement', (desc, intr, vlr) => {
    cy.getToken('a@a', 'a').then(token => {
        cy.getAccount().then(idConta => {
            cy.request({    
                method: 'POST',
                url: '/transacoes',
                headers: { Authorization: `JWT ${token}`},
                body: {
                    conta_id: `${idConta}`,
                    data_pagamento: "15/03/2021",
                    data_transacao: "15/03/2021",
                    descricao: (desc),
                    envolvido: (intr),
                    status: true,
                    tipo: "REC",
                    valor: (vlr)
                }
            })
        })
    })
})

Cypress.Commands.add('removeMovement', () => {
    cy.getToken('a@a', 'a').then(token => {
        cy.getMovement().then(idMovement => {
            cy.request({    
                method: 'DELETE',
                url: `/transacoes/${idMovement}`,
                headers: { Authorization: `JWT ${token}`},
            })
        })
    })
})
