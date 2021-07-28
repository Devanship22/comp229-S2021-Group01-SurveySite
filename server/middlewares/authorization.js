module.exports = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    } else{
        req.session.message = {
            type: "danger",
            title: "Unauthorized",
            details: "Please login to access",
        };
        res.redirect("/login");
    }
}