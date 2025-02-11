const db =require ('../config/database')
const ordermiddleware={
    createo:(req,res,next)=>{
        const { customer_id, customer_name, customer_email } = req.body;
        if (!customer_id || !customer_name || !customer_email){
            return res.send("Enter correctly")
        }
        db.query('SELECT * FROM orders where customer_id=?',
            [customer_id],
            (err,result)=>{
                if (err){res.send("err")}
                if(result.length>0){
                    res.send('Customer already exist pls add products on this id')
                }
                else next();
            }
        );
    },
    createp:(req,res,next)=>{
        // res.send("Middleware")
        const {customer_id}=req.body;
        const {product_name, quantity, price}=req.body;
        if (!product_name || !quantity || !price){
            return res.send("Enter correctly")
        }
        else next();
        db.query('SELECT * FROM orders where customer_id=?',
            [customer_id],
            (err,data)=>{
                if(err){
                    res.send("error encountered")
                }
                if(data.length===0){
                    res.send("Coustomer id incorrect")
                }
                else next();
            }
        );
    }
}
module.exports=ordermiddleware;