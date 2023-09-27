const modalWindow = document.getElementsByClassName('modal-window-box')[0]

let data = JSON.parse(localStorage.getItem("mybook")) 

function showBook() {
    if (modalWindow.classList.contains('show')){
        modalWindow.classList.remove('show')
    }

    let bookWrap = createElement('div', {
        classList: 'book-wrap'
    })

    let book = createElement('div', {
        classList: 'book'
    })

    let bookDescription = `
            <img class="book__img" src="./img/books/${data}.webp">
            <div class="book__description">
                <h2 class="book__title">${booksbase[data].title}</h2>
                <p class="book__author">${booksbase[data].author}</p>
            </div>`

    book.innerHTML = bookDescription



    let tableWrap = createElement('div', {
        classList: 'table-wrap'
    })
    
    let tableTitle = `<h3 class="table-title">Активні пропозиції</h3>`

    let table = createElement('table', {
        classList: 'table'
    })
    let thead = `<thead>
        <tr class="table__row">
            <th scope="col">Ціна</th>
            <th scope="col">Місто</th>
            <th scope="col">Стан</th>
            <th scope="col">Продавець</th>
        </tr>
    </thead>`

    tableWrap.innerHTML = tableTitle
    table.innerHTML = thead
    tableWrap.appendChild(table)


    let tbody = createElement('tbody')
    table.appendChild(tbody)


    booksbase[data].offers.forEach((e) => {

        let tableRow = createElement('tr', {
            classList: 'table__row'
        })

        let price

        if (typeof e.price === 'number') {
            price = `<td scope="row" id ='${e.oId}'>${e.price}</td>`
        
        } else if (e.price === 'Обмін'){
            price = `<td scope="row" class="deal deal_exchange"  id ='${e.oId}'>
                <span class="deal__title">${e.price}</span>
                <p class="deal__desc deal__desc_${e.oId} deal__desc_excahge">Автор оголошення хоче обміняти цю книгу, для деталей натисніть на нік автора оголошення</p>
            </td>`
        } else if (e.price === 'Купівля') {
            price = `<td scope="row" class="deal deal_buying"  id ='${e.oId}'>
                <span class="deal__title">${e.price}</span>
                <p class="deal__desc deal__desc_${e.oId} deal__desc_buying">Автор оголошення шукає дану книгу і готовий розглянути вашу пропозицію</p>
            </td>`
        }

        let tableItem = `${price}
                 <td>${e.city}</td>
                 <td>${e.condition}</td>
                 <td>
                   <button type="button" class="table__author-btn" id="${e.link}">${e.link}</button>
                 </td>`
        tableRow.innerHTML = tableItem
        tbody.appendChild(tableRow)
    })
    
    bookWrap.append(book, tableWrap)
    books.append(bookWrap)
}

showBook()

function getModal(id) {
    for (let key in booksbase[data].offers) {
        if (booksbase[data].offers[key].link === id) {
            let dropDownMenu = createElement('div', {
                classList: 'modal-window'
            })
            
                if (booksbase[data].offers[key].comment) {
                    let ddmicomment = createElement('p', {
                        classList: 'modal-window__comment',
                        textContent:`Коментар автора оголошення: ${booksbase[data].offers[key].comment}`
                    })
                    dropDownMenu.prepend(ddmicomment)
                }
            let dropDownMenuLinksBox = createElement('div', {
                classList: 'modal-window__links'
            })
            let dropDownMenuLinksBtn = createElement('button', {
                classList: 'modal-window__close-btn',
                textContent: 'X'
            })

            let dropDownMenuLinks = `<p class="modal-window__link-wrap">
                    <a class="modal-window__link" href="${booksbase[data].offers[key].authorLink}">Перейти на сторінку продавця &gt;</a>
                </p>
                <p class="modal-window__link-wrap">
                    <a class="modal-window__link" href="${booksbase[data].offers[key].postLink}">Перейти на пост продавця &gt;</a>
                </p>`

            dropDownMenuLinksBox.innerHTML = dropDownMenuLinks
            dropDownMenu.append(dropDownMenuLinksBox, dropDownMenuLinksBtn)
    
            modalWindow.innerHTML = dropDownMenu.outerHTML  
        }
    }
    
}

let timeout
let interval
document.addEventListener("click", (e) => {
    if (e.target.classList.contains('table__author-btn') || e.target.classList.contains('modal-window-box') || e.target.classList.contains('modal-window__close-btn') ) {
        getModal(e.target.id)
        modalWindow.classList.toggle('show')
    }
    if (e.target.classList.contains('table__author-btn')) {
        window.history.pushState({}, '', window.location.href)
    }
    if (e.target.classList.contains('modal-window-box') || e.target.classList.contains('modal-window__close-btn')) {
        history.back()
    }
    if (e.target.classList.contains('header__backBtn') || e.target.classList.contains('header__title')) {
        window.location.href = "https://mybookbarakholka.github.io/mb";
    }
    

    if (e.target.closest('.deal')) {
            let hint

            let id = e.target.closest('.deal').id
            let hintClass = '.deal__desc_' + id
            
            hint = document.querySelector(hintClass)

            if (!hint.classList.contains('show')) {
            
                hint.classList.add('show')
                hint.style.opacity = 1
    
                let opacity = hint.style.opacity;
    
                timeout = setTimeout(() => {
                    interval = setInterval(() => {
                        opacity -= 0.01;
                        hint.style.opacity = opacity;
                      
                        if (opacity <= 0) {
                          clearInterval(interval);
                            hint.classList.remove('show')
                        }
                      }, 10);
                }, 2000)
            } else {
                hint.classList.remove('show')
                hint.style.opacity = 0
            }
            

            

        // }
        
    }
});

window.addEventListener('popstate', () => {
    if (modalWindow.classList.contains('show')) {
        modalWindow.classList.remove('show')
    }
    
});