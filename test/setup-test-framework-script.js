import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiJestSnapshot from 'chai-jest-snapshot';

chai.use(sinonChai);
chai.use(chaiJestSnapshot);

// Make chai ".not" writable
const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get;
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    this.isNot = true;
    return originalNot.apply(this);
  },
  set(newNot) {
    return newNot;
  },
});

global.sinon = sinon;

global.jasmineExpect = global.expect;

global.expect = actual => {
  const originalMatchers = global.jasmineExpect(actual);
  const chaiMatchers = chai.expect(actual);
  const combinedMatchers = Object.assign(chaiMatchers, originalMatchers);
  return combinedMatchers;
};

