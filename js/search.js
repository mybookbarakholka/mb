let search = document.querySelector('#search')

let items = document.querySelectorAll('.last-book')


document.addEventListener('input', () => {
    if (search != '') {
        items.forEach((e) => {
            let title = e.querySelector('.last-book__title').innerText.toLowerCase()
            let author = e.querySelector('.last-book__author').innerText.toLowerCase()
            if (title.search(search.value.toLowerCase()) == -1 && author.search(search.value.toLowerCase()) == -1) {
                e.classList.add('hide')
            }
            else {
                e.classList.remove('hide')
            }
        })
    }
   else {
    items.forEach((e) => {
        let title = e.querySelector('.last-book__title').innerText.toLowerCase()
        let author = e.querySelector('.last-book__author').innerText.toLowerCase()
        if (title.search(search.value.toLowerCase()) == -1 && author.search(search.value.toLowerCase()) == -1) {
            e.classList.remove('hide')
        }
    })
   }
})