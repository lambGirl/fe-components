module.exports = {
  path: '/path/to/something',
  template: {
    data: {
      result: true,
      id: (params, query, body) => {
        console.log(query, body);
        return params.id;
      },
    },
    time: 1472458598918,
    code: '200',
    msg: 'ok',
  },
};
