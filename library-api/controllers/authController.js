const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users(username,email,password) VALUES(?,?,?)",
        [username, email, hashedPassword],
        (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Register berhasil"
            });
        }
    );
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User tidak ditemukan"
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(
                password,
                user.password
            );

            if (!match) {
                return res.status(401).json({
                    message: "Password salah"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                "SECRET_KEY",
                { expiresIn: "1d" }
            );

            res.json({
                token
            });
        }
    );
};