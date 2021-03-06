/**
 * SearchLog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    search: String,
    time: Number
});
module.exports = mongoose.model('SearchLog', schema);
var models = {

    saveData: function(data, callback) {
        var searchlog = this(data);
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
            //booking.timestamp = new Date();
            searchlog.save(function(err, data2) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data2);
                }
            });
        }

    },
    getAll: function(data, callback) {
        this.find().sort({time:-1}).limit(4).exec(callback);
    },
    // getAll: function(data, callback) {
    //     this.find({}, {}, {}, function(err, deleted) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, deleted);
    //         }
    //     });
    // },
    deleteData: function(data, callback) {
        this.findOneAndRemove({
            _id: data._id
        }, function(err, deleted) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, deleted)
            }
        });
    },
    updateLog: function(data, callback) {
        this.findOneAndUpdate({
            search: data.search
        }, {
            $inc: {
                time: 1
            }
        }, {
            upsert: true
        }, function(err, updated) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, updated);
            }
        });
    }



};
module.exports = _.assign(module.exports, models);
