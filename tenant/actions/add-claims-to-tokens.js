/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {

  const client_id = event.client.client_id
  const roles = event.authorization?.roles?.length ? event.authorization.roles : []

  // prepare data
  let idTokenData = {
    roles
  }

  if (event?.organization) {
    idTokenData.member_type = event.user.app_metadata?.member_type || 'member'
    idTokenData.org = {
      display_name: event.organization.display_name,
      type: event.organization.metadata.type
    }
  }
  // add data to id token
  api.idToken.setCustomClaim(`${client_id}/data`, idTokenData)
  // add data to access token 
  api.accessToken.setCustomClaim(`${client_id}/roles`, roles)
}