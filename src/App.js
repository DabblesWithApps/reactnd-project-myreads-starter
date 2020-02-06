import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

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
        this.setState({ books: this.setShelves(books) })
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
  render() {
    return (
      <div className="search-books" >
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input onChange={this.handleInput} type="text" placeholder="Search by title or author" value={this.state.search} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => <li key={book.id}><Book moveBook={this.props.moveBook} book={book} /></li>)}
          </ol>
        </div>
      </div>
    )
  }
}

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${props.book.imageLinks.smallThumbnail}")` }}></div>
        <ShelfChanger moveBook={props.moveBook} book={props.book} />
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors && props.book.authors.join(', ')}</div>
    </div>
  )
}

class ShelfChanger extends React.Component {
  handleInput = (e) => {
    const shelf = e.target.value
    this.props.moveBook(this.props.book, shelf)
  }
  render() {
    return (
      <div className="book-shelf-changer" >
        <select onChange={this.handleInput} value={this.props.book.shelf || 'none'}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => <li key={book.id}><Book moveBook={props.moveBook} book={book} /></li>)}
        </ol>
      </div>
    </div>
  )
}

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

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books: books }))
  }
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then();

    // if the book is already in the book array, update its shelf
    // otherwise, add it to the array with its updated shelf
    const books = this.state.books.some(b => b.id === book.id) ?
      this.state.books.map(b => {
        b.id === book.id && (b.shelf = shelf)
        return b;
      }) :
      this.state.books.concat([{ ...book, shelf: shelf }])

    this.setState({ books: books })
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/search">
          <Search bookCaseBooks={this.state.books} moveBook={this.moveBook} />
        </Route>
        <Route exact path="/">
          <BookCase books={this.state.books} moveBook={this.moveBook} />
        </Route>
      </div>
    )
  }
}

export default BooksApp
