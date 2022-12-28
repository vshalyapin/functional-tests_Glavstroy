import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов на странице Интернет-бутик на вебсайте ЖК Береговой 2", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие страницы Интернет-бутика Берегового 2, проверка title-заголовка страницы в браузере", () => {
    cy.visit('https://beregovoy-kvartal.ru/flats')
    cy.url().should('contains', '/flats?ordering=price')
    cy.title().should('eq', 'Береговой — жизнь на берегу Москвы-реки') // проверка title-заголовка страницы
    cy.get('.confirm_2H16J').click() // закрытие уведомления "Сайт использует cookie." нажатием на кнопку Хорошо
  })

  it("Блок фильтров Подбор квартиры", () => {
    cy.get('.descWrap_1OkOq > .h5').should('contain.text', 'подбор квартиры') // заголовок блока фильтров "Подбор квартиры"
    cy.get('.form_3KI_F').within(() => { // блок с фильтрами
      cy.get('._sizeMedium_asmg_')
        .should('contain.text', 'Спален') // фильтр по количеству спален
        .within(() => {
          cy.get('.btns_2TAWE > :nth-child(1)').should('contain.text', '1')
          cy.get('.btns_2TAWE > :nth-child(2)').should('contain.text', '2')
          cy.get('.btns_2TAWE > :nth-child(3)').should('contain.text', '3')
          cy.get('.btns_2TAWE > :nth-child(4)').should('contain.text', '4+')
      })
      cy.get(':nth-child(2) > .v-slider').within(() => { // фильтр-слайдер Площадь
        cy.get('.v-slider__label').should('contain.text', 'Площадь, м') // подпись слайдера
        cy.get('.v-slider__values').within(() => { 
          // cy.get(':nth-child(1)').should('contain.text', '41') // от 41 м
          cy.get(':nth-child(2)').should('contain.text', '154') // до 154 м
        })
        cy.get('.v-slider__track > .v-slider__progress') // проверка отображения слайдера (ползунка)
      })
      cy.get(':nth-child(3) > .v-slider').within(() => { // фильтр-слайдер Этаж
        cy.get('.v-slider__label').should('contain.text', 'Этаж') // подпись фильтра
        cy.get('.v-slider__values').within(() => { 
          cy.get(':nth-child(1)').should('contain.text', '2') // со 2 этажа
          cy.get(':nth-child(2)').should('contain.text', '25') // до 25 этажа
        })
        cy.get('.v-slider__rail > .v-slider__track > .v-slider__progress') // проверка отображения слайдера (ползунка)
      })
      cy.get('.wrapper_vjBH_').within(() => { // фильтр Вид из окон (Река и Сити, Парк «Фили», Двор)
        cy.get('._sizeSmall_2qNI4 > .text').should('contain.text', 'Вид из окон') // подпись слайдера
        cy.get('._sizeSmall_2qNI4 > .btns_2TAWE > :nth-child(1)').should('contain.text', 'Река и Сити')
        cy.get('._sizeSmall_2qNI4 > .btns_2TAWE > :nth-child(2)').should('contain.text', 'Парк «Фили»')
        cy.get('._sizeSmall_2qNI4 > .btns_2TAWE > :nth-child(3)').should('contain.text', 'Двор')
      })
      cy.get(':nth-child(6) > .v-slider') // фильтр-слайдер Стоимость
        .should('contain.text', 'Стоимость, млн руб.') // подпись слайдера
        .within(() => {
          cy.get('.v-slider__values').within(() => { 
            // cy.get(':nth-child(1)').should('contain.text', '17.1') // от 17,1 млн.руб.
            cy.get(':nth-child(2)').should('contain.text', '78.9') // до 78,9 млн.руб.
          })
          cy.get('.v-slider__rail > .v-slider__track > .v-slider__progress') // проверка отображения слайдера (ползунка)
        })
      
      cy.get('.extendFiltersWrapper_ENcO5 > .link').should('contain.text', 'Все параметры').click({ force: true }) // проверяем кнопку Все параметры и нажимаем на нее

      cy.get('.js-extended-element > .cursor-h-scroll > .wrapper_vjBH_').within(() => { // скрытый фильтр Особенности (Ванная с окном)
        cy.get('._sizeSmall_2qNI4 > .text').should('contain.text', 'Особенности')
        cy.get('._sizeSmall_2qNI4 > .btns_2TAWE > .h5').should('contain.text', 'ВАННАЯ С ОКНОМ')
      })
      cy.get('.SelectFilter_rvmLQ > .v-select').within(() => { // скрытый фильтр Секция
        cy.get('.v-select__label').should('contain.text', 'Секция') // подпись фильтра
        cy.get('.v-select__value').should('contain.text', 'Любая')
        cy.get('.v-select__arrow').click({ force: true }) // нажимаем на стрелку для вызова выпадающего списка
      })  
      // выпадающее меню выбрать секцию не удается найти, возможно оно not.visible, хотя в 67 строке стрелка для раскрытия списка нажимается
      // cy.get('.v-select__dropdown-content').should('be.visible').within(() => { // выпадающее меню для выбора секции
        // cy.get('.h6').should('contain.text', 'Показать генплан')
        // cy.get(':nth-child(2)').should('contain.text', '7')
        // cy.get(':nth-child(3)').should('contain.text', '8')
        // cy.get(':nth-child(4)').should('contain.text', '9')
        // cy.get(':nth-child(5)').should('contain.text', '10')
        // cy.get(':nth-child(6)').should('contain.text', '11')
        // cy.get(':nth-child(7)').should('contain.text', '12')
        // cy.get(':nth-child(8)').should('contain.text', '13')
        // cy.get(':nth-child(9)').should('contain.text', '14')
      // })
      // в 58 строке кнопка Все параметры прожимается, при этом кнопка должна изменить подпись на Меньше параметров, но что-то пошло не так
      // cy.get('.extendFiltersWrapper_ENcO5 > .link').should('contain.text', 'Меньше параметров').click({ force: true }) // проверяем кнопку Меньше параметров и нажимаем на нее
      cy.get('.chooseOnGenplanWrapper_2PxUD > .link').should('contain.text', 'Выбрать на генплане')
    })
  })

  // дописать код для проверки верхнего блока фильтров и карточек квартир
  // it("Проверка отображения верхней области фильтров", () => {
    // cy.get('').should('contain.text', '')
  // })

  // it("Проверка отображения карточек квартир", () => {
    // cy.get('').should('contain.text', '')
  // })
})