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
    passwordInput: () => this.screen.getByLabelText(/пароль/i),
    addressInput: () => this.screen.getByLabelText(/адрес/i),
    cityInput: () => this.screen.getByLabelText(/город/i),
    countriesList: () => this.screen.getByLabelText(/страна/i),
    agree: () => this.screen.getByRole('checkbox'),
    submitButton: () => this.screen.getByRole('button', { name: /зарегистрироваться/i }),
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

  async fillForm(email, password, address, city) {
    await this.user.type(this.regisrationForm.emailInput(), email)
    await this.user.type(this.regisrationForm.passwordInput(), password)
    await this.user.type(this.regisrationForm.addressInput(), address)
    await this.user.type(this.regisrationForm.cityInput(), city)
    await this.user.selectOptions(this.regisrationForm.countriesList(), 'Россия')
  }

  async submitForm() {
    await this.user.click(this.regisrationForm.submitButton())
  }
}
