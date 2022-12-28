import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов на странице Список свободных квартир ЖК Столичный", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие страницы Список свободных квартир, проверка title-заголовка страницы в браузере", () => {
    cy.visit('https://100lichny.ru/realty/flats/', { timeout: 90000 }) // увеличен тайм-аут открытия страницы до 90 секунд, за 60 секунд не всегда успевает прогрузиться
    cy.title().should('eq', 'Цены на квартиры ЖК «Столичный» в Железнодорожном') // проверка title-заголовка страницы
    cy.get('.general_cookies_popup__btn').click() // закрытие уведомления "Мы используем файлы cookie." нажатием на кнопку ОК
  })

  it("Заголовок страницы", () => {
    cy.get('h3') // заголовок страницы в десктопе
      .should('contain.text', 'Свободные квартиры')
    cy.get('.bth_howtobuy')
      .should('have.attr', 'href', '/buy/')
      .and('contain.text', 'Как купить квартиру')
    cy.get('.btn')
      .should('have.attr', 'href', '/realty/')
      .and('contain.text', 'Выбрать на генплане')
  })

  it("Блок фильтра подбора квартир", () => {
    cy.get('.filters__ipoteka-toggle') // выпадающее меню Ипотечная программа
      .should('contain.text', 'Ипотечная программа')
    cy.get('.filters__ipoteka-title')
      .should('contain.text', 'Ипотечные программы')
    cy.get('.controls__inner').within(() => {
      cy.get('.controls__group') // группа фильтров Количество комнат/Готовые квартиры
        .eq(0)
        .within(() => {
          cy.get('.filters__label') // фильтр по количеству комнат
            .should('contain.text', 'Количество комнат')
            .within(() => {
              cy.get('.filters__ask__icon') // иконка ? у заголовка Количество комнат
                .should('contain.text', '?')
              cy.get('.filters__ask__hint') // подсказка-хинт, отображаемая при наведении курсора на иконку ?
                .should('contain.text', 'В квартирах с европланировкой,', 'одна комната объединена с кухней,', 'образуя единое пространство')
          })
          cy.get('.form__checkbox') // чекбокс Готовые квартиры
            .find('label')
            .should('contain.text', 'Готовые квартиры')
      })
      cy.get('.controls__group') // фильтро по стоимости
        .eq(1)
        .within(() => {
          cy.get('.filters__label') // заголовок Стоимость
            .eq(0)
            .should('contain.text', 'Стоимость,')
          cy.get('.tabs__nav__item') // переключатель за квартиру/за кв. метр
            .eq(0)
            .should('have.class', 'active')
            .and('have.attr', 'data-tab', 'price')
            .find('label')
            .should('contain.text', 'за квартиру')
          cy.get('.tabs__nav__item')
            .eq(1)
            .should('have.attr', 'data-tab', 'meterPrice')
            .find('label')
            .should('contain.text', 'за кв. метр')
      })
      cy.get('.controls__group') // фильтр по площади
        .eq(2)
        .find('.filters__label') // заголовок Площадь кв.м.
        .should('contain.text', 'Площадь, м', '2')
      cy.get('.controls__group') // фильтр по этажу
        .eq(3)
        .find('.filters__label') // заголовок Этаж
        .should('contain.text', 'Этаж')
      cy.get('.controls__hidden') // скрытая группа фильтров Расположение / Срок сдачи (раскрывается по нажатию на кнопку Дополнительные параметры)
        .within(() => {
          cy.get('.controls__group') // фильтр Расположение
            .eq(0)
            .within(() => {
              cy.get('.filters__label')
                .should('contain.text', 'Расположение')
              cy.get('.filters__ask__icon') // иконка ? у заголовка Расположение
                .should('contain.text', '?')
              cy.get('.filters__ask__hint') // подсказка-хинт, отображаемая при наведении курсора на иконку ?
                .should('contain.text', 'Северная часть — многоэтажные дома,', 'южная часть — малоэтажные дома')
              cy.get('.filters__element') // кнопка Северная часть
                .eq(0)
                .should('have.attr', 'data-type', 'side')
                .and('have.attr', 'data-side', 'north')
                .and('contain.text', 'Северная часть')
              cy.get('.filters__element') // кнопка Южная часть
                .eq(1)
                .should('have.attr', 'data-type', 'side')
                .and('have.attr', 'data-side', 'south')
                .and('contain.text', 'Южная часть')
          })
          cy.get('.filter-period-block') // фильтр Срок сдачи
            .find('.filters__label')
            .should('contain.text', 'Срок сдачи')
      })
    })
  })

  it("Заголовок с количеством свободных квартир, сортировка и переключатель отображения квартир списком/плиткой", () => {
    cy.get('.section__head')
      .find('#apartments-count') // заголовок с количеством свободных квартир
      .should('have.class', 'section__text')
      .and('contain.text', 'Найден', 'квартир')
    cy.get('.section__head__right').within(() => { // сортировка и кнопки переключения отображения квартир плиткой/списком
      cy.get('.sorting') // сортировка (только при отображении квартир плиткой)
        .should('have.class', 'apartments__view_grid')
        // .and('have.attr', 'style', 'display: block;') // This element is not visible - требуется доработать код, чтобы проверить атрибут style скрытого элемента 
        .within(() => {
          cy.get('.sorting__title') // заголовок Сортировка
            .should('contain.text', 'Сортировка:')
          cy.get('#sorting-select') // выпадающее меню выбора типа сортировки (скрыто, не отображается)
            .should('have.attr', 'style', 'display: none;')
            .within(() => {
              cy.get('option').eq(0).should('have.attr', 'value', 'period-asc').and('contain.text', 'Выдача ключей раньше')
              cy.get('option').eq(1).should('have.attr', 'value', 'period-desc').and('contain.text', 'Выдача ключей позже')
              cy.get('option').eq(2).should('have.attr', 'value', 'price-asc').and('contain.text', 'Сначала подешевле')
              cy.get('option').eq(3).should('have.attr', 'value', 'price-desc').and('contain.text', 'Сначала подороже')
              cy.get('option').eq(4).should('have.attr', 'value', 'area-asc').and('contain.text', 'По возрастанию площади')
              cy.get('option').eq(5).should('have.attr', 'value', 'area-desc').and('contain.text', 'По убыванию площади')              
          }) 
          cy.get('#sorting-selectSelectBoxItContainer') // выпадающее меню выбора типа сортировки
            .within(() => {
              cy.get('#sorting-selectSelectBoxItText')
                .should('contain.text', 'Выдача ключей раньше')
              cy.get('#sorting-selectSelectBoxItOptions').within(() => {
                cy.get('.selectboxit-option-anchor').eq(0).should('contain.text', 'Выдача ключей раньше')
                cy.get('.selectboxit-option-anchor').eq(1).should('contain.text', 'Выдача ключей позже')
                cy.get('.selectboxit-option-anchor').eq(2).should('contain.text', 'Сначала подешевле')
                cy.get('.selectboxit-option-anchor').eq(3).should('contain.text', 'Сначала подороже')
                cy.get('.selectboxit-option-anchor').eq(4).should('contain.text', 'По возрастанию площади')
                cy.get('.selectboxit-option-anchor').eq(5).should('contain.text', 'По убыванию площади')
              })
          })
      })
    })
  })
 
  it("Отображение карточек квартир плиткой", () => {
    cy.get('#table-flats')
      .find('.apartments__view_grid')
      // .should('have.attr', 'style', 'display: none;') // This element is not visible - требуется доработать код, чтобы проверить атрибут style скрытого элемента 
      .within(() => {
        cy.get('.apartments__list').within(() => {
          cy.get('.apartments__item').within(() => { // проверяем обязательные элементы в карточках всех квартир 
            cy.get('.pdf_icon') // иконка PDF для загрузки планировки квартиры
              .should('have.attr', 'target', '_blank')
              .find('i')
              .should('have.class', 'icon-22')
            cy.get('.apartments__item__img').within(() => {
              cy.get('a')
                .should('have.attr', 'href') // ссылка на карточку квартиры
              //   .then(link => {
              //     cy.request(link.prop('href')).its('status').should('eq', 200) // link.prop is not a function
              // })
              cy.get('img') // изображение планировки квартиры
                .should('have.attr', 'src')
              //   .then(link => {
              //     cy.request(link.prop('href')).its('status').should('eq', 200) // link.prop is not a function
              // })
            })
            cy.get('.apartments__item__title') // заголовок карточки квартиры, например, "3 комн. евро 61.67 м2"
              .find('a')
              .should('have.attr', 'href')
            //   .then(link => {
            //     cy.request(link.prop('href')).its('status').should('eq', 200) // link.prop is not a function
            // })
            cy.get('.apartments__features')
              .eq(0)
              .within(() => {
                cy.get('.apartments__features__label') // этаж квартиры
                  .eq(0)
                  .should('contain.text', 'Этаж')
                cy.get('.apartments__features__label') // корпус квартиры
                  .eq(1)
                  .should('contain.text', 'Корпус')
            })
            cy.get('.apartments__features')
              .eq(1)
              .within(() => {
                cy.get('.apartments__features__label') // стоимость квартиры
                  .should('contain.text', 'Стоимость')
                cy.get('.apartments__features__value') // стоимость квартиры, проверка отображения символа ₽
                  .find('.rur')
                  .should('contain', '₽')
            })
            cy.get('.apartments__features-ipoteka') // скрытый расчет по ипотеке (отображается при выборе ипотечной программы)
              .should('have.class', 'hidden')
              .within(() => {
                cy.get('.apartments__features-ipoteka-initial').within(() => {
                  cy.get('.apartments__features__label') // первый взнос по ипотеке
                    .should('contain.text', 'Первый взнос')
                  cy.get('.apartments__features__value') // сумма первого взноса, проверка отображения символа ₽
                    .find('.rur')
                    .should('contain.text', '₽')
                })
                cy.get('.apartments__features-ipoteka-month').within(() => {
                  cy.get('.apartments__features__label') // ежемесячный платеж по ипотеке
                    .should('contain.text', 'Платеж в месяц')
                  cy.get('.apartments__features__value') // сумма ежемесячного платежа по ипотеке, проверка отображения символа ₽
                    .find('.rur')
                    .should('contain.text', '₽')
                })
            })
            cy.get('.apartments__item__actions') // кнопка Забронировать в каждой карточке квартиры
              .find('a')
              .should('have.class', 'btn')
              .and('contain.text', 'Забронировать')
              .and('have.attr', 'href')
            //   .then(link => {
            //     cy.request(link.prop('href')).its('status').should('eq', 200) // link.prop is not a function
            // })
          })
          cy.get('.ready_status').within(() => { // карточки готовых квартир дополнительно содержат
            cy.get('.ready_flat_block')
              .within(() => {
                cy.get('.mobile-hidden') // плашку "Эта квартира с ключами" (не отображается в мобильной версии)
                  .eq(0)
                  .should('contain.text', 'Эта квартира с', 'ключами')
                cy.get('.mobile-visible') // плашку "Квартира с ключами и готовой отделкой" (отображается только мобильной версии)
                  .should('contain.text', 'Квартира с', 'ключами', 'и', 'готовой отделкой')
                cy.get('.mobile-hidden') // всплывающее уведомление "Дом уже построен, а квартира c готовой отделкой"  (не отображается в мобильной версии)
                  .eq(1)
                  .should('contain.text', 'Дом уже построен, а', 'квартира c', 'готовой отделкой')
            })
          })
          cy.get('div[class="apartments__item  "]').within(() => { // в карточках еще не готовых квартир отображаются
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

  it("Отображение карточек квартир списком", () => {
    cy.get('.btn__view_rows').click() // переключение на отображение карточек квартир списком
    cy.get('#table-flats').within(() => {
      cy.get('.apartments__view_row')
        // .and('have.attr', 'style', 'display: block;') // This element is not visible
        .within(() => {
          cy.get('thead tr').within(() => { // заголовки столбцов
            cy.get('td')
              .eq(1)
              .should('have.class', 'mobile-hidden')
              .and('have.attr', 'data-sorting', 'number') // сортировка по номеру квартиры
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
              .should('have.attr', 'data-sorting', 'area') // сортировка по площади
              .within(() => {
                cy.get('.mobile-hidden').should('contain.text', 'Общая площадь, м', '2')
                cy.get('.mobile-visible').should('contain.text', 'Площадь, м', '2')
            })
            cy.get('td')
              .eq(5)
              .should('have.attr', 'data-sorting', 'floor') // сортировка по номеру этажа
              .within(() => {
                cy.get('.mobile-hidden').should('contain.text', 'Этаж')
                cy.get('.mobile-visible').should('contain.text', 'Этаж')
            })
            cy.get('td')
              .eq(6)
              .should('have.attr', 'data-sorting', 'price') // сортировка по стоимости
              .within(() => {
                cy.get('.mobile-hidden').should('contain.text', 'Стоимость')
                  .find('.rur')
                  .should('contain.text', '₽')
                cy.get('.mobile-visible').should('contain.text', 'Стоимость, млн')
                  .find('.rur')
                  .should('contain.text', '₽')
            })
            cy.get('td')
              .eq(7)
              .should('have.class', 'mobile-hidden')
              .and('have.attr', 'data-sorting', 'period') // сортировка по сроку сдачи
              .within(() => {
                cy.get('.mobile-hidden').should('contain.text', 'Срок сдачи')
                cy.get('.mobile-visible').should('contain.text', 'Срок сдачи')
            })
            cy.get('td') // колонка с иконками PDF для скачивания планировок квартир
              .eq(8)
              .should('have.class', 'mobile-hidden')
              .within(() => {
                cy.get('.mobile-hidden').should('contain.text', 'Скачать PDF')
                cy.get('.mobile-visible').should('contain.text', 'Скачать PDF')
            })
          })
        })
    })
  })     
})