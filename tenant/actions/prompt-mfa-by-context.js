/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  const options = {
    allowRememberBrowser: true
  }

  if (event?.organization) {
    const prompt = event.organization?.metadata?.enableMFA || event.user.user_metadata?.enableMFA
    return api.multifactor.enable('any', options)
  }

  if (event.user.user_metadata?.enableMFA) {
    return api.multifactor.enable('any', options) 
  }

};