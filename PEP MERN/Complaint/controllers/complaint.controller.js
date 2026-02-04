let complaints=[];
let id1=0;

export const get = (req, res) => {
  res.json(complaints);
};

export const create = (req, res) => {
  const{title,description}=req.body;
  const complaint={
    id : id1++,
    title,
    description,
    status:"open"
  };
   complaints.push(complaint);
   res.json(complaint);

  }


export const resolve = (req, res) => {
  const cid = req.params.id;
  const complaint = complaints.find(c=>c.id==cid);
    complaint.status="closed";
    res.json(complaint);
};


export const deletee = (req, res) => {
  const cid =req.params.id;
  complaints = complaints.filter(c=>c.id!==cid);
  res.json({message:"deleted"});
};