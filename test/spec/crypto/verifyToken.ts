import tokens from '@okta/test.support/tokens';
import factory from '@okta/test.support/factory';
import * as sdkCrypto from '../../../lib/crypto';

describe('crypto', function() {

  describe('verifyToken', function() {

    it('succeeds with known good token and key', function() {
      var idToken = tokens.standardIdToken;
      var key = tokens.standardKey;
      return sdkCrypto.verifyToken(idToken, key)
      .then(function(res) {
        expect(res).toBe(true);
      });
    });

    it('fails with a bad token', function() {
      var ISSUER = 'http://example.okta.com';
      var CLIENT_ID = 'fake';  
      var idToken = factory.buildIDToken({
        issuer: ISSUER,
        clientId: CLIENT_ID
      });
      var key = tokens.standardKey;
      return sdkCrypto.verifyToken(idToken, key)
        .then(function(res) {
          expect(res).toBe(false);
        });
    });

    it('fails with a bad key', function() {
      var idToken = tokens.standardIdToken;
      var key = Object.assign({}, tokens.standardKey, {
        n: sdkCrypto.stringToBase64Url('bad key value')
      });
      return sdkCrypto.verifyToken(idToken, key)
        .then(function(res) {
          expect(res).toBe(false);
        });
    });
  });
});
