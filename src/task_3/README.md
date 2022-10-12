# 3. Key Prop

Review following code snippet and answer questions:
1. What’s wrong with this code snippet?
2. How can we improve it?
3. Are there any cases when this code can be used with no modification?

Example:

```
export interface Book {
  id: string;
  name: string;
}
export const BooksList: FC<{ books: Book[] }> = ({ books }) => {
 return (
   <ul>
     { books.map((book, i) => <li key={i}>{book.name}</li>}) }
</ul> )
}
```
## Answers
1. What’s wrong with this code snippet?

- No import "FC" from react;
- For the key value it's better to use book.id - it will be unique key and when this array is changed, 
the React will re-render without errors.

2. How can we improve it?
- Add import { FC } from "react"
- Add unique key book.id for ```<li key={book.id}>{book.name}</li>```
- In my opinion better separate props for component and interface Book. This will improve the readability of the code.

Code after changes:

```
import { FC } from "react";

export interface Book {
  id: string;
  name: string;
}

interface BooksListProps {
   books: Book[]
}

export const BooksList: FC<BooksListProps> = ({ books }) => {
  return (
    <ul>
      {books.map((book, i) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};
```
3. List will be rendered, but the TypeScript compiler will show an error.
