/**
 * Created by King on 2015/4/15.
 */
var mongoose = require('mongoose');
var moment = require('moment');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error',function(err){
    console.error(err);
});
db.once('open', function(){

});


var Schema = mongoose.Schema;

//定义一个Schema，类似于java中的一个bean
var companySchema = new Schema({
    code: String,
    company: String,
    regtime: Date,
    industry: String,
    address: String,
    regCapital: Number,
    issuseTime: Date,
    marketTime: Date,
    shares: Number,
    totalStock: Number
});

//通过Schema定义它的实例方法，就是普通方法，只有bean被实例化才能使用的方法，也就是model才能使用
companySchema.methods.findByMarketTime = function(cb){
    return this.model('companies').find({code: this.code},cb);
};

//通过Schema定义它的静态方法，Schema可以直接使用该方法，无须生成model
companySchema.statics.findByMarketTime = function(marketTime,cb){
    return this.find({marketTime: moment(marketTime)}, cb);
}
companySchema.statics.findByCode2 = function(code, cb){
    return this.find({code: code}, cb);
};

//创建一个model,类似于java中的一个对象，该对象的创建方式跟hibernate有点相似，对应一张表和一个bean
var Company = mongoose.model('companies', companySchema);

var c1 = new Company({code: '600476'});
/*
c1.findByMarketTime(function(err, companys){
    console.log(companys);
});
*/

/*
c1.findByMarketTime('2004-4-26', function(err, companies){
    console.log(companies);
});*/

Company.findByCode2('600476', function(err, companies){
    console.log(companies);
});
