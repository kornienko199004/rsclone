const prod = {
  baseUrl: 'https://rsclone-app.herokuapp.com',
};

const dev = {
  baseUrl: '',
};

export default process.env.NODE_ENV === 'production' ? prod : dev;
