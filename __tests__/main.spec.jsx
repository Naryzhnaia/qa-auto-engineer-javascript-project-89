import { screen, cleanup } from '@testing-library/react'
import { expect, test, beforeEach, afterEach, describe } from 'vitest'
import userEvent from '@testing-library/user-event'
import { WidgetPage } from './WidgetPage.js'
import { AppPage } from './AppPage.jsx'
import { vi } from 'vitest'

let user
let widgetPage
let appPage

const registrationData = {
  email: '123@mail.com',
  password: 'qwerty',
  address: 'ул. Пушкина',
  city: 'СПб',
}

beforeEach(async () => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  cleanup()
})

describe('Проверки формы регистрации', async () => {
  beforeEach(async () => {
    user = userEvent.setup()
    appPage = new AppPage(screen, user)
    widgetPage = new WidgetPage(screen, user)
  })

  test.only('Успешная регистрация', async () => {
    appPage.registerUser(registrationData.email, registrationData.password, registrationData.address, registrationData.city)
    //expect(() => appPage.renderApp()).not.toThrow()
  })

  test('Открытие и закрытие виджета', async () => {
    appPage.renderApp()
    await appPage.openWidget()
    expect(widgetPage.texts.title()).to.exist

    await widgetPage.closeChat()
    expect(widgetPage.buttons.openWidgetButton()).toBeVisible()
  })
})

describe('Интеграционные тесты', async () => {
  beforeEach(async () => {
    user = userEvent.setup()
    appPage = new AppPage(screen, user)
    widgetPage = new WidgetPage(screen, user)
  })

  test('Виджет не вызывает проблем', async () => {
    expect(() => appPage.renderApp()).not.toThrow()
  })

  test('Открытие и закрытие виджета', async () => {
    appPage.renderApp()
    await appPage.openWidget()
    expect(widgetPage.texts.title()).to.exist

    await widgetPage.closeChat()
    expect(widgetPage.buttons.openWidgetButton()).toBeVisible()
  })
})

describe('Проверки виджета', async () => {
  test('Рендеринг виджета и отображение кнопки открытия виджета', async () => {
    user = userEvent.setup()
    widgetPage = new WidgetPage(screen, user)
    widgetPage.renderWidget()
    expect(widgetPage.buttons.openWidgetButton()).toBeVisible()
  })

  test('Видимость базовых опций в чате виджета', async () => {
    user = userEvent.setup()
    widgetPage = new WidgetPage(screen, user)
    widgetPage.renderWidget()
    await widgetPage.openWidget()
    await widgetPage.startChat()
    expect(widgetPage.texts.title()).toBeInTheDocument()
    expect(widgetPage.texts.greetingText()).toBeInTheDocument()
    expect(widgetPage.texts.introText()).toBeInTheDocument()
    expect(await widgetPage.buttons.switchProfButton()).toBeInTheDocument()
    expect(await widgetPage.buttons.tryItButton()).toBeInTheDocument()
    expect(await widgetPage.buttons.advancedButton()).toBeInTheDocument()
  })

  test('Скрол после старта чата', async () => {
    user = userEvent.setup()
    widgetPage = new WidgetPage(screen, user)
    widgetPage.renderWidget()
    await widgetPage.openWidget()
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1)
  })
})
