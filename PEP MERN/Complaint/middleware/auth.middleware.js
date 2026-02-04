const auth = (req,res,next)=>{
    console.log("checking auth");
    next();
}
export default auth;