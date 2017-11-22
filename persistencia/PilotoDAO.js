function pilotoDAO(connection) {
  this._connection = connection;
}

pilotoDAO.prototype.list = function(callback) {
  this._connection.query('SELECT * FROM piloto', callback);
}

pilotoDAO.prototype.save = function(piloto, callback) {
  this._connection.query('INSERT INTO piloto SET ?', piloto, callback);
}

pilotoDAO.prototype.update = function(piloto, callback) {
  this._connection.query('UPDATE piloto SET ? where id = ? ', [piloto, piloto.id], callback);
}

pilotoDAO.prototype.getById = function(id, callback) {
  this._connection.query('SELECT * FROM piloto p INNER JOIN contato c ON c.id = p.contato_id WHERE p.id = ? ', [id], callback);
}

module.exports = function() {
  return pilotoDAO;
}