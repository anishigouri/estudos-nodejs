function CalendarioDAO(connection) {
    this._connection = connection;
  }
  
  CalendarioDAO.prototype.list = function(callback) {
    this._connection.query('SELECT * FROM calendario', callback);
  }
  
  CalendarioDAO.prototype.save = function(calendario, callback) {
    this._connection.query('INSERT INTO calendario SET ?', calendario, callback);
  }
  
  CalendarioDAO.prototype.update = function(calendario, callback) {
    this._connection.query('UPDATE calendario SET ? where id = ? ', [calendario, calendario.id], callback);
  }
  
  CalendarioDAO.prototype.getById = function(id, callback) {
    this._connection.query('SELECT * FROM calendario WHERE id = ? ', [id], callback);
  }
  
  module.exports = function() {
    return CalendarioDAO;
  }