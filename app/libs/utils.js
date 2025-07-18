/**
 * Utility functions for the extension
 */

/**
 * Get localized message from Chrome i18n
 * 
 * For more details about chrome.i18n.getMessage API, 
 * see https://developer.chrome.com/docs/extensions/reference/i18n/#method-getMessage
 * 
 * @param {string} messageName - The name of the message to retrieve
 * @param {Array|string} [substitutions] - Optional substitutions for the message
 * @returns {string} The localized message
 */
export function i18n(messageName, substitutions = []) {
  return chrome.i18n.getMessage(messageName, substitutions);
}