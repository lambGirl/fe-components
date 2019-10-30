module.exports = {
  path: '/path/to/getTheme',
  status: (req, res, next) => {
    res.status(404);
    next();
  },
  template: {
    data: {
      theme: '0',
    },
    time: 1472458598918,
    code: '200',
    msg: 'ok',
  },
};
