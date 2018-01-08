var User = require('./models/user');
module.exports={
    getById:function(req,res,next){
        User.findOne({'_id':req.user.id}).populate('books').exec(function(err,user){
            if(err)return next("Some error occured");
            res.json(user.books);
        });
    }
}
