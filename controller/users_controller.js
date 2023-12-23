module.exports.register = (req, res) => {
    return res.render('register');
}

module.exports.login = (req, res) => {
    return res.render('login');
}

module.exports.home = (req, res) => {
    return res.render('home');
}