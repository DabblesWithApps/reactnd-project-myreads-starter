import React from 'react'

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

export default ShelfChanger