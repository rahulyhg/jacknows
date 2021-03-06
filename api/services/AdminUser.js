/**
 * AdminUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var schema = new Schema({
   name:String,
   email:String,
   password:String,
   accesslevel:String
 });
 module.exports =mongoose.model('AdminUser', schema);
 var models = {

   saveData:function(data, callback)  {
     var adminUser = this(data);
     if (data._id) {
         this.findOneAndUpdate({
             _id: data._id
         }, data, function(err, data2) {
             if (err) {
                 callback(err, null);
             } else {
                 callback(null, data2);
             }
         });
     } else {
         adminUser.save(function(err, data2) {
             if (err) {
                 callback(err, null);
             } else {
                 callback(null, data2);
             }
         });
     }

   },
   getAll: function(data, callback) {
       this.find({}, {}, {}, function(err, deleted) {
           if (err) {
               callback(err, null);
           } else {
               callback(null, deleted);
           }
       });
   },
   deleteData:function(data,callback){
     this.findOneAndRemove({
       _id:data._id
     },function(err,deleted){
       if(err){
         callback(err,null)
       }else{
         callback(null,deleted)
       }
     });
   },

 };
 module.exports = _.assign(module.exports, models);
