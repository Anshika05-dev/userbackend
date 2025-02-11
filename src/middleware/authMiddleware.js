const db =require ('../config/database')
const middleware = {
    signup: (req, res, next) => {
        const { name } = req.body;
        const { email } = req.body;
        const { password } = req.body;
        const { num } = req.body;
        if (!name || !email || !password || !num) {
            return res.send("Enter correctly")
        }
        if (password.length < 8) {
            return res.send("Kindly enter atleast 8 character password")
        }
        if (num.toString().length != 10) {
            return res.send("Wrong number")
        }
        else next();
    },
    login: (req, res, next) => {
        const { name } = req.body;
        const { email } = req.body;
        const { password } = req.body;
        if (name === "" || email === "" || password === "") {
            return res.send("Enter correctly")
        }
        db.query('SELECT * FROM users where email=?',
            [email],
            (err, result) => {
                if (err) res.send('email does not exist');
                if (result.length > 0) {
                    next();
                }
                else {
                    res.send('Kindly Signup');
                }
            }
        );
    }
}
module.exports = middleware;