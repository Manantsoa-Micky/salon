module.exports.test_get = async (req, res, next) => {
  try {
    console.log('test starting');
    res.send({ test: 'OK' });
    console.log('test ending');
  } catch (error) {
    return next(error);
  }
};
