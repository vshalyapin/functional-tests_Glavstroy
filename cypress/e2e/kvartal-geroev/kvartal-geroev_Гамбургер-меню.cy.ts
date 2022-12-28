import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов гамбургер-меню на вебсайте ЖК Героев", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие главной страницы и нажатие на кнопку Меню в хэдере", () => {
    cy.visit('https://kvartal-geroev.ru/', { timeout: 90000 }) // увеличен тайм-аут открытия страницы до 90 секунд, за 60 секунд не всегда успевает прогрузиться
    cy.get('.hamburger').click()
  })

  it("Kоготип ЖК Героев в верхней части гамбургер-меню", () => {
    cy.get('#menu').within(() => {
      cy.get('.menu__content').within(() => {
        cy.get('.menu__logo').within(() => {
          cy.get('.logo').within(() => {
            cy.get('img').should('have.attr', 'src', '/img/logo.svg')
          })
        })
      })
    })
  })

  it("Блок О проекте", () => {
    cy.get('#menu').within(() => {
      cy.get('.menu__content').within(() => {
        cy.get('.menu__nav').within(() => {
          cy.get('.menu__item').eq(0).within(() => {
            cy.get('.menu__head').within(() => {
              cy.get('.menu__head__item').within(() => {
                cy.get('a')
                  .should('contain.text', 'О проекте')
                  .and('have.attr', 'href', '/about/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
            })
            cy.get('.menu__links').within(() => {
              cy.get('.menu__links__item').eq(0).within(() => {
                cy.get('a')
                  .should('contain.text', 'Инфраструктура')
                  .and('have.attr', 'href', '/about/infra/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
              cy.get('.menu__links__item').eq(1).within(() => {
                cy.get('a')
                  .should('contain.text', 'Галерея')
                  .and('have.attr', 'href', '/about/gallery/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
              cy.get('.menu__links__item').eq(2).within(() => {
                cy.get('a')
                  .should('contain.text', 'Аэрофотосъемка')
                  .and('have.attr', 'href', '/about/aero/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
              cy.get('.menu__links__item').eq(3).within(() => {
                cy.get('a')
                  .should('contain.text', 'Видео')
                  .and('have.attr', 'href', '/about/video/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
              cy.get('.menu__links__item').eq(4).within(() => {
                cy.get('a')
                  .should('contain.text', 'Динамика строительства')
                  .and('have.attr', 'href', '/about/building/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
              cy.get('.menu__links__item').eq(5).within(() => {
                cy.get('a')
                  .should('contain.text', 'Документы')
                  .and('have.attr', 'href', '/about/document/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
              cy.get('.menu__links__item').eq(6).within(() => {
                cy.get('a')
                  .should('contain.text', 'Кто наши герои')
                  .and('have.attr', 'href', '/heroes/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
              cy.get('.menu__links__item').eq(7).within(() => {
                cy.get('a')
                  .should('contain.text', 'Книга новосёла')
                  .and('have.attr', 'href', '/book/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
              cy.get('.menu__links__item').eq(8).within(() => {
                cy.get('a')
                  .should('contain.text', 'Добродел')
                  .and('have.attr', 'href', '/dobrodel/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
              cy.get('.menu__links__item').eq(9).within(() => {
                cy.get('a')
                  .should('contain.text', 'Программа лояльности')
                  .and('have.attr', 'href', '/loyalty/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
            })
          })
        })
      })
    })
  })
          
  it("Блок Выбрать квартиру", () => {
    cy.get('#menu').within(() => {
      cy.get('.menu__content').within(() => {
        cy.get('.menu__nav').within(() => {
          cy.get('.menu__item').eq(1).within(() => {
            cy.get('.menu__head').within(() => {
              cy.get('.menu__head__item')
                .should('have.attr', 'href', '/realty/')
                .within(() => {
                  cy.get('a')
                    .should('contain.text', 'Выбрать квартиру')
                    .and('have.attr', 'href', '/realty/')
                    .then(link => {
                      cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                    })
                })
            })
            cy.get('.menu__links').within(() => {
              cy.get('.menu__links__item').eq(0).within(() => {
                cy.get('a')
                  .should('contain.text', 'Генплан')
                  .and('have.attr', 'href', '/realty/')
              })
              cy.get('.menu__links__item').eq(1).within(() => {
                cy.get('a')
                  .should('contain.text', 'Список свободных квартир')
                  .and('have.attr', 'href', '/realty/flats/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                  })
              })
              cy.get('.menu__links__item').eq(2).within(() => {
                cy.get('a')
                  .should('contain.text', 'Отделка')
                  .and('have.attr', 'href', '/realty/facing/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                  })
              })
            })
          })
        })
      })
    })
  })

  it("Блок в мобильном меню Порядок покупки", () => {
    cy.get('#menu').within(() => {
      cy.get('.menu__content').within(() => {
        cy.get('.menu__nav').within(() => {
          cy.get('.menu__item').eq(2).within(() => {
            cy.get('.menu__head').within(() => {
              cy.get('.menu__head__item').eq(0).within(() => {
                cy.get('a')
                  .should('contain.text', 'Порядок покупки')
                  .and('have.attr', 'href', 'javascript:void(0)')
              })
            })
            cy.get('.menu__links').within(() => {
              cy.get('.menu__links__item').eq(0).within(() => {
                cy.get('a')
                  .should('contain.text', 'Как купить')
                  .and('have.attr', 'href', '/buy/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                  })
              })
              cy.get('.menu__links__item').eq(1).within(() => {
                cy.get('a')
                  .should('contain.text', 'Подписание и регистрация ДДУ')
                  .and('have.attr', 'href', '/ddu/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                  })
              })
            })
          })
        })
      })
    })
  })
         
  it("Блок Как купить", () => {
    cy.get('#menu').within(() => {
      cy.get('.menu__content').within(() => {
        cy.get('.menu__nav').within(() => {
          cy.get('.menu__item').eq(3).within(() => {
            cy.get('.menu__head').within(() => {
              cy.get('.menu__head__item').eq(0).within(() => {
                cy.get('a')
                  .should('contain.text', 'Как купить')
                  .and('have.attr', 'href', '/buy/')
              })
              cy.get('.menu__head__item').eq(1).within(() => {
                cy.get('a')
                  .should('contain.text', 'Подписание и регистрация ДДУ')
                  .and('have.attr', 'href', '/ddu/')
              })
              cy.get('.menu__head__item').eq(2).within(() => {
                cy.get('a')
                  .should('contain.text', 'Новости')
                  .and('have.attr', 'href', '/news/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                  })
              })
              cy.get('.menu__head__item').eq(3).within(() => {
                cy.get('a')
                  .should('contain.text', 'Кто наши герои')
                  .and('have.attr', 'href', '/heroes/')
              })
              cy.get('.menu__head__item').eq(4).within(() => {
                cy.get('a')
                  .should('contain.text', 'Контакты')
                  .and('have.attr', 'href', '/contacts/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                  })
              })
            })
          })
        })
      })
    })
  })

  it("Блок Контакты в нижней части гамбургер-меню", () => {
    cy.get('#menu').within(() => {
      cy.get('.menu__content').within(() => {
        cy.get('.menu__nav').within(() => {
          cy.get('.menu__item').eq(4).within(() => {
            cy.get('.links-list').within(() => {
              // cy.get('.links-list__item').eq(0).within(() => {
                // cy.get('.link')
                  // .should('have.attr', 'href', 'tel:+74951275607') // номер телефона постоянно меняется, поэтому проверка номера исключена из кода
                  // .within(() => {
                    // cy.get('link__text')
                      // .should('contain.text', '+7 (495)')
                  // })
              // })
              cy.get('.links-list__item').eq(1).within(() => {
                cy.get('.open-popup')
                  .should('have.attr', 'href', '#callback-popup')
                  .and('have.attr', 'title', 'Позвонить')
                  .within(() => {
                    cy.get('.link__icon').within(() => {
                      cy.get('img')
                        .should('have.attr', 'src', '/img/phone.svg')
                    })
                    cy.get('.link__text')
                      .should('contain.text', 'Обратный звонок')
                })
                cy.get('.call-text')
                  .should('contain.text', 'Оставьте номер телефона,')
                  .and('contain.text', 'и мы вам перезвоним')
              })
              cy.get('.links-list__item').eq(2).within(() => {
                cy.get('.open-popup')
                  .should('have.attr', 'href', '#panorama-popup')
                  .and('have.attr', 'title', 'Панорама 360')
                  .and('have.attr', 'data-src', 'https://visualhotels.com/jk_geroev/')
                  .within(() => {
                    cy.get('.link__icon').within(() => {
                      cy.get('img')
                        .should('have.attr', 'src', '/img/panorama.svg')
                    })
                    cy.get('.link__text')
                      .should('contain.text', 'Панорама')
                })
              })
              cy.get('.links-list__item').eq(3).within(() => {
                cy.get('.link')
                  .should('have.attr', 'title', 'Личный кабинет')
                  .and('have.attr', 'target', '_blank')
                  .and('have.attr', 'href', 'https://lk.glavstroy.ru/')
                  // .then(link => {
                    // cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                  // })
                  .within(() => {
                    cy.get('.link__icon').within(() => {
                      cy.get('img')
                        .should('have.attr', 'src', '/img/user.svg')
                    })
                    cy.get('.link__text')
                      .should('contain.text', 'Личный кабинет')
                })
              })
            })
            cy.get('.social').within(() => {
              cy.get('.social_link')
                .eq(0)
                .should('have.attr', 'href', 'https://vk.com/kvartalgeroev')
                .and('have.attr', 'target', '_blank')
                .within(() => {
                  cy.get('.social_link_icon').within(() => {
                    cy.get('img')
                      .should('have.attr', 'src', '/img/vk-icon.svg?3')
                  })
              })
              cy.get('.social_link')
                .eq(1)
                .should('have.attr', 'href', 'https://t.me/geroev_kvartal')
                .and('have.attr', 'target', '_blank')
                .within(() => {
                  cy.get('.social_link_icon').within(() => {
                    cy.get('img')
                      .should('have.attr', 'src', '/img/tg-icon.svg?3')
                  })
              })
              cy.get('.social_link_text')
                .should('contain.text', 'Присоединяйтесь')
            })
          })
        })
      })
    })
  })
})