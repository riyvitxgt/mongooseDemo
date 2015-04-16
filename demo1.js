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
    code: {type: String, index: true},
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

companySchema.set('autoIndex', false);

companySchema.statics.findByCode = function(code, cb){
    return this.find({code: code}, cb);
}

//实例方法，一般是通过对象自身的属性去查找，所以，使用该方法的前提是有一个对象，并带有查询的属性值
companySchema.methods.findByAddr = function(cb){
    return this.model('companies').find({address: this.address}, cb);
}

var Company = mongoose.model('companies', companySchema);

/*
Company.findByCode('600620', function(err, company){
    console.log(company);
});

var c1 = new Company({address: '上海'});
c1.save(function(err){
   if(err){
       console.log(err);
   }
});
 */

/*Company.findById('552f4cd67b395f3c1d5f6834', function(err,company){
    if(err) return console.log(err);

    company.company = 'sdfwe';
    company.save(function(err){
        if(err) return console.log(err);
        console.log(company);
    })
});*/
Company.findByIdAndUpdate('552f4cd67b395f3c1d5f6834',{$set:{company:"123455"}}, function(err, company){
    console.log(company);
});

/*
Company.find({address:'上海', code:null}).exec(function(err, companies){
    console.log(companies);
});

Company.remove({code: null}, function(err, com){
    if(err){
        console.log(err);
    }else{
        console.log(com);
    }
});
 */
/*var c1 = new Company({address: '上海'});
c1.findByAddr(function(err, companies){
    console.log(companies);
});*/
/*//通过Schema定义它的实例方法，就是普通方法，只有bean被实例化才能使用的方法，也就是通过model生成的对象才能使用
companySchema.methods.findByMarketTime = function(cb){
    return this.model('companies').find({marketTime: this.marketTime},cb);
};

//通过Schema定义它的静态方法，通过Schema生成的model可以直接使用该方法
companySchema.statics.findByMarketTime = function(marketTime,cb){
    return this.find({marketTime: moment(marketTime)}, cb);
};
//创建一个model,类似于java中的一个对象，该对象的创建方式跟hibernate有点相似，对应一张表和一个bean
var Company = mongoose.model('companies', companySchema);
 */
/*
c1.findByMarketTime(function(err, companys){
    console.log(companys);
});
*/

/*
c1.findByMarketTime('2004-4-26', function(err, companies){
    console.log(companies);
});*/
