const express = require('express');
const querystring = require('querystring')
const app = express();
const mysql = require('mysql')
app.use(express.static('www'));
var multer  = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'www/upload/')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + '.jpg')
    }
  })
  var upload = multer({ storage});



// 
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.ip)
    // Access-Control-Request-Headers

    res.header('Access-Control-Allow-Origin', '*')
	//Header
 
	res.setHeader("Access-Control-Allow-Methods", "*");
 
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    next();
})
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
  });  
connection.connect();
// /product/upload
app.post('/product/upload',upload.any(), (req,res)=>{
    res.json({
        
        result: {
            code: 1,
            filename: 'http://localhost:8888/upload/'+ req.files[0].filename
        }
    })
})
// 1.admin login
app.post('/admin/login', (req, res)=>{
    
    let str = "select * from admin where email='"+req.body.email + "' and " + "pwd='"+req.body.pwd+"'"
    connection.query(str, function (error, results, fields) {
        res.json({
            result: error?null : (results[0] || null)
        })
    });
})
// 2.user register
app.post('/user/register', (req, res)=>{
    var  addSql = 'INSERT INTO user(email,pwd) VALUES(?,?)';
    var  addSqlParams = [req.body.email,req.body.pwd];
    // console.log(addSqlParams)
    connection.query(addSql,addSqlParams , function (error, results) {
        console.log(error)
        res.json({
            result: error?null : (results || null)
        })
    });
})
// 3.user login
app.post('/user/login', (req, res)=>{
    let str = "select * from user where email='"+req.body.email + "' and " + "pwd='"+req.body.pwd+"'"
    connection.query(str, function (error, results, fields) {
        res.json({
            result: error?null : (results[0] || null)
        })
    });
})
// 4.orders
app.post('/order/add', (req, res)=>{
    let addSql = "INSERT INTO orders(status,email,createtime,address,products) VALUES(?,?,?,?,?)"
    var  addSqlParams = [
        0,
        req.body.email,
        (new Date()).toUTCString(),
        JSON.stringify(req.body.address),
        JSON.stringify(req.body.carts)
    ];
    connection.query(addSql,addSqlParams , function (error, results) {
        console.log(req.body)
        if(req.body.isCarts){
            let str3 = "UPDATE user  SET carts='' where email='"+req.body.email + "' "
            // console.log(str3)
            console.log(str3,333)
            connection.query(str3 , function (error3, results) {
                res.json({
                    result: error3?null : (results || null)
                })
            });

        }else{
            res.json({
                result:  results || null
            })
        }
    });
})
app.get('/order/get', function(req,res){
    let str = "select * from orders where email='"+req.query.email+"'";
    // console.log(str)
        connection.query(str, function (error, results, fields) {
            results = results.map(item=>{
                item.address = JSON.parse(item.address);
                item.products = JSON.parse(item.products);
                item.total = 0
                item.products.map(item2=>{
                    item.total += item2.price
                })
                return item;
            })
            console.log(results,999)
            res.json({
                result: error?null : (results || null)
            })
        }); 
})
// 5.user pay
app.post('/user/pay', (req, res)=>{
    let str = "select * from user where email='"+req.body.email + "' and " + "pay_pwd='"+req.body.pay_pwd+"'"
    // console.log(str,req.body,9999)
    connection.query(str, function (error, results, fields) {
        if(error || !results[0]){
            res.json({
                result: null 
            })
        }else{
            // pay success
           let str2 = "UPDATE orders  SET status=1 where id="+req.body.id;
        //    console.log(str2,111)
            connection.query(str2 , function (error2, results) {
              
                if(error2 || !results.changedRows){
                    res.json({
                        result: null 
                    })
                }else{
                    res.json({
                        result:  results || null
                    })
                  
                    
                }
               
            });
        }
    });
})
// 6.user carts operation
app.post('/user/update', (req, res)=>{
    console.log(req.body)
    let str = "select * from user where email='"+req.body.email + "' and " + "pwd='"+req.body.pwd+"'"
    // console.log(str)
    connection.query(str, function (error, results) {
        // console.log(results)
        if(!error && results[0]){
            if(results[0].carts ){
                console.log(results[0].carts.split(','))
                if(results[0].carts.split(',').indexOf(req.body.cart+'')!=-1){
                    console.log(33)
                    res.json({
                        result: {
                            msg: 'Already in the shopping cart'
                        }
                    })
                    return;
                }else{
                    results[0].carts+=','+req.body.cart
                }
            }else{
                results[0].carts = req.body.cart
            }
            let str2 = "UPDATE user  SET carts='"+(results[0].carts)+"' where email='"+req.body.email + "' and " + "pwd='"+req.body.pwd+"'"
            console.log(str2)
            connection.query(str2 , function (error2, results) {
                res.json({
                    result: error2?null : (results || null)
                })
            });
        }else{
            res.json({
                result: null
            })
        }
    });

   
})
//7.user password update
app.post('/user/update/pwd', (req, res)=>{
    console.log(req.body)
    let str = "select * from user where email='"+req.body.email + "' and " + "pwd='"+req.body.pwd+"'"
    
    connection.query(str, function (error, results) {
        console.log(results)
        if(!error && results[0]){
            
            let str2 = "UPDATE user  SET pwd='"+(req.body.pwd2)+"' where email='"+req.body.email + "'";
            console.log(str2)
            connection.query(str2 , function (error2, results) {
                res.json({
                    result: error2?null : (results || null)
                })
            });
        }else{
            res.json({
                result: null
            })
        }
    });

   
})
app.post('/user/update/pay_pwd', (req, res)=>{
    console.log(req.body)
    let str = "select * from user where email='"+req.body.email + "' and " + "pwd='"+req.body.pwd+"'"
    // console.log(str)
    connection.query(str, function (error, results) {
        // console.log(results)
        if(!error && results[0]){
            
            let str2 = "UPDATE user  SET pay_pwd='"+(req.body.pay_pwd)+"' where email='"+req.body.email + "' and " + "pwd='"+req.body.pwd+"'"
            connection.query(str2 , function (error2, results) {
                res.json({
                    result: error2?null : (results || null)
                })
            });
        }else{
            res.json({
                result: null
            })
        }
    });

   
})
//8.product operation
app.post('/product/add' , (req, res)=>{
    var  addSql = 'INSERT INTO product(img, price,title,  type, brand, detail) VALUES(?,?,?,?,?,?)';
    var  addSqlParams = [req.body.img,req.body.price,req.body.title,req.body.type,req.body. brand, req.body.detail];
    connection.query(addSql,addSqlParams , function (error, results) {
        console.log(error)
        res.json({
            result: error?null : (results || null)
        })
    });
})
app.post('/product/edit', (req,res)=>{
    // img, price,title,  type, brand, detail
    let str = "UPDATE product  SET img='"+req.body.img + 
                "',price='"+req.body.price+ 
                "',title='" + req.body.title + 
                "',type='" + req.body.type + 
                "',brand='" + req.body.brand + 
                "',detail='" + req.body.detail + 
                "' where id="+req.body.id 
    // console.log(str)
    connection.query(str , function (error2, results) {
        res.json({
            result: error2?null : (results || null)
        })
    });
})
app.get('/product/delete', function(req,res){
    let str = 'DELETE FROM product WHERE id='+req.query.id
        connection.query(str, function (error, results, fields) {
           
            res.json({
                result: error?null : (results || null)
            })
        }); 
})
app.get('/product/get', function(req,res){
    let str = "select * from product";
    if(req.query.keyword){
        str = "select * from product where title like '%"+req.query.keyword+"%'";
    }
    if(req.query.type){
        str+=(req.query.keyword?' and ' : ' where ')+"type='"+req.query.type+"'";
    }
    if(req.query.price){
        
        str+=(req.query.keyword || req.query.type?' and ' : ' where ')+ req.query.price
       
    }
    console.log(str,99)
        connection.query(str, function (error, results, fields) {
           
            res.json({
                result: error?null : (results || null)
            })
        }); 
})
// 9.product detail
app.get('/product/detail/:id', function(req,res){
    console.log(req.params.id,122)
    let str = "select * from product where id="+req.params.id;
        connection.query(str, function (error, results, fields) {
           
            res.json({
                result: error?null : (results || null)
            })
        }); 
})


