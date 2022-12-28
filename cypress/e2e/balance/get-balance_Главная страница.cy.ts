import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов на главной странице вебсайта ЖК balance", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие главной страницы, проверка title-заголовка страницы в браузере", () => {
    cy.visit('https://get-balance.ru/', { timeout: 90000 }) // увеличен тайм-аут открытия страницы до 90 секунд, за 60 секунд не всегда успевает прогрузиться
    cy.title().should('eq', '❤️ balance — прогрессивные жилые кварталы на рязанском проспекте') // проверка title-заголовка страницы
    cy.get('.cookies-btn').click() // закрытие уведомления "мы, как и все, используем куки." нажатием на кнопку ОК
  })

  it("Мета-теги и линки страницы в head: Open Graph (og), description, icon", () => {
    cy.get('meta[property="og:title"]').should('have.attr', 'content', '❤️ balance — прогрессивные жилые кварталы на рязанском проспекте')
    cy.get('meta[property="og:description"]').should('have.attr', 'content', 'главные причины жить в balance: свой парк, 5 минут до метро «окская», отделка, эффективные планировки квартир, коворкинги на первых этажах.')
    cy.get('meta[property="og:image"]').should('have.attr', 'content', 'https://get-balance.ru/upload/uf/bd8/bd88b34bc2d01ba69254b4a64811d936.jpg')
      .then(link => {
        cy.request(link.prop('content'))
          .its('status')
          .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно) 
    })   
    cy.get('meta[property="og:type"]').should('have.attr', 'content', 'website')
    cy.get('meta[property="og:url"]').should('have.attr', 'content', 'https://www.get-balance.ru')
    cy.get('meta[property="og:site_name"]').should('have.attr', 'content', 'баланс')
    cy.get('meta[property="og:locale"]').should('have.attr', 'content', 'ru_RU')
    cy.get('meta[name="description"]').should('have.attr', 'content', 'главные причины жить в balance: свой парк, 5 минут до метро «окская», отделка, эффективные планировки квартир, коворкинги на первых этажах.')
    cy.get('link[rel="icon"]').should('have.attr', 'href', '/local/templates/flats_old/img/favicons/favicon.ico')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })  
    cy.get('link[rel="apple-touch-icon"]')
      .eq(0)
      .should('have.attr', 'href', '/local/templates/flats_old/img/favicons/apple-touch-icon.png')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })      
    cy.get('link[rel="apple-touch-icon"]')
      .eq(1)
      .should('have.attr', 'sizes', '72x72')
      .and('have.attr', 'href', '/local/templates/flats_old/img/favicons/apple-touch-icon-72x72.png')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })    
    cy.get('link[rel="apple-touch-icon"]')
      .eq(2)
      .should('have.attr', 'sizes', '114x114')
      .and('have.attr', 'href', '/local/templates/flats_old/img/favicons/apple-touch-icon-114x114.png')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })  
  })
  
  it("Хэдер", () => {
    cy.get('header').within(() => {
      cy.get(".bank_mortgage > a") // ссылка на ипотеку
        .should('contain.text', 'ипотека от 5,7%')
        .and('have.attr', 'href', '/mortgage/')
        .and('have.attr', 'onclick', "ym(49995226,'reachGoal','click-ipoteka-ot-header')")
        .then(link => {
          cy
            .request(link.prop('href'))
            .its('status')
            .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)    
        })
      cy.get('.desctop') // ссылка на магазин квартир
        .should('have.text', 'магазин квартир')
        .and('have.attr', 'href', '/flats/')
        .then(link => {
          cy
            .request(link.prop('href'))
            .its('status')
            .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
      cy.get('.store > .desctop') // ссылка на магазин квартир в десктопной версии
        .should('have.attr', 'href', '/flats/')
        .and('have.text', 'магазин квартир')
      cy.get('.store > .mobile') // ссылка на магазин квартир в мобильной версии
        .should('have.attr', 'href', '/flats/')
    })
  })

  it("Главная страница", () => {    
    cy.get('.main_page')
  })    

  it("Футер", () => {
    cy.get('footer').within(() => {
      cy.get('.logo').within(() => { // логотип balance
        cy.get('img')
          // .should('have.attr', 'src', '/upload/iblock/5d2/5d2142c6cb1529aa91f8b1deb9f14acc.svg') // ресурс изображения постоянно меняется при новой загрузке страницы
          .should('have.attr', 'alt', 'Логотип')
      })
      cy.get('.main_menu').within(() => { // меню сайта в футере
        cy.get('.menu-block-nav-item').eq(0).within(() => {
          cy.get('a').should('have.attr', 'href', '/about-flats/').and('contain.text', 'о квартирах')
        })
        cy.get('.menu-block-nav-item').eq(1).within(() => {
          cy.get('a').should('have.attr', 'href', '/construction-progress/').and('contain.text', 'ход строительства')
        })
        cy.get('.menu-block-nav-item').eq(2).within(() => {
          cy.get('a').should('have.attr', 'href', '/services/').and('contain.text', 'сервисы')
        })
        cy.get('.menu-block-nav-item').eq(3).within(() => {
          cy.get('a').should('have.attr', 'href', '/location/').and('contain.text', 'расположение')
        })
        cy.get('.menu-block-nav-item').eq(4).within(() => {
          cy.get('a').should('have.attr', 'href', '/architecture/').and('contain.text', 'архитектура')
        })
        cy.get('.menu-block-nav-item').eq(5).within(() => {
          cy.get('a').should('have.attr', 'href', '/documents/').and('contain.text', 'документы')
        })
        cy.get('.menu-block-nav-item').eq(6).within(() => {
          cy.get('a').should('have.attr', 'href', '/infrastructure/').and('contain.text', 'ритейл')
        })
        cy.get('.menu-block-nav-item').eq(7).within(() => {
          cy.get('a').should('have.attr', 'href', '/yards/').and('contain.text', 'парк и дворы')
        })
        cy.get('.menu-block-nav-item').eq(8).within(() => {
          cy.get('a').should('have.attr', 'href', '/mortgage/').and('contain.text', 'ипотека')
        })
        cy.get('.menu-block-nav-item').eq(9).within(() => {
          cy.get('a').should('have.attr', 'href', '/purchase/').and('contain.text', 'как обрести')
        })
        cy.get('.menu-block-nav-item').eq(10).within(() => {
          cy.get('a').should('have.attr', 'href', '/order/auth/').and('contain.text', 'оформление')
        })
      })
      cy.get('.shop').within(() => { // кнопка 'магазин квартир' в футере
        cy.get('a')
          .should('have.attr', 'href', '/flats/')
          .and('contain.text', 'магазин квартир')
      })
      cy.get('.contacts__wrapper').within(() => { // контакты в футере
        cy.get('a')
          // .should('have.attr', 'href', 'tel:+74954455137')
          .and('contain.text', '+7 (495)')
        cy.get('.address').within(() => {
          cy.get('a')
            .should('have.attr', 'href', 'https://yandex.ru/maps/org/235770732126')
            .and('have.attr', 'target', '_blank')
            .and('have.text', 'москва, рязанский проспект, 26')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
        })
        cy.get('.mail').within(() => {
          cy.get('a')
            .should('have.attr', 'href', 'mailto:assist@get-balance.ru')
            .and('have.attr', 'target', '_blank')
            .and('have.text', 'assist@get-balance.ru')
        })
        cy.get('.social > .vk')
          .should('have.attr', 'href', 'https://vk.com/get.balance')
          .and('have.attr', 'target', '_blank')
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
        cy.get('.social > .tg')
          .should('have.attr', 'href', 'https://t.me/get_balance/')
          .and('have.attr', 'target', '_blank')
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
      })
      cy.get('.social').within(() => { // ссылки на соцсети в адаптивном дизайне
        cy.get('.vk')
          .should('have.attr', 'href', 'https://vk.com/get.balance')
          .and('have.attr', 'target', '_blank')
        cy.get('.tg')
          .should('have.attr', 'href', 'https://t.me/get_balance/')
          .and('have.attr', 'target', '_blank')
      })
      cy.get('.journal__wrapper').within(() => { // блок с ссылками на Согласие на обработку ПД и Политику конфиденциальности, ранее еще журнал Берегового был
        cy.get('a')
          .eq(0)
          .should('have.attr', 'href', '/documents/agreement.pdf')
          .and('have.attr', 'target', '_blank')
          .and('have.text', 'соглашение об обработке персональных данных')
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
        cy.get('a')
          .eq(1)
          .should('have.attr', 'href', '/documents/privacy_policy.pdf')
          .and('have.attr', 'target', '_blank')
          .and('have.text', 'политика конфиденциальности')
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
      })
      cy.get('.links-adaptive').within(() => { // ссылки на Согласие на обработку ПД и Политику конфиденциальности в адаптивном дизайне
        cy.get('a')
          .eq(0)
          .should('have.attr', 'href', '/documents/agreement.pdf')
          .and('have.attr', 'target', '_blank')
          .and('have.text', 'соглашение об обработке персональных данных')
        cy.get('a')
          .eq(1)
          .should('have.attr', 'href', '/documents/privacy_policy.pdf')
          .and('have.attr', 'target', '_blank')
          .and('have.text', 'политика конфиденциальности')
      })
      cy.get('.dev_logo').within(() => { // Логотип Главстрой в футерем
        cy.get('a')
          .should('have.attr', 'href', 'https://glavstroy.ru/')
          .and('have.attr', 'target', '_blank')
          .and('have.attr', 'rel', 'nofollow')
          .within(() => {
            cy.get('img')
              .and('have.attr', 'src', '/local/templates/main/img/logo_glavstroy2.svg')
              .and('have.attr', 'alt', 'Логотип главстроя')
          })
      })
      cy.get('.lawyers').should('have.text', 'юристы попросили нас напомнить: информация о проекте и рендеры на сайте носят исключительно информационный характер и не являются публичной офертой. это картинка, к которой мы стремимся, но в реальности все может быть чуть по-другому: измениться могут оттенки, места установки оборудования и материалы. но сюрпризом это не будет: что именно ты получишь, прописано в дду.')
    })
  })

  it("Скрытые статические номера", () => {
    cy.get('.hidden_phone').eq(0).should('have.text', '8 (495) 116-79-99').and('have.attr', 'href', 'tel:+74951167999')
    cy.get('.hidden_phone').eq(1).should('have.text', '8 (495) 127-56-75').and('have.attr', 'href', 'tel:+74951275675')
    cy.get('.hidden_phone').eq(2).should('have.text', '8 (495) 154-62-52').and('have.attr', 'href', 'tel:+74951546252')
  })

  it("Уведомление об использовании Cookie", () => {
    cy.get('.cookies-note').within(() => {
      cy.get('.cookies-txt')
        .should('contain.text', 'мы, как и все, используем куки.', 'согласие на обработку персональных данных.')
        .within(() => {
          cy.get('a')
            .should('have.attr', 'href', 'https://get-balance.ru/documents/agreement.pdf')
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