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
    BooksAPI.search(search).then(books => this.setState({ books: Array.isArray(books) ? books : [] }))
    this.setState({ search: search })
  }
  render() {
    return (
      <div className="search-books">
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
            {this.state.books.map(book => <li key={book.id}><Book book={book} /></li>)}
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
        <ShelfChanger />
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors && props.book.authors.join(', ')}</div>
    </div>
  )
}

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => <li key={book.id}><Book book={book} /></li>)}
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
          <BookShelf title="Currently Reading" books={props.books.filter(book => book.shelf === 'currentlyReading')} />
          <BookShelf title="Want to Read" books={props.books.filter(book => book.shelf === 'wantToRead')} />
          <BookShelf title="Read" books={props.books.filter(book => book.shelf === 'read')} />
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

function ShelfChanger() {
  return (
    <div className="book-shelf-changer">
      <select>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => { console.log(books); this.setState({ books: books }); })
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/">
          <BookCase books={this.state.books} />
        </Route>
      </div>
    )
  }
}

export default BooksApp
