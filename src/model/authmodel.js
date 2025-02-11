const db = require('../config/database')
const model = {
    insert: (name, email, password, num, callback) => {
        db.query(
            'INSERT INTO users (Name,Email,Password,number) values(?,?,?,?)',
            [name, email, password, num],
            (err, result) => {
                if (err) return callback(err);
                const entry = {
                    id: result.insertId,
                    name,
                    email,
                    password,
                    num
                };
                return callback(null, entry);
            }
        );
    },
    add:(refreshtoken,email,callback)=>{
        db.query(
            'UPDATE users SET refreshTokenn=? where email=?',
            [refreshtoken,email],
            (err,result)=>{
                if (err)return callback(err);
            }
        )
    },
    finduserbyemail:(email,callback)=>{
        db.query('SELECT * FROM users where email=?',
            [email],
            (err,entry)=>{
                if(err) return callback(err);
                else{
                    return callback(null,entry);
                }
            }
        )
    }
}
module.exports=model;