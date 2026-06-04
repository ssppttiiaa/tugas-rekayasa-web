const db = require("../config/db");

// Tambah peminjaman
exports.createBorrowing = (req, res) => {

    const {
        user_id,
        book_id,
        borrow_date,
        return_date,
        status
    } = req.body;

    db.query(
        `INSERT INTO borrowings
        (user_id, book_id, borrow_date, return_date, status)
        VALUES (?, ?, ?, ?, ?)`,
        [
            user_id,
            book_id,
            borrow_date,
            return_date,
            status
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Peminjaman berhasil"
            });
        }
    );
};

// Lihat semua peminjaman
exports.getBorrowings = (req, res) => {

    const sql = `
        SELECT
            borrowings.id,
            users.username,
            books.title,
            borrowings.borrow_date,
            borrowings.return_date,
            borrowings.status
        FROM borrowings
        JOIN users
            ON borrowings.user_id = users.id
        JOIN books
            ON borrowings.book_id = books.id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// GET peminjaman berdasarkan ID
exports.getBorrowingById = (req, res) => {

    db.query(
        "SELECT * FROM borrowings WHERE id = ?",
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Data peminjaman tidak ditemukan"
                });
            }

            res.json(result[0]);
        }
    );
};

// PUT update seluruh data peminjaman
exports.updateBorrowing = (req, res) => {

    const {
        user_id,
        book_id,
        borrow_date,
        return_date,
        status
    } = req.body;

    db.query(
        `UPDATE borrowings
        SET user_id = ?,
            book_id = ?,
            borrow_date = ?,
            return_date = ?,
            status = ?
        WHERE id = ?`,
        [
            user_id,
            book_id,
            borrow_date,
            return_date,
            status,
            req.params.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Data peminjaman berhasil diupdate"
            });
        }
    );
};

// PATCH update sebagian data peminjaman
exports.patchBorrowing = (req, res) => {

    const updates = req.body;

    const fields = [];
    const values = [];

    for (const key in updates) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
    }

    values.push(req.params.id);

    const sql = `
        UPDATE borrowings
        SET ${fields.join(", ")}
        WHERE id = ?
    `;

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Data peminjaman berhasil diperbarui sebagian"
        });
    });
};

// DELETE peminjaman
exports.deleteBorrowing = (req, res) => {

    db.query(
        "DELETE FROM borrowings WHERE id = ?",
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Data peminjaman berhasil dihapus"
            });
        }
    );
};