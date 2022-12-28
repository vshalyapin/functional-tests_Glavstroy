import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов на главной странице вебсайта ЖК Столичный", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие главной страницы, проверка title-заголовка страницы в браузере", () => {
    cy.visit('https://100lichny.ru/', { timeout: 90000 }) // увеличен тайм-аут открытия страницы до 90 секунд, за 60 секунд не всегда успевает прогрузиться
    cy.title().should('eq', 'ЖК «Столичный»') // проверка title-заголовка страницы
    cy.get('.general_cookies_popup__btn').click() // закрытие уведомления "Мы используем файлы cookie." нажатием на кнопку ОК
  })

  it("Мета-теги и линки страницы в head: icon, description, Open Graph (og), keywords, stylesheet", () => {
    cy.get('link[rel="shortcut icon"]')
      .should('have.attr', 'href', '/img/favicon.ico')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    cy.get('meta[name="description"]').eq(0)
    cy.get('meta[property="og:title"]')
    cy.get('meta[property="og:description"]')
    cy.get('meta[property="og:image"]')
    cy.get('meta[name="keywords"]').should('have.attr', 'content', 'Столичный')
    cy.get('meta[name="description"]').eq(1).should('have.attr', 'content', 'Квартиры в новостройке с отделкой. ЖК «Столичный» в 30 минутах общественным транспортом от Москвы. Готовая инфраструктура, узнайте подробности.')
  })
  
  it("Хэдер", () => {
    cy.get('header').within(() => {
      cy.get('.header__content').within(() => {
        cy.get('.links-list').within(() => {
          cy.get('.links-list__item').eq(0).within(() => {
            cy.get('.link__icon') // иконка "телефона"
              .within(() => {
                cy.get('img')
                  .should('have.attr', 'src', '../img/icon_call_main.svg')
            })
          })
          cy.get('.links-list__item').eq(1).within(() => {
            cy.get('.link')
              .should('have.attr', 'href', '/about/aero/') // Панорама 360
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
            cy.get('.link__text').should('contain.text', 'панорама')
            cy.get('.h_pan_icon').should('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
          })
        })
        cy.get('.header__hamburger').within(() => {
          cy.get('button').within(() => {
            cy.get('.hamburger-label').should('contain.text', 'меню')
          })
        })
      })
    })
  })

  it("Главный слайдер/рендер", () => {
    cy.get('.main-slider2').within(() => {
      cy.get('.main-slider2__btn') // кнопка Выбрать квартиру на главном рендере
        .should('have.attr', 'href', '/realty/flats/') // по клику на кнопку открывается раздел Выбрать на генплане
    })
  })

  it("Блок В ипотеку — просто", () => {
    cy.get('.section-mort')
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
        .should('contain.text', 'Динамичный жилой квартал')
      cy.get('.desc')
        .should('contain.text', 'Корпуса с зеленой плашкой — готовы, а квартиры в них уже с отделкой,', 'расставляйте мебель, знакомьтесь с соседями и живите!')
      cy.get('.genplan')
        .find('.genplan-img')
        .should('have.attr', 'src', '/img/gplan-north.jpg') // изображение Генплана
    })
  })

  it("Блок Квартиры на любой вкус", () => {
    cy.get('.section')
      .eq(3) // четвертый блок section на главной странице
      .scrollIntoView() // подскролл к блоку
      .within(() => {
        cy.get('h3')
          .should('contain.text', 'Квартиры на любой вкус')
        cy.get('.desc')
          .should('contain.text', 'Продуманные планировки классического и евроформата:')
        cy.get('.apartments__actions > .btn')
          .should('have.attr', 'href', '/realty/flats/') // страница Выбрать по параметрам
          .and('contain.text', 'Посмотреть квартиры')
    })
  })

  it("Блок Рядом с Москвой", () => {
    cy.get('.section')
      .eq(4) // пятый блок section на главной странице
      .scrollIntoView()
      .within(() => {
        cy.get('h3')
          .should('contain.text', 'Расположение')
        cy.get('.location-sidebar__content').within(() => {
          cy.get('.location-sidebar__title')
            .should('contain.text', 'Мы за экологию')
          cy.get('.location-sidebar__text')
            .should('contain.text', 'ЖК', '«Столичный» — расположен в', 'окружении Саввинских прудов и', 'Пестовского парка, которые вместе с', 'благоустроенной территорией комплекса образуют единый ландшафтно-парковый ансамбль площадью более 90', 'га. При', 'этом добраться от', 'комплекса до', 'столицы можно быстро и', 'несколькими способами: ')
          cy.get('.location-sidebar__list').within(() => {
            cy.get('.location-sidebar__item_pink').within(() => {
              cy.get('#mcd1')
                .should('contain.text', 'До Курского вокзала от станции', '«Железнодорожная»', '23 минуты на «Спутнике»')
              cy.get('.text-sub')
                .should('contain.text', 'до станции «Железнодорожная»', '1,8 км. прогуляться пешком ', 'или 5-7 мин. на транспорте')
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

  it("Блок Новости", () => {
    cy.get('.section')
      .eq(5) // шестой блок section на главной странице
      .scrollIntoView() // подскролл к блоку
      .within(() => {
      cy.get('h3')
        .should('contain.text', 'Новости')
      cy.get('.newsBlock__actions > .btn') // кнопка Все новости
        .should('have.attr', 'href', '/news/')
        .and('contain.text', 'Все новости')
    })
  })

  it("Блок Способы покупки", () => {
    cy.get('.section_lg-offsetBottom').scrollIntoView().within(() => {
      cy.get('h3')
        .should('contain.text', 'Способы покупки')
      cy.get('.purchase__item')
        .eq(0)
        .should('have.attr', 'href', '/buy/?switch=pay')
        .within(() => {
          cy.get('.purchase__item__name')
            .should('contain.text', 'Ипотека')
      })
      cy.get('.purchase__item')
        .eq(1)
        .should('have.attr', 'href', '/buy/#familymortgage-popup')
        .within(() => {
          cy.get('.purchase__item__name')
            .should('contain.text', 'Семейная ипотека')
      })
      cy.get('.purchase__item')
        .eq(2)
        .should('have.attr', 'href', '/buy/#mothercapital-popup')
        .within(() => {
          cy.get('.purchase__item__name')
            .should('contain.text', 'Материнский капитал')
      })
      cy.get('.purchase__item')
        .eq(3)
        .should('have.attr', 'href', '/buy/?switch=pay#rasrochka')
        .within(() => {
          cy.get('.purchase__item__name')
            .should('contain.text', 'Рассрочка')
      })
      cy.get('.link_default')
        .should('have.attr', 'href', '/buy/') // страница Как купить
        .and('contain.text', 'Посмотреть все варианты')
    })
  })

  it("Блок Контакты", () => {
    cy.get('.section')
      .eq(7) // седьмой блок section на главной странице
      .scrollIntoView() // подскролл к блоку
      .within(() => {
        cy.get('h3')
          .should('contain.text', 'Контакты')
        cy.get('.location-sidebar__content').within(() => {
          cy.get('.location-sidebar__title')
            .should('contain.text', 'Контакты')
          cy.get('.location-sidebar__text')
            // .should('contain.text', 'тел.: +7 (495) 126-67-17',  'E-mail: myhome@glavstroy.ru', 'График работы офиса', 'с 9-00 до 21-00 ежедневно, без выходных')
            .within(() => {
              cy.get('a')
                .eq(0)
                .should('have.attr', 'href', 'https://yandex.ru/maps/-/CCUMVMh~wB') // расположение Столичного в Яндекс Картах
                .and('have.attr', 'target', '_blank')
                .and('contain.text', 'г.', 'Балашиха, мкрн. Саввино, ул.', 'Калинина,', '8.')
          })
          cy.get('.location-sidebar__actions > .open-popup')
            .should('have.attr', 'href', '#callback-popup') // попап Укажите свой номер телефона, и мы вам перезвоним
            .and('contain.text', 'Заказать звонок')
        })
    })
  })

  it("Футер", () => {
    cy.get('footer').scrollIntoView().within(() => {
      cy.get('.footer__row').within(() => {
        cy.get('.footer__copyright').within(() => {
          cy.get('img')
            .should('have.attr', 'src', '/img/logoSlide.svg')
        })
        cy.get('.footer__details').eq(0).within(() => {
          cy.get('a')
            .eq(0)
            .should('have.attr', 'href', '/img/files/policy.pdf?t=1') // ссылка на Политику конфиденциальности
            .and('have.attr', 'target', '_blank')
            .and('contain.text', 'Политика конфиденциальности')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
          cy.get('a')
            .eq(1)
            .should('have.attr', 'href', '/img/files/soglasie.pdf?t=1') // ссылка на Соглашение на обработку персональных данных
            .and('have.attr', 'target', '_blank')
            .and('contain.text', 'Соглашение на обработку персональных данных')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
        })
        cy.get('.footer__details').eq(1).within(() => {
          cy.get('.footer__details__item')
            .should('contain.text', 'Другие проекты')
            .find('a')
            .should('have.attr', 'href', 'https://kvartal-geroev.ru/') // сайт ЖК Героев
            .and('have.attr', 'target', '_blank')
        })
        cy.get('.footer__developer')
          .should('contain.text', 'Сделано в ')
          .within(() => {
            cy.get('a')
              .should('have.attr', 'href', 'https://www.amio.ru/') // сайт AMIO
              .and('have.attr', 'target', '_blank')
              .and('contain.text', 'A M I O')
        })
      })
    })
  })
  
  it("Проверка попапов на главной странице", () => {
    cy.get('.mfp-hide').within(() => {
      cy.get('#ip-programm').within(() => { // попап "Ипотечные программ"
        cy.get('.popup__message')
          .should('contain.text', 'Ипотечные программы')
      })
      cy.get('#partners-popup') // попап "Наши награды"
      cy.get('#booking1') // попап "Выбор квартиры в каталоге"
      cy.get('#booking2') // попап "Расчет ипотеки"
      cy.get('#booking_error') // попап "Повторите запрос снова"
      cy.get('#booking_error-sig') // попап "Нужна твоя подпись"
      cy.get('#booking_error_dinamic') // попап "Ошибка"
      cy.get('#callback-popup') // попап "Укажите свой номер телефона и мы вам перезвоним"
      cy.get('#panorama-popup') // попап "Панорама 360"
      cy.get('#sucess-popup') // попап "Мы вам перезвоним в самое ближайшее время."
      cy.get('#error-popup') // попап "Попробуйте ещё раз."
    })
  })

  it("Проверка куки-попапов на главной странице", () => {
    cy.get('.general_cookies_popup').within(() => {
      cy.get('.general_cookies_popup__text')
        .should('contain.text', 'Мы используем файлы cookie.')
        .within(() => {
          cy.get('a')
            .should('have.attr', 'href', '/img/files/policy.pdf?t=1')
            .and('have.attr', 'target', '_blank')
            .and('contain.text', 'Политика конфиденциальности')
          cy.get('.general_cookies_popup__btn')
            .should('contain.text', 'ОK')
      })
    })
  })
})