import { run } from 'reactcards';

const testsContext = require.context('.', true, /\.cards\.jsx?$/);
testsContext.keys().forEach(testsContext);

if (module.hot) {
  module.hot.accept();
}

// off we go...
run();
