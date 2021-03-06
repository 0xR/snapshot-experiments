import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App.jsx';

describe('App component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <App />
    ).toJSON();

    expect(tree).to.matchSnapshot(`${__filename}.snap`, 'App renders correctly');
  });
});
