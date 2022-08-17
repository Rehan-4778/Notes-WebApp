var jwt = require('jsonwebtoken');
// JWT secretsign
const secret = "IamRehanHi";

const fetchUser = (req, res, next) => {

    const token = req.header("auth-token");
    // in case of different header name or null header value/token
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" });
    }

    try {
        const data = jwt.verify(token, secret);
        req.id = data.id;
        next();

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" });
    }
}

module.exports = fetchUser;