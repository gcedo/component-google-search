'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _economistComponentIcon = require('@economist/component-icon');

var _economistComponentIcon2 = _interopRequireDefault(_economistComponentIcon);

var _promisescript = require('promisescript');

var _promisescript2 = _interopRequireDefault(_promisescript);

/* eslint-disable no-undef, no-underscore-dangle, id-match, id-length, no-console */

var GoogleSearch = (function (_React$Component) {
  _inherits(GoogleSearch, _React$Component);

  _createClass(GoogleSearch, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        enableHistory: _react2['default'].PropTypes.bool,
        noResultsString: _react2['default'].PropTypes.string,
        newWindow: _react2['default'].PropTypes.bool,
        gname: _react2['default'].PropTypes.string,
        queryParameterName: _react2['default'].PropTypes.string,
        language: _react2['default'].PropTypes.string,
        resultsUrl: _react2['default'].PropTypes.string,
        cx: _react2['default'].PropTypes.string,
        searchLabel: _react2['default'].PropTypes.string,
        iconsSize: _react2['default'].PropTypes.string,
        googleScriptUrl: _react2['default'].PropTypes.string
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        enableHistory: true,
        noResultsString: 'Your query returned no results. Please try a\n      different search term. (Did you check your spelling? You can also\n        try rephrasing your query or using more general search terms.)',
        newWindow: false,
        gname: 'economist-search',
        queryParameterName: 'ss',
        language: 'en',
        resultsUrl: 'http://www.economist.com/search/',
        cx: '013751040265774567329:pqjb-wvrj-q',
        searchLabel: 'Search',
        iconsSize: '28',
        googleScriptUrl: 'www.google.com/cse/cse.js'
      };
    }
  }]);

  function GoogleSearch(props) {
    _classCallCheck(this, GoogleSearch);

    _React$Component.call(this, props);
    this.state = {
      statusClassName: 'search--close',
      searchTerm: '',
      // useFallback by default on SS
      useFallback: typeof window === 'undefined'
    };
  }

  GoogleSearch.prototype.showSearchFieldHandler = function showSearchFieldHandler(e) {
    var _this = this;

    e.stopPropagation();
    e.preventDefault();
    this.setState({
      statusClassName: 'search--loading'
    });
    this.ensureScriptHasLoaded().then(function () {
      _this.setState({
        statusClassName: 'search--open'
      });
      _this.focusSearchField();
    })['catch'](function () {
      _this.focusSearchField();
    });
    // Required for preventDefault on Safari.
    return false;
  };

  GoogleSearch.prototype.clearSearchField = function clearSearchField() {
    this.setState({
      searchTerm: '',
      statusClassName: 'search--close'
    });
    if (this.state.useFallback) {
      this.googleSearchInputFallbackInput.value = '';
    } else if (this.googleSearchInput) {
      this.googleSearchInput.value = '';
    }
  };

  GoogleSearch.prototype.focusSearchField = function focusSearchField() {
    if (this.state.useFallback) {
      this.googleSearchInputFallbackInput.focus();
    } else if (this.googleSearchInput) {
      this.googleSearchInput.focus();
    }
  };

  GoogleSearch.prototype.ensureScriptHasLoaded = function ensureScriptHasLoaded() {
    var _this2 = this;

    if (!this.script) {
      (function () {
        var config = {
          div: 'google-search-box',
          tag: 'searchbox-only',
          attributes: {
            enableHistory: _this2.props.enableHistory,
            noResultsString: _this2.props.noResultsString,
            newWindow: _this2.props.newWindow,
            gname: _this2.props.gname,
            queryParameterName: _this2.props.queryParameterName,
            language: _this2.props.language,
            resultsUrl: _this2.props.resultsUrl
          }
        };
        window.__gcse = {
          parsetags: 'explicit',
          callback: function callback() {
            google.search.cse.element.render(config);
            _this2.setState({
              useFallback: false
            });
            _this2.googleSearchInput = document.querySelector('.search .gsc-search-box input.gsc-input');
            _this2.focusSearchField();
          }
        };
        // Loading this script it provide us the only additional functionality
        // of autocompletition that is probably achievable by custom code using
        // the Google Search API (Probably paid version).
        var protocol = document.location.protocol === 'https:' ? 'https:' : 'http:';
        var src = protocol + '//' + _this2.props.googleScriptUrl + '?cx=' + _this2.props.cx;
        _this2.script = _promisescript2['default']({
          url: src,
          type: 'script'
        })['catch'](function (e) {
          _this2.setState({
            useFallback: true
          });
          _this2.focusSearchField();
          console.error('An error occurs loading or executing Google Custom Search: ', e.message);
          throw new Error('An error occurs loading or executing Google Custom Search: ' + e.message);
        });
      })();
    }
    return this.script;
  };

  GoogleSearch.prototype.render = function render() {
    var _this3 = this;

    return _react2['default'].createElement(
      'div',
      { className: 'search ' + this.state.statusClassName },
      _react2['default'].createElement(
        'div',
        { className: 'search__show-field-group' },
        _react2['default'].createElement(
          'a',
          { className: 'search__magnifier',
            onClick: this.showSearchFieldHandler.bind(this),
            href: this.props.resultsUrl
          },
          _react2['default'].createElement(_economistComponentIcon2['default'], { icon: 'magnifier',
            color: 'white',
            size: this.props.iconsSize
          })
        ),
        _react2['default'].createElement(
          'div',
          {
            className: 'search__search-box',
            id: 'google-search-box'
          },
          _react2['default'].createElement(
            'div',
            { className: 'fallback', style: { display: this.state.useFallback ? 'block' : 'none' } },
            _react2['default'].createElement(
              'form',
              { acceptCharset: 'UTF-8', method: 'GET',
                id: 'search-theme-form', action: this.props.resultsUrl,
                className: 'gsc-input'
              },
              _react2['default'].createElement('input', {
                type: 'text', maxLength: '128',
                name: this.props.queryParameterName,
                id: 'edit-search-theme-form-1',
                title: 'Enter the terms you wish to search for.',
                className: 'gsc-input',
                ref: function (ref) {
                  return _this3.googleSearchInputFallbackInput = ref;
                }
              }),
              _react2['default'].createElement('input', { type: 'hidden', name: 'cx',
                value: this.props.cx, id: 'edit-cx'
              })
            )
          )
        ),
        _react2['default'].createElement(
          'a',
          { className: 'search__search-label',
            onClick: this.showSearchFieldHandler.bind(this),
            href: this.props.resultsUrl
          },
          this.props.searchLabel
        ),
        _react2['default'].createElement(
          'a',
          { className: 'search__search-close',
            onClick: this.clearSearchField.bind(this)
          },
          _react2['default'].createElement(_economistComponentIcon2['default'], {
            icon: 'close',
            size: this.props.iconsSize
          })
        )
      )
    );
  };

  return GoogleSearch;
})(_react2['default'].Component);

exports['default'] = GoogleSearch;
module.exports = exports['default'];