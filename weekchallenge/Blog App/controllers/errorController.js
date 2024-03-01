const errorController = {
    handleNotFound: (req, res) => {
      res.status(404).send('Route not found');
    },
  
    handleServerError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Internal Server Error');
    },
  };
  
  module.exports = errorController;
  