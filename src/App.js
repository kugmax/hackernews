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
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };
  }

  setSearchTopStories = (json) => {
    const { hits, page } = json;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: {hits: updatedHits, page}
      }
    })
  }

  componentDidMount = () => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotID = item => item.objectID != id;
    const updatedHits = hits.filter(isNotID);

    this.setState({
      results: {
        ...results,
        [searchKey]: {hits: updatedHits, page}
      }
    })
  }

  onSearchChange = (event) => {
    this.setState({searchTerm: event.target.value})
  }

  needsToSearchTopStories = (searchTerm) => !this.state.results[searchTerm]

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    
    event.preventDefault();
  }

  fetchSearchTopStories = (searchTerm, page=0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
      &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(json => this.setSearchTopStories(json))
    .catch(error => error);
  }

  render() {
    const { searchTerm, results, searchKey } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

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
        <BooksList
            list={list}
            onDismissHandler={this.onDismiss}/>
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page+1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
