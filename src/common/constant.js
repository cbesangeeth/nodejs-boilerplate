module.exports = {
  /**
   * string should not start and end with special char,
   * string should not start with numbers,
   * string should only contains alpha(a-z) numeric (0-9) and a special chars (space)
   */
  REGEX_ALLOW_ALPHANUMERIC_AND_SPACE_ONLY: /^([a-zA-Z])+[a-zA-Z0-9+\s]+$/,
};
