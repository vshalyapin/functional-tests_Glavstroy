import { eq } from "cypress/types/lodash"

describe("Проверка отображения и функциональности элементов на главной странице вебсайта ЖК Береговой, 1 очередь", () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
  
  it("Открытие главной страницы, проверка title-заголовка страницы в браузере", () => {
    cy.visit('https://old.beregovoy-kvartal.ru/', { timeout: 90000 }) // увеличен тайм-аут открытия страницы до 90 секунд, за 60 секунд не всегда успевает прогрузиться
    cy.title().should('eq', 'Береговой — жизнь на берегу Москвы-реки') // проверка title-заголовка страницы
    // cy.get('').click() // закрытие уведомления "Мы используем файлы cookie." нажатием на кнопку ОК
  })

  it("Мета-теги и линки страницы в head: description, Open Graph (og), icon, manifest", () => {
    cy.get('meta[name="description"]').should('have.attr', 'content', 'Квартал, в котором все хорошо. Пешеходная набережная с причалом, квартиры с видом на Сити и сервис, освобождающий от рутины.')
    cy.get('meta[property="og:type"]').should('have.attr', 'content', 'website')
    cy.get('link[rel="shortcut icon"]')
      .should('have.attr', 'href', '/local/templates/new_main_29_08/image/favicon/favicon.png')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
    })
    cy.get('link[rel="icon"]')
      .should('have.attr', 'href', '/local/templates/new_main_29_08/image/favicon/favicon.ico')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })
    cy.get('link[rel="apple-touch-icon"]')
      .eq(0)
      .should('have.attr', 'href', '/local/templates/new_main_29_08/image/favicon/apple-touch-icon.png')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })
    cy.get('link[rel="apple-touch-icon"]')
      .eq(1)
      .should('have.attr', 'sizes', '72x72')
      .and('have.attr', 'href', '/local/templates/new_main_29_08/image/favicon/apple-touch-icon-72x72.png')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })
    cy.get('link[rel="apple-touch-icon"]')
      .eq(2)
      .should('have.attr', 'sizes', '114x114')
      .and('have.attr', 'href', '/local/templates/new_main_29_08/image/favicon/apple-touch-icon-114x114.png')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })
  })

  it("Хэдер", () => {
    cy.get('.page_header > .video-slider').within(() => {
      cy.get('.video-wrapper').within(() => { // видеослайдер
        cy.get('video')
          .eq(0) // первое видео
          .find('source')
          .should('have.attr', 'src', '/local/templates/new_main_29_08/image/video/Beregovoi_new_(30sec)_ver_01.mp4')
        //   .then(link => {
        //     cy.request(link.prop('src')).its('status').should('eq', 200) // No response was received within the timeout.
        // })
        cy.get('video')
          .eq(1) // второн видео
          .find('source')
          .should('have.attr', 'src', '/local/templates/new_main_29_08/image/video/Beregovoi_new_(30sec)_ver_02.mp4')
        //   .then(link => {
        //     cy.request(link.prop('src')).its('status').should('eq', 200) // No response was received within the timeout.
        // })
        cy.get('video')
          .eq(2) // третье видео
          .find('source')
          .should('have.attr', 'src', '/local/templates/new_main_29_08/image/video/Beregovoi_new_(30sec)_ver_03.mp4')
        //   .then(link => {
        //     cy.request(link.prop('src')).its('status').should('eq', 200) // No response was received within the timeout.
        // })
      })
      cy.get('.header_menu').within(() => {
        cy.get('.menu_logo').within(() => {
          cy.get('.logo_white')
            .should('have.attr', 'src', '/local/templates/new_main_29_08/image/clean_logo_beregsite_white.svg')
            .then(link => {
              cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
          })
          cy.get('.logo_grey')
            .should('have.attr', 'src', '/local/templates/new_main_29_08/image/clean_logo_beregsite.svg')
            .then(link => {
              cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
          })
          cy.get('a')
            .should('have.attr', 'href', '/conditions-of-purchase/') // Ипотека в хэдере
            .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
          })
          cy.get('.head_ipo__desc').should('contain.text', 'Ипотека c господдержкой 0,1%')
          cy.get('.head_ipo__mob').should('contain.text', 'Ипотека от', '0,1%')
        })
      })
      cy.get('.mouse_a').within(() => {
        cy.get('.m_r_whee')
        cy.get('.m_a') // анимированная стрелка скроола страницы вниз
        cy.get('#arrows_5')
      })
      cy.get('.title-house') // заголовок на главном рендере
        .should('contain.text', 'Квартиры готовы')
        .within(() => {
          cy.get('a')
            .should('contain.text', 'Ипотека', 'от 0,1%')
            .and('have.attr', 'href', '/conditions-of-purchase/')
      })
    })
  })

  it("Главный слоган", () => {
    cy.get('.slogan_h1').should('contain.text', 'Вы всегда знали, как жить.', 'Безопасно. Просторно. Спокойно. Красиво. Хорошо.')
    cy.get('.slogan_description').should('contain.text', 'А мы знаем, где.', 'В Большом Сити, в историческом центре столицы с парками и набережными — в жилом квартале Береговой.')
  })

  it("Блок На Москве-реке", () => {
    cy.get('.main_onmoscow > .main_title').scrollIntoView().should('contain.text', 'На Москве-реке')
    cy.get('.onmoscow_promo__image')
      .find('img') // изображение
      .should('have.attr', 'src', '/local/templates/new_main_29_08/image/onmoscow_background_new2.jpg')
      .then(link => {
        cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })
    cy.get('.onmoscow_pluses').within(() => { // текст с плюсами ЖК
      cy.get('.m1').should('contain.text', 'Великолепные виды', 'на реку и столицу')
      cy.get('.m2').should('contain.text', 'Пешеходная набережная', 'без автомобилей')
      cy.get('.m3').should('contain.text', 'Парк «Фили» в пешей', 'доступности')
      cy.get('.m4').should('contain.text', 'Рядом станция метро «Фили»,', 'станция МЦК', 'и метро «Шелепиха»')
      cy.get('.m5').should('contain.text', 'Близость делового центра', 'и главных центров', 'притяжения Москвы')
      cy.get('.m6').should('contain.text', 'Разнообразие', 'возможностей для спорта', 'и активного отдыха')
      cy.get('.m7').should('contain.text', 'Приватность и простор', 'прибрежной локации')
      cy.get('.swiper-wrapper > .per_mobile').within(() => { // слайдер с плюсами ЖК в мобильной версии
        cy.get('.m1').should('contain.text', 'Великолепные виды', 'на реку и столицу')
        cy.get('.m2').should('contain.text', 'Пешеходная набережная', 'без автомобильного', 'движения')
        cy.get('.m3').should('contain.text', 'Парк «Фили» в пешей', 'доступности')
        cy.get('.m4').should('contain.text', 'Рядом станция метро «Фили»,', 'станция МЦК', 'и метро «Шелепиха»')
        cy.get('.m5').should('contain.text', 'Близость делового центра', 'и главных центров', 'притяжения Москвы')
        cy.get('.m6').should('contain.text', 'Разнообразие', 'возможностей для спорта', 'и активного отдыха')
        cy.get('.m7').should('contain.text', 'Атмосфера приватности', 'и простора прибрежной', 'локации')
      })
    })
    cy.get('.inspiration_images')
      .find('img') // изображение
      .should('have.attr', 'src', '/local/templates/new_main_29_08/image/onmoscow2.jpg')
      .then(link => {
        cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
    })
    cy.get('.main_description') // текст
      .should('contain.text', 'Береговой вдохновлен рекой', 'и культовыми городами у воды: роскошным Лондоном, иконическим Манхэттеном, культовым Чикаго.')
  })

  it("Блок Архитектура", () => {
    cy.get('.main_architecture').scrollIntoView().within(() => {
      cy.get('.main_title').should('contain.text', 'Архитектура') // заголовок
      cy.get('.main_description').should('contain.text', 'вне времени')
      cy.get('.architecture_description').should('contain.text', 'Фасады Берегового', '— это соединение двух материалов — алюминия и кирпича, двух стилей — классики и современности. Алюминий отражает городские качества, кирпич — природные.')
      cy.get('.materials_item')
        .eq(0)
        .within(() => {
          cy.get('.item_title').should('contain.text', 'Анодированный', 'алюминий')
          cy.get('.item_description')
            .should('contain.text', 'Прочный, долговечный, легкий и, несомненно, очень красивый металл. Архитекторы любят алюминий за то, как он взaимодействует с окружающей средой, отражая цвета неба и реки.')
            .find('img')
            .should('have.attr', 'src', '/local/templates/new_main_29_08/image/architecture3.png')
            .then(link => {
              cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
          })
      })
      cy.get('.materials_item')
        .eq(1)
        .within(() => {
          cy.get('.item_title').should('contain.text', 'Клинкерный', 'кирпич')
          cy.get('.item_description')
            .should('contain.text', 'Только вода и глина особых сортов. Смесь обжигается при температуре 1200°С и приобретает прочность и красоту, которые сохраняются столетиями.')
            .find('img')
            .should('have.attr', 'src', '/local/templates/new_main_29_08/image/architecture2.png')
            .then(link => {
              cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
          })
      })
    })
  })

  it("Видеоблок Архитекторы о проекте", () => {
    cy.get('.video_block').scrollIntoView().within(() => {
      cy.get('.title').should('contain.text', 'Архитекторы о проекте') // заголовок
      cy.get('a') // видеоролик
        .should('have.class', 'video')
        .and('have.attr', 'href', 'https://www.youtube.com/watch?v=8illJbuTDcc?modestbranding=1&fs=0&showinfo=0&rel=0&iv_load_policy=3')
        .then(link => {
          cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
      })
    })
  })

  it("Блок Набережная без автомобилей", () => {
    cy.get('.main_embankment').scrollIntoView().within(() => {
      cy.get('.head_title').should('contain.text', 'Набережная', 'без автомобилей') // заголовок
      cy.get('.head_around').within(() => {
        cy.get('img')
          .should('have.attr', 'src', '/local/templates/new_main_29_08/image/embankment1.png')
          .then(link => {
            cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
        })
        cy.get('a') // ссылка на панораму района 360
          .should('contain.text', '360° панорама района')
          .and('have.attr', 'target', 'blank')
          .and('have.attr', 'href', 'https://visualhotels.com/beregovoy_new/')
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
        })
      })
      cy.get('.embankment_content').within(() => {
        cy.get('.content_image')
          .find('img')
          .should('have.attr', 'src', '/local/templates/new_main_29_08/image/embankment1_new.jpg')
          .then(link => {
            cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
        })
        cy.get('.content_text').within(() => {
          cy.get('.local_title').should('contain.text', 'Не так важно, на каком этаже ваша квартира и куда выходят окна. Но точно важно, куда выходите вы.')
          cy.get('.text_fulldescription').should('contain.text', 'Собственный двор, напоминающий «Музеон», а также парк «Фили» в шаговой доступности.')
        })
        cy.get('.twopluses_item').eq(0).should('contain.text', '6 километров', '— общая протяженность набережной квартала, объединенной с Филевской набережной.')
        cy.get('.twopluses_item').eq(1).should('contain.text', 'Благоустроенная территория квартала с променадом и разнообразной зеленью.')
      })
    })
    cy.get('.head_around').within(() => { // изображение "360° панорама района" в мобильной версии
      cy.get('img')
        .should('have.attr', 'src', '/local/templates/new_main_29_08/image/embankment1.png')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
      })
      cy.get('a')
        .should('contain.text', '360°', 'панорама района')
        .and('have.attr', 'target', 'blank')
        .and('have.attr', 'href', 'https://visualhotels.com/beregovoy_new/')
        .then(link => {
          cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
      })
    })
  })

  it("Блок Парк 'Фили'", () => {
    cy.get('.parkfili_images').scrollIntoView().within(() => { // изображения и подписи к изображениям в мобильной версии
      cy.get('.images_item')
        .eq(0)
        .find('img')
        .should('have.attr', 'src', '/local/templates/new_main_29_08/image/parkfili1_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
      })
      cy.get('.images_item')
        .eq(1)
        .should('contain.text', 'В 15 минутах', 'неспешной', 'прогулки от', 'Берегового.')
        .find('img')
        .should('have.attr', 'src', '/local/templates/new_main_29_08/image/parkfili2_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
      })
    })
    cy.get('.parkfili_text').within(() => { // текст
      cy.get('.main_title').should('contain.text', 'Парк «Фили»')
      cy.get('.main_description').should('contain.text', 'Тенистые аллеи и занятия на свежем воздухе.')
      cy.get('.twopluses_block').eq(0).should('contain.text', 'Парк «Фили»', '— это живописные береговые склоны, лиственный и хвойный лес, вековые деревья, редкие виды растений, белки, которых можно кормить с рук.')
      cy.get('.twopluses_block').eq(1).should('contain.text', 'Это и занятия йогой, и летний кинотеатр, и мастер-классы, и клубы для молодых родителей. Тибетская гимнастика, скандинавская ходьба, танцы, фитнес.')
      cy.get('.fili_link')
        .should('contain.text', 'Посмотрите программу мероприятий на')
        .find('a')
        .should('contain.text', 'сайте парка')
        .and('have.attr', 'target', 'blank')
        .and('have.attr', 'href', 'https://parkfili.ru/')
        .then(link => {
          cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
      })
    }) 
  })

  it("Блок Инфраструктура", () => {
    cy.get('.main_infrastructure').scrollIntoView().within(() => {
      cy.get('.main_title').should('contain.text', 'Инфра', 'структура')
      cy.get('.content_left')
        .find('.main_description')
        .should('contain.text', 'Жилой квартал Береговой — самодостаточ­ный городской кластер c собственной инфра­струк­турой на территории 31,6 га.  Все в комплексе.')
      cy.get('.content_right').within(() => {
        cy.get('img')
          .should('have.class', 'right_image')
          .and('have.attr', 'src', '/local/templates/new_main_29_08/image/infrastructure2_new.jpg')
          .then(link => {
            cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)  
        })
        cy.get('.main_description').should('contain.text', 'Жилой квартал Береговой — самодостаточ­ный городской кластер c собственной инфра­струк­турой на территории 31,6 га.', 'Все в комплексе.')
        cy.get('.embk1').should('contain.text', 'Медицина и красота:', 'поликлиника, оздоровительные и эстетические центры, салоны красоты')
        cy.get('.embk2').should('contain.text', 'Стрит-ритейл и развлечения:', 'магазины, кафе, рестораны, кинотеатры, галереи')
        cy.get('.embk3').should('contain.text', 'Парковка:', 'подземные паркинги с лифтом, наземная гостевая парковка')
        cy.get('.embk4').should('contain.text', 'Безопасность:', 'контроль доступа, видеонаблюдение, приватные дворики')
        cy.get('.embk5').should('contain.text', 'Для спорта и активного отдыха:', '10 км дорожек для бега и велосипедных прогулок', 'занятия фитнесом и йогой с видом на парк и реку', 'wellness-студия на первом этаже 9-го корпуса')
      }) 
    })
  })
  
  it("Блок Благоустройство двора", () => {
    cy.get('.main_bliss').scrollIntoView().within(() => {
      cy.get('.main_title').should('contain.text', 'Благо', 'устрой', 'ство', 'двора')
      cy.get('img')
        .eq(0)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/street_1_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(1)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/street_2_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(2)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/street_3_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(3)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/street_4_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(4)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/street_5_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(5)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/street_6_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
    })
  })
  
  it("Блок Детство и юность", () => {
    cy.get('.child').scrollIntoView().within(() => {
      cy.get('.child-title').should('contain.text', 'Детство и юность')
      cy.get('img')
        .should('have.class', 'child-video-block')
        .and('have.attr', 'src', '/local/templates/new_main_29_08/img/child_photo.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('.main_description').should('contain.text', 'В Береговом безопасно и интересно всем: малышам, подросткам, молодым людям.')
      cy.get('.clasters_item').eq(0).should('contain.text', 'Детский сад на территории.')
      cy.get('.clasters_item').eq(1).should('contain.text', 'Развивающие программы:', 'математика и естественные науки, лингвистика и литература, культура и искусство.')
      cy.get('.clasters_item').eq(2).should('contain.text', 'Безопасные дворы без машин с видеонаблюдением.')
      cy.get('.clasters_item').eq(3).should('contain.text', 'Занятия и игры на свежем воздухе круглый год.')
      cy.get('.clasters_item').eq(4).should('contain.text', 'Детские площадки с оборудованием для физического развития, наблюдения за природой, творчества, общения и игр.')
    })
  })
  
  it("Блок Общественные пространства", () => {
    cy.get('.main_socialspace').scrollIntoView().within(() => {
      cy.get('.main_title').should('contain.text', 'Обще', 'ственные простран', 'ства')
      cy.get('img')
        .eq(0)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/lobby_1_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(1)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/lobby_2_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(2)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/lobby_3_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(3)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/lobby_4_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(4)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/lobby_5_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(5)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/lobby_6_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(6)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/lobby_7_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('img')
        .eq(7)
        .should('have.attr', 'src', '/local/templates/new_main_29_08/img/lobby_8_new.jpg')
        .then(link => {
          cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('.socialspace_goodh').within(() => {
        cy.get('img')
          .eq(0)
          .should('have.class', 'goodh_firts__image')
          .and('have.attr', 'src', '/local/templates/new_main_29_08/image/social1.jpg')
          .then(link => {
            cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
        cy.get('img')
          .eq(1)
          .should('have.attr', 'src', '/local/templates/new_main_29_08/image/social2_new.jpg')
          .then(link => {
            cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
        cy.get('.goodh_text').should('contain.text', 'Дизайн интерьера холлов продолжает', 'концепцию Берегового, вдохновлен­ного', 'рекой. Геометрия линий', 'повторяет рисунок изгиба русла с', 'высоты птичьего полета.')
      })
    })
  })
  
  it("Блок Забота как сервис", () => {
    cy.get('.main_care').scrollIntoView().within(() => {
      cy.get('.main_title').should('contain.text', 'Забота как сервис')
      cy.get('.main_description').should('contain.text', 'Мы в «Главстрое» не мыслим классами жилья, но не оттого, что хотим показаться оригинальными.', 'Оттого, что для нас класс — это просто степень вашей свободы от бытовой рутины.')
      cy.get('.care_list').eq(0).within(() => {
        cy.get('.list_item').eq(0).within(() => {
          cy.get('img')
            .should('have.attr', 'src', '/local/templates/new_main_29_08/image/port.svg')
            .then(link => {
              cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
          cy.get('.item_local__title').should('contain.text', 'Портье за стойкой', 'В лобби круглосуточно дежурит портье, который', 'всегда готов принять курьера, гостей или заказать', 'нужные услуги.')
        })
        cy.get('.list_item').eq(1).within(() => {
          cy.get('img')
            .should('have.attr', 'src', '/local/templates/new_main_29_08/image/door.svg')
            .then(link => {
              cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
          cy.get('.item_local__title').should('contain.text', 'Двери подъездов открываются сами', 'Если у вас с собой телефон с приложением', 'управляющей компании и на нем активирован', 'ble-ключ, то система узнает вас, и, когда вы подойдете', 'к двери, замок откроется.')
        })
        cy.get('.list_item').eq(2).within(() => {
          cy.get('img')
            .should('have.attr', 'src', '/local/templates/new_main_29_08/image/cam.svg')
            .then(link => {
              cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
          cy.get('.item_local__title').should('contain.text', 'Доступ к камерам на территории', 'В приложении можно наблюдать, что происходит', 'на детских площадках, в лобби, колясочных,', 'у центрального входа и на гостевой парковке.')
        })
      })
      cy.get('.care_list').eq(1).within(() => {
        cy.get('.list_item').eq(0).within(() => {
          cy.get('img')
            .should('have.attr', 'src', '/local/templates/new_main_29_08/image/pet.svg')
            .then(link => {
              cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
          cy.get('.item_local__title').should('contain.text', 'Мойка лап собак', 'Помыть лапы после прогулки можно прямо в лобби.')
        })
        cy.get('.list_item').eq(1).within(() => {
          cy.get('img')
            .should('have.attr', 'src', '/local/templates/new_main_29_08/image/lift.svg')
            .then(link => {
              cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
          cy.get('.item_local__title').should('contain.text', 'Умный лифт', 'Он управляется через приложение. Можно вызвать', 'грузовой или ближайший.')
        })
        cy.get('.list_item').eq(2).within(() => {
          cy.get('img')
            .should('have.attr', 'src', '/local/templates/new_main_29_08/image/tel.svg')
            .then(link => {
              cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
          })
          cy.get('.item_local__title').should('contain.text', 'Удобный доступ для гостей', 'Оправьте одноразовые пин-коды для входа в подъезд', 'и откройте домофон с телефона.')
        })
      })
    })
  })
  
  it("Блок Квартиры", () => {
    cy.get('.main_flats').scrollIntoView().within(() => {
      cy.get('.main_title').should('contain.text', 'Квартиры')
      cy.get('.main_flats_ipoteka')
        .find('a')
        .should('contain.text', 'Ипотека', 'от 0,1%')
        .and('have.attr', 'href', '/conditions-of-purchase') // ссылка на раздел Условия покупки
      cy.get('.imagetxt_left').within(() => {
        cy.get('.main_description').should('contain.text', 'Коллекция лучших планировочных решений.')
        cy.get('img')
          .should('have.attr', 'src', '/local/templates/new_main_29_08/image/flsm.jpg')
          .then(link => {
            cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
        cy.get('a')
          .should('contain.text', 'Альбом', 'планировок')
          .and('have.attr', 'target', 'blank')
          .and('have.attr', 'href', '/upload/Docs/ЖК%20Береговой%20-%20альбом%20планировок.pdf') // Альбом планировок
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
      })
      cy.get('.imagetxt_right').within(() => {
        cy.get('img')
          .should('have.attr', 'src', '/local/templates/new_main_29_08/image/flxxl.jpg')
          .then(link => {
            cy.request(link.prop('src')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
        cy.get('.description_b').should('contain.text', 'Максимальный выбор:', 'от студий до пятикомнатных вариантов.', 'Акцент сделан на квартирах для комфортной семейной жизни.')
        cy.get('.description_a')
          .find('a')
          .should('contain.text', 'Подробнее о квартирах', 'в Береговом')
          .and('have.attr', 'href', '/flats/') // ссылка на раздел Квартиры
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
      })
    })
  })

  it("Блок Получите приглашение на персональную презентацию", () => {
    cy.get('#to_form').scrollIntoView().should('have.class', 'feedback_form').within(() => {
      cy.get('#form_title').should('have.class', 'h4_a').and('contain.text', 'Получите приглашение на персональную презентацию')
      cy.get('.field').eq(0).find('input').should('have.attr', 'name', 'name').and('have.attr', 'placeholder', 'Ваше имя')
      cy.get('.field').eq(1).find('input').should('have.attr', 'name', 'phone').and('have.attr', 'placeholder', 'Ваш телефон').and('have.attr', 'maxlength', '18')
      cy.get('.or').should('contain.text', 'и')
      cy.get('.field').eq(2).find('input').should('have.attr', 'name', 'email').and('have.attr', 'placeholder', 'Ваш e-mail')
      cy.get('.check').within(() => {
        cy.get('label').should('have.class', 'check_in').and('contain.text', 'Я согласен с правилами')
        cy.get('a')
          .should('contain.text', 'обработки персональных данных')
          .and('have.attr', 'target', '_blank')
          .and('have.attr', 'href', '/images/Docs/soglasie_beregovoy.pdf?1635511413') // ссылка на Согласие на обработку персональных данных
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
      })
      cy.get('.btn_by').find('input').should('have.attr', 'type', 'submit').and('have.attr', 'value', 'Получить приглашение')
    })
  })

  it("Футер", () => {
    cy.get('footer').within(() => {
      cy.get('.address').should('contain.text', 'Москва, Береговой проезд, 3')
      cy.get('.phone')
      cy.get('.vk_soc')
        .should('have.attr', 'target', '_blank')
        // .and('have.attr', 'onclick', "gtag('event', 'social', {'event_category': 'onclick'}); yaCounter46927476.reachGoal('social'); return true; ")
        .and('have.attr', 'href', 'https://vk.com/beregovoy.kvartal')
        .then(link => {
          cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('.telegram_soc')
        .should('have.attr', 'target', '_blank')
        .and('have.attr', 'href', 'https://t.me/beregovoykvartal')
        .then(link => {
          cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
      })
      cy.get('p').should('contain.text', 'Предложения на сайте не являются публичной офертой, носят', 'информационный характер и нуждаются в подтверждении.')
      cy.get('.footer__info').should('contain.text', 'Информация по', 'проекту, варианты отделки, оборудования и', 'другие детали, представленные на', 'рендерах и', 'сайте, могут отличаться от', 'финального проекта, поскольку данная информация носит исключительно информационный характер и не', 'является публичной офертой. Все', 'спецификации будут указаны в', 'договоре долевого', 'участия.')
      cy.get('.bot_line').within(() => {
        cy.get('a')
          .eq(0)
          .should('contain.text', 'Проектная документация')
          .and('have.attr', 'target', '_blank')
          .and('have.attr', 'onclick', "gtag('event', 'doc', {'event_category': 'onclick'}); yaCounter46927476.reachGoal('doc');  return true; ")
          .and('have.attr', 'href', '/documents/')
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
        cy.get('a')
          .eq(1)
          .should('contain.text', 'Политика конфиденциальности')
          .and('have.attr', 'target', '_blank')
          .and('have.attr', 'onclick', "gtag('event', 'politika', {'event_category': 'onclick'}); yaCounter46927476.reachGoal('politika');  return true; ")
          .and('have.attr', 'href', '/images/Docs/personal_data_processing_policy.pdf?20211029')
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })
        cy.get('a')
          .eq(2)
          .should('contain.text', 'Согласие на обработку персональных данных')
          .and('have.attr', 'target', '_blank')
          .and('have.attr', 'onclick', "gtag('event', 'personal-date', {'event_category': 'onclick'}); yaCounter46927476.reachGoal('personal-date');   return true; ")
          .and('have.attr', 'href', '/images/Docs/soglasie_beregovoy.pdf?1635511413')
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200) // статус http-ответа должен соответствовать 200 (успешно)
        })        
      })
    })
  })
})