export class ChatPage {
  constructor(screen, user) {
    this.screen = screen;
    this.user = user;
  }

  texts = {
    title: () => this.screen.getByText('Виртуальный помощник'),
    greetingText: () => this.screen.getByText('Привет! Я ваш виртуальный помощник. Нажмите "Начать разговор", чтобы открыть чат'),
    introText: () => this.screen.getByText('Помогу вам выбрать подходящий курс. Выбирайте категорию вопроса, и буквально через пару шагов я смогу рассказать вам то, что нужно.'),
    switchProfInfo: () => this.screen.getByText('У нас есть программы обучения новой профессии. Мы постоянно мониторим, какие компетенции востребованы на рынке, а учебные программы строим в соответствии ними. Учиться можно онлайн в удобном темпе без дедлайнов. К концу обучения у вас будет портфолио на GitHub. А к трудоустройству поможет подготовиться Карьерный трек'),
    detailsInfo: () => this.screen.getByText('В Хекслете можно освоить JavaScript, Python, PHP, верстку, Java, DevOps и Ruby on Rails. Также есть программы обучения по тестированию веб-приложений и аналитике данных. https://ru.hexlet.io/courses#preparatory'),
    subscribeLinkText: () => this.screen.getByText('Ага, дублирую ссылку https://ru.hexlet.io/courses#preparatory'),
    tryInfoText: () => this.screen.getByText('У нас есть подготовительные курсы, которые длятся всего 2 недели.За это время вы знакомитесь с основами программирвоания, пробуете его на практике и плавной подойдете к старту обучения в основной программе. Все это под руководством опытного программиста. Он поможет, если будут сложности. Курс стоит всего 990 рублей'),
    advancedInfo: () => this.screen.getByText('Отлично! Есть несколько вариантов обучения для тех, кто хочет углубить знания. Во-первых, курсы повышения квалификации. Часто их оплачивает работодатель. Если вам кажется, что такой вариант возможен, поделитесь с ним этой ссылкой: https://b2b.hexlet.io/.'),
  }

  buttons = {
    openChatButton: () => this.screen.getByRole('button', { name: 'Открыть Чат' }),
    startChatButton: () => this.screen.findByRole('button', { name: 'Начать разговор' }),
    closeChatButton: () => this.screen.getByRole('button', { name: /close/i }),
    switchProfButton: () => this.screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }),
    tryItButton: () => this.screen.getByRole('button', { name: 'Попробовать себя в IT' }),
    advancedButton: () => this.screen.getByRole('button', { name: 'Я разработчик, хочу углубить свои знания' }),
    switchDetailsButton: () => this.screen.getByRole('button', { name: 'Расскажи подробнее' }),
    subscribeButton: () => this.screen.getByRole('button', { name: 'Останусь здесь, запишусь на курс' }),
    subscribeBackButton: () => this.screen.getByRole('button', { name: 'Вернуться в начало' }),
    subscribeEasyButton: () => this.screen.getByRole('button', { name: 'А есть что-нибудь попроще' }),
    interestingButton: () => this.screen.getByRole('button', { name: 'Интересно' }),
    trySwitchButton: () => this.screen.getByRole('button', { name: 'А что по поводу смены профессии?' }),
    tryBackButton: () => this.screen.getByRole('button', { name: 'Вернуться назад' }),
    advancedBackButton: () => this.screen.getByRole('button', { name: 'Верни меня в начало' }),
  }

  async openChat() {
    await this.user.click(this.buttons.openChatButton())
    await this.user.click(await this.buttons.startChatButton())
  }

  async closeChat() {
    await this.user.click(this.buttons.closeChatButton())
  }
}
