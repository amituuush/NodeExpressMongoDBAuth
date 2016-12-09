module.exports = function(app) {
  // adding route handlers
  // if user sends get request to '/', run this function
  app.get('/', function(req, res, next) {
    res.send(['water', 'phone', 'paper']);
  });

};
