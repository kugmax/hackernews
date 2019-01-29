import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list_of_books = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

function isSearched(searchTerm) {
  return (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase());
}

const BookNode = ({book, onDismissHandler}) =>
  <div key={book.objectID}>
    <span style={{width: '40%'}}>
      <a href={book.url}>{book.title}</a>
    </span>
    <span style={{width: '30%'}}>
      {book.author}
    </span>
    <span style={{width: '10%'}}>
      {book.num_comments}
    </span>
    <span style={{width: '10%'}}>
      {book.points}
    </span>
    <span style={{width: '10%'}}>
      <Button
        onClick={() => onDismissHandler(book.objectID)}
        className="button-inline">
        Dismiss
      </Button>
    </span>
  </div>

const BooksList = ({list, pattern, onDismissHandler}) =>
  list
  .filter(isSearched(pattern))
  .map(item =>
    <div calssName="table">
      <BookNode book={item} onDismissHandler={onDismissHandler}/>
    </div>
  );

const Search = ({value, onChange, children}) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}/>
  </form>

const Button = ({onClick, className = '', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button">
    {children}
  </button>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list_of_books,
      searchTerm: ''
    };
  }

  onDismiss = (id) => {
    const isNotID = item => item.objectID != id;
    const updatedList = this.state.list.filter(isNotID);
    this.setState({list: updatedList})
  }

  onSearchChange = (event) => {
    this.setState({searchTerm: event.target.value})
  }

  render() {
    const { searchTerm, list } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}>
            Search
          </Search>
        </div>

        <BooksList
          list={list}
          pattern={searchTerm}
          onDismissHandler={this.onDismiss}/>
      </div>
    );
  }
}

export default App;
