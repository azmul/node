module.exports = function(req, res, next) {
    // 200 -> OK
    // 201 -> Created
    // 204 -> No Content

    // 304 -> Not Modified

    // 400 -> Bad request
    // 401 -> unauthorized
    // 403 -> Forbidden
    // 404 -> Not Found
    // 409 -> Conflict

    // 500 -> Internal Server error
    // 502 -> Bad Gateway

    if(!req.user.isAdmin) res.status(403).send('Access Forbidden');
    next();

}