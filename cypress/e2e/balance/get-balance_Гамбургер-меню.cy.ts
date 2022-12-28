import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов гамбургер-меню на вебсайте ЖК balance", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие главной страницы + проверка title-заголовка страницы в браузере", () => {
    cy.visit('https://get-balance.ru/')
  })

  it("Какое-то внутреннее главное меню (не отображается в UI)", () => {
    cy.get('.wrapper_menu').within(() => {
      cy.get('.main_menu').eq(0).within(() => {
        cy.get('.item').eq(0).should('contain.text', 'магазин').within(() => {
          cy.get('a').should('have.attr', 'href', '/flats/')
        })
        cy.get('.item').eq(1).should('contain.text', 'архитектура').within(() => {
          cy.get('a').should('have.attr', 'href', '/architecture/')
        })
        cy.get('.item').eq(2).should('contain.text', 'ход строительства').within(() => {
          cy.get('a').should('have.attr', 'href', '/construction-progress/')
        })
        cy.get('.item').eq(3).should('contain.text', 'как обрести').within(() => {
          cy.get('a').should('have.attr', 'href', '/purchase/')
        })
        cy.get('.item').eq(4).should('contain.text', 'ипотека').within(() => {
          cy.get('a').should('have.attr', 'href', '/mortgage/')
        })
        cy.get('.item').eq(5).should('contain.text', 'документы').within(() => {
          cy.get('a').should('have.attr', 'href', '/documents/')
        })
        cy.get('.item').eq(6).should('contain.text', 'цифры').within(() => {
          cy.get('a').should('have.attr', 'href', '/numbers/')
        })
        cy.get('.item').eq(7).should('contain.text', 'расположение').within(() => {
          cy.get('a').should('have.attr', 'href', '/location/')
        })
        cy.get('.item').eq(8).should('contain.text', 'оформление').within(() => {
          cy.get('a').should('have.attr', 'href', '/order/')
        })
        cy.get('.item').eq(9).should('contain.text', 'инфраструктура').within(() => {
          cy.get('a').should('have.attr', 'href', '/infrastructure/')
        })
        cy.get('.item').eq(10).should('contain.text', 'дворы и парк').within(() => {
          cy.get('a').should('have.attr', 'href', '/yards/')
        })
        cy.get('.item').eq(11).should('contain.text', 'сервисы').within(() => {
          cy.get('a').should('have.attr', 'href', '/services/')
        })
        cy.get('.item').eq(12).should('contain.text', 'квартиры').within(() => {
          cy.get('a').should('have.attr', 'href', '/about-flats/')
        })
        cy.get('.item').eq(13).should('contain.text', 'дизайн').within(() => {
          cy.get('a').should('have.attr', 'href', '/gallery/')
        })
      })
    })
  })

  it("Блок Проект", () => {
    cy.get('.wrapper_menu').within(() => {
      cy.get('.main_menu').eq(1).within(() => {
        cy.get('.menu-block').eq(0).within(() => {
          cy.get('.menu-block-title').should('have.text', 'проект')
          cy.get('.menu-block-nav-item').eq(0).should('contain.text', 'о квартирах').within(() => {
            cy.get('a')
              .should('have.attr', 'href', '/about-flats/')
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
          })
          cy.get('.menu-block-nav-item').eq(1).should('contain.text', 'ход строительства').within(() => {
            cy.get('a')
              .should('have.attr', 'href', '/construction-progress/')
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
          })
          cy.get('.menu-block-nav-item').eq(2).should('contain.text', 'сервисы').within(() => {
            cy.get('a')
              .should('have.attr', 'href', '/services/')
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
          })
          cy.get('.menu-block-nav-item').eq(3).should('contain.text', 'расположение').within(() => {
            cy.get('a')
              .should('have.attr', 'href', '/location/')
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
          })
          cy.get('.menu-block-nav-item').eq(4).should('contain.text', 'архитектура').within(() => {
            cy.get('a')
              .should('have.attr', 'href', '/architecture/')
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
          })
          cy.get('.menu-block-nav-item').eq(5).should('contain.text', 'документы').within(() => {
            cy.get('a')
              .should('have.attr', 'href', '/documents/')
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
          })
          cy.get('.menu-block-nav-item').eq(6).should('contain.text', 'ритейл').within(() => {
            cy.get('a')
              .should('have.attr', 'href', '/infrastructure/')
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
          })
          cy.get('.menu-block-nav-item').eq(7).should('contain.text', 'парк и дворы').within(() => {
            cy.get('a')
              .should('have.attr', 'href', '/yards/')
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
          })
        })
      })
    })
  })

  it("Блок Покупка", () => {
    cy.get('.wrapper_menu').within(() => {
      cy.get('.menu-block').eq(1).within(() => {
        cy.get('.menu-block-title').should('have.text', 'покупка')
        cy.get('.menu-block-nav-item_shop').within(() => {
          cy.get('a')
            .should('have.attr', 'href', '/flats/')
            .and('have.text', 'магазин')
        })
        cy.get('.menu-block-nav-item')
          .eq(1)
          .should('contain.text', 'ипотека от 5,7%')
          .within(() => {
            cy.get('a')
              .should('have.attr', 'href', '/mortgage/')
        })
        cy.get('.menu-block-nav-item')
          .eq(2)
          .should('contain.text', 'как обрести')
          .within(() => {
            cy.get('a') 
              .should('have.attr', 'href', '/purchase/')
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
              })
        })
        cy.get('.menu-block-nav-item')
          .eq(3)
          .should('contain.text', 'оформление')
          .within(() => {
            cy.get('a')
              .should('have.attr', 'href', '/order/auth/')
              .then(link => {
                cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
        })
      })
    })
  })

  it("Cлайдер в нижней части бургер-меню", () => {
    cy.get('.wrapper_menu').within(() => {
      cy.get('.menu-slider').within(() => { 
        cy.get('.swiper-slide').eq(0).within(() => {
          cy.get('a')
            .should('contain.text', 'искусственный', 'интеллект')
            .and('have.attr', 'href', '/lp/ai_search/')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
            // .within(() => {
              // cy.get('.image > img')
                // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_intel.svg')
                // .and('have.attr', 'alt', 'искусственный интеллект')
          // })
        })
        cy.get('.swiper-slide').eq(1).within(() => {
          cy.get('a')
            .should('contain.text', 'баланс', 'дошкольника')
            .and('have.attr', 'href', '/lp/kindergarten/')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
            // .within(() => {
              // cy.get('..image > img')
                // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_kids.jpg')
                // .and('have.attr', 'alt', 'баланс дошкольника')
          // })
        })
        cy.get('.swiper-slide').eq(2).within(() => {
          cy.get('a')
            .should('have.attr', 'href', '/lp/school_life/')
            // .and('contain.text', 'зумеры и бумеры')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
            })
            // .within(() => {
              // cy.get('.image > img')
                // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_zoom.jpg')
                // .and('have.attr', 'alt', 'зумеры и бумеры')
          // /})
        })
        cy.get('.swiper-slide').eq(3).within(() => {
          cy.get('a')
            .should('contain.text', 'баланс для новорожденных')
            .and('have.attr', 'href', '/lp/baby_life/')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
            // .within(() => {
              // cy.get('.image > img')
                // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_baby.jpg')
                // .and('have.attr', 'alt', 'баланс для новорожденных"')
          // })
        })
        cy.get('.swiper-slide').eq(4).within(() => {
          cy.get('a')
            .should('contain.text', 'кэт-френдли')
            .and('have.attr', 'href', '/lp/cat-friendly/')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
            // .within(() => {
              // cy.get('.image > img')
                // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_catfriendly.jpg')
                // .and('have.attr', 'alt', 'кэт-френдли')
          // })
        })
        cy.get('.swiper-slide').eq(5).within(() => {
          cy.get('a')
            .should('contain.text', 'дог-френдли')
            .and('have.attr', 'href', '/lp/dog-friendly/')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
            // .within(() => {
              // cy.get('.image > img')
                // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_dogfriendly.png')
                // .and('have.attr', 'alt', 'Мопс')
          // })
        })
        cy.get('.swiper-slide').eq(6).within(() => {
          cy.get('a')
            .should('contain.text', 'кухни-гостиные')
            .and('have.attr', 'href', '/lp/kitchen/')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
            // .within(() => {
               // cy.get('.image > img')
                 // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_kitchen.jpg')
                 // .and('have.attr', 'alt', 'Кухня с семьей')
          // })
        })
        cy.get('.swiper-slide').eq(7).within(() => {
          cy.get('a')
            .should('contain.text', 'угловое остекление')
            .and('have.attr', 'href', '/lp/3d-sunset/')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
            // .within(() => {
              // cy.get('.image > img')
                // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_img7.jpg')
                // .and('have.attr', 'alt', 'Пример углового отекления')
          // })
        })
        cy.get('.swiper-slide').eq(8).within(() => {
          cy.get('a')
            .should('contain.text', 'французские балконы')
            .and('have.attr', 'href', '/lp/french-balcony/')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
            // .within(() => {
              // cy.get('d.image > img')
                // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_img2.jpg')
                // .and('have.attr', 'alt', 'Пример французского балкона')
          // })
        })
        cy.get('.swiper-slide').eq(9).within(() => {
          cy.get('a')
            .should('contain.text', 'цифры')
            .and('have.attr', 'href', '/numbers/')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
            // .within(() => {
               // cy.get('.image > img')
                // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_img6.jpg')
                // .and('have.attr', 'alt', 'Цифры о нас')
          // })
        })
        cy.get('.swiper-slide').eq(10).within(() => {
          cy.get('a')
            .should('contain.text', '3d-тур по лобби')
            .and('have.attr', 'href', '/space/')
            .then(link => {
              cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
            // .within(() => {
               // cy.get('.image > img')
                // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_img8.jpg')
                // .and('have.attr', 'alt', 'Лобби')
          // })
        })
        cy.get('.swiper-slide').eq(11).within(() => {
         cy.get('a')
           .should('contain.text', 'как мы сделали баланс')
           .and('have.attr', 'href', '/lp/architects/')
           .then(link => {
             cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
            // .within(() => {
               // cy.get('.image > img')
                 // .should('have.attr', 'src', '/local/templates/main/img/menu_slider_img5.jpg')
                 // .and('have.attr', 'alt', 'Превью о балансе')
          // })
        })
      })
    })
  })
})