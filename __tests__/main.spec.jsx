import '@hexlet/chatbot-v2/styles'
import Widget from '@hexlet/chatbot-v2'
import steps from '@hexlet/chatbot-v2/example-steps'
import '@hexlet/chatbot-v2/styles'
import { render, screen, cleanup } from '@testing-library/react'
import { expect, test, beforeEach, afterEach, describe, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { texts } from '../__fixtures__/texts.js'
import { buttons } from '../__fixtures__/buttons.js'

let user
let openChatButton
let startChatButton

beforeEach(async () => {
  user = userEvent.setup()
  render(Widget(steps))

  openChatButton = screen.getByRole('button', { name: buttons.welcome.openChat })
  await user.click(openChatButton)
  startChatButton = screen.getByRole('button', { name: buttons.welcome.start })
  await user.click(startChatButton)
})

afterEach(() => {
  cleanup()
})

test('Открытие и закрытие чата', async () => {
  const title = screen.getByText('Виртуальный помощник')
  const firstMessage = screen.getByText(texts.welcome.greeting)
  expect(title).toBeVisible()
  expect(firstMessage).toBeVisible()

  const closeButton = screen.getByRole('button', { name: /close/i })
  await user.click(closeButton)

  expect(openChatButton).toBeVisible()
})

test('Старт чата и видимость базовых опций', async () => {
  expect(await screen.findByText(texts.welcome.greeting)).toBeVisible()
  expect(await screen.findByText(buttons.welcome.start)).toBeVisible()
  expect(await screen.findByText(texts.start.intro)).toBeVisible()
  expect(screen.getByRole('button', { name: buttons.start.switch })).toBeVisible()
  expect(screen.getByRole('button', { name: buttons.start.try })).toBeVisible()
  expect(screen.getByRole('button', { name: buttons.start.advanced })).toBeVisible()
})

describe('Сценарий "Сменить профессию или трудоустроиться"', () => {
  it('Видимость текста и кнопок при сценарии записи на курс', async () => {
    const switchButton = screen.getByRole('button', { name: buttons.start.switch })
    await user.click(switchButton)
    expect(await screen.findByText(texts.switch.info)).toBeVisible()
    const moreButton = screen.getByRole('button', { name: buttons.switch.details })
    await user.click(moreButton)
    expect(await screen.findByText(texts.details.part1)).toBeVisible()
    const subscribeButton = screen.getByRole('button', { name: buttons.details.subscribe })
    const backButton = screen.getByRole('button', { name: buttons.details.back })
    expect(subscribeButton).toBeVisible()
    expect(backButton).toBeVisible()

    await user.click(subscribeButton)
    expect(await screen.findByText(texts.subscribe.link)).toBeVisible()
    expect(subscribeButton).toBeVisible()
    expect(await screen.findByRole('button', { name: buttons.details.subscribe })).toBeVisible()
  })

  it('Видимость текста и кнопок при сценарии "А есть что-нибудь попроще?"', async () => {
    const switchButton = screen.getByRole('button', { name: buttons.start.switch })
    await user.click(switchButton)
    expect(screen.getByText(texts.switch.info)).toBeVisible()
    const easyButton = screen.getByRole('button', { name: buttons.switch.try })
    await user.click(easyButton)
    const interestingButton = screen.getByRole('button', { name: buttons.try.interesting })
    const switchProfButton = screen.getByRole('button', { name: buttons.try.switch })
    const backButton = screen.getByRole('button', { name: buttons.try.back })
    expect(screen.getByText(texts.try.info)).toBeVisible()
    expect(interestingButton).toBeVisible()
    expect(switchProfButton).toBeVisible()
    expect(backButton).toBeVisible()
  })

  it('Можно вернуться в начало чата', async () => {
    const switchButton = screen.getByRole('button', { name: buttons.start.switch })
    await user.click(switchButton)
    const backButton = screen.getByRole('button', { name: buttons.switch.back })
    await user.click(backButton)

    expect(screen.getByRole('button', { name: buttons.start.switch })).toBeVisible()
    expect(screen.getByRole('button', { name: buttons.start.try })).toBeVisible()
    expect(screen.getByRole('button', { name: buttons.start.advanced })).toBeVisible()
  })
})

describe('Сценарий "Попробовать себя в IT"', () => {
  it('Видимость текста и кнопок при сценарии "Интересно"', async () => {
    const tryButton = screen.getByRole('button', { name: buttons.start.try })
    await user.click(tryButton)
    expect(screen.getByText(texts.try.info)).toBeVisible()

    const interestingButton = screen.getByRole('button', { name: buttons.try.interesting })
    user.click(interestingButton)

    expect(await screen.findByText(texts.details.part1)).toBeVisible()
  })

  it('Видимость текста и кнопок при сценарии "А что по поводу смены професии?"', async () => {
    const tryButton = screen.getByRole('button', { name: buttons.start.try })
    await user.click(tryButton)
    expect(screen.getByText(texts.try.info)).toBeVisible()

    const switchProfButton = screen.getByRole('button', { name: buttons.try.switch })
    user.click(switchProfButton)

    expect(await screen.findByText(texts.switch.info)).toBeVisible()
  })

  it('Можно вернуться в назад - в начало чата', async () => {
    const tryButton = screen.getByRole('button', { name: buttons.start.try })
    await user.click(tryButton)
    expect(screen.getByText(texts.try.info)).toBeVisible()

    const backButton = screen.getByRole('button', { name: buttons.try.back })
    user.click(backButton)

    expect(await screen.findByRole('button', { name: buttons.start.switch })).toBeVisible()
    expect(await screen.findByRole('button', { name: buttons.start.try })).toBeVisible()
    expect(await screen.findByRole('button', { name: buttons.start.advanced })).toBeVisible()
  })
})

describe('Сценарий "Я разработчик, хочу углубить свои знания"', () => {
  it('Видимость текста и кнопок при сценарии "Расскажи подробнее"', async () => {
    const advancedButton = screen.getByRole('button', { name: buttons.start.advanced })
    await user.click(advancedButton)
    expect(await screen.findByText(texts.advanced.part1)).toBeVisible()

    const moreButton = screen.getByRole('button', { name: buttons.advanced.details })
    user.click(moreButton)
    expect(startChatButton).toBeVisible()
  })

  it('Можно вернуться в начало чата', async () => {
    const advancedButton = screen.getByRole('button', { name: buttons.start.advanced })
    await user.click(advancedButton)
    expect(await screen.findByText(texts.advanced.part1)).toBeVisible()

    const backButton = screen.getByRole('button', { name: buttons.advanced.back })
    user.click(backButton)

    expect(await screen.findByRole('button', { name: buttons.start.switch })).toBeVisible()
    expect(await screen.findByRole('button', { name: buttons.start.try })).toBeVisible()
    expect(await screen.findByRole('button', { name: buttons.start.advanced })).toBeVisible()
  })
})

test('Сбрасывается контекст после закрытия чата', async () => {
  const switchButton = screen.getByRole('button', { name: buttons.start.switch })
  user.click(switchButton)
  const closeButton = screen.getByRole('button', { name: /close/i })
  await user.click(closeButton)
  await user.click(openChatButton)

  expect(await screen.findByText(texts.welcome.greeting)).toBeVisible()
  expect(await screen.findByText(buttons.welcome.start)).toBeVisible()
  expect(screen.queryByText(texts.start.intro)).toBeNull()
  expect(screen.queryByText(texts.switch.info)).toBeNull()
})

test('Нет дублирования текста при двойном клике', async () => {
    const advancedButton = screen.getByRole('button', { name: buttons.start.advanced })
    await user.dblClick(advancedButton)

    const advancedTexts = screen.queryAllByText(texts.advanced.part1)
    expect(advancedTexts.length).toBe(1)
})