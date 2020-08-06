function getAllItems(): Array<object> {
  const items = [{ name: 'Vasya'}, { name: 'Petya' }, { name: 'Vanya'}];
  return items;
};

interface BookInterface {
  title: string,
  author: string,
  pages: number
}

interface BookConstructorInterface {
  new (title: string, author: string, pages: number): BookInterface; 
}

function createBook(ctor: BookConstructorInterface, title: string, author: string, pages: number) {
  return new ctor(title, author, pages)
}

class Book implements BookInterface {
  constructor(public title: string, public author: string, public pages: number){}
}

const b = createBook(Book, 'title', 'author', 35);