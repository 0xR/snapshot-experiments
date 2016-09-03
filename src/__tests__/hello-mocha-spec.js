import App from '../App.jsx';

describe('Mocha and sinon setup', () => {
  it('sinon should integrate with chai', () => {
    const mySpy = sinon.spy();
    mySpy('my args');
    expect(mySpy).to.have.been.calledWithExactly('my args');
  });
});
