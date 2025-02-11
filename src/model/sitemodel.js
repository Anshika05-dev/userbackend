const db = require('../config/database')
const model = {
    insert: (cooperation_no, sitename, address, website, mobile, callback) => {
        db.query(
            'INSERT INTO sites (Cooperation_no, Sitename, Address, Website, Mobile) values(?,?,?,?,?)',
            [cooperation_no, sitename, address, website, mobile],
            (err, result) => {
                if (err) return callback(err);
                const entry = {
                    id: result.insertId,
                    cooperation_no,
                    sitename,
                    address,
                    website,
                    mobile
                };
                return callback(null, entry);
            }
        );
    },
    viewsite: (corporationno, callback) => {
        db.query(
            'SELECT * FROM sites WHERE Cooperation_no=?',
            [corporationno],
            (err, result) => {
                if (err) return callback(err);
                console.log(result)
                return callback(null, result);
            }
        );
    },
    listsites: (per_page, offset, callback) => {
        db.query(
            'SELECT * FROM SITES ORDER BY Cooperation_no LIMIT ? OFFSET ?',
            [per_page, offset],
            (err, result) => {
                if (err) return callback(err);
                console.log(result)
                return callback(null, result);
            }
        );
    },
    updatesite: (updatedsite, cooperation_no, callback) => {
        console.log(cooperation_no)
        db.query(
            'UPDATE sites set Sitename=?,Address=?,Website=?,Mobile=? WHERE Cooperation_no=?',
            [updatedsite.Sitename, updatedsite.Address, updatedsite.Website, updatedsite.Mobile, cooperation_no],
            (err, result) => {
                console.log(err);
                console.log(result.affectedRows);
                if (err) return callback(err, null);

                return callback(null, result);
            }
        );
    },
    deletesite: (cooperation_no, callback) => {
        db.query(
            'DELETE FROM sites WHERE Cooperation_no=?',
            [cooperation_no], (err, result) => {
                console.log(result)
                if (err) return callback(err, null);

                return callback(null, result);
            }
        );
    }
}
module.exports = model;