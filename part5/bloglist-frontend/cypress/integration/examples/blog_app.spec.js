describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user ={
        username: 'rakuzo',
        name: 'Hamiriza Firdhan',
        password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function(){
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
  })

  describe('Login', function(){
      it('succeeds with correct credentials', function(){
          cy.get('#username').type('rakuzo')
          cy.get('#password').type('test')
          cy.get('#login-button').click()

          cy.contains('Hamiriza Firdhan logged in')
      })

      it('login fails with wrong password', function(){
        cy.get('#username').type('huahuahua')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.errorMessage')
            .should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        
        cy.get('html').should('not.contain', 'Hamiriza Firdhan logged')
      })
  })

  describe('When logged in', function(){
      beforeEach(function(){
          cy.get('#username').type('rakuzo')
          cy.get('#password').type('test')
          cy.get('#login-button').click()
      })

      it('A blog can be created', function(){
          cy.contains('new note').click()
          cy.get('#title').type('The Ranger\'s Apprentice')
          cy.get('#author').type('Rick Flanagan')
          cy.get('#url').type('https://www.goodreads.com/genres/rick-flanagan')

          cy.get('#create-button').click()
          cy.contains('The Ranger\'s Apprentice Rick Flanagan')
      })

      it('user can like a blog', function() {
        cy.contains('new note').click()
        cy.get('#title')
        .type('First class tests')
        cy.get('#author')
        .type('Edsger W. Dijkstra')
        cy.get('#url')
        .type('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
        cy.get('#create-button')
        .click()

        cy.contains('View')
        .click()
        cy.contains('0')
        cy.get('#like-button')
        .click()
        cy.contains('1')
      })

      it('user who created a blog can delete it', function() {
        cy.contains('new note')
          .click()
        cy.get('#title')
          .type('First class tests')
        cy.get('#author')
          .type('Edsger W. Dijkstra')
        cy.get('#url')
          .type('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
        cy.get('#create-button')
          .click()

        cy.contains('View')
          .click()
        cy.get('#remove-button')
          .click()
  
        cy.get('html').should('not.contain', 'First class tests - Edsger W. Dijkstra')
      })
  })

  describe.only('Blogs ordered by number of likes', function() {
    beforeEach(function() {
      cy.login({ username: 'rakuzo', password: 'test' })
      cy.createBlog({ author: 'John Doe', title: 'test1', url: 'http://example.com./test1' })
      cy.createBlog({ author: 'John Doe', title: 'test2', url: 'http://example.com./test2' })
      cy.createBlog({ author: 'Jane Doe', title: 'test3', url: 'http://example.com./test3' })

      cy.contains('test1').parent().as('blog1')
      cy.contains('test2').parent().as('blog2')
      cy.contains('test3').parent().as('blog3')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('View').click()
      cy.get('@blog2').contains('View').click()
      cy.get('@blog3').contains('View').click()
      cy.get('@blog1').contains('Like').as('like1')
      cy.get('@blog2').contains('Like').as('like2')
      cy.get('@blog3').contains('Like').as('like3')

      cy.get('@like2').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like1').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      cy.wait(500)

      cy.get('#blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3')
        cy.wrap(blogs[1]).contains('2')
        cy.wrap(blogs[2]).contains('1')
      })
    })
  })
})