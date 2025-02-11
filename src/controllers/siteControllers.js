const sitemodel = require('../model/sitemodel')
const dontenv = require("dotenv").config();
const db = require('../config/database')
const sitecontroller = {
    create: (req, res) => {
        ;
        const { sitename, address, website, mobile } = req.body;
        sitemodel.insert(cooperation_no, sitename, address, website, mobile, (err, site) => {
            if (err) res.send("aleady exist");

            console.log(site)
            res.json({
                "status": "success",
                "message": "new site added",
                "data": {
                    "name": site.sitename
                }
            })
        }
        )
    },
    viewsite: (req, res) => {
        const cooperation_no = req.param('cooperation_no');
        sitemodel.viewsite(cooperation_no, (err, site) => {
            console.log(site);
            if (err) res.send(err);
            res.send(site.length > 0 ? site : "Site not found....");
        });
    },
    listsites: (req, res) => {
        const per_page = req.body.per_page || 10;
        const page = req.body.page;
        const offset = (page - 1) * per_page;

        console.log(offset);
        sitemodel.listsites(per_page, offset, (err, site) => {
            console.log(site);
            if (err) res.send(err);
            res.send(site);
        });
    },
    updatesite: (req, res) => {
        const existingsite = req.site;
        console.log(existingsite);
        const { cooperation_no, sitename, address, website, mobile } =
            req.body;
        console.log(existingsite.Sitename)
        const updatedsite = {
            Sitename: sitename !== undefined ? sitename : existingsite.Sitename,
            Address: address !== undefined ? address : existingsite.Address,
            Website: website !== undefined ? website : existingsite.Website,
            Mobile: mobile !== undefined ? mobile : existingsite.Mobile
        };
        const updation = sitemodel.updatesite(updatedsite, cooperation_no, (err, result) => {
            console.log(result);
            if (err) res.send("err");
            (result.affectedRows === 0 ? res.send("doest exist") : res.send("updated successfully"))

        });
    },
    delete: (req, res) => {
        const { cooperation_no } = req.body;
        sitemodel.deletesite(cooperation_no, (err, result) => {
            console.log(err, result)
            if (err) res.send("err");
            (result.affectedRows === 0 ? res.send("doest exist") : res.send("deletion successfull"))
        })
    }
}
module.exports = sitecontroller;