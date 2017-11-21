function enderecoDAO(connection) {
  this._connection = connection;
}

enderecoDAO.prototype.list = function(callback) {
  this._connection.query('SELECT * FROM endereco', callback);
}

enderecoDAO.prototype.save = function(endereco, callback) {
  this._connection.query('INSERT INTO endereco SET ?', endereco, callback);
}

enderecoDAO.prototype.update = function(endereco, callback) {
  this._connection.query('UPDATE endereco SET ? where id = ? ', [endereco, endereco.id], callback);
}

enderecoDAO.prototype.getById = function(id, callback) {
  this._connection.query('SELECT * FROM endereco WHERE id = ? ', [id], callback);
}

module.exports = function() {
  return enderecoDAO;
}