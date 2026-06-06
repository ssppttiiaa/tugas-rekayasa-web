const db = require("../config/db");

// GET semua buku
exports.getBooks = (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {

        console.log("ERROR =", err);
        console.log("RESULT =", result);

        if (err) {
            return res.status(500).json({
                message: err.message,
                code: err.code,
                errno: err.errno
            });
        }

        res.json(result);
    });
};

// GET buku berdasarkan ID
exports.getBookById = (req, res) => {

    db.query(
        "SELECT * FROM books WHERE id = ?",
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Buku tidak ditemukan"
                });
            }

            res.json(result[0]);
        }
    );
};

// POST tambah buku
exports.createBook = (req, res) => {

    const {
        title,
        author,
        publisher,
        stock
    } = req.body;

    db.query(
        `INSERT INTO books
        (title, author, publisher, stock)
        VALUES (?, ?, ?, ?)`,
        [
            title,
            author,
            publisher,
            stock
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Buku berhasil ditambahkan"
            });
        }
    );
};

// PUT update seluruh data buku
exports.updateBook = (req, res) => {

    const {
        title,
        author,
        publisher,
        stock
    } = req.body;

    db.query(
        `UPDATE books
        SET title = ?,
            author = ?,
            publisher = ?,
            stock = ?
        WHERE id = ?`,
        [
            title,
            author,
            publisher,
            stock,
            req.params.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Buku berhasil diupdate"
            });
        }
    );
};

// PATCH update sebagian data buku
exports.patchBook = (req, res) => {

    const updates = req.body;

    const fields = [];
    const values = [];

    for (const key in updates) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
    }

    values.push(req.params.id);

    const sql = `
        UPDATE books
        SET ${fields.join(", ")}
        WHERE id = ?
    `;

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Buku berhasil diperbarui"
        });
    });
};

// DELETE buku
exports.deleteBook = (req, res) => {

    db.query(
        "DELETE FROM books WHERE id = ?",
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Buku berhasil dihapus"
            });
        }
    );
};