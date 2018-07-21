'use strict';

const { admin } = require('../firebase');

module.exports = {
  /**
   * Middleware to check authorization header and verify it against firebase auth
   * `Authorization: Bearer <Firebase ID Token>`.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  firebaseAuth(req, res, next) {
    console.log('Check if request is authorized with Firebase ID token');
  
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
          'Make sure you authorize your request by providing the following HTTP header:',
          'Authorization: Bearer <Firebase ID Token>');
      res.status(403).send('Unauthorized');
      return;
    }
  
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      console.log('Found "Authorization" header');
      // Read the ID Token from the Authorization header.
      idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
      // No token
      res.status(403).send('Unauthorized');
      return;
    }

    admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
      console.log('ID Token correctly decoded', decodedIdToken);
      req.user = decodedIdToken;
      return next();
    }).catch((error) => {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(403).send('Unauthorized');
    });
  }
}