
var User = require('./models/user');
var Book = require('./models/book');
module.exports={
    insertNew:function(req,res,next){
        var book={
            bookName:req.body.bookName,
            isbn:req.body.isbn
        };
        var nBook=new Book(book);
        nBook.save(function(er,doc){
            if(er)return next("Some Error Occured");
            User.update({
                "_id":req.user.id
            },{
                $push:{
                    'books':doc._id
                }
            },{
                new:true
            },function(err,o){
                if(err)return next("Some Error Occured!");
                res.json(doc);//return the newly created book and take this for granted that it is updated
            });

        })
    }
}
