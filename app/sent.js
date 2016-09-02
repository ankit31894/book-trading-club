var User = require('./models/user');
module.exports={
    getSent:function(req,res,next){
        User.findOne({'_id':req.user.id}).populate({path:'books',match: { exchangeMade: { $ne: null }},select:'isbn bookName exchangeMade',populate:{path:'exchangeMade',select:'bookName isbn'}}).exec(function(err,user){
            if(err)return next("Some error occured");
            res.json(user.books);
        });
    }
}