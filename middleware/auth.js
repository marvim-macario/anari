const auth = (req, res, next)=>{
    if(req.session.usuario){
       return next();
    }else{
        res.render("index")
    }
}