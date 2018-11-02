module.exports = (callback) => {
    return (req, res, next) => {
        console.log(this);
        res.xRender = ((view, param = {}) => {
            console.log(module.parent.paths);
            console.log(this);

            return res.render(view, {
                //...params,
                ...param
            });
        }).bind(res);
        let exec = callback.bind(this);
        return exec(req, res, next);
    }
}