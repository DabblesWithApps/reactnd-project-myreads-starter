import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

function BookCase(props) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf title="Currently Reading" moveBook={props.moveBook} books={props.books.filter(book => book.shelf === 'currentlyReading')} />
                    <BookShelf title="Want to Read" moveBook={props.moveBook} books={props.books.filter(book => book.shelf === 'wantToRead')} />
                    <BookShelf title="Read" moveBook={props.moveBook} books={props.books.filter(book => book.shelf === 'read')} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    )
}

export default BookCase