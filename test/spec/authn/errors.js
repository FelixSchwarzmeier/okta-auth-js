import _ from 'lodash';
import util from '@okta/test.support/util';

describe('General Errors', function () {
  util.itErrorsCorrectly({
    title: 'returns correct error if throttle API error (429)',
    setup: {
      request: {
        uri: '/api/v1/authn',
        data: {}
      },
      response: 'error-throttle'
    },
    execute: function (test) {
      return test.oa.signIn({username: 'fake', password: 'fake'});
    }
  });

  util.itErrorsCorrectly({
    title: 'returns correct error if internal API error (500)',
    setup: {
      request: {
        uri: '/api/v1/authn',
        data: {}
      },
      response: 'error-internal'
    },
    execute: function (test) {
      return test.oa.signIn({username: 'fake', password: 'fake'});
    },
    expectations: function (test, err) {
      var expected = _.cloneDeep(test.responseBody);
      expected.errorSummary = 'Unknown error';

      // We explicitly defined the fields to compare,
      // because we don't want to compare all the xhr fields
      expect(err.xhr.status).toEqual(test.resReply.status);

      expect(err.errorCode).toEqual(expected.errorCode);
      expect(err.errorSummary).toEqual(expected.errorSummary);
      expect(err.errorLink).toEqual(expected.errorLink);
      expect(err.errorCode).toEqual(expected.errorCode);
      expect(err.errorId).toEqual(expected.errorId);
      expect(err.errorCauses).toEqual(expected.errorCauses);
    }
  });

  util.itErrorsCorrectly({
    title: 'returns correct error if network error (0)',
    setup: {
      request: {
        uri: '/api/v1/authn',
        data: {}
      },
      response: 'error-network'
    },
    execute: function (test) {
      return test.oa.signIn({username: 'fake', password: 'fake'});
    },
    expectations: function (test, err) {
      expect(err.name).toEqual('AuthApiError');
      expect(err.xhr.status).toEqual(0);
      expect(err.errorCode).toBeUndefined();
      expect(err.errorSummary).toBeUndefined();
      expect(err.errorLink).toBeUndefined();
      expect(err.errorCode).toBeUndefined();
      expect(err.errorId).toBeUndefined();
      expect(err.errorCauses).toBeUndefined();
    }
  });

  
});
