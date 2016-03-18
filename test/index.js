import 'babel-polyfill';
import Googlesearch from '../src';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
chai.use(chaiEnzyme()).should();

describe('Googlesearch', () => {
  it('is compatible with React.Component', () => {
    Googlesearch.should.be.a('function')
      .and.respondTo('render');
  });

  it('renders a React element', () => {
    React.isValidElement(<Googlesearch />).should.equal(true);
  });

  it('checks for correct state when client-rendering', () => {
    // Shallow was used rather than mount, otherwise the component is mounted
    // twice in the example, as the Google APIs are called twice.
    const wrapper = shallow(<Googlesearch />);
    wrapper.state().useFallback.should.equal(false);
  });
});

