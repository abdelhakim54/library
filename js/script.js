let myLibrary = [
    {
        author:'George R.R.Martin',
        title:'Game Of Thrones',
        numberOfPages:694,
        language:'English',
        isRead: true
    }
]

let num = 0;

const add = document.getElementById("add-book");
const createBook = document.getElementById('close-modal');
const books = document.querySelector(".books");

function Book(author, title, numberOfPages, language, isRead){
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.language = language;
    this.isRead = isRead;
}

function addBookToLibrary(book){

    myLibrary.push(book);
}

function resetBookGrid(){
    books.textContent = "";
}

function updateBooksGrid(){
    resetBookGrid();
    num = 0;
    for (let book of myLibrary) {
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


function toggleModalAddBook() {
    const modalDiv = document.querySelector('.popup-modal');
    const backdrop = document.querySelector('.backdrop')
    modalDiv.classList.toggle('show');
    backdrop.classList.toggle('show');
}

function getBookFromInput(){
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const language = document.getElementById("language").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("status").checked;

    return new Book(title, author, pages, language, isRead);
    
}



add.addEventListener("click", toggleModalAddBook)



createBook.addEventListener("click", function(e){
    e.preventDefault();
    const newBook = getBookFromInput();
    addBookToLibrary(newBook);
    toggleModalAddBook();
    updateBooksGrid();
    })

books.addEventListener("click", function(e){
    if( e.target.classList.contains("delete")){
        const index = e.target.parentNode.dataset.id;
        myLibrary.splice(index, 1);
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