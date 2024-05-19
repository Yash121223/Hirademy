const express= require('express');
const app=express();
const port=8000;
const hbs=require('hbs');
const pool = require('./models/pool');
const body_parser=require('body-parser');


app.use(body_parser.urlencoded({
    extended:false
}));
app.use(body_parser.json());

app.use(express.static('public'));
app.set('view engine', 'hbs');

// calling apis

app.post('/entry',(req,res)=>{
    let data=req.body;
    let q1=`insert into assistant_table (name,mobile,email,salary,city,country,department) values(?,?,?,?,?,?,?)`
    pool.query(q1,[data.name,data.mobile,data.email,data.salary,data.city,data.country,data.department],(err,obj)=>{
        if(err){
            res.send(err);

        }
        else{
            pool.query(`select id from assistant_table where name=? and mobile=?`,[data.name,data.mobile],(err,obj1)=>{
                if(err){
                    console.log(err);
                }else{
                    let num=obj1[0].id;
                    res.send(`Registration done, registration id is = `+num);
                }
            })
        }
    })
})



//  for the data retrieval

app.post('/find',(req,res)=>{
    let data = req.body;
    pool.query(`select * from assistant_table where id = ? `, [data.id], (err, data) => {
        if (err)
            console.log(err)
        else {
            res.render('form2', { info: data });

        }
    })
})

// app.post('/updatedata',(req,res)=>{
//     let data=req.body;
//     let id = data.id;
//     let q1=`insert into assistant_table where id =`+id` (name,mobile,email,salary,city,country,department) values(?,?,?,?,?,?,?)`
//     pool.query(q1,[data.name,data.mobile,data.email,data.salary,data.city,data.country,data.department],(err,obj)=>{
//         if(err){
//             res.send(err);

//         }else{
//             res.send('Data updated succesfully! Check it yourself');
//         }
        
    
//     })
// })

app.post('/updatedata', (req, res) => {
    let data = req.body;
    let id = data.id;
    let q1 = `UPDATE assistant_table SET name = ?, mobile = ?, email = ?, salary = ?, city = ?, country = ?, department = ? WHERE id = ?`;

    pool.query(q1, [data.name, data.mobile, data.email, data.salary, data.city, data.country, data.department, id], (err, obj) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Data updated successfully! Check it yourself');
        }
    });
});


app.post(`/deletedata`,(req,res)=>{
    let data=req.body;
    pool.query(`DELETE FROM assistant_table WHERE id = ?`,[data.id],(err,obj)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send('Data deleted successfully!');
        }
    })
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/register',(req,res)=>{
    res.render('form1')
})

// app.get('/find',(req,res)=>{
//     res.render('form2',{ info: data })
// })

app.get('/update',(req,res)=>{
    res.render('form3')
})


app.listen(port,()=>{
    console.log('connected');
})