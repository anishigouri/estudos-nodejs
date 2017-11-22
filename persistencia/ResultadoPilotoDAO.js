function ResultadoPilotoDAO(connection) {
  this._connection = connection;
}

ResultadoPilotoDAO.prototype.list = function(callback) {
  this._connection.query('SELECT * FROM resultadoPiloto', callback);
}

ResultadoPilotoDAO.prototype.save = function(resultadoPiloto, callback) {
  this._connection.query('INSERT INTO resultadoPiloto SET ?', resultadoPiloto, callback);
}

ResultadoPilotoDAO.prototype.update = function(resultadoPiloto, callback) {
  this._connection.query('UPDATE resultadoPiloto SET ? where id = ? ', [resultadoPiloto, resultadoPiloto.id], callback);
}

ResultadoPilotoDAO.prototype.getById = function(id, callback) {
  this._connection.query('SELECT * FROM resultadoPiloto WHERE id = ? ', [id], callback);
}

module.exports = function() {
  return ResultadoPilotoDAO;
}