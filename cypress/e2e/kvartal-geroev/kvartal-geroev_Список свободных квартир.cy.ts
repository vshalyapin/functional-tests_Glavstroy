import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов на странице Список свободных квартир ЖК Героев", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие страницы Список свободных квартир, проверка title-заголовка страницы в браузере", () => {
    cy.visit('https://kvartal-geroev.ru/realty/flats/', { timeout: 90000 }) // увеличен тайм-аут открытия страницы до 90 секунд, за 60 секунд не всегда успевает прогрузиться
    cy.title().should('eq', 'Квартал Героев - Квартиры') // проверка title-заголовка страницы
    cy.get('.general_cookies_popup__btn').click() // закрытие уведомления "Мы используем файлы cookie." нажатием на кнопку ОК
  })

  it("Заголовок страницы", () => {
    cy.get('h3') // заголовок страницы в десктопе
      .eq(0)
      .should('have.attr', 'class', 'view-desc')
      .and('contain.text', 'Выбрать по параметрам')
    cy.get('h3') // заголовок страницы в мобильной версии
      .eq(1)
      .should('have.attr', 'class', 'view-mob')
      .and('contain.text', 'Свободные квартиры')
    cy.get('.breadcrumbs__element') // хлебные крошки
      .eq(0)
      .should('have.attr', 'href', '/')
      .and('contain.text', 'Главная')
    cy.get('.breadcrumbs__element')
      .eq(1)
      .should('have.attr', 'href', '/realty/')
      .and('contain.text', 'Квартиры')
    cy.get('.breadcrumbs__element')
      .eq(2)
      .and('contain.text', 'Выбрать по параметрам')
    cy.get('.btn_pink')
      .should('have.attr', 'href', '/realty/')
      .and('contain.text', 'выбрать на генплане')
  })

  it("Блок фильтра подбора квартир", () => {
    cy.get('.controls-head__title') // заголовок в мобильной версии
      .should('contain.text', 'Выбрать', 'по параметрам')
    cy.get('.filters__ipoteka-toggle') // выпадающее меню Ипотечная программа
      .should('contain.text', 'Ипотечная программа')
    cy.get('.filters__ipoteka-title')
      .should('contain.text', 'Выбрать', 'ипотечную программу') // заголовок в мобильной версии
    cy.get('.filters_rooms > .filters__label') // фильтр по количеству комнат
      .should('contain.text', 'Количество комнат')
    cy.get('.controls__col').within(() => {
      cy.get('label') // чекбокс Готовые квартиры
        .should('contain.text', 'Готовые квартиры')
    })
    cy.get('.filters_sm > .filters__label') // фильтр по корпусу
      .should('contain.text', 'Корпус', '(выдача ключей)')
    cy.get('.controls__group_sm > .filters__label') // ползунок фильтра по этажу
      .eq(0)
      .should('contain.text', 'Этаж')
    cy.get('.controls__group_sm > .filters__label') // ползунок фильтра по площади
      .eq(1)
      .should('contain.text', 'Площадь, м', '2')
    cy.get('.filters__price-tabs').within(() => {
      cy.get('.active') // ползунок фильтра по цене на квартиру (активный)
        .should('have.attr', 'data-tab', 'price')
        .within(() => {
          cy.get('.filters__label')
            .should('contain.text', ' Цена,', 'за квартиру')
      })
      cy.get('.tabs__nav__item') // ползунок фильтра по цене за кв.метр
        .eq(1)
        .should('have.attr', 'data-tab', 'meterPrice')
        .within(() => {
          cy.get('.filters__label')
            .should('contain.text', 'за метр')
      })
    })
    cy.get('.reset-params') // кнопка Сбросить фильтр
      .should('contain.text', 'Сбросить фильтр')
    cy.get('.controls-bottom') // подвал шторки с фильтрами в мобильной версии
      .within(() => {
        cy.get('.btn_pink ')
          .should('contain.text', 'найти квартиры')
        cy.get('.reset-params')
          .should('contain.text', 'Сбросить фильтр')
    })
  })

  it("Заголовок с количеством свободных квартир и переключатель отображения квартир списком/плиткой", () => {
    cy.get('.section-aparts').within(() => {
      cy.get('#apartments-count')
        .should('contain.text', 'с такими параметрами')
        .within(() => {
          cy.get('.link_anchor_table')
            .should('have.attr', 'href', '#table-flats')
      })
      cy.get('.section__view').within(() => {
        cy.get('.btn__view_grid') // кнопка переключения отображения квартир плиткой
          .should('have.class', 'active')
        cy.get('.btn__view_rows') // кнопка переключения отображения квартир списком
      })
    })
  })
    
  it("Отображение карточек квартир списком", () => {
    cy.get('.btn__view_rows').click() // переключение на отображение карточек квартир списком
    cy.get('#table-flats')
      .should('have.attr', 'style', 'visibility: visible; animation-name: fadeInUpBig;')
      .within(() => {
        cy.get('.apartments__view_row')
          // .and('have.attr', 'style', 'display: none;') // This element is not visible
          .within(() => {
            cy.get('thead tr').within(() => { // заголовки столбцов
              cy.get('td')
                .eq(1)
                .should('have.attr', 'data-sorting', 'number') // сортировка по номеру квартиры
                .within(() => {
                  cy.get('.mobile-hidden').should('contain.text', '№')
                  cy.get('.mobile-visible').should('contain.text', '№')
              })
              cy.get('td')
                .eq(2)
                .should('have.attr', 'data-sorting', 'building') // сортировка по номеру корпуса 
                .within(() => {
                  cy.get('.mobile-hidden').should('contain.text', 'Корпус')
                  cy.get('.mobile-visible').should('contain.text', 'Корпус')
              })
              cy.get('td')
                .eq(3)
                .should('have.attr', 'data-sorting', 'rooms') // сортировка по количеству комнат
                .within(() => {
                  cy.get('.mobile-hidden').should('contain.text', 'Комнат')
                  cy.get('.mobile-visible').should('contain.text', 'Комнат')
              })
              cy.get('td')
                .eq(4)
                .should('have.attr', 'data-sorting', 'floor') // сортировка по номеру этажа
                .within(() => {
                  cy.get('.mobile-hidden').should('contain.text', 'Этаж')
                  cy.get('.mobile-visible').should('contain.text', 'Этаж')
              })
              cy.get('td')
                .eq(5)
                .should('have.attr', 'data-sorting', 'area') // сортировка по площади
                .within(() => {
                  cy.get('.mobile-hidden').should('contain.text', 'Площадь')
                  cy.get('.mobile-visible').should('contain.text', 'Площадь')
              })
              cy.get('td')
                .eq(6)
                .should('have.class', 'td-price') // сортировка по стоимости
                .within(() => {
                  cy.get('.mobile-hidden').should('contain.text', 'Стоимость')
                  cy.get('.mobile-visible').should('contain.text', 'Стоимость, млн')
              })
              cy.get('td')
                .eq(7)
                .should('have.class', 'td-price-month') // сортировка по месячному платежу
                .within(() => {
                  cy.get('.mobile-hidden').should('contain.text', 'Месячный платёж,')
                  cy.get('.mobile-visible').should('contain.text', 'Месячный', 'платеж, тыс.')
              })
              cy.get('td')
                .eq(8)
                .should('have.class', 'td-keys-text') // сортировка по сроку выдачи ключей
                .within(() => {
                  cy.get('.mobile-hidden').should('contain.text', 'Выдача ключей')
                  cy.get('.mobile-visible').should('contain.text', 'Выдача ключей')
              })
              cy.get('td') // колонка с иконками PDF для скачивания планировок квартир
                .eq(9)
                .within(() => {
                  cy.get('.mobile-hidden').should('contain.text', 'PDF')
                  cy.get('.mobile-visible').should('contain.text', 'PDF')
              })
            })
        })
    })
  })
        
  it("Отображение карточек квартир плиткой", () => {
    cy.get('#table-flats')
      .find('.apartments__view_grid')
      // .should('have.attr', 'style', 'display: block;') // This element is not visible - требуется доработать код, чтобы проверить атрибут style скрытого элемента 
      .within(() => {
        cy.get('.sorting').within(() => { // панель сортировки квартир
          cy.get('.sorting__title')
            .should('contain.text', 'Сортировать:')
          cy.get('.sorting__link') // сортировка по стоимости
            .eq(0)
            .should('have.attr', 'data-sorting', 'price')
            .within(() => {
              cy.get('.view-desc')
                .should('contain.text', 'по стоимости')
          })
          cy.get('.sorting__link') // сортировка по площади
            .eq(1)
            .should('have.attr', 'data-sorting', 'area')
            .within(() => {
              cy.get('.view-desc')
                .should('contain.text', 'по площади')
          })
          cy.get('.sorting__link') // сортировка по сроку сдачи
            .eq(2)
            .should('have.class', 'active')
            .and('have.attr', 'data-sorting', 'period')
            .within(() => {
              cy.get('.view-desc')
                .should('contain.text', 'по сроку сдачи')
          })
        })
        cy.get('.apartments__list').within(() => {
          cy.get('.apartments__item') // проверяем работоспособность ссылок на карточки квартир
            .should('have.attr', 'href')
          //   .then(link => {
          //     cy.request(link.prop('href')).its('status').should('eq', 200) // link.prop is not a function
          // })
          cy.get('.apartments__item').within(() => { // проверяем обязательные элементы в карточках всех квартир
            cy.get('.apartments__item__title') // заголовок карточки квартиры, например, "3 комн. евро 51.2 м"
            cy.get('.i_pdf') // иконка PDF для загрузки планировки квартиры
              .should('have.attr', 'data-href')
            cy.get('.apartments__item__img') // изображение планировки квартиры
              .find('img')
              .should('have.attr', 'src')
            //   .then(link => {
            //     cy.request(link.prop('src')).its('status').should('eq', 200) // link.prop is not a function
            // })
            cy.get('.apartments__features').within(() => {
              cy.get('.apartments__features__label') // этаж квартиры
                .eq(0)
                .should('contain.text', 'Этаж')
              cy.get('.apartments__features__label') // корпус квартиры
                .eq(1)
                .should('contain.text', 'Корпус')
            })
            cy.get('.apartments__item__cost') // стоимость квартиры
              .should('contain.text', 'Стоимость')
              .find('.rub')
              .should('contain', 'i')
            cy.get('.apartments__features-ipoteka') // скрытый расчет по ипотеке (отображается при выборе ипотечной программы)
              .should('have.class', 'hidden')
              .within(() => {
                cy.get('.apartments__features-ipoteka-initial').within(() => {
                  cy.get('.apartments__features__label') // первый взнос по ипотеке
                    .should('contain.text', 'Первый взнос')
                  cy.get('.apartments__features__value') // сумма первого взноса, проверка отображения символа ₽
                    .should('contain.text', '₽')
                })
                cy.get('.apartments__features-ipoteka-month').within(() => {
                  cy.get('.apartments__features__label') // ежемесячный платеж по ипотеке
                    .should('contain.text', 'Платеж в месяц')
                  cy.get('.apartments__features__value') // сумма ежемесячного платежа по ипотеке, проверка отображения символа ₽
                    .should('contain.text', '₽')
                })
            })
            cy.get('.apartments__item__actions') // кнопка подробнее в каждой карточке квартиры
              .find('.btn')
              .should('contain.text', 'подробнее')
          })
          cy.get('.ready_status').within(() => { // карточки готовых квартир дополнительно содержат
            cy.get('.ready_flat_block') // плашку "Готовая квартира с ключами"
              .should('contain.text', 'Въезжай и', 'живи!')
              .within(() => {
                cy.get('.mobile-hidden')
                  .should('contain.text', 'Готовая квартира с', 'ключами')
                cy.get('.mobile-visible')
                  .should('contain.text', 'Готовая квартира', 'с', 'ключами и', 'отделкой')
            })
          })
          cy.get('a[class="apartments__item"]').within(() => { // в карточках еще не готовых квартир отображаются
            cy.get('.apartments__features__label') // поле Выдача ключей
              .eq(2)
              .should('contain.text', 'Выдача ключей')
          })
        })
    })
    cy.get('.apartments__actions').within(() => {
      cy.get('#load-more') // кнопка Показать еще в конце списка квартир
        .should('have.class', 'btn')
        .and('have.attr', 'href', './')
        .and('contain.text', 'Показать еще')
    })
  })
})