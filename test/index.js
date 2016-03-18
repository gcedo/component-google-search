import 'babel-polyfill';
import Googlesearch from '../src';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme).should();

describe('Googlesearch', () => {
  it('is compatible with React.Component', () => {
    Googlesearch.should.be.a('function')
      .and.respondTo('render');
  });

  it('renders a React element', () => {
    React.isValidElement(<Googlesearch />).should.equal(true);
  });
});

