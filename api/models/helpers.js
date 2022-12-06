/**
 * This class has static methods for managing organizations
 */

module.exports = {
  createUserstore
}

/**
 * Creates a new DB connection in the Auth0 tenant.
 * 
 * @param {Object} api An instance of the management API client
 * @param {Object} options
 * @param {String} options.name The name of the new Auth0 DB connection
 */
async function createUserstore (api, { name, metadata={} }) {
  const db = {
    name,
    strategy: 'auth0',
    options: {
      mfa: {
        active: true,
        return_enroll_settings: true
      },
      validation: {
        username: {
          max: 15,
          min: 1
        }
      },
      disable_signup: false,
      passwordPolicy: 'good',
      strategy_version: 2,
      requires_username: false,
      brute_force_protection: true
    },
    enabled_clients: [ process.env.VUE_APP_AUTH0_CLIENT_ID ],
    realms: [ name ],
    metadata
  }

  const userstore = await api.createConnection(db)
  return userstore
}
