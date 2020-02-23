const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const {jwtToken} = req.cookies;
        res.locals = jwt.verify(jwtToken, process.env.jwtSecret);
        next();

    } catch (err) {
        res.status(403).render('login', { error: 'Unauthorized'});
    }

}


module.exports = auth;
