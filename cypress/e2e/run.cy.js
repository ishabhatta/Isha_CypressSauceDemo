import LoginPage from '../pageObj/page'

describe('Login Tests', () => {
  const loginPage = new LoginPage()



  beforeEach(() => {
    loginPage.visitLoginPage()
  })

  it('Verify the user can log into the application with user "standard_user"', () => {
    loginPage.login('standard_user', 'secret_sauce')
    loginPage.verifyLoggedIn()
  })

  it('Verify that the user "standard_user" can add items to the cart', () => {
    loginPage.login('standard_user', 'secret_sauce')
    loginPage.addToCart('Sauce Labs Backpack')
    loginPage.verifyCartCount(1)
  })

  it('Verify that the user "standard_user" can filter the products by Name (A to Z) works as per expected.', () => {
    loginPage.login('standard_user', 'secret_sauce')
    loginPage.sortProductsByName('az')
    loginPage.verifyProductsSortedByName('asc')
  })

  it('Verify that the user "standard_user" can filter the products by Name (Z to A) works as per expected.', () => {
    loginPage.login('standard_user', 'secret_sauce')
    loginPage.sortProductsByName('za')
    loginPage.verifyProductsSortedByName('desc')
  })

  it('Verify that the user "standard_user" can filter the products by Price (Low to High) works as per expected..', () => {
    loginPage.login('standard_user', 'secret_sauce')
    loginPage.sortProductsByPrice('lohi')
    loginPage.verifyProductsSortedByPrice('asc')
  })

  it('Verify that the user "standard_user" can filter the products by Price ((High to Low)) works as per expected..', () => {
    loginPage.login('standard_user', 'secret_sauce')
    loginPage.sortProductsByPrice('hilo')
    loginPage.verifyProductsSortedByPrice('desc')
  })
  
  it('Verify that the user "standard_user" can perform a checkout', () => {
    loginPage.login('standard_user', 'secret_sauce')
    loginPage.addToCart('Sauce Labs Backpack')
    loginPage.checkout()
    loginPage.verifyCheckoutPage()
    loginPage.continuecheckout('isha','bhatta','2222')
  })

  it('Verify that the user "locked_out_user" cannot log in to the application', () => {
    loginPage.login('locked_out_user', 'secret_sauce')
    loginPage.verifyLockedOutError()
  })
})
