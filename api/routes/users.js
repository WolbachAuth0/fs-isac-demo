const router = require('express').Router()
const { verifyJWT, checkJWTScopes, checkJWTPermissions } = require('./../middleware/auth')
const schemaValidator = require('./../middleware/schemaValidator')
const users = require('./../controllers/users')

module.exports = router

function checkJWTUserID (req, res, next) {
  const customScopeKey = 'sub'
  const failWithError = true
  const orgIDs = [ req.params.user_id ]
  return checkJWTScopes(orgIDs, { customScopeKey, failWithError })(req, res, next)
}

// Users
// http://localhost:8081/api/users/:user_id
router
  .route('/:user_id')
  .all(verifyJWT)                                   // verify signature on access token
  .all(checkJWTUserID)                              // verifies that the user id in the access token equals user_id in url param
  .patch(
    checkJWTPermissions(['update:user_profile']),   // verify access token contains necessary permission(s)
    // schemaValidator(),                              // verify that the request body matches the schema, else 400
    users.updateProfile                             // execute the get User by Id function
  )
  .get(
    users.getById                                   
  )