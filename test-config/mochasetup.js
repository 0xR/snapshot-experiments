import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiJestSnapshot from 'chai-jest-snapshot';

chai.use(sinonChai);
chai.use(chaiJestSnapshot);

global.expect = expect;
global.sinon = sinon;
