/*File Name:  authorization.js, Student Names:Runali Patel - 301110236, Muksud Hussain Mahi - 301155894, Devanshi Patel – 301161377 , 
Tanisha Sharma - 301144152, Sabah Hussein - 300882730 Date:09/08/2021 */
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