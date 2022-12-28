import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов на главной странице вебсайта ЖК Героев", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие главной страницы, проверка title-заголовка страницы в браузере", () => {
    cy.visit('https://kvartal-geroev.ru/', { timeout: 90000 }) // увеличен тайм-аут открытия страницы до 90 секунд, за 60 секунд не всегда успевает прогрузиться
    cy.title().should('eq', 'ЖК «Героев»') // проверка title-заголовка страницы
    cy.get('.general_cookies_popup__btn').click() // закрытие уведомления "Мы используем файлы cookie." нажатием на кнопку ОК
  })

  it("Мета-теги и линки страницы в head: icon, preload, keywords, description, stylesheet", () => {
    cy.get('link[rel="icon"]')
      .should('have.attr', 'href', '/favicon.ico')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    cy.get('link[rel="shortcut icon"]')
      .should('have.attr', 'href', '/favicon.ico')
    cy.get('link[rel="preload"]')
      .eq(0)
      .should('have.attr', 'href', '/fonts/Acrom-Bold.woff2')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    cy.get('link[rel="preload"]')
      .eq(1)
      .should('have.attr', 'href', '/fonts/Acrom-Regular.woff2')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    cy.get('link[rel="preload"]')
      .eq(2)
      .should('have.attr', 'href', '/fonts/Acrom-Medium.woff2')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    cy.get('link[rel="preload"]')
      .eq(3)
      .should('have.attr', 'href', '/fonts/icomoon.woff2?mok0eb')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    cy.get('meta[name="keywords"]').should('have.attr', 'content', 'квартиры в железнодорожном, купить квартиру в железнодорожном, новостройки в железнодорожном, железнодорожный жилье, квартиры железнодорожный московская, купить квартиру в железнодорожном районе')
    cy.get('meta[name="description"]').should('have.attr', 'content', 'ЖК «Героев» – это не просто дома с квартирами, а современный комплекс, где жители могут встречаться в парке или уютном дворе, провожать детей в садики и школы и собираться в гостях друг у друга в квартирах с просторными кухнями-гостиными.')
    cy.get('link[rel="stylesheet"]')
      .should('have.attr', 'href', '/css/app.css?1672218705653577')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
  })
  
  it("Хэдер", () => {
    cy.get('header').within(() => {
      cy.get('.open-popup')
        .should('have.attr', 'href', '#panorama-popup')
        .and('contain.text', 'Панорама')
      // cy.get('.h-tel-link')
        // .should('have.attr', 'href', 'tel:+74954077838')
      cy.get('.hamburger')
        .should('have.attr', 'href', '#')
        .and('contain.text', 'Меню')
    })
  })

  it("Главный слайдер/рендер", () => {
    cy.get('.main-slider2').within(() => {
      cy.get('.main-slider2__btn') // кнопка Выбрать квартиру на главном рендере
        // .should('have.attr', 'onclick', 'ym(56742424,'reachGoal','posmotret-kvartiry-main-slide-click');') // цели Яндекс-метрики
        .should('have.attr', 'href', '/realty/') // по клику на кнопку открывается раздел Выбрать на генплане
    })
  })

  it("Блок В ипотеку — просто", () => {
    cy.get('.section')
      .eq(1) // второй блок section на главной странице
      .scrollIntoView() // подскролл к блоку
      .within(() => {
        cy.get('h3')
          .should('contain.text', 'В ипотеку — просто')
    })
    cy.get('.mortgage__filter').within(() => {
      cy.get('.mortgage__field').eq(0).within(() => {
        cy.get('.mortgage__label')
          .should('contain.text', 'Ипотечная программа')
        cy.get('.mortgage__field-select-all')
          .should('contain.text', 'Все программы')
      })
      cy.get('.mortgage__field').eq(1).within(() => {
        cy.get('.mortgage__label')
          .should('contain.text', 'Стоимость квартиры,')
      })
      cy.get('.mortgage__field').eq(2).within(() => {
        cy.get('.mortgage__label')
          .should('contain.text', 'Первоначальный взнос,')
      })
      cy.get('.mortgage__field').eq(3).within(() => {
        cy.get('.mortgage__label')
          .should('contain.text', 'Срок ипотеки')
      })
    })
  })

  it("Блок Современный жилой комплекс", () => {
    cy.get('.genplan--main').scrollIntoView().within(() => {
      cy.get('h3')
        .should('contain.text', 'Современный жилой комплекс')
      cy.get('.desc')
        .should('contain.text', 'Корпуса с зеленой плашкой — готовы, а квартиры в них уже с отделкой,', 'расставляйте мебель, знакомьтесь с соседями и живите!')
      cy.get('#genplan-img')
        .should('have.attr', 'src', '/img/genplan_new2.jpg')
    })
  })

  it("Блок Квартиры на любой вкус", () => {
    cy.get('.section')
      .eq(3) // четвертый блок section на главной странице
      .scrollIntoView() // подскролл к блоку
      .within(() => {
        cy.get('h3')
          .should('contain.text', 'Квартиры  на любой  вкус')
        cy.get('.desc')
          .should('contain.text', 'Продуманные планировки классического и евроформата:')
          .and('contain.text', 'Угловое остекление в квартирах. Очень много света и панорамы города.')
          .and('contain.text', 'Отдельные гардеробные даже в однокомнатных квартирах. Больше никаких разбросанных по дому вещей!')
          .and('contain.text', 'Коридор не съедает полезную площадь. В нем предусмотрена ниша для встроенного шкафа.')
          .and('contain.text', 'Кухни-гостиные для ужинов всей семьей каждый день.')
          .and('contain.text', 'Разнесенные спальни. Можно шуметь по ночам, и это никому не помешает.')
          .and('contain.text', 'Корзины для кондиционеров. Фасад всегда будет выглядеть аккуратно.')
        cy.get('.btn_pink')
          .should('have.attr', 'href', '/realty/flats/') // страница Выбрать по параметрам
          .and('contain.text', 'посмотреть квартиры')
    })
  })

  it("Блок Рядом с Москвой", () => {
    cy.get('.section')
      .eq(4) // пятый блок section на главной странице
      .scrollIntoView() // подскролл к блоку
      .within(() => {
        cy.get('h3')
          .should('contain.text', 'Рядом с Москвой')
        cy.get('.location-sidebar__content').within(() => {
          cy.get('.location-sidebar__title')
            .should('contain.text', 'Героев не пугают расстояния. Они за экологию.')
          cy.get('.location-sidebar__text')
            .should('contain.text', 'ЖК «Героев» расположен в микрорайоне Железнодорожный в Балашихе. Рядом Ольгинский лесопарк – прекрасное место для семейных прогулок, пробежек и заездов на велосипеде. При этом от комплекса до Москвы можно быстро доехать несколькими способами:')
          cy.get('.location-sidebar__list').within(() => {
            cy.get('.location-sidebar__item_pink').within(() => {
              cy.get('#mcd1')
                .should('contain.text', 'До Курского вокзала от станции', '«Железнодорожная»', '23 минуты на «Спутнике»')
              cy.get('.text-sub')
                .should('contain.text', 'до станции «Железнодорожная»', '1,8 км. прогуляться пешком', 'или 5-7 мин. на транспорте')
              cy.get('h4')
                .should('contain.text', 'В', '2023 году', 'в', 'Железнодорожном', 'откроется линия')
                .within(() => {
                  cy.get('a')
                    .should('have.attr', 'href', 'https://mcd.mosmetro.ru/mcd-4/')
                    .and('have.attr', 'target', '_blank')
                    .within(() => {
                      cy.get('.text-orange')
                        .should('contain.text', 'МЦД-4')
                  })
              })
              cy.get('#d4-jel')
                .should('contain.text', 'До станции Железнодорожная')
              cy.get('#mkad')
                .should('contain.text', 'До МКАД на машине:', 'по Носовихинскому шоссе')
              cy.get('#mkad-1')
                .should('contain.text', 'До МКАД на машине:', 'по Косинскому шоссе')
              cy.get('#novocos')
                .should('contain.text', 'До метро «Новокосино»')
              cy.get('#novogir')
                .should('contain.text', 'До метро «Новогиреево»')
            })
            cy.get('.location-sidebar__item_blue').within(() => {
              cy.get('#jel')
                .should('contain.text', 'До метро и МЦК «Нижегородская»')
              cy.get('h4')
                .eq(1)
                .should('contain.text', 'До метро «Новокосино»', 'И «Новогиреево»')
              cy.get('#metro-necr')
                .should('contain.text', 'До метро «Некрасовка»')
            })
            cy.get('.location-sidebar__item_grey').within(() => {
              cy.get('h4')
                .should('contain.text', 'ДО МКАД на машине:')
              cy.get('.location-after')
                .eq(0)
                .should('contain.text', 'по Носовихинскому шоссе')
              cy.get('.location-after')
                .eq(1)
                .should('contain.text', 'по Косинскому шоссе')
            })
          })
        })
    })
  })

  it("Блок Способы покупки", () => {
    cy.get('.section_lg-offsetBottom').scrollIntoView().within(() => {
      cy.get('h3')
        .should('contain.text', 'Способы покупки')
      cy.get('.purchase__item')
        .eq(0)
        .should('have.attr', 'href', '/buy/#mothercapital-popup')
        .within(() => {
          cy.get('.purchase__item__name')
            .should('contain.text', 'Материнский капитал')
      })
      cy.get('.purchase__item')
        .eq(1)
        .should('have.attr', 'href', '/buy/#familymortgage-popup')
        .within(() => {
          cy.get('.purchase__item__name')
            .should('contain.text', 'Семейная ипотека')
      })
      cy.get('.link_default')
        .should('have.attr', 'href', '/buy/') // страница Как купить
        .and('contain.text', 'Посмотреть все варианты')
    })
  })

  it("Блок Контакты", () => {
    cy.get('.section')
      .eq(6) // седьмой блок section на главной странице
      .scrollIntoView() // подскролл к блоку
      .within(() => {
        cy.get('h3')
          .should('contain.text', 'Контакты')
        cy.get('.location-sidebar__content').within(() => {
          cy.get('.location-sidebar__title')
            .should('contain.text', 'Контакты')
          cy.get('.location-sidebar__text')
            .should('contain.text', 'Квартиру можно купить')
            .within(() => {
              cy.get('.location-sidebar__href')
                .eq(0)
                .should('have.attr', 'href', '/buy/') // страница Как купить
                .and('contain.text', 'онлайн')
              cy.contains('Офис расположен по адресу:').within(() => {
                cy.get('a')
                  .should('have.attr', 'href', 'https://yandex.ru/maps/10716/balashiha/?ll=38.033302%2C55.739830&mode=routes&rtext=~55.739864%2C38.029377&rtt=auto&ruri=~&z=15')
                  .and('have.attr', 'target', '_blank')
                  .and('contain.text', 'г. Балашиха, мкрн. Саввино,', 'ул. Калинина, 8 (ЖК «Столичный»)')
              })
              cy.contains('GPS: 55.739863, 38.029378')
                .should('have.attr', 'href', 'https://yandex.ru/maps/10716/balashiha/house/ulitsa_kalinina_8/Z0EYdgVpSkIPQFtvfXtyeHRlZw==/?ll=38.029880%2C55.739881&z=16')
                .and('have.attr', 'target', '_blank')
          })
          cy.get('.location-sidebar__actions').within(() => {
            cy.get('.btn_blue')
              .should('have.attr', 'href', '#callback-popup') // попап Оставьте номер телефона, и мы вам перезвоним
              .and('contain.text', 'заказать звонок')
          })
        })
    })
  })

  it("Футер", () => {
    cy.get('footer').scrollIntoView().within(() => {
      cy.get('.footer__row').eq(0).within(() => {
        cy.get('.footer__copyright').within(() => {
          cy.get('.logo')
            .should('have.attr', 'href', '/')
            .within(() => {
              cy.get('img')
                .should('have.attr', 'src', '/img/logoSlide.svg')
          })
          cy.get('span').should('contain.text', '2022 © Жилой комплекс «Героев»')
        })
        cy.get('.footer__details').eq(0).within(() => {
          cy.get('a')
            .eq(0)
            .should('have.attr', 'href', '/policy/') // ссылка на Политику конфиденциальности
            .and('have.attr', 'target', '_blank')
            .and('contain.text', 'Политика конфиденциальности')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
          cy.get('a')
            .eq(1)
            .should('have.attr', 'href', '/agreement/') // ссылка на Соглашение на обработку персональных данных
            .and('have.attr', 'target', '_blank')
            .and('contain.text', 'Соглашение на обработку персональных данных')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
        })
        cy.get('.footer__details').eq(1).within(() => {
          cy.get('p')
            .should('contain.text', 'Другие проекты')
          cy.get('a')
            .should('have.attr', 'href', 'https://100lichny.ru/') // сайт ЖК «Столичный»
            .and('have.attr', 'target', '_blank')
            .and('contain.text', 'ЖК «Столичный»')
        })
        cy.get('.social').within(() => {
          cy.get('.social_link')
            .eq(0)
            .should('have.attr', 'href', 'https://vk.com/kvartalgeroev') // ссылка на группу вКонтакте
            .and('have.attr', 'target', '_blank')
            .within(() => {
              cy.get('img')
                .should('have.attr', 'src', '/img/vk-icon.svg?3')
          })
          cy.get('.social_link')
            .eq(1)
            .should('have.attr', 'href', 'https://t.me/geroev_kvartal') // ссылка на паблик в Telegram
            .and('have.attr', 'target', '_blank')
            .within(() => {
              cy.get('img')
                .should('have.attr', 'src', '/img/tg-icon.svg?3')
          })
          cy.get('.social_link_text')
            .should('contain.text', 'Присоединяйтесь')
        })
      })
      cy.get('.footer__row').eq(1).within(() => {
        cy.get('.footer__info')
          .should('contain.text', 'Информация по', 'проекту, варианты отделки, оборудования и', 'другие детали, представленные на рендерах и', 'сайте, могут отличаться от','финального проекта, поскольку данная информация носит исключительно информационный характер и', 'не', 'является публичной офертой. Все спецификации будут указаны в', 'договоре долевого участия.')
        cy.get('.mobile-hidden')
          .should('contain.text', 'Сделано в')
          .within(() => {
            cy.get('a')
              .should('have.attr', 'href', 'http://www.amio.ru/') // сайт AMIO
              .and('have.attr', 'target', '_blank')
              .and('contain.text', 'A M I O')
        })
      })
      cy.get('.mobile-visible')
        .should('contain.text', 'Сделано в')
        .within(() => {
          cy.get('a')
            .should('have.attr', 'href', 'http://www.amio.ru/') // сайт AMIO
            .and('have.attr', 'target', '_blank')
            .and('contain.text', 'A M I O')
      })
    })  
  })
  
  it("Проверка попапов на главной странице", () => {
    cy.get('.mfp-hide').within(() => {
      cy.get('#ip-programm').within(() => { // попап "Ипотечные программы"
        cy.get('.popup__message')
          .should('contain.text', 'Ипотечные программы')
      })
      cy.get('#booking1') // попап "Вы не выбрали квартиру"
      cy.get('#booking_error-sig') // попап "Нужна твоя подпись"
      cy.get('#booking_error') // попап "Повторите запрос снова"
      cy.get('#booking_error_dinamic') // попап "Ошибка"
      cy.get('#callback-popup') // попап "Оставьте номер телефона, и мы вам перезвоним"
      cy.get('#panorama-popup') // попап "Панорама 360"
      cy.get('#sucess-popup') // попап "Мы вам перезвоним в самое ближайшее время."
      cy.get('#error-popup') // попап "Попробуйте ещё раз."
      cy.get('#calc-popup') // попап "Ипотечный калькулятор"
    })
  })

  it("Проверка куки-попапов на главной странице", () => {
    cy.get('.general_cookies_popup').within(() => {
      cy.get('.general_cookies_popup__text')
        .should('contain.text', 'Мы используем файлы cookie.')
        .within(() => {
          cy.get('a')
            .should('have.attr', 'href', '/policy/')
            .and('have.attr', 'target', '_blank')
            .and('contain.text', 'Политика конфиденциальности')
          cy.get('.general_cookies_popup__btn')
            .should('contain.text', 'ОK')
      })
    })
  })
})