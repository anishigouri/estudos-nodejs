function ContatoDAO(connection) {
  this._connection = connection;
}

ContatoDAO.prototype.list = function(callback) {
  this._connection.query('SELECT * FROM contato', callback);
}

ContatoDAO.prototype.save = function(contato, callback) {
  this._connection.query('INSERT INTO contato SET ?', contato, callback);
}

ContatoDAO.prototype.update = function(contato, callback) {
  this._connection.query('UPDATE contato SET ? where id = ? ', [contato, contato.id], callback);
}

ContatoDAO.prototype.getById = function(id, callback) {
  this._connection.query('SELECT * FROM contato WHERE id = ? ', [id], callback);
}

module.exports = function() {
  return ContatoDAO;
}