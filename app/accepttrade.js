
var Book = require('./models/book');
module.exports={
    accept:function(req,res,next){
        var thisName,comingName,thisIsbn,comingIsbn;

        var thisBookId=req.body.mybook;
        var comingBookId=req.body.comingbook;

        //find the Book for which this Book was proposed if exist 

        Book.update({exchangeReceived:thisBookId},{$pull:{"exchangeReceived":thisBookId}},function(err,doc){
            if(err)return next(err);
        })

        //find the Books proposed for this Book 

        Book.findOne({_id:thisBookId},function(er,doc){
            if(doc!=null&&doc.exchangeReceived!=null)
                doc.exchangeReceived.forEach(function(Bid){
                    Book.update({_id:Bid},{$unset:{'exchangeMade':1}},function(er,doc){
                    })
                });
            else return next("Record not found")
            thisName=doc.bookName;
            thisIsbn=doc.isbn;
            Book.findOne({_id:comingBookId},function(er,doc){
                if(doc.exchangeReceived!=null)
                    doc.exchangeReceived.forEach(function(Bid){
                        Book.update({_id:Bid},{$unset:{'exchangeMade':1}},function(er,doc){
                        })
                    });
                comingName=doc.bookName;
                comingIsbn=doc.isbn;
                Book.findOneAndUpdate({_id:comingBookId},{$unset:{exchangeMade:1,exchangeReceived:1},$set:{bookName:thisName,isbn:thisIsbn}},{new:true},function(er,doc1){
                    Book.findOneAndUpdate({_id:thisBookId},{$unset:{exchangeMade:1,exchangeReceived:1},$set:{bookName:comingName,isbn:comingIsbn}},{new:true},function(er,doc2){
                        res.json([doc1,doc2]);
                    })
                })

            });
        })
    }
}