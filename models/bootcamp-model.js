const koneksi = require('../config/database');
const { responseData, responseMessage } = require('../utils/response-handler');

// insert bootcamp
exports.insertBootcamp = (response, statement, data) => {
    // jalankan query
    koneksi.query(statement, data, (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({ message: 'Gagal insert data!', error: err });
        }

        // jika request berhasil
        responseMessage(response, 201, 'Berhasil insert data!');
    });
};

// get data bootcamp
exports.getBootcamps = (response, statement) => {
    // jalankan query
    koneksi.query(statement, (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika request berhasil
        responseData(response, 200, rows);
    });
};

// update data bootcamp
exports.updateBootcamp = (response, searchStatement, updateStatement, id, data) => {
    // jalankan query untuk melakukan pencarian data
    koneksi.query(searchStatement, id, (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query update
            koneksi.query(updateStatement, [data, id], (err, rows, field) => {
                // error handling
                if (err) {
                    return response.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                // jika update berhasil
                responseMessage(response, 200, 'Berhasil update data!');
            });
        } else {
            return response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    });
};

// delete bootcamp
exports.deleteBootcamp = (response, searchStatement, deleteStatement, id) => {
    // jalankan query untuk melakukan pencarian data
    koneksi.query(searchStatement, id, (err, rows, field) => {
        // error handling
        if (err) {
            return response.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        // jika id yang dimasukkan sesuai dengan data yang ada di db
        if (rows.length) {
            // jalankan query delete
            koneksi.query(deleteStatement, id, (err, rows, field) => {
                // error handling
                if (err) {
                    return response.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                // jika delete berhasil
                responseMessage(response, 200, 'Berhasil hapus data!');
            });
        } else {
            return response.status(404).json({ success: false, message: 'Data tidak ditemukan!' });
        }
    });
};
