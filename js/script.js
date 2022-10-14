class Book{
    
    constructor(author, title, numberOfPages, language, isRead){
        this.author = author;
        this.title = title;
        this.numberOfPages = numberOfPages;
        this.language = language;
        this.isRead = isRead;
    }
}

class Library {
    constructor () {
        this.myLibrary = [{
            author:'George R.R.Martin',
            title:'Game Of Thrones',
            numberOfPages:694,
            language:'English',
            isRead: true
        }];
    }   

    getMyLibrary(){
        return this.myLibrary;
    }
    
    addBookToLibrary(book){
        this.myLibrary.push(book);
    }
    
}

let library = new Library();


/*UI */
const add = document.getElementById("add-book");
const createBook = document.getElementById('close-modal');
const books = document.querySelector(".books");
const modal = document.querySelector(".popup-modal")
const form = document.querySelector('#my-form')


function resetBookGrid(){
    books.textContent = "";
}

function updateBooksGrid(){
    resetBookGrid();
    num = 0;
    for (let book of library.getMyLibrary()) {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book");

        const crossSign = document.createElement("div");
        crossSign.textContent = '×';
        crossSign.classList.add("delete");
        bookContainer.appendChild(crossSign)

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = book.title;
        bookContainer.appendChild(title);

        let author = document.createElement("div");
        author.textContent = `By: ${book.author}`;
        bookContainer.appendChild(author);

        let pages= document.createElement("div");
        pages.textContent = `Number of pages: ${book.numberOfPages}`;
        bookContainer.appendChild(pages);

        const language = document.createElement("div");
        language.textContent = `Language: ${book.language}`;
        bookContainer.appendChild(language)

        const isRead = document.createElement("div");
        isRead.classList.add("read-status");

        const label = document.createElement("label");
        label.textContent = "mark as read :"
        isRead.appendChild(label);
        
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = book.isRead;
        input.classList.add("marked-read");
        isRead.append(input);

        bookContainer.appendChild(isRead);

        if(book.isRead){
            bookContainer.classList.add("read-template");
        }
        else{
            bookContainer.classList.add("not-read-template");
        }

        bookContainer.setAttribute("data-id", num);
        num++;
        books.appendChild(bookContainer);
    }
}


function openModal(){
    modal.classList.add('visible');
}

function closeModal(){
    modal.classList.remove('visible');
}

function getBookFromInput(){
    const title = document.querySelector(".popup-modal #title").value;
    const author = document.querySelector(".popup-modal #author").value;
    const language = document.querySelector(".popup-modal #language").value;
    const pages = document.querySelector(".popup-modal #pages").value;
    const isRead = document.querySelector(".popup-modal #isRead").checked;

    return new Book( author,title, pages, language, isRead);
}

add.addEventListener("click", openModal)

modal.addEventListener("click", function(e){
    if(e.target !== this){
        return
    }
    closeModal();
});


form.addEventListener("submit", function(e){
    e.preventDefault();
    const newBook = getBookFromInput();
    library.addBookToLibrary(newBook);
    updateBooksGrid();
    closeModal();
    })

books.addEventListener("click", function(e){
    if( e.target.classList.contains("delete")){
        const index = +e.target.parentNode.dataset.id;
        library.getMyLibrary().splice(index, 1);
        updateBooksGrid();
        num--;
    }
})

books.addEventListener('click', function(e){
    if(e.target.classList.contains("marked-read")){
        e.target.parentNode.parentNode.classList.toggle("read-template");
        e.target.parentNode.parentNode.classList.toggle("not-read-template");
    }
})