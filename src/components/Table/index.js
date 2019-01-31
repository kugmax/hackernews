import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';

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

const BooksList = ({list, onDismissHandler = null}) => {
  const books = list.map( (item, index) => <BookNode key={item.objectID} index={index + 1} book={item} onDismissHandler={onDismissHandler}/>)

  return (
    <div className="table">
      { books }
    </div>
  )
}

BooksList.propTypes = {
  list: PropTypes.array.isRequired,
  onDismissHandler: PropTypes.func.isRequired,
};

export default BooksList;
