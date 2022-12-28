import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов на главной странице вебсайта ЖК Береговой 2", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие главной страницы, проверка title-заголовка страницы в браузере", () => {
    // cy.viewport('macbook-15')
    cy.visit('https://beregovoy-kvartal.ru/')

    // cy.compareSnapshot('mainpage_beregovoy2')

    cy.title().should('eq', 'Береговой — жизнь на берегу Москвы-реки') // проверка title-заголовка страницы
    cy.get('.confirm_2H16J').click() // закрытие уведомления "Сайт использует cookie." нажатием на кнопку Хорошо
  })

  it("Мета-теги и линки страницы в head: description, Open Graph (og), icon, manifest", () => {
    cy.get('meta[name="description"]').should('have.attr', 'content', 'В жилом квартале Береговой живут три сорванца, архитектор-меланхолик, кудрявый портье и гуттаперчевые фотограф и модель. Посмотрите 5 мини-фильмов из серии «Однажды в Береговом», чтобы узнать их истории. И взгляните на дом, где все это произошло.')
    cy.get('meta[property="og:type"]').should('have.attr', 'content', 'website')
    cy.get('meta[property="og:title"]').should('have.attr', 'content', 'Береговой — жизнь на берегу Москвы-реки')
    cy.get('meta[property="og:description"]').should('have.attr', 'content', 'В жилом квартале Береговой живут три сорванца, архитектор-меланхолик, кудрявый портье и гуттаперчевые фотограф и модель. Посмотрите 5 мини-фильмов из серии «Однажды в Береговом», чтобы узнать их истории. И взгляните на дом, где все это произошло.')
    cy.get('meta[property="og:locale"]').should('have.attr', 'content', 'ru_RU')
    cy.get('meta[property="og:image"]').should('have.attr', 'content', 'https://beregovoy-kvartal.ru/images/graph/poster.jpg')
      .then(link => {
        cy.request(link.prop('content')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно) 
    })
    cy.get('meta[property="og:url"]').should('have.attr', 'content', 'https://beregovoy-kvartal.ru/')
    cy.get('link[rel="icon"]')
      .eq(0)
      .should('have.attr', 'href', '/favicons/favicon.ico')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    cy.get('link[rel="icon"]')
      .eq(1)
      .should('have.attr', 'sizes', '32x32')
      .and('have.attr', 'href', '/favicons/favicon-32x32.png')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    cy.get('link[rel="icon"]')
      .eq(2)
      .should('have.attr', 'sizes', '16x16')
      .and('have.attr', 'href', '/favicons/favicon-16x16.png')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })
    cy.get('link[rel="apple-touch-icon"]')
      .should('have.attr', 'sizes', '180x180')
      .and('have.attr', 'href', '/favicons/apple-touch-icon.png')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })
    cy.get('link[rel="manifest"]')
      .should('have.attr', 'href', '/favicons/site.webmanifest')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })
    cy.get('link[rel="mask-icon"]')
      .should('have.attr', 'href', '/favicons/safari-pinned-tab.svg')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })
  })

  it("Хэдер", () => {
    cy.get('header').within(() => {
      cy.get('a[class="boutique_sdKmp cursor-pointer"]') // ссылка на Интернет-бутик
        .should('have.text', ' Интернет-бутик')
        .and('have.attr', 'href', '/flats')
        .then(link => {
          cy
            .request(link.prop('href'))
            .its('status')
            .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)    
      })
      cy.get('a[class="text cursor-pointer panorama_2lYRf"]') // ссылка на Панораму 360
        .should('contain.text', 'Панорама')  
        .and('have.attr', 'href', '/360_view/')
        .and('have.attr', 'target', '_blank')
        .then(link => {
          cy
            .request(link.prop('href'))
            .its('status')
            .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)    
      })
      cy.get('a[class="FavoriteLinkNew_2NCCu cursor-pointer favorite_ZB_DQ"]') // ссылка на Избранное
        .should('have.attr', 'href', '/favorites')
        .then(link => {
          cy
            .request(link.prop('href'))
            .its('status')
            .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)    
      })
      // cy.get('a[class="cursor-pointer link mortgageLink_1D7rV"]') // ссылка на Ипотечные программы
      //   .should('contain.text', 'Ипотека от 2.99%')  
      //   .and('have.attr', 'href', '/mortgage')
      //   .and('have.attr', 'target', '_blank')
      //   .then(link => {
      //     cy
      //       .request(link.prop('href'))
      //       .its('status')
      //       .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно) 
      // })
      // cy.get('a[class="phone_2cVUu cursor-pointer"]') // номер телефона в шапке сайта
      // .should('contain.text', '+7 (495)')  
      cy.get('a[class="cursor-pointer ready_PXLoG"]') // ссылка на Береговой 1
        .should('contain.text', 'Готовые квартиры', 'в 1 очереди')
        .and('have.attr', 'href', 'https://old.beregovoy-kvartal.ru/')
        .and('have.attr', 'target', '_blank')
        .then(link => {
          cy
            .request(link.prop('href'))
            .its('status')
            .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)    
      })
    })
  })

  it("Заголовок над главным рендером + ссылки под заголовком", () => {
    cy.get('h1[class="title h2 title_yAIgE"]') // заголовок ЖИЛОЙ КВАРТАЛ НА МОСКВЕ-РЕКЕ
      .should('have.text', 'ЖИЛОЙ КВАРТАЛ НА МОСКВЕ-РЕКЕ')  
    cy.get('a[class="MainHero__link cursor-pointer"]') // ссылка на фотографии Динамики строительства
      .eq(1)
      // .should('contain.text', 'на фотографиях в рассылке на фотографиях в рассылке')  
      .should('have.attr', 'href', 'https://mail.beregovoy-kvartal.ru/mailing/2022/october/index.html')
      .then(link => {
        cy
          .request(link.prop('href'))
          .its('status')
          .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    // cy.get('a[class="MainHero__link cursor-pointer"]') // ссылка на email рассылку
    //   .eq(2)
    //   .should('have.attr', 'href', '//mail.beregovoy-kvartal.ru/mailing/2022/july/index.html') // ссылка обновляется раз в месяц
    //   .and('have.attr', 'target', '_blank')
    //   .then(link => {
    //     cy
    //       .request(link.prop('href'))
    //       .its('status')
    //       .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    // })
    cy.get('a[class="MainHero__link cursor-pointer"]') // ссылка на Подробные условия ипотеки
      .eq(0)
      .should('contain.text', 'на фотографиях')  
    //   .and('have.attr', 'href', '/mortgage')
    //   .and('have.attr', 'target', '_blank')
    //   .then(link => {
    //     cy
    //       .request(link.prop('href'))
    //       .its('status')
    //       .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    // })
  })
  

  it("Блок Квартиры", () => {
    cy.get('h2[class="h3 title mainTitle_nzuMc"]') // заголовок Квартиры
      .scrollIntoView() // подскролл к блоку
      .should('contain.text', 'Квартиры')  
    cy.get('a[class="link cursor-pointer"]') // ссылка Эта квартира в бутике
      .should('contain.text', 'Эта квартира в бутике')  
      .and('have.attr', 'href', 'https://beregovoy-kvartal.ru/flats?common_layout_type=144&ordering=price')
      .then(link => {
        cy
          .request(link.prop('href'))
          .its('status')
          .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    cy.get('span[class="subtitle cursor-pointer tourText_U_Uml"]') // кнопка 3D тур
      .should('contain.text', '3D тур')
  })

  it("Блок Благоустройство", () => {
    cy.get('h3[class="h3 title title_3jKZ0"]') // заголовок Благоустройство
      .scrollIntoView() // подскролл к блоку
      .should('contain.text', 'Благоустройство')  
    cy.get('div[class="h5 subtitle btnText_1MhsL subtitle_Vbzsl"]') // подпись к кнопке '3D тур - по двору'
      .should('contain.text', '3D ТУР – ПО Двору') 
  })

  it("Блок Общественные пространства", () => {
    cy.get('h2[class="h3 title--stroke title title_fISe0"]') // заголовок Общественные пространства
      .scrollIntoView() // подскролл к блоку
      .should('have.text', 'Общественные пространства')  
    cy.get('div[class="h3 title subtitle_2HE3h"]') // подзаголовок Открытые террасы
      .should('contain.text', 'Открытые террасы')
    // cy.get('div[class="h3 title subtitle_2HE3h"]') // подзаголовок Лобби
      // .should('have.text', 'Общественные пространства')  
    // cy.get('div[class="h3 title subtitle_2HE3h"]') // подзаголовок Спорт
      // .should('have.text', 'Спорт')  
    // cy.get('div[class="h3 title subtitle_2HE3h"]') // подзаголовок Образование
      // .should('have.text', 'Образование')  
  })

  it("Блок Архитектура вне времени", () => {
    cy.get('.header_FQKPl > .title') // заголовок Архитектура вне времени
      .scrollIntoView() // подскролл к блоку
      .should('contain.text', 'Архитектура')
      .and('contain.text', 'вне времени')
  })

  it("Блок Истории", () => {
    cy.get('.titleWrapper_pq-Nb > .subtitle') // заголовок Истории
      .scrollIntoView() // подскролл к блоку
      .should('have.text', 'Истории')  
    // cy.get(':nth-child(1) > .cursor-pointer > .image-lazy > .image-lazy__image') // карточка Общественные пространства
      // .should('have.attr', 'data-src', 'https://storage.yandexcloud.net/beregovoy-dev/c/i/s/im/f7c186a9d9641075a790a7bbfbf3a2a689feceb1/b09a9f2d3acdd82c682e266c527db5bf.jpg')   
    cy.get(':nth-child(1) > .storyTitle_2EDb5') // подпись карточки Общественные пространства
      .should('have.text', 'Общественные пространства')  
    // cy.get(':nth-child(2) > .cursor-pointer > .image-lazy > .image-lazy__image') // карточка Планировки
      // .should('have.attr', 'data-src', 'https://storage.yandexcloud.net/beregovoy-dev/c/i/s/im/8a910bf116d9653aaacb48fbd3f757dcc0080ff2/0c78bd505e07d1fb98b8ac501edbd2c9.jpg"')   
    cy.get(':nth-child(2) > .storyTitle_2EDb5') // подпись карточки Планировки
      .should('have.text', 'Планировки')  
    // cy.get(':nth-child(3) > .cursor-pointer > .image-lazy > .image-lazy__image') // карточка Дворы
      // .should('have.attr', 'data-src', 'https://storage.yandexcloud.net/beregovoy-dev/c/i/s/im/8f008767a41a95be0d299f468a4f37804f38d3ee/fb1716c0d65b047ec11a0af48cb62694.jpg')   
    cy.get(':nth-child(3) > .storyTitle_2EDb5') // подпись карточки Дворы
      .should('have.text', 'Дворы')  
    // cy.get(':nth-child(4) > .cursor-pointer > .image-lazy > .image-lazy__image') // карточка Фасады
      // .should('have.attr', 'data-src', 'https://storage.yandexcloud.net/beregovoy-dev/c/i/s/im/112ea257a972e7dd9cff1f7624c4810c18afa5ef/c3d5c8d315e0e7b2157550a3a6f06cf7.jpg')   
    cy.get(':nth-child(4) > .storyTitle_2EDb5') // подпись карточки Фасады
      .should('have.text', 'Фасады') 
  })

  it("Блок Историческое место", () => {
    cy.get('h2[class="title title_20TtG"]') // заголовок Историческое место
      .scrollIntoView() // подскролл к блоку
      .should('contain.text', 'Историческое место')
  })

  it("Блок Интернет-бутик", () => {
    cy.get('h2[class="subtitle title_2QXxi"]') // заголовок Интернет-бутик
      .scrollIntoView() // подскролл к блоку
      .should('contain.text', 'Интернет-бутик')
    cy.get('a[class="link cursor-pointer link_1ITAh"]') // ссылка Подобрать квартиру
      .should('contain.text', 'Подобрать квартиру')
      .and('have.attr', 'href', '/flats')
      .then(link => {
        cy
          .request(link.prop('href'))
          .its('status')
          .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
  })

  it("Блок Приезжайте на персональную презентацию", () => {
    cy.get('h2[class="title h3 title_16tLC"]') // заголовок Приезжайте на персональную презентацию
      .scrollIntoView() // подскролл к блоку
      .should('contain.text', 'Приезжайте', 'на персональную презентацию')  
    cy.get('div[class="formBody_1cpQu"]').within(() => { // форма с тремя поля ввода Имя, Телефон, E-MAIL
      cy.get('input[name="name"]')
        // .should('have.attr', 'placeholder', 'Имя') // поле ввода Имя
      cy.get('input[name="phone"]')
        // .should('have.attr', 'placeholder', 'Телефон') // поле ввода Телефон
      cy.get('input[name="email"]')
        // .should('have.attr', 'placeholder', 'E-mail') // поле ввода E-MAIL
      cy.get('button[type="submit"]').should('have.attr', 'class', 'circle-button cursor-pointer button_LIMeu') // кнопка подтверждения и отправки заполненной формы
      cy.get('p[class="text disclaimer_2NNSE"]') // дисклеймер
        .should('contain.text', 'Нажимая на кнопку, вы соглашаетесь с условиями', 'обработки персональных данных')
        .within(() => {
          cy.get('a[class="link link--underline cursor-pointer"]') // ссылка на согласие на обработку ПД
            .should('have.attr', 'href', 'https://beregovoy-kvartal.ru/m/d/pd/f/%D0%A1%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5_%D0%BD%D0%B0_%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83_%D0%9F%D0%94_%D0%91%D0%B5%D1%80%D0%B5%D0%B3%D0%BE%D0%B2%D0%BE%D0%B8-%D0%A1%D0%97.PDF')
            .and('have.attr', 'target', '_blank')
            .then(link => {
              cy
                .request(link.prop('href'))
                .its('status')
                .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
      })
    })
  })

  it("Футер", () => {
    cy.get('footer').scrollIntoView().within(() => {
      cy.get('button') // ссылка 'Не является публичной офертой'
        .should('contain.text', 'Не является публичной офертой')
      cy.get('a[class="link_3RW0v"]') // логотип Главстрой
        .should('have.attr', 'href', 'https://www.glavstroy.ru/') // ссылка на сайт Главстроя
        .and('have.attr', 'target', '_blank')
        .then(link => {
          cy
            .request(link.prop('href'))
            .its('status')
            .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('a.link') // ссылка на Политику конфиденциальности
        .should('contain.text', 'Политика конфиденциальности')
        .and('have.attr', 'href', 'https://beregovoy-kvartal.ru/m/d/d/f/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8_-_%D0%91%D0%B5%D1%80%D0%B5%D0%B3%D0%BE%D0%B2%D0%BE%D0%B8_%D1%81%D0%BF%D0%B5%D1%86%D0%B7%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%89%D0%B8%D0%BA_24.09.20.pdf')
        .and('have.attr', 'target', '_blank')
        .then(link => {
          cy
            .request(link.prop('href'))
            .its('status')
            .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('div[class="ida_3AAuN"]').within(() => {
        cy.get('a[class="cursor-pointer"]') // ссылка на сайт Idaproject
          .should('have.attr', 'href', 'http://idaproject.com/')
          .and('have.attr', 'target', '_blank')
          .then(link => {
            cy
              .request(link.prop('href'))
              .its('status')
              .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
      })
    })  
  })
})