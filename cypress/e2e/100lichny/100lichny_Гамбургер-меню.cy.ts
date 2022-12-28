import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов гамбургер-меню на вебсайте ЖК Столичный", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие главной страницы и нажатие на кнопку Меню в хэдере", () => {
    cy.visit('https://100lichny.ru/', { timeout: 90000 }) // увеличен тайм-аут открытия страницы до 90 секунд, за 60 секунд не всегда успевает прогрузиться
    cy.get('.hamburger').click()
  })

  it("Kоготип ЖК Столичный в верхней части гамбургер-меню", () => {
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
                  .should('contain.text', 'Веб-камеры')
                  .and('have.attr', 'href', '/about/webcams/')
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
                  .should('contain.text', 'Видео')
                  .and('have.attr', 'href', '/about/video/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                })
              })
              cy.get('.menu__links__item').eq(6).within(() => {
                cy.get('a')
                  .should('contain.text', 'Документы')
                  .and('have.attr', 'href', '/about/document/')
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
          
  it("Блок Выбор квартирs", () => {
    cy.get('#menu').within(() => {
      cy.get('.menu__content').within(() => {
        cy.get('.menu__nav').within(() => {
          cy.get('.menu__item').eq(1).within(() => {
            cy.get('.menu__head').within(() => {
              cy.get('.menu__head__item').within(() => {
                cy.get('a')
                  .should('have.attr', 'href', '/realty/')
                  .and('contain.text', 'Выбор квартиры')
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
              cy.get('.menu__links__item').eq(3).within(() => {
                cy.get('a')
                  .should('contain.text', 'Как это будет')
                  .and('have.attr', 'href', '/realty/showrooms/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                  })
              })
              cy.get('.menu__links__item').eq(4).within(() => {
                cy.get('a')
                  .should('contain.text', 'Добродел')
                  .and('have.attr', 'href', '/realty/dobrodel/')
                  .then(link => {
                    cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
                  })
              })
              cy.get('.menu__links__item').eq(5).within(() => {
                cy.get('a')
                  .should('contain.text', 'Соседский центр')
                  .and('have.attr', 'href', '/realty/center/')
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
          cy.get('.menu__item').eq(2).within(() => {
            cy.get('.menu__').within(() => {
              cy.get('.menu__head__item').eq(0).within(() => {
                cy.get('a')
                  .should('contain.text', 'Как купить')
                  .and('have.attr', 'href', '/buy/')
              })
              cy.get('.menu__head__item').eq(1).within(() => {
                cy.get('a')
                  .should('contain.text', 'Оплатить оферту')
                  .and('have.attr', 'href', '/offer/')
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
                  .should('contain.text', 'Контакты')
                  .and('have.attr', 'href', '/contacts/')
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
          cy.get('.menu__item').eq(3).within(() => {
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
                cy.get('.link')
                  .should('have.attr', 'href', '#callback-popup')
                  .within(() => {
                    cy.get('.link__icon').within(() => {
                      cy.get('img')
                        .should('have.attr', 'src', '/img/phone.svg')
                    })
                    cy.get('.link__text')
                      .should('contain.text', 'Обратный звонок')
                })
              })
              cy.get('.menu__item__in').within(() => {
                cy.get('.links-list__item').eq(0).within(() => {
                  cy.get('.link')
                    .should('have.attr', 'href', '/about/aero/')
                    .within(() => {
                      cy.get('.link__icon').within(() => {
                        cy.get('img')
                          .should('have.attr', 'src', '/img/panorama.svg')
                      })
                  })
                  cy.get('.link__text')
                    .should('contain.text', 'Панорама')
                })
                cy.get('.links-list__item').eq(1).within(() => {
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
            })
            cy.get('.social').within(() => {
              cy.get('.social_link')
                .eq(0)
                .should('have.attr', 'href', 'https://vk.com/stolichny_zheleznodorojniy')
                .and('have.attr', 'target', '_blank')
                .within(() => {
                  cy.get('.social_link_icon').within(() => {
                    cy.get('i')
                      .should('have.attr', 'class', 'icon-16')
                  })
              })
              cy.get('.social_link')
                .eq(1)
                .should('have.attr', 'href', 'https://t.me/zk_stolychnyi')
                .and('have.attr', 'target', '_blank')
                .within(() => {
                  cy.get('.social_link_icon').within(() => {
                    cy.get('i')
                      .should('have.attr', 'class', 'icon-31')
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