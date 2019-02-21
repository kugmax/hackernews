import React, { useState, useEffect } from 'react';
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
  : <Component {...rest}/>;

const ButtonWithLoading = withLoading(Button);

export const updateSearchTopStoriesState = (hits, page) => (searchKey, results) => {
  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];
  const updatedHits = [...oldHits, ...hits];

  return {
    ...results,
    [searchKey]: {hits: updatedHits, page}
  }
};

function App() {
  const [results, setResults] = useState({});
  const [searchKey, setSearchKey] = useState(DEFAULT_QUERY);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(faArrowDown);

  useEffect( () => {
    fetchSearchTopStories(searchTerm);
  }, [false]);

  const fetchSearchTopStories = (searchTerm, page=0) => {
    setIsLoading(true);

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
      &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
        .then(respons => setSearchTopStories(searchTerm, respons.data))
        .catch(error => setErrorWithDebug(error));
  };

  const setErrorWithDebug = (error) => {
    console.log(error);
    setError(error)
  };

  const setSearchTopStories = (reqSearch, json) => {
    const { hits, page } = json;

    setIsLoading(false);

    const resultMerger = updateSearchTopStoriesState(hits, page);
    const newResults = resultMerger(reqSearch, results);
    setResults(newResults);
  };

  const onDismiss = (id) => {
    const { hits, page } = results[searchKey];

    const isNotID = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotID);

    setResults({
      ...results,
      [searchKey]: {hits: updatedHits, page}
    });
  };

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const needsToSearchTopStories = (searchTerm) => !results[searchTerm];

  const onSearchSubmit = (event) => {
    setSearchKey(searchTerm);

    if (needsToSearchTopStories(searchTerm)) {
      fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  };

  const page = (results && results[searchKey] && results[searchKey].page) || 0;
  const list = (results && results[searchKey] && results[searchKey].hits) || [];

  return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
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
              onDismissHandler={onDismiss}/>
        }
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => fetchSearchTopStories(searchKey, page+1)}>
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
}

export default App;

export {
  Button, Search, BooksList
};
