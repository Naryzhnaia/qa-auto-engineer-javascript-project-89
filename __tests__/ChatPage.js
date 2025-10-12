import texts from '../__fixtures__/texts.js'
import buttons from '../__fixtures__/buttons.js'

export class ChatPage {
  constructor(screen, user) {
    this.screen = screen;
    this.user = user;
  }

  texts = {
    title: () => this.screen.getByText('Виртуальный помощник'),
    greetingText: () => this.screen.getByText(texts.welcome.greeting),
    introText: () => this.screen.getByText(texts.start.intro),
    switchProfInfo: () => this.screen.getByText(texts.switch.info),
    detailsInfo: () => this.screen.getByText(texts.details.part1),
    detailsPart2: () => this.screen.getByText(texts.details.part2),
    subscribeLinkText: () => this.screen.getByText(texts.subscribe.link),
    tryInfoText: () => this.screen.getByText(texts.try.info),
    advancedInfo: () => this.screen.getByText(texts.advanced.part1),
    advancedPart2: () => this.screen.getByText(texts.advanced.part2),
    subscribeByeText: () => this.screen.getByText(texts.subscribe.bye),
  }

  buttons = {
    openChatButton: () => this.screen.getByRole('button', { name: buttons.welcome.openChat }),
    startChatButton: () => this.screen.findByRole('button', { name: buttons.welcome.start }),

    switchProfButton: () => this.screen.getByRole('button', { name: buttons.start.switch }),
    tryItButton: () => this.screen.getByRole('button', { name: buttons.start.try }),
    advancedButton: () => this.screen.getByRole('button', { name: buttons.start.advanced }),

    tryBackButton: () => this.screen.getByRole('button', { name: buttons.try.back }),
    trySwitchButton: () => this.screen.getByRole('button', { name: buttons.try.switch }),
    interestingButton: () => this.screen.getByRole('button', { name: buttons.try.interesting }),

    switchDetailsButton: () => this.screen.getByRole('button', { name: buttons.switch.details }),
    subscribeEasyButton: () => this.screen.getByRole('button', { name: buttons.switch.try }),
    subscribeBackButton: () => this.screen.getByRole('button', { name: buttons.switch.back }),

    detailsSubscribeButton: () => this.screen.getByRole('button', { name: buttons.details.subscribe }),
    detailsBackButton: () => this.screen.getByRole('button', { name: buttons.details.back }),

    advancedDetailsButton: () => this.screen.getByRole('button', { name: buttons.advanced.details }),
    advancedBackButton: () => this.screen.getByRole('button', { name: buttons.advanced.back }),

    subscribeAgainButton: () => this.screen.getByRole('button', { name: buttons.subscribe.again }),
    subscribeEndBackButton: () => this.screen.getByRole('button', { name: buttons.subscribe.back }),

    closeChatButton: () => this.screen.getByRole('button', { name: /close/i }),
  }

  async startChat() {
    await this.user.click(await this.buttons.startChatButton());
  }

  async closeChat() {
    await this.user.click(this.buttons.closeChatButton());
  }
}
