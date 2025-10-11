import { buttons } from '../__fixtures__/buttons.js'

export class AppPage {
  constructor(screen, user) {
    this.screen = screen
    this.user = user
  }

  get openChatButton() {
    return this.screen.getByRole('button', { name: buttons.welcome.openChat })
  }

  get closeChatButton() {
    return this.screen.getByRole('button', { name: /close/i })
  }

  async openWidget() {
    await this.user.click(this.openChatButton)
  }
}
