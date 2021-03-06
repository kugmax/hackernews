import React from 'react';
import ReactDOM from 'react-dom';
import App, { Search, Button, BooksList, updateSearchTopStoriesState } from './index';
import renderer from 'react-test-renderer'

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner , faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner, faArrowUp, faArrowDown );

// export function FontAwesomeIcon(props) {
//   return <i className="fa" />
// }

Enzyme.configure({ adapter: new Adapter() });

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

  it('', () => {
    const hits = [3, 4];
    const page = 1;


    const searchKey = 'something';
    const prevResults = {
        something: {
          hits: [1, 2],
          page: 0
        }
    };

    const updater = updateSearchTopStoriesState(hits, page);
    const nexResults = updater(searchKey, prevResults);

    expect(nexResults['something'].hits).toEqual([1, 2, 3, 4]);
    expect(nexResults['something'].page).toBe(1);
  });

});

describe('Search', () => {
  it('renders without crashing', () => {
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
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button onClick={() => ''}>Give me more more!</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Button onClick={() => ''}>Give me more</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it ('should use className', () => {
    const element = shallow(
      <Button className='giveMeMore' onClick={() => ''}>Give me more</Button>
    )
    expect(element.find('.giveMeMore').length).toBe(1)
  });
});

describe('BookList', () => {
  const props = {
    list: [
      {title: '1', author: 'Darth', num_comments: 1, points: 2, objectID: 'y'},
      {title: '2', author: 'Mauth', num_comments: 1, points: 2, objectID: 'z'},
    ],
    sortKey: 'TITLE',
    isSortReverse: false
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BooksList { ...props } onDismissHandler={() => ''}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <BooksList { ...props } onDismissHandler={() => ''}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows tow items in list', () => {
    const element = mount(
      <BooksList {...props} onDismissHandler={() => ''}/>
    );
    expect(element.find('.table').length).toBe(1);
    expect(element.find('.table-row').length).toBe(2);
  });

});
