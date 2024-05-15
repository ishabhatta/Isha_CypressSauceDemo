
class LoginPage {
    visitLoginPage() {
      cy.visit('https://www.saucedemo.com/')
    }
  
    login(username, password) {
      cy.get('#user-name').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()
    }
  
    verifyLoggedIn() {
      cy.url().should('include', '/inventory.html')
    }
  
    addToCart(productName) {
      cy.contains('.inventory_item_name', productName)
        .get('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click()
    }
  
    verifyCartCount(count) {
      cy.get('.shopping_cart_badge').should('contain', count.toString())
    }
  
    sortProductsByName(sortOption) {
      cy.get('[data-test="product-sort-container"]').select(sortOption)
    }

    sortProductsByPrice(sortOption) {
      cy.get('[data-test="product-sort-container"]').select(sortOption)
    }
    
    verifyProductsSortedByPrice(order) {
      cy.get('.inventory_item_price').then(($prices) => {
        const prices = $prices.toArray().map(price => parseFloat(price.innerText.replace('$', '')))
        let sortedPrices;
        if (order === 'asc') {
          sortedPrices = prices.slice().sort((a, b) => a - b)
        } else if (order === 'desc') {
          sortedPrices = prices.slice().sort((a, b) => b - a)
        }
        expect(prices).to.deep.equal(sortedPrices)
      })
    }
  
    
    verifyProductsSortedByName(order) {
      cy.get('.inventory_item_name').then(($names) => {
        const names = $names.toArray().map(name => name.innerText)
        if (order === 'asc') {
          expect(names).to.deep.equal(names.slice().sort())
        } else if (order === 'desc') {
          expect(names).to.deep.equal(names.slice().sort().reverse())
        }
      })
    }
    
    
    checkout() {
      cy.get('.shopping_cart_link').click()
      cy.get('.btn_action.checkout_button').click()
    }
  
    verifyCheckoutPage() {
      cy.url().should('include', '/checkout-step-one.html')
    }

    continuecheckout(fname,lname,zip){
      cy.get('[data-test="firstName"]').type(fname)
      cy.get('[data-test="lastName"]').type(lname)
      cy.get('[data-test="postalCode"]').type(zip)
      cy.get('[data-test="continue"]').click()
      cy.get('[data-test="title"]').contains('Checkout: Overview')
      cy.get('[data-test="finish"]').click()
      cy.get('[data-test="complete-header"]').contains('Thank you for your order!')
    }
  
    verifyLockedOutError() {
      cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.')
    }
  }
  
  export default LoginPage
  