exports.sendSuccessResponse = (result, res) => {
  res.api.success = true;
  res.api.data = result.body || {};
  res.api.error = {};
  res.api.statusCode = result.statusCode || 200;
  res.status(res.api.statusCode);

  return res.send(res.api);
};