app.get('/cart/delete', (req,res)=>{
    let str = "select * from user where email='"+req.query.email+"'"
    // console.log(str)
    connection.query(str, function (error, results, fields) {
        var carts = results[0].carts
        carts = carts? carts.split(',') : []
        var index =carts.indexOf(req.query.id+'');
        console.log(carts,req.query.id,index,'index')
        if(index!=-1) carts.splice(index,1)
        let str2 = "UPDATE user  SET carts='"+(carts.join(','))+"' where email='"+req.query.email + "'" 
            console.log(str2)
            connection.query(str2 , function (error2, results) {
                res.json({
                    result: error2?null : (results || null)
                })
            });
      
    });
})
app.get('/carts/:email', (req, res)=>{
    if(req.query.id){
        let str2 = "select * from product where id="+req.query.id;
        connection.query(str2, function (error, results2, fields) {
            res.json({
                result: error?null : (results2 || null)
            })
        })
        return;
    }
    let str = "select * from user where email='"+req.params.email+"'"
    // console.log(str)
    connection.query(str, function (error, results, fields) {
        let str2 = "select * from product where id in ("+results[0].carts+")"
        console.log(str2)
        connection.query(str2, function (error, results2, fields) {
            res.json({
                result: error?null : (results2 || null)
            })
        })
      
    });
})

//10 address operation
app.post('/address/add' , (req, res)=>{
    var  addSql = 'INSERT INTO address(name,address,phone, uid) VALUES(?,?,?,?)';
    var  addSqlParams = [req.body.name,req.body.address,req.body.phone,req.body.uid];
    // console.log(addSqlParams)
    connection.query(addSql,addSqlParams , function (error, results) {
        console.log(error)
        res.json({
            result: error?null : (results || null)
        })
    });
})

// address choose
app.get('/address/get', function(req,res){
    let str = "select * from address where uid='"+req.query.uid+"'";
        connection.query(str, function (error, results, fields) {
           
            res.json({
                result: error?null : (results || null)
            })
        }); 
})
//adress delete
app.get('/address/delete', function(req,res){
    let str = 'DELETE FROM address WHERE id='+req.query.id
        connection.query(str, function (error, results, fields) {
           
            res.json({
                result: error?null : (results || null)
            })
        }); 
})
// /address edit
app.post('/address/edit', (req,res)=>{
    let str = "UPDATE address  SET name='"+req.body.name + "',address='"+req.body.address+"',phone='" + req.body.phone +"' where id="+req.body.id 
    console.log(str)
    connection.query(str , function (error2, results) {
        res.json({
            result: error2?null : (results || null)
        })
    });
})





app.listen(8888, ()=>{
    console.log("server running......")
})