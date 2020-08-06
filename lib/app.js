function getAllItems() {
    const items = [{ name: 'Vasya' }, { name: 'Petya' }, { name: 'Vanya' }];
    return items;
}
;
function createBook(ctor, title, author, pages) {
    return new ctor(title, author, pages);
}
class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}
const b = createBook(Book, 'title', 'author', 35);
//# sourceMappingURL=app.js.map