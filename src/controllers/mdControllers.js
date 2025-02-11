const dontenv = require("dotenv").config();
const db = require('../config/database')
const mdcontollers = {
    show: (req, res) => {
        //         const sql = `SELECT m.id AS master_id, m.name AS master_name, d.id AS detail_id, d.detail_name
        //         FROM master_table m
        //         LEFT JOIN detail_table d ON m.id = d.master_id;
        //     `;

        //     db.query(sql, (err, rows) => {
        //         if (err) {
        //             console.error('Error executing query:', err);
        //             res.json({ error: 'Failed to retrieve data' });
        //             return;
        //         }
        //         console.log(rows);
        //         const masterDetails = {};

        //         rows.forEach(row => {
        //             if (!masterDetails[row.master_id]) {
        //                 masterDetails[row.master_id] = {
        //                     master_id: row.master_id,
        //                     master_name: row.master_name,
        //                     details: []
        //                 };
        //             }

        //             if (row.detail_id) {
        //                 masterDetails[row.master_id].details.push({
        //                     detail_id: row.detail_id,
        //                     detail_name: row.detail_name
        //                 });
        //             }
        //         });

        //         // Return master-detail data as JSON
        //         res.json((masterDetails));
        //     });
        // }

        let masterDetails = {};
        const masterQuery = 'SELECT id AS master_id, name AS master_name FROM master_table';

        db.query(masterQuery, (err, masterRows) => {
            if (err) {
                console.error('Error fetching master data:', err);
                return res.status(500).json({ error: 'Failed to fetch master data' });
            }
            console.log(masterRows)
            masterRows.forEach(master => {
                console.log(master)
                masterDetails[master.master_id] = {
                    master_id: master.master_id,
                    master_name: master.master_name,
                    details: []
                };
            });

        });
        const detailQuery = 'SELECT master_id, id AS detail_id, detail_name FROM detail_table';

        db.query(detailQuery, (err, detailRows) => {
            if (err) {
                console.error('Error fetching detail data:', err);
                return res.status(500).json({ error: 'Failed to fetch detail data' });
            }

            detailRows.forEach(detail => {
                if (masterDetails.master_id === detailRows.detail_id) {
                    masterDetails[detail.master_id].details.push({
                        detail_id: detail.detail_id,
                        detail_name: detail.detail_name
                    });
                }
            });
            res.json(masterDetails);
        }
        );
    }
}
module.exports = mdcontollers;