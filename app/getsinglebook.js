
var Book = require('./models/book');
module.exports={
    getById:function(req,res,next){
        var thisBookId=req.body.bookId;
        Book.findOne({
            "_id":thisBookId
        },'isbn bookName',function(err,o1){
            if(err)return next("Some Error Occured!");
            res.json(o1);
        });
    }
}
