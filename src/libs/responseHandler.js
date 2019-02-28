exports.errorHandler = (res, err) => {
  res.json({
    err,
  });
};

exports.responseHandler = (res, data) => {
  res.json({
    data,
  });
};
