import express from 'express';
const app=express();
app.use(express.json());
app.use(express.static('public'));


let complaints=[];
let id=1;


app.get("/complaint",(req,res)=>{
    res.json(complaints);
});


app.get("/complaint/:id",(req,res)=>{
    const cid=parseInt(req.params.id);
    let complaint=complaints.find(c=>c.id===cid);
    res.json(complaint);
});


app.post("/complaint",(req,res)=>{
    let {title,description}=req.body;
    let complaint={
        id:id++,
        title,
        description,
        status:"pending"
    }
    complaints.push(complaint);
    res.json(complaint);
});



app.put("/complaint/:id",(req,res)=>{
    const cid=parseInt(req.params.id);
    let complaint=complaints.find(c=>c.id===cid);
    if(complaint){
        complaint.status=req.body.status;
    }
    res.json(complaint);
});


app.delete("/complaint/:id",(req,res)=>{
    const cid=parseInt(req.params.id);
    complaints=complaints.filter(c=>c.id!==cid);
    res.json({message:"deleted"});
});


app.listen(4300);