import React from 'react'
import Book from './Book'
import { ReactComponent as SadFace } from './icons/sad.svg'

function BookShelf(props) {
    const shelfContents = props.books.length === 0 ?
        (
            <div className="no-books-content">
                <p><SadFace /></p>
                <p>No books found in "{props.title}" category!</p>
                <p>Click the + button in the bottom-right corner to search for books to add.</p>
            </div>
        ) :
        (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map(book => <li key={book.id}><Book moveBook={props.moveBook} book={book} /></li>)}
                </ol>
            </div >
        )
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            {shelfContents}
        </div >
    )
}

export default BookShelf