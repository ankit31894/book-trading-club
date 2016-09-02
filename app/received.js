var User = require('./models/user');
module.exports={
    getReceived:function(req,res,next){
        User.findOne({'_id':req.user.id}).populate({
        	path:'books',
        	match:{
        		exchangeReceived:{
        			$ne:null
        		}
        	},
    		select:'isbn bookName exchangeReceived',
    		populate:{
    			path:'exchangeReceived',
    			select:'bookName isbn'
    		}
        }).exec(function(err,user){
            if(err)return next("Some error occured");
            res.json(user.books);
        });
    }
}
