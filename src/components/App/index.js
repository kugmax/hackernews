import React, { Component } from 'react';
import {
  DEFAULT_QUERY, DEFAULT_HPP,
  PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, PARAM_HPP
} from '../../constants';
import Button from '../Button';
import Search from '../Search';
import BooksList from '../Table';
import Loading from '../Loading';

import axios from 'axios';
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner , faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner, faArrowUp, faArrowDown );

const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
  ? <Loading/>
  : <Component {...rest}/>

const ButtonWithLoading = withLoading(Button);

export const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];
  const updatedHits = [...oldHits, ...hits];

  return {
    results: {
      ...results,
      [searchKey]: {hits: updatedHits, page}
    },
    isLoading: false
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    };
  }

  setSearchTopStories = (json) => {
    const { hits, page } = json;
    this.setState(updateSearchTopStoriesState(hits, page));
  };

  componentDidMount = () => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotID = item => item.objectID !== id;
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
    this.setState({ isLoading: true });

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
      &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(respons => this.setSearchTopStories(respons.data))
    .catch(error => this.setState({ error }));
  }

  render() {
    const { searchTerm, results, searchKey, error, isLoading} = this.state;
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
        { error
          ? <div className="interactions">
            <p>Something went wrong.</p>
          </div>
          :
          <BooksList
              list={list}
              onDismissHandler={this.onDismiss}/>
        }
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page+1)}>
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;

export {
  Button, Search, BooksList
};
