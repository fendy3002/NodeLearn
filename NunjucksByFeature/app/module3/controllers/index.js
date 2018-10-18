let path = require('path');
//let hoc = require('../../hoc');
module.exports = (req, res, next) => {
    res.render(path.join(__dirname, '..', 'views', 'page.html'));
};