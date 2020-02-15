import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './App.css'
import Search from './Search'
import BookCase from './BookCase'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books: books }))
  }
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then();
    if (shelf === 'none') {
      // if we are setting the book's shelf to none, then remove it from our list of books
      this.setState({ books: this.state.books.filter(b => b.id !== book.id) })
    } else {
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
  }
  render() {
    return (
      <div className="app">
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={1000}
              classNames="activity-page"
            >
              <Switch location={location}>
                <Route exact path="/search" render={() => (
                  <Search
                    bookCaseBooks={this.state.books}
                    moveBook={this.moveBook}
                  />
                )} />
                <Route exact path="/" render={() => (
                  <BookCase
                    books={this.state.books}
                    moveBook={this.moveBook}
                  />
                )} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </div >
    )
  }
}

export default BooksApp
