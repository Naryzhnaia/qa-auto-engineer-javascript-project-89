import App from '../src/App.jsx'
import { render } from '@testing-library/react'
import buttons from '../__fixtures__/buttons.js'

export class AppPage {
  constructor(screen, user) {
    this.screen = screen
    this.user = user
  }

  regisrationForm = {
    emailInput: () => this.screen.getByLabelText(/email/i),
    passwordInput: () => this.screen.getByRole('textbox', { name: /пароль/i }),
    addressInput: () => this.screen.getByLabelText(/адрес/i),
    cityInput: () => this.screen.getByLabelText(/город/i),
    countriesList: () => this.screen.getByLabelText(/страна/i),
    agree: () => this.screen.getByRole('checkbox'),
    submitButton: () => screen.getByRole('button', { name: /зарегистрироваться/i }),
  }

  buttons = {
    openChatButton: () => this.screen.getByRole('button', { name: buttons.welcome.openChat }),
  }

  async renderApp() {
    render(<App />)
  }

  async openWidget() {
    await this.user.click(this.buttons.openChatButton())
  }

  async registerUser(email, password, address, city) {
    await this.user.type(this.emailInput, email)
    await this.user.type(this.password, password)
    await this.user.type(this.addressInput, address)
    await this.user.type(this.cityInput, city)
    await this.user.selectOption(this.countriesList, 'Россия')
    await this.user.click(this.regisrationForm.submitButton)
  }
}
