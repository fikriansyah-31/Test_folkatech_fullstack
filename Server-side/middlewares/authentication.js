const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = async (req, res, next) => {
    try {
        let access_token = req.headers.authorization; // Menggunakan "authorization" bukan "access_token"
        if (!access_token) {
            console.error("Unauthenticated: Access token not found");
            return res.status(401).json({ message: "Unauthenticated" });
        }

        // Menggunakan regex untuk memeriksa format "Bearer [token_access]"
        const tokenPattern = /^Bearer (.+)$/i;
        const match = access_token.match(tokenPattern);

        if (!match) {
            console.error("Unauthenticated: Invalid token format");
            return res.status(401).json({ message: "Unauthenticated" });
        }

        const token = match[1]; // Mengambil token akses dari hasil regex

        let { id, email } = verifyToken(token);

        let user = await User.findByPk(id, {
            attributes: {
                exclude: ["password"],
            },
        });

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        next(error);
    }
};
