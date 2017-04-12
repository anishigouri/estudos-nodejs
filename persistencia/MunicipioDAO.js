function MunicipioDAO(connection) {
    this._connection = connection;
}

MunicipioDAO.prototype.findByUf = function(uf, callback) {
    this._connection.query('SELECT * FROM municipio WHERE uf = ?', [uf], callback);
}

MunicipioDAO.prototype.listUfs = function(callback) {
    this._connection.query('SELECT DISTINCT uf FROM municipio', callback);
}

module.exports = function() {
    return MunicipioDAO;
}
