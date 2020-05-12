const { insertBootcamp, getBootcamps, updateBootcamp, deleteBootcamp } = require('../models/bootcamp-model');
const { validateBootcamp } = require('../utils/validation');
const ErrorResponse = require('../utils/errorResponse');

// create bootcamp
exports.createData = (req, res, next) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySql = 'INSERT INTO bootcamp SET ?';

    // validasi
    var errors = validateBootcamp(data);
    if (errors) {
        return next(new ErrorResponse(errors[0], 400));
    }

    // masukkan ke dalam model
    insertBootcamp(res, querySql, data, next);
};

// show bootcamps
exports.readData = (req, res, next) => {
    // buat query sql
    const querySql = 'SELECT * FROM bootcamp';

    // masukkan ke dalam model
    getBootcamps(res, querySql, next);
};

// update bootcamp
exports.updateData = (req, res, next) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM bootcamp WHERE id = ?';
    const queryUpdate = 'UPDATE bootcamp SET ? WHERE id = ?';

    // masukkan ke dalam model
    updateBootcamp(res, querySearch, queryUpdate, req.params.id, data, next);
};

// delete bootcamp
exports.deleteData = (req, res, next) => {
    // buat query sql untuk mencari data dan hapus
    const querySearch = 'SELECT * FROM bootcamp WHERE id = ?';
    const queryDelete = 'DELETE FROM bootcamp WHERE id = ?';

    // masukkan ke dalam model
    deleteBootcamp(res, querySearch, queryDelete, req.params.id, next);
};
