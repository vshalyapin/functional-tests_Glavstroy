describe("Проверка отображения и функциональности элементов", () => {
  it("Проверка отображения 5 разделов в хэдере сайта: Проекты, Истории, Тендеры, Коммерческая недвижимость, Компания", () => {
    cy.visit('https://glavstroy.ru/')
    cy.title().should('eq', 'Главстрой — один из крупнейших девелоперов России') // проверка title-заголовка страницы
    cy.get('.cookie-warning__close').click() // закрытие уведомления "Мы используем файлы cookie." нажатием на кнопку ОК
    cy.get('li[class="navigation-item"]')
      .eq(0) // получаем элемент DOM с индексом 0 в массиве элементов
      .should('contain.text', 'Проекты') // проверяем утверждения "должен содержать текст 'Проекты'"
    cy.get('li[class="navigation-item"]')
      .eq(1)
      .should('contain.text', 'Истории')
    cy.get('li[class="navigation-item"]')
      .eq(2)
      .should('contain.text', 'Тендеры')
    cy.get('li[class="navigation-item"]')
      .eq(3)
      .should('contain.text', 'Коммерческая недвижимость')
    cy.get('li[class="navigation-item"]')
      .eq(4)
      .should('contain.text', 'Компания')
      .and('contain.text', 'Новости')
      .and('contain.text', 'Карьера')
      .and('contain.text', 'Инвесторам')
      .and('contain.text', 'Контакты')
  })

  it("Проверка переходов в 5 разделов в хэдере сайта: Проекты, Истории, Тендеры, Коммерческая недвижимость, Компания", () => {
    cy.get('a[class="navigation-link "]').eq(0).click() // кликаем в раздел Проекты
    cy.url().should('contains', '/projects') // проверяем утверждение 'URL должен содержать /projects'
    cy.title().should('eq', 'Проекты Главстроя') // проверка title-заголовка страницы
    cy.contains('Истории').eq(0).click()
    cy.url().should('contains', '/stories') // проверяем утверждение 'URL должен содержать /stories'
    cy.title().should('eq', 'Истории Главстроя') // проверка title-заголовка страницы
    cy.get('a[class="navigation-link "]').eq(1).click()
    cy.url().should('contains', '/tenders') // проверяем утверждение 'URL должен содержать /tenders'
    cy.title().should('eq', 'Тендеры Главстроя') // проверка title-заголовка страницы
  })

  // этот код добавлен во избежание падения автотеста при ошибке uncaught:exception
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })

  it("Проверка отображения раздела Коммерческая недвижимость", () => {
    cy.get('a[class="navigation-link "]').eq(2).click()
    cy.url().should('contains', '/commercial') // проверяем утверждение 'URL должен содержать /commercial'
    cy.title().should('eq', 'Коммерческая недвижимость') // проверка title-заголовка страницы
    cy.get('a[class="navigation-link "]').eq(3).click()
    cy.url().should('contains', '/about') // проверяем утверждение 'URL должен содержать /about'
    cy.title().should('eq', 'О Главстрое') // проверка title-заголовка страницы
  })

  it("Проверка отображения 4 подразделов раздела Компания (Новости, Карьера, Инвесторам, Контакты)", () => {
    cy.get('li[class="navigation-submenu-item"]')
      .eq(0)
      .should('contain.text', 'Новости')
    cy.get('li[class="navigation-submenu-item"]')
      .eq(1)
      .should('contain.text', 'Карьера')
    cy.get('li[class="navigation-submenu-item"]')
      .eq(2)
      .should('contain.text', 'Инвесторам')
    cy.get('li[class="navigation-submenu-item"]')
      .eq(3)
      .should('contain.text', 'Контакты')
  })

  it("Проверка переходов в 4 подраздела в разделе Компания (Новости, Карьера, Инвесторам, Контакты)", () => {
    // прокликиваем 4 подраздела раздела Компания (Новости, Карьера, Инвесторам, Контакты)
    cy.contains('Новости').click()
    cy.url().should('contains', '/news') // проверка утверждения 'URL должен содержать /news'
    cy.title().should('eq', 'Новости Главстроя') // проверка title-заголовка страницы
    cy.contains('Карьера').click()
    cy.url().should('contains', '/career') // проверка утверждения 'URL должен содержать /career'
    cy.title().should('eq', 'Карьера в Главстрое') // проверка title-заголовка страницы
    cy.contains('Инвесторам').click()
    cy.url().should('contains', '/investors') // проверка утверждения 'URL должен содержать /investors'
    cy.title().should('eq', 'Инвесторам Главстроя') // проверка title-заголовка страницы
    cy.contains('Контакты').click()
    cy.url().should('contains', '/contacts') // проверка утверждения 'URL должен содержать /contacts'
    cy.title().should('eq', 'Контакты Главстроя') // проверка title-заголовка страницы
  })

  it("Проверка отображения 7 пунктов меню раздела Контакты", () => {
    cy.get('.offices-nav > .active').should('have.text', 'Москва') // проверка утверждения "должен содержать текст 'Москва'"
    cy.get('.offices-nav > [data-id="1"]').should('have.text', 'Московская область') // проверка утверждения "должен содержать текст 'Московская область'"
    cy.get('.departament-nav > [data-id="2"]').should('have.text', 'Продажи') // проверка утверждения "должен содержать текст 'Продажи'"
    cy.get('.departament-nav > [data-id="3"]').should('have.text', 'PR') // проверка утверждения "должен содержать текст 'PR'"
    cy.get('.departament-nav > [data-id="4"]').should('have.text', 'Тендеры') // проверка утверждения "должен содержать текст 'Тендеры'"
    cy.get('.departament-nav > [data-id="5"]').should('have.text', 'HR') // проверка утверждения "должен содержать текст 'HR'"
    cy.get('.departament-nav > [data-id="6"]').should('have.text', 'Служба доверия') // проверка утверждения "должен содержать текст 'Служба доверия'"
  })

  it("Проверка переходов в 7 пунктов меню раздела Контакты", () => {
    cy.contains('Московская область').click()
    cy.url().should('contains', '/#departament1') // проверка утверждения 'URL должен содержать /departament1'
    cy.contains('Продажи').click()
    cy.url().should('contains', '/#departament2') // проверка утверждения 'URL должен содержать /departament2'
    cy.contains('PR').click()
    cy.url().should('contains', '/#departament3') // проверка утверждения 'URL должен содержать /departament3'
    cy.get('.departament-nav > [data-id="4"]').click()
    cy.url().should('contains', '/#departament4') // проверка утверждения 'URL должен содержать /departament4'
    cy.contains('HR').click()
    cy.url().should('contains', '/#departament5') // проверка утверждения 'URL должен содержать /departament5'
    cy.contains('Служба доверия').click()
    cy.url().should('contains', '/#departament6') // проверка утверждения 'URL должен содержать /departament6'
  })

  it("Проверка атрибутов 3 иконок соцсетей: VK, Telegram, YouTube", () => {
    cy.get('a[class="icon-vk"]') // выбираем иконку VK
      .should('have.attr', 'href', 'https://vk.com/glavstroy.group') // проверка наличия ссылки на группу glavstroy.group в соцсети VK
      .should('have.attr', 'target', '_blank') // проверка атрибута открытия ссылки в новой вкладке браузера target="_blank"
    cy.get('a[class="icon-teleg"]') // выбираем иконку Telegram
      .should('have.attr', 'href', 'https://t.me/glavstroygroup') // проверка наличия ссылки на группу glavstroygroup в соцсети Telegram
      .should('have.attr', 'target', '_blank') // проверка атрибута открытия ссылки в новой вкладке браузера target="_blank"
    cy.get('a[class="icon-youtube"]') // выбираем иконку Youtube
      .should('have.attr', 'href', 'https://www.youtube.com/channel/UCWP8-GJI8IrXDAWmjdHwJuw') // проверка наличия ссылки на канал Главстрой в Youtube
      .should('have.attr', 'target', '_blank') // проверка атрибута открытия ссылки в новой вкладке браузера target="_blank"
  })

  it("Проверка атрибутов и функционирования 4х кнопок в футере сайта", () => {
    cy.contains('Политика конфиденциальности')
      .should('have.attr', 'href', '/local/templates/glavstroy/assets/files/Политика конфиденциальности.pdf') // проверка наличия ссылки на документ Политика конфиденциальности.pdf
      .should('have.attr', 'target', '_blank') // проверка атрибута открытия ссылки в новой вкладке браузера target="_blank"
      .then(link => {
        cy
          .request(link.prop('href'))
          .its('status')
          .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)    
    })
    cy.contains('Соглашение на обработку персональных данных')
      .should('have.attr', 'href', '/local/templates/glavstroy/assets/files/Соглашение на обработку персональных данных.pdf')
      .should('have.attr', 'target', '_blank')
      .then(link => {
        cy
          .request(link.prop('href'))
          .its('status')
          .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)    
    })
    cy.get('[href="/about/contacts/#departament6"]')
      .should('have.text', 'Служба доверия')
      .should('have.attr', 'target', '_blank')
      .then(link => {
        cy
          .request(link.prop('href'))
          .its('status')
          .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)    
    })
    cy.contains('Заявление об ограничении ответственности')
      .should('have.attr', 'href', '/statement')
      .should('have.attr', 'target', '_blank')
      .then(link => {
        cy
          .request(link.prop('href'))
          .its('status')
          .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)    
    })
  })

  it("Проверка атрибутов и функционирования 2х форм ввода: Подписка на новости и Поиск ", () => {
    cy.get('input[name="EMAIL"]') // находим поле ввода эл.почты
      .should('have.attr', 'placeholder', 'Ваша почта') // проверяем отображение плейсхолдера Ваша почта
    // cy.contains('Подписаться').click() // кликаем кнопку Подписаться
    // cy.get('font[class="errortext"]') // находим сообщение об ошибке 
      // .should('have.text', 'Указан неверный адрес подписки.') // т.к. не был введен адрес эл.почты
    cy.get('input[name="q"]') // находим поле ввода Поиск
      .should('have.attr', 'placeholder', 'Поиск') // проверяем отображения плейсхолдера Поиск
      .type('купить квартиру{enter}') // вводим значение 'купить квартиру' и нажимаем на клавиатуре Enter
    cy.get(':nth-child(1) > .row > .col-xl-5 > .small-text')
      .contains('купить квартиру') // проверяем отображение поискового запроса в первой выдаче на странице
  })
})