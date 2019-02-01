import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SORTS } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sort = ({ sortKey, activeSortKey, isSortReverse, onSort, children }) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey}
  );

  const sortArrow = classNames(
    '',
    { 'arrow-up': sortKey === activeSortKey && isSortReverse},
    { 'arrow-down': sortKey === activeSortKey && !isSortReverse}
  )

  return (
    <div>
      <FontAwesomeIcon icon={sortArrow}/>
      <Button
        onClick={ () => onSort(sortKey) }
        className={sortClass}
        >
        { children }
      </Button>
    </div>
  )
}

const BookNode = ({index, book, onDismissHandler}) =>
  <div className="table-row">
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

const BooksList = ({list, sortKey, isSortReverse, onSort, onDismissHandler = null}) => {
  const sortedList = isSortReverse ? SORTS[sortKey](list).reverse() : SORTS[sortKey](list);

  const books = sortedList.map( (item, index) =>
    <BookNode key={item.objectID} index={index + 1} book={item} onDismissHandler={onDismissHandler}/>)

  return (
    <div className="table">
      <div className="table-header">
        <span style={{width: '2%'}}> </span>
        <span style={{width: '5%'}}> </span>
        <span style={{width: '40%'}}>
          <Sort
            sortKey={'TITLE'}
            isSortReverse={isSortReverse}
            onSort={onSort}
            activeSortKey={sortKey}
            >
            Title
          </Sort>
        </span>
        <span style={{width: '20%'}}>
          <Sort
            sortKey={'AUTHOR'}
            isSortReverse={isSortReverse}
            onSort={onSort}
            activeSortKey={sortKey}
            >
            Author
          </Sort>
        </span>
        <span style={{width: '10%'}}>
          <Sort
            sortKey={'COMMENTS'}
            isSortReverse={isSortReverse}
            onSort={onSort}
            activeSortKey={sortKey}
            >
            Comments
          </Sort>
        </span>
        <span style={{width: '10%'}}>
          <Sort
            sortKey={'POINTS'}
            isSortReverse={isSortReverse}
            onSort={onSort}
            activeSortKey={sortKey}
            >
            Points
          </Sort>
        </span>
        <span style={{width: '10%'}}>
          Archive
        </span>
      </div>
      { books }
    </div>
  )
}

BooksList.propTypes = {
  list: PropTypes.array.isRequired,
  onDismissHandler: PropTypes.func.isRequired,
};

export default BooksList;
