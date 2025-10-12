import buttons from '../__fixtures__/buttons.js'

export class AppPage {
  constructor(screen, user) {
    this.screen = screen
    this.user = user
  }

  buttons = {
    openChatButton: () => this.screen.getByRole('button', { name: buttons.welcome.openChat }),
  }

  async openWidget() {
    await this.user.click(this.buttons.openChatButton())
  }
}
