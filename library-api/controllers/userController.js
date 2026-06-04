const db = require("../config/db");

// Ambil semua user
exports.getUsers = (req, res) => {

    db.query(
        "SELECT id, username, email FROM users",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};

// Ambil user berdasarkan ID
exports.getUserById = (req, res) => {

    db.query(
        "SELECT id, username, email FROM users WHERE id=?",
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result[0]);
        }
    );
};

// Hapus user
exports.deleteUser = (req, res) => {

    db.query(
        "DELETE FROM users WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "User berhasil dihapus"
            });
        }
    );
};

const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;

    const hashedPassword =
        await bcrypt.hash(password, 10);

    db.query(
        `INSERT INTO users
        (username, email, password)
        VALUES (?, ?, ?)`,
        [
            username,
            email,
            hashedPassword
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "User berhasil ditambahkan"
            });
        }
    );
};

exports.updateUser = (req, res) => {

    const {
        username,
        email
    } = req.body;

    db.query(
        `UPDATE users
        SET username = ?,
            email = ?
        WHERE id = ?`,
        [
            username,
            email,
            req.params.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "User berhasil diupdate"
            });
        }
    );
};

exports.patchUser = (req, res) => {

    const updates = req.body;

    const fields = [];
    const values = [];

    for (const key in updates) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
    }

    values.push(req.params.id);

    const sql = `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = ?
    `;

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "User berhasil diperbarui"
        });
    });
};