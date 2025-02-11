const db = require('../config/database')
let orderid
const model={
    createorder:(customer_id, customer_name, customer_email,callback)=>{
        db.query(
            'INSERT INTO orders (customer_id, customer_name, customer_email) values(?,?,?)',
            [customer_id, customer_name, customer_email],
            (err, result) => {
                if (err) return callback(err);
                const entry = {
                    id: result.insertId,
                    customer_id,
                    customer_name, 
                    customer_email
                };
                return callback(null, entry);
            }
        );
       orderId=result.insertId;
       console.log(orderId)
    },
    // createproduct: (customer_id, product_name, quantity, price, callback) => {
    //     // First, get the order_id from the orders table
    //     db.query('SELECT order_id from orders where customer_id=?', [customer_id], (err, orderId) => {
    //         if (err) {
    //             return callback("Error while retrieving order ID");
    //         }
    
    //         if (orderId.length === 0) {
    //             return callback("No order found for this customer");
    //         }
    
    //         const orderid = BigInt(orderId[0].order_id); // Convert to BigInt if needed
    //         console.log(orderid);
    
    //         // Now insert the product into the products table
    //         db.query(
    //             'INSERT INTO products (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)',
    //             [orderid, product_name, quantity, price],
    //             (err, result) => {
    //                 if (err) return callback("Error inserting product into database");
                    
    //                 const entry = {
    //                     id: result.insertId,
    //                     product_name,
    //                     quantity,
    //                     price
    //                 };
    //                 return callback(null, entry); // Return the result as the callback
    //             }
    //         );
    //     });
    
    
    createproduct:(customer_id,product_name, quantity, price,callback)=>{
        // db.query(
        //     'SELECT order_id from orders where customer_id=?',
        //     [customer_id],
        //     (err,orderId)=>{
        //         if(err) return callback("error");
        //         console.log(orderId)
        //        orderid=BigInt(orderId[0].order_id);
        //        console.log(orderid)
        //     }
        // );
        
            db.query('INSERT INTO products (order_id,product_name, quantity, price) values(?,?,?,?)',
            [orderid,product_name, quantity, price],
            (err,result)=>{
                if (err) return callback(err);
                const entry={
                    id:result.insertId,
                    product_name, 
                    quantity, 
                    price
                };
                
                db.query(
                    'SELECT order_id from orders where customer_id=?',
                    [customer_id],
                    (err,orderId)=>{
                        if(err) return callback("error");
                        console.log(orderId)
                       orderid=BigInt(orderId[0].order_id);
                       console.log(orderid)
            }
        );
        return callback(null,entry);
    });
}
}

module.exports=model;