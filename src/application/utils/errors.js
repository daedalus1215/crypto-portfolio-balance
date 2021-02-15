const errors = (app) => {
    
    app.use((req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            'errors': {
                message: err.message,
                error: {}
            }
        });
    });
}


module.exports = errors;