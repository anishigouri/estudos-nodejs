function patrocinadorDAO(connection) {
  this._connection = connection;
}

patrocinadorDAO.prototype.list = function(callback) {
  this._connection.query('SELECT * FROM patrocinador', callback);
}

patrocinadorDAO.prototype.save = function(patrocinador, callback) {
  this._connection.query('INSERT INTO patrocinador SET ?', patrocinador, callback);
}

patrocinadorDAO.prototype.update = function(patrocinador, callback) {
  this._connection.query('UPDATE patrocinador SET ? where id = ? ', [patrocinador, patrocinador.id], callback);
}

patrocinadorDAO.prototype.getById = function(id, callback) {
  this._connection.query('SELECT * FROM patrocinador p INNER JOIN contato c ON c.id = p.contato_id WHERE p.id = ? ', [id], callback);
}

module.exports = function() {
  return patrocinadorDAO;
}