const db = require('../config/database')
const middleware = {
    create: (req, res, next) => {
        const { cooperation_no } = req.body;
        const { sitename } = req.body;
        const { address } = req.body;
        const { website } = req.body;
        const { mobile } = req.body;
        if (!cooperation_no || !sitename || !address || !website || !mobile) {
            return res.send("Enter correctly")
        }
        else next();
    },
    updatesite: (req, res, next) => {
        const { cooperation_no } = req.body;

        db.query(
            'SELECT * FROM sites where Cooperation_no=?',
            [cooperation_no],
            (err, result) => {
                console.log(result);
                if (err) res.send(err);
                if (result.length > 0) {
                    req.site = result[0];
                    next();
                }
                else {
                    res.send("Site does not exist");
                }
            }
        );
    }
}
module.exports = middleware;



// const { updatesite } = require('../controllers/sitecontroller');