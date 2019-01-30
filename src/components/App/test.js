import React from 'react';
import ReactDOM from 'react-dom';
import App, { Search, Button, BooksList } from './index';
import renderer from 'react-test-renderer'

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
      const component = renderer.create(
        <App/>
      )
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
  });

});

describe('Search', () => {
  if('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Search>Search</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {
  if('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Give me more more!</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Button>Give me more</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('BookList', () => {
  const props = {
    list: [
      {title: '1', author: 'Darth', num_comments: 1, points: 2, objectID: 'y'},
      {title: '2', author: 'Mauth', num_comments: 1, points: 2, objectID: 'z'},
    ],
  };

  if('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BooksList { ...props }/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <BooksList { ...props }/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
