function VideoDAO(connection) {
  this._connection = connection;
}

VideoDAO.prototype.list = function(callback) {
  this._connection.query('SELECT * FROM video', callback);
}

VideoDAO.prototype.save = function(video, callback) {
  this._connection.query('INSERT INTO video SET ?', video, callback);
}

VideoDAO.prototype.update = function(video, callback) {
  this._connection.query('UPDATE video SET ? where id = ? ', [video, video.id], callback);
}

VideoDAO.prototype.getById = function(id, callback) {
  this._connection.query('SELECT * FROM video WHERE id = ? ', [id], callback);
}

module.exports = function() {
  return VideoDAO;
}