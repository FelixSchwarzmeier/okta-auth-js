/* global atob */
import { base64ToBase64Url, stringToBase64Url, base64UrlToString } from '../../../lib/crypto/base64';

describe('base64', function() {

  const LONG_STRING = 'Contrary to popular belief, Lorem Ipsum is not simply random text. ' +
    'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ';

  describe('base64ToBase64Url', function() {
    it('Replaces "+" with "-"', function() {
      var orig = '123+45';
      var str = base64ToBase64Url(orig);
      expect(str.indexOf('-')).toBe(orig.indexOf('+'));
    });
    it('Replaces "/" with "_"', function() {
      var orig = '123/45';
      var str = base64ToBase64Url(orig);
      expect(str.indexOf('_')).toBe(orig.indexOf('/'));
    });
    it('Replaces "=" with ""', function() {
      var orig = '12345==';
      var str = base64ToBase64Url(orig);
      expect(str.indexOf('=')).toBe(-1);
      expect(str.length).toBe(orig.length - 2);
    });

  });

  describe('stringToBase64Url', function() {

    it('is a valid & reversible base64 string', function() {
      var b = stringToBase64Url(LONG_STRING);
      var str = atob(b);
      expect(str).toBe(LONG_STRING);
    });

    it('does not contain url unsafe characters', function() {
      var b = stringToBase64Url(LONG_STRING);
      expect(b.indexOf('+')).toBe(-1);
      expect(b.indexOf('/')).toBe(-1);
    });

    it('does not contain base64 padding', function() {
      var b = stringToBase64Url(LONG_STRING);
      expect(b.indexOf('=')).toBe(-1);
    });

    it('is reversible', function() {
      var orig = LONG_STRING;
      var b = stringToBase64Url(orig);
      var str = base64UrlToString(b);
      expect(str).toBe(orig);
    });
  });
});
