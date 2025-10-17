import App from '../src/App.jsx'
import { render } from '@testing-library/react'
import buttons from '../__fixtures__/buttons.js'

export class AppPage {
  constructor(screen, user) {
    this.screen = screen
    this.user = user
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
}
