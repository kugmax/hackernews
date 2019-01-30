import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100'

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

const BookNode = ({index, book, onDismissHandler}) =>
  <div key={book.objectID} className="table-row">
    <span style={{width: '2%'}}>
      {index}
    </span>
    <span style={{width: '5%'}}>
      {book.objectID}
    </span>
    <span style={{width: '40%'}}>
      <a target="_blank" href={book.url}>{book.title}</a>
    </span>
    <span style={{width: '20%'}}>
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

const BooksList = ({list, onDismissHandler}) =>
  list
  .map( (item, index) =>
    <div calssName="table">
      <BookNode index= {index + 1} book={item} onDismissHandler={onDismissHandler}/>
    </div>
  );

const Search = ({value, onChange, onSubmit, children}) =>
  <form onSubmit={onSubmit} className="table-header">
    <input
      type="text"
      value={value}
      onChange={onChange}
      />

    <button type="submit">
      {children}
    </button>
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
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
  }

  setSearchTopStories = (result) => {
    console.log(result)

    const {hits, page} = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];

    this.setState({
      result: {hits: updatedHits, page}
    })

  }

  componentDidMount = () => {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }


  onDismiss = (id) => {
    const isNotID = item => item.objectID != id;
    const updatedHits = this.state.result.hits.filter(isNotID);
    this.setState({
      result: { ...this.state.result, hits: updatedHits}
    })
  }

  onSearchChange = (event) => {
    this.setState({searchTerm: event.target.value})
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  fetchSearchTopStories = (searchTerm, page=0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
      &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;

    if (!result) {return null;}

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            >
            Search
          </Search>
        </div>

        {
          result ?
          <BooksList
            list={result.hits}
            onDismissHandler={this.onDismiss}/>
          : null
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page+1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
