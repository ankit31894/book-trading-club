// This test is for node JS

var db=require("../../config/database.js");
var should=require('should')
var insertBook=require("../../app/insertbook.js");
var insertUser=require("../../app/insertuser_fortest.js");
var proposeBook=require("../../app/maketrade.js");
var acceptBook=require("../../app/accepttrade.js");
var myGetter=require("../../app/getmybooks.js");
var notMyGetter=require("../../app/getnotmybooks.js");
var allGetter=require("../../app/getallbooks.js");
var receiver=require("../../app/received.js");
var sender=require("../../app/sent.js");
var updater=require("../../app/updateprofile.js");
describe('Insert User Test', function() {
    this.timeout(5000);
    before(function(done) {
        db.connect(1);
        done();
    })
    after(function(done) {
        db.drop();
        done();
    })
    var userId1=1234;
    var userId2=12345;
    var userId3=123456;
    var user1Id;
    var user2Id;
    var user3Id;
    var book1Id,book2Id,book3Id,book4Id;
    function th(done){
        return function(err){
            console.log(err);
            err.should.not.equal("");
            done();
        }
    }
    it('should insert a user with google.id 1234', function(done) {
        insertUser.insert({body:{userId:userId1}},{json:function(record){
            record.google.id.should.eql("1234");
            user1Id=record._id;
            done();
        }},th(done));
    });
    it('should insert a user with google.id 12345', function(done) {
        insertUser.insert({body:{userId:userId2}},{json:function(record){
            record.google.id.should.eql("12345");
            user2Id=record._id;
            done();
        }},th(done));
    });
    it('should insert a user with google.id 123456', function(done) {
        insertUser.insert({body:{userId:userId3}},{json:function(record){
            record.google.id.should.eql("123456");
            user3Id=record._id;
            done();
        }},th(done));
    });
    it('should update user1', function(done) {
        updater.update({user:{id:user1Id},body:{info:{name:"Ankit"}}},{json:function(record){
            record.name.should.eql("Ankit");//d
            done();
        }},th(done));
    });
    it('should insert a new book for user1', function(done) {
        insertBook.insertNew({body:{bookName:"Test Book1",isbn:"0123456789"},user:{id:user1Id}},{json:function(record){
            book1Id=record._id;
            record.bookName.should.eql("Test Book1");
            done();
        }},th(done));
    });
    it('should insert a new book for user 2', function(done) {
        insertBook.insertNew({body:{bookName:"Test Book2",isbn:"9012345678"},user:{id:user2Id}},{json:function(record){
            book2Id=record._id;
            record.bookName.should.eql("Test Book2");
            done();
        }},th(done));
    });
    it('should insert a new book for user 3', function(done) {
        insertBook.insertNew({body:{bookName:"Test Book3",isbn:"8901234567"},user:{id:user3Id}},{json:function(record){
            book3Id=record._id;
            record.bookName.should.eql("Test Book3");
            done();
        }},th(done));
    });
    it('should insert a second book for user 3', function(done) {
        insertBook.insertNew({body:{bookName:"Test Book4",isbn:"7890123456"},user:{id:user3Id}},{json:function(record){
            book4Id=record._id;
            record.bookName.should.eql("Test Book4");
            done();
        }},th(done));
    });
    it('should get all book excluding user 3"s book', function(done) {
        notMyGetter.getAll({user:{id:user3Id}},{json:function(record){
            record.length.should.eql(2);
            done();
        }},th(done));
    });
    it('should get all books', function(done) {
        allGetter.getAll({},{json:function(record){
            record.length.should.eql(4);
            done();
        }},th(done));
    });

    it('should propose book1 for book2', function(done) {
        proposeBook.proposeNew({body:{mybook:book1Id,wishbook:book2Id}},{json:function(record){
            record[0].exchangeMade.should.eql(book2Id);
            record[1].exchangeReceived.length.should.eql(1);
            done();
        }},th(done));
    });
    it('should propose book3 for book2', function(done) {
        proposeBook.proposeNew({body:{mybook:book3Id,wishbook:book2Id}},{json:function(record){
            record[0].exchangeMade.should.eql(book2Id);
            record[1].exchangeReceived.length.should.eql(2);
            done();
        }},th(done));
    });
    it('should propose book4 for book1', function(done) {
        proposeBook.proposeNew({body:{mybook:book4Id,wishbook:book1Id}},{json:function(record){
            record[0].exchangeMade.should.eql(book1Id);
            record[1].exchangeReceived.length.should.eql(1);
            done();
        }},th(done));
    });
    it('should get user2"s book receivedBook' , function(done) { 
        receiver.getReceived({user:{id:user2Id}},{json:function(record){
            record.length.should.eql(1);
            record[0].exchangeReceived.length.should.eql(2);
            done();
        }},th(done));
    });
    it('should get user1"s book proposals' , function(done) { 
        sender.getSent({user:{id:user1Id}},{json:function(record){
            record.length.should.eql(1);
            record[0].exchangeMade.bookName.should.eql("Test Book2");
            done();
        }},th(done));
    });
    it('should get user1"s book proposals' , function(done) { 
        sender.getSent({user:{id:user2Id}},{json:function(record){
            console.log(record);
            done();
        }},th(done));
    });

    it('should get user3"s book and his exchangemade will be occupied' , function(done) { 
        myGetter.getById({user:{id:user3Id}},{json:function(record){
            record.length.should.eql(2);
            record[0].bookName.should.eql("Test Book3");
            record[0].exchangeMade.should.eql(book2Id);
            done();
        }},th(done));
    });
    it('should get user3"s second book and his exchangemade will be occupied' , function(done) { 
        myGetter.getById({user:{id:user3Id}},{json:function(record){
            record.length.should.eql(2);
            record[1].bookName.should.eql("Test Book4");
            record[1].exchangeMade.should.eql(book1Id);
            done();
        }},th(done));
    });
    it('should accept book1 for book2', function(done) {
        acceptBook.accept({body:{mybook:book2Id,comingbook:book1Id}},{json:function(record){
            record[0].bookName.should.eql("Test Book2");
            record[1].bookName.should.eql("Test Book1");
            done();
        }},th(done));
    });
    it('should get user3"s book and his exchangemade will not be occupied', function(done) {
        myGetter.getById({user:{id:user3Id}},{json:function(record){
            record.length.should.eql(2);
            record[0].bookName.should.eql("Test Book3");
            (record[0].exchangeMade==null).should.eql(true);
            record[1].bookName.should.eql("Test Book4");
            (record[1].exchangeMade==null).should.eql(true);
            done();
        }},th(done));
    });
});