/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  const domain = event.tenant.id
  const client_id = event.client.client_id
  const metadata = event.user.app_metadata
  const roles = event.authorization?.roles?.length ? event.authorization.roles : []
    
  api.accessToken.setCustomClaim(`${domain}/roles`, roles)
  api.idToken.setCustomClaim(`${domain}/roles`, roles)
  api.idToken.setCustomClaim(`${client_id}/data`, metadata)
}
