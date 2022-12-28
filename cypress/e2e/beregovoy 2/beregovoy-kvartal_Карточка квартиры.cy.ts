import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов на странице детальной карточки квартиры на вебсайте ЖК Береговой 2", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Переход на страницу квартиры", () => {
    cy.visit('https://beregovoy-kvartal.ru/flats/9-2-277', { timeout: 90000 }) // увеличен тайм-аут открытия страницы до 90 секунд, за 60 секунд не всегда успевает прогрузиться
    // выбираем для тестирования любую свободную квартиру /11-3-437, /11-4-442, /11-5-447, /10-2-348, /11-7-457, /11-8-462, /11-9-467, /10-2-349, /9-2-277
    cy.get('.confirm_2H16J').click() // закрытие уведомления "Сайт использует cookie." нажатием на кнопку Хорошо
  })

  it("Детальная карточка квартиры", () => {
    cy.get('ul[class="GenplanLevels_1CAEm"]').within(() => { // блок в левой части экрана с кнопками Планировка, Этаж, Генплан
      cy.get('li[class="link_mKWp6"]')
        .eq(0)
        .should('contain.text', ' планировка')
      cy.get('li[class="link_mKWp6"]')
        .eq(1)
        .should('contain.text', ' этаж')
      cy.get('li[class="link_mKWp6"]')
        .eq(2)
        .should('contain.text', ' генплан')
    })
    // cy.get('.mortgageLink_21fQm') // ссылка Все ипотечные программы
    //   .should('contain.text', 'Все ипотечные программы')  
    //   .and('have.attr', 'href', '/mortgage')
    //   .and('have.attr', 'target', '_blank')
    //   .then(link => {
    //     cy
    //       .request(link.prop('href'))
    //       .its('status')
    //       .should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)    
    // })
    // cy.get('div[class="text cursor-pointer layoutLabel_89f7B"]')
      // .should('contain.text', 'Такая же планировка на других этажах')
  })
})