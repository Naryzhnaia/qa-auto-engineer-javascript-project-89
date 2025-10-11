import App from '../src/App.jsx'
import { render, screen, cleanup } from '@testing-library/react'
import { expect, test, beforeEach, afterEach, describe, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { texts } from '../__fixtures__/texts.js'
import { ChatPage } from './ChatPage.js'
import { AppPage } from './AppPage.js'

let user
let chatPage
let appPage

beforeEach(async () => {
  user = userEvent.setup()
  appPage = new AppPage(screen, user)
  chatPage = new ChatPage(screen, user)
  render(<App />)
  await appPage.openWidget()
  await chatPage.startChat()
})

afterEach(() => {
  cleanup()
})

test('Не видно окно чата после закрытия чата', async () => {
  await chatPage.closeChat()
  expect(chatPage.buttons.openChatButton()).toBeVisible()
})

test('Старт чата и видимость базовых опций', async () => {
  expect(chatPage.texts.title()).toBeVisible()
  expect(chatPage.texts.greetingText()).toBeVisible()
  expect(chatPage.texts.introText()).toBeVisible()
  expect(await chatPage.buttons.switchProfButton()).toBeVisible()
  expect(await chatPage.buttons.tryItButton()).toBeVisible()
  expect(await chatPage.buttons.advancedButton()).toBeVisible()
})

describe('Сценарий "Сменить профессию или трудоустроиться"', () => {
  it('Видимость текста и кнопок при сценарии записи на курс', async () => {
    await user.click(chatPage.buttons.switchProfButton())
    expect(await chatPage.texts.switchProfInfo()).toBeVisible()

    await user.click(chatPage.buttons.switchDetailsButton())
    expect(await chatPage.texts.detailsInfo()).toBeVisible()
    expect(await chatPage.buttons.detailsSubscribeButton()).toBeVisible()
    expect(await chatPage.buttons.subscribeBackButton()).toBeVisible()

    await user.click(chatPage.buttons.detailsSubscribeButton())
    expect(await chatPage.texts.subscribeLinkText()).toBeVisible()
    expect(await chatPage.buttons.detailsSubscribeButton()).toBeVisible()
  })

  it('Видимость текста и кнопок при сценарии "А есть что-нибудь попроще?"', async () => {
    await user.click(chatPage.buttons.switchProfButton())
    await user.click(chatPage.buttons.subscribeEasyButton())
    expect(await chatPage.texts.tryInfoText()).toBeVisible()
    expect(await chatPage.buttons.interestingButton()).toBeVisible()
    expect(await chatPage.buttons.trySwitchButton()).toBeVisible()
    expect(await chatPage.buttons.tryBackButton()).toBeVisible()
  })

  it('Можно вернуться в начало чата', async () => {
    await user.click(chatPage.buttons.switchProfButton())
    await user.click(chatPage.buttons.subscribeBackButton())

    expect(await chatPage.buttons.switchProfButton()).toBeVisible()
    expect(await chatPage.buttons.tryItButton()).toBeVisible()
    expect(await chatPage.buttons.advancedButton()).toBeVisible()
  })
})

describe('Сценарий "Попробовать себя в IT"', () => {
  it('Видимость текста и кнопок при сценарии "Интересно"', async () => {
    await user.click(chatPage.buttons.tryItButton())
    expect(await chatPage.texts.tryInfoText()).toBeVisible()

    await user.click(chatPage.buttons.interestingButton())
    expect(await chatPage.texts.detailsInfo()).toBeVisible()
  })

  it('Видимость текста и кнопок при сценарии "А что по поводу смены професии?"', async () => {
    await user.click(chatPage.buttons.tryItButton())
    await user.click(chatPage.buttons.trySwitchButton())

    expect(await chatPage.texts.switchProfInfo()).toBeVisible()
  })

  it('Можно вернуться в назад - в начало чата', async () => {
    await user.click(chatPage.buttons.tryItButton())
    await user.click(chatPage.buttons.tryBackButton())

    expect(await chatPage.buttons.switchProfButton()).toBeVisible()
    expect(await chatPage.buttons.tryItButton()).toBeVisible()
    expect(await chatPage.buttons.advancedButton()).toBeVisible()
  })
})

describe('Сценарий "Я разработчик, хочу углубить свои знания"', () => {
  it('Видимость текста и кнопок при сценарии "Расскажи подробнее"', async () => {
    await user.click(chatPage.buttons.advancedButton())
    expect(await chatPage.texts.advancedInfo()).toBeVisible()

    await user.click(chatPage.buttons.switchDetailsButton())
    expect(await chatPage.buttons.startChatButton()).toBeVisible()
  })

  it('Можно вернуться в начало чата', async () => {
    await user.click(chatPage.buttons.advancedButton())
    await user.click(chatPage.buttons.advancedBackButton())

    expect(await chatPage.buttons.switchProfButton()).toBeVisible()
    expect(await chatPage.buttons.tryItButton()).toBeVisible()
    expect(await chatPage.buttons.advancedButton()).toBeVisible()
  })
})

test('Сбрасывается контекст после закрытия чата', async () => {
  await user.click(chatPage.buttons.switchProfButton())
  await chatPage.closeChat()
  await appPage.openWidget()
  await chatPage.startChat()

  expect(chatPage.texts.greetingText()).toBeVisible()
  expect(screen.queryByText(texts.switch.info)).toBeNull()
})

test('Нет дублирования текста при двойном клике', async () => {
  await user.dblClick(chatPage.buttons.advancedButton())

  const advancedTexts = screen.queryAllByText(texts.advanced.part1)
  expect(advancedTexts.length).toBe(1)
})

