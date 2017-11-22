function RegulamentoDAO(connection) {
  this._connection = connection;
}

RegulamentoDAO.prototype.list = function(callback) {
  this._connection.query('SELECT * FROM regulamento', callback);
}

RegulamentoDAO.prototype.save = function(regulamento, callback) {
  this._connection.query('INSERT INTO regulamento SET ?', regulamento, callback);
}

RegulamentoDAO.prototype.update = function(regulamento, callback) {
  this._connection.query('UPDATE regulamento SET ? where id = ? ', [regulamento, regulamento.id], callback);
}

RegulamentoDAO.prototype.getById = function(id, callback) {
  this._connection.query('SELECT * FROM regulamento WHERE id = ? ', [id], callback);
}

module.exports = function() {
  return RegulamentoDAO;
}