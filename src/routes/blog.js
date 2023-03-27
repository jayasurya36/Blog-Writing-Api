const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here


router.get('/blog', async(req,res)=>{
    const page = req.query.page;
    const search = req.query.search;
    const blog = await Blog.find({"topic" : search});
    if(blog.length <= parseInt(page)){
        res.send(blog)
    }else{
        const trimmedblog = blog.slice(0 , page);
        res.send(trimmedblog);
    }
})

router.post('/blog' , async(req , res) =>{
    const blog = new Blog({
        topic : req.body.topic,
        description : req.body.description,
        posted_at : new Date().toDateString(),
        posted_by : req.body.posted_by
    })
    const blogres = await blog.save();
    res.send(blogres);
})

router.put('/blog/:id' , async(req , res) =>{
    const id = req.params.id;
    try{
    const blog = await Blog.findOne({"_id" : id});
    if(blog === null){
        res.status(400).send({
            message : "User not found"
        })
    }
    else{
        try{
            const updatedData = await Blog.updateOne({"_id" : id} , req.body);
            res.send(updatedData);
        }catch(err){
            res.send(err.message);
        }
    }
    }catch(err){
        res.send(err.message);
    }
})

router.delete('/blog/:id' , async(req , res) =>{
    const id = req.params.id;
    try{
        const data = await Blog.deleteOne({"_id" : id});
        res.send(data);
    }catch(err){
        res.send(err.message);
    }
})
module.exports = router;