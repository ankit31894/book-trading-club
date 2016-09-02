var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    bookName: String,
    isbn : String,
    exchangeReceived:[this],
    exchangeMade:this
});
bookSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};
var Book=mongoose.model('Book',bookSchema)
module.exports = Book;