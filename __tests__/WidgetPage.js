import texts from '../__fixtures__/texts.js'
import buttons from '../__fixtures__/buttons.js'
import steps from '../__fixtures__/steps.js'
import Widget from '@hexlet/chatbot-v2'
import { render } from '@testing-library/react'

export class WidgetPage {
  constructor(screen, user) {
    this.screen = screen
    this.user = user
  }

  texts = {
    title: () => this.screen.getByText('Виртуальный помощник'),
    greetingText: () => this.screen.getByText(texts.welcome.greeting),
    introText: () => this.screen.getByText(texts.start.intro),
    switchProfInfo: () => this.screen.getByText(texts.switch.info),
  }

  buttons = {
    openWidgetButton: () => this.screen.getByRole('button', { name: buttons.welcome.openChat }),
    startChatButton: () => this.screen.findByRole('button', { name: buttons.welcome.start }),
    switchProfButton: () => this.screen.getByRole('button', { name: buttons.start.switch }),
    tryItButton: () => this.screen.getByRole('button', { name: buttons.start.try }),
    advancedButton: () => this.screen.getByRole('button', { name: buttons.start.advanced }),
    closeChatButton: () => this.screen.getByRole('button', { name: /close/i }),
  }

  async renderWidget() {
    render(Widget(steps))
  }

  async openWidget() {
    await this.user.click(await this.buttons.openWidgetButton())
  }

  async startChat() {
    await this.user.click(await this.buttons.startChatButton())
  }

  async closeChat() {
    await this.user.click(this.buttons.closeChatButton())
  }
}
