const express = require('express');
const withWidget = require('./with-widget');
const withIdp = require('../social-idp');
const { 
  getAuthClient,
} = require('../../utils');

const router = express.Router();

router.use('/login', [
  withWidget,
  withIdp,
]);

router.get('/login/callback', async (req, res) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  const authClient = getAuthClient(req);
  try {
    // Exchange code for tokens
    await authClient.idx.handleInteractionCodeRedirect(url);
    // Redirect back to home page
    res.redirect('/');
  } catch (err) {
    if (authClient.isInteractionRequiredError(err) === true) {
      const { state } = req.query;
      res.redirect('/login/with-widget?state=' + state);
      return;
    }

    // TODO: show error message in home page
    req.setLastError(err);
    res.redirect('/');
  }
});


module.exports = router;
