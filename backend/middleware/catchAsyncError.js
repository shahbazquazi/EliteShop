module.exports = (AnyFunc) => (req,res,next)=>{
    Promise.resolve(AnyFunc(req,res,next)).catch(next);
};