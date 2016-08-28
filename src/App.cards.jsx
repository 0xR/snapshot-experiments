import React from 'react';
import cards from 'reactcards';
import App from './App.jsx';

const demo = cards('demo');

demo.card(
  `## markdown doc
  you can use markdown for card documentation
  - foo
  - bar`,
  <App />
);

