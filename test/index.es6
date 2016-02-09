import GoogleSearch from '../index.es6';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
/* eslint-disable newline-after-var, id-length */
describe(`A Google Search component`, () => {
  describe(`is a React component`, () => {
    it('is compatible with React.Component', () => {
      GoogleSearch.should.be.a('function').and.respondTo('render');
    });
    it(`it renders a React element`, () => {
      React.isValidElement(<GoogleSearch/>).should.equal(true);
    });
    it(`it has a magnifier icon, a label, a preloader, a close button`, () => {
      const shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(React.createElement(GoogleSearch, {
        enableHistory: true,
        noResultsString: `Your query returned no results. Please try a
        different search term. (Did you check your spelling? You can also
          try rephrasing your query or using more general search terms.)`,
        newWindow: false,
        gname: 'economist-search',
        queryParameterName: 'ss',
        language: 'en',
        resultsUrl: 'http://www.economist.com/search/',
        cx: '013751040265774567329:pqjb-wvrj-q',
        searchLabel: 'Search',
        iconsSize: '28',
        googleScriptUrl: 'www.google.com/cse/cse.js',
      }));
      const search = shallowRenderer.getRenderOutput();
      const searchShowFieldGroup = search.props.children;
      const searchMagnifier = searchShowFieldGroup.props.children[0];
      const searchSearchBox = searchShowFieldGroup.props.children[1];
      const searchSearchLabel = searchShowFieldGroup.props.children[2];
      const searchSearchClose = searchShowFieldGroup.props.children[3];

      search.props.className.indexOf('search').should.be.at.least(0);
      searchShowFieldGroup.props.className.should.equal('search__show-field-group');
      searchMagnifier.props.className.should.equal('search__magnifier');
      searchMagnifier.type.should.equal('a');
      searchMagnifier.props.href.should.equal('http://www.economist.com/search/');
      searchSearchBox.props.className.should.equal('search__search-box');
      searchSearchBox.props.id.should.equal('google-search-box');
      searchSearchLabel.props.className.should.equal('search__search-label');
      searchSearchLabel.type.should.equal('a');
      searchSearchLabel.props.href.should.equal('http://www.economist.com/search/');
      searchSearchClose.props.className.should.equal('search__search-close');
      searchSearchClose.type.should.equal('a');
      searchSearchClose.props.onClick.should.be.a('function');
    });
  });
});
