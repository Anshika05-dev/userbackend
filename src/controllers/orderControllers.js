const ordermodel=require('../model/ordermodel')
const ordercontroller= {
    createorder:(req,res)=>{
        const { customer_id, customer_name, customer_email, products } = req.body;
        ordermodel.createorder(customer_id, customer_name, customer_email, (err,order)=>{
            if(err) res.send(err);
            res.json({
                "Message":"Order Created",
                "Data":{
                    "Id":order.id,
                    "Name":order.customer_name,
                    "Email":order.customer_email
                }
            })
        })
    },
    createproduct:(req,res)=>{
        const {customer_id,product_name, quantity, price}=req.body;
        ordermodel.createproduct(customer_id,product_name, quantity, price,
            (err,product)=>{
            if(err) res.send(err);
            res.json({
                "Message":"Product Created",
                "Data":{
                    "Id":product.id,
                    "Product Name":product.product_name
                }
            })
        })
    }
}
module.exports = ordercontroller;