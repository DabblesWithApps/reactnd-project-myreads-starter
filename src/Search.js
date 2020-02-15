import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
    state = {
        search: '',
        books: []
    }
    handleInput = (e) => {
        const search = e.target.value
        this.setState({ search: search })
        this.getBooks(search)
    }
    getBooks = (search) => {
        BooksAPI.search(search).then(books => {
            if (Array.isArray(books)) {
                const booksWithShelvingData = this.setShelves(books)
                this.setState({ books: booksWithShelvingData })
            } else {
                this.setState({ books: [] })
            }
        })
    }
    // sets shelves in search results by cross-referencing the shelves from our book case books
    setShelves = (books) => books.map((book) => {
        const b = this.props.bookCaseBooks.find(b => b.id === book.id)
        const shelf = b ? b.shelf : 'none'
        return {
            ...book,
            shelf: shelf
        }
    })
    clearSearch = () => {
        this.setState({ search: '' })
        document.getElementById('search').focus();
    }
    render() {
        const searchContents = (this.state.books.length === 0 && this.state.search !== '') ?
            (
                <div>
                    <p>No results found for "{this.state.search}".</p>
                    <button onClick={this.clearSearch}>Clear search</button>
                </div>
            ) :
            (
                <ol className="books-grid">
                    {this.state.books.map(book => <li key={book.id}><Book moveBook={this.props.moveBook} book={book} /></li>)}
                </ol>
            )
        return (
            <div className="search-books" >
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input id="search" onChange={this.handleInput} type="text" placeholder="Search by title or author" value={this.state.search} />
                    </div>
                </div>
                <div className="search-books-results">
                    {searchContents}
                </div>
            </div>
        )
    }
}

export default Search