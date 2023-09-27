const booksPlace = document.getElementById('books')

const firstRender = (data) => {
    // localStorage.removeItem('mybook')
    let lastBookShelf = createElement('div', {
        classList: 'last-books-shelf',
    })
    
    booksPlace.append(lastBookShelf)
    data.forEach((e) => {
        let lastBook = `
            <div class="last-book__description">
                <h3 class="last-book__title" data-no-selection>${e.title}</h3>
                <p class="last-book__author" >${e.author}</p>
            </div>
            <img class="last-book__img" src="./img/books/${e.id}.webp">`
        let div = createElement('div', {
            classList: 'last-book click-book',
            id: `${e.id}`
        })

        div.innerHTML = lastBook
        lastBookShelf.appendChild(div)
    })
    
    
}
firstRender(booksbase.reverse())


let getBook = (id) => { 
    localStorage.setItem('mybook', JSON.stringify(id));
}

const topBtn = document.getElementById('scroll-to-top')


addEventListener("click", (e) => {
    if (e.target.closest('.click-book')) {
        getBook(e.target.closest('.click-book').id)
        window.location.href = "https://mybookbarakholka.github.io/mb/book-page";
    }
    if (e.target.classList.contains('scroll-to-top')) {
            document.getElementById('top').scrollIntoView({
                behavior: "smooth",
                // duration: 2000,
              });
          
    }
});


window.addEventListener('scroll', function() {
    if (window.pageYOffset >= 200) {
        topBtn.classList.add('show-flex')
    } else if (window.pageYOffset <= 200) {
        topBtn.classList.remove('show-flex')
    }

});

