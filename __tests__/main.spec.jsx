import { screen, cleanup } from '@testing-library/react'
import { expect, test, beforeEach, afterEach, describe, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import texts from '../__fixtures__/texts.js'
import { WidgetPage } from './WidgetPage.js'
import { AppPage } from './AppPage.jsx'

let user
let widgetPage
let appPage

describe('Интеграционные тесты', async () => {
  beforeEach(async () => {
    user = userEvent.setup()
    appPage = new AppPage(screen, user)
    widgetPage = new WidgetPage(screen, user)
  })

  afterEach(() => {
    cleanup()
  })

  test('Виджет не вызывает проблем', async () => {
    expect(() => appPage.renderApp()).not.toThrow()
  })

  test('Открытие и закрытие виджета', async () => {
    appPage.renderApp()
    await appPage.openWidget()
    expect(widgetPage.texts.title()).to.exist

    await widgetPage.closeChat()
    expect(widgetPage.buttons.openChatButton()).to.exist
  })
})

describe('Интеграционные тесты', async () => {
  beforeEach(async () => {
    user = userEvent.setup()
    widgetPage = new WidgetPage(screen, user)
    widgetPage.renderWidget()
    await widgetPage.openWidget()
    await widgetPage.startChat()
  })

  afterEach(() => {
    cleanup()
  })

  test('Не видно окно чата после закрытия чата', async () => {
    await widgetPage.closeChat()
    expect(widgetPage.buttons.openChatButton()).to.exist
  })

  test('Старт чата и видимость базовых опций', async () => {
    expect(widgetPage.texts.title()).to.exist
    expect(widgetPage.texts.greetingText()).to.exist
    expect(widgetPage.texts.introText()).to.exist
    expect(await widgetPage.buttons.switchProfButton()).to.exist
    expect(await widgetPage.buttons.tryItButton()).to.exist
    expect(await widgetPage.buttons.advancedButton()).to.exist
  })

  describe('Сценарий "Сменить профессию или трудоустроиться"', () => {
    it('Видимость текста и кнопок при сценарии записи на курс', async () => {
      await user.click(widgetPage.buttons.switchProfButton())
      expect(await widgetPage.texts.switchProfInfo()).to.exist

      await user.click(widgetPage.buttons.switchDetailsButton())
      expect(await widgetPage.texts.detailsInfo()).to.exist
      expect(await widgetPage.buttons.detailsSubscribeButton()).to.exist
      expect(await widgetPage.buttons.subscribeBackButton()).to.exist

      await user.click(widgetPage.buttons.detailsSubscribeButton())
      expect(await widgetPage.texts.subscribeLinkText()).to.exist
      expect(await widgetPage.buttons.detailsSubscribeButton()).to.exist
    })

    it('Видимость текста и кнопок при сценарии "А есть что-нибудь попроще?"', async () => {
      await user.click(widgetPage.buttons.switchProfButton())
      await user.click(widgetPage.buttons.subscribeEasyButton())
      expect(await widgetPage.texts.tryInfoText()).to.exist
      expect(await widgetPage.buttons.interestingButton()).to.exist
      expect(await widgetPage.buttons.trySwitchButton()).to.exist
      expect(await widgetPage.buttons.tryBackButton()).to.exist
    })

    it('Можно вернуться в начало чата', async () => {
      await user.click(widgetPage.buttons.switchProfButton())
      await user.click(widgetPage.buttons.subscribeBackButton())

      expect(await widgetPage.buttons.switchProfButton()).to.exist
      expect(await widgetPage.buttons.tryItButton()).to.exist
      expect(await widgetPage.buttons.advancedButton()).to.exist
    })
  })

  describe('Сценарий "Попробовать себя в IT"', () => {
    it('Видимость текста и кнопок при сценарии "Интересно"', async () => {
      await user.click(widgetPage.buttons.tryItButton())
      expect(await widgetPage.texts.tryInfoText()).to.exist

      await user.click(widgetPage.buttons.interestingButton())
      expect(await widgetPage.texts.detailsInfo()).to.exist
    })

    it('Видимость текста и кнопок при сценарии "А что по поводу смены професии?"', async () => {
      await user.click(widgetPage.buttons.tryItButton())
      await user.click(widgetPage.buttons.trySwitchButton())

      expect(await widgetPage.texts.switchProfInfo()).to.exist
    })

    it('Можно вернуться в назад - в начало чата', async () => {
      await user.click(widgetPage.buttons.tryItButton())
      await user.click(widgetPage.buttons.tryBackButton())

      expect(await widgetPage.buttons.switchProfButton()).to.exist
      expect(await widgetPage.buttons.tryItButton()).to.exist
      expect(await widgetPage.buttons.advancedButton()).to.exist
    })
  })

  describe('Сценарий "Я разработчик, хочу углубить свои знания"', () => {
    it('Видимость текста и кнопок при сценарии "Расскажи подробнее"', async () => {
      await user.click(widgetPage.buttons.advancedButton())
      expect(await widgetPage.texts.advancedInfo()).to.exist

      await user.click(widgetPage.buttons.switchDetailsButton())
      expect(await widgetPage.buttons.startChatButton()).to.exist
    })

    it('Можно вернуться в начало чата', async () => {
      await user.click(widgetPage.buttons.advancedButton())
      await user.click(widgetPage.buttons.advancedBackButton())

      expect(await widgetPage.buttons.switchProfButton()).to.exist
      expect(await widgetPage.buttons.tryItButton()).to.exist
      expect(await widgetPage.buttons.advancedButton()).to.exist
    })
  })

  test('Сбрасывается контекст после закрытия чата', async () => {
    await user.click(widgetPage.buttons.switchProfButton())
    await widgetPage.closeChat()
    await widgetPage.openWidget()
    await widgetPage.startChat()

    expect(widgetPage.texts.greetingText()).to.exist
    expect(screen.queryByText(texts.switch.info)).toBeNull()
  })

  test('Нет дублирования текста при двойном клике', async () => {
    await user.dblClick(widgetPage.buttons.advancedButton())

    const advancedTexts = screen.queryAllByText(texts.advanced.part1)
    expect(advancedTexts.length).toBe(1)
  })
})
