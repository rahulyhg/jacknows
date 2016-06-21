/**
 * Booking.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sendgrid = require('sendgrid')('');
var moment = require('moment');

var schema = new Schema({
    //user: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //expert: String,
    expert: {
        type: Schema.Types.ObjectId,
        ref: 'ExpertUser'
    },
    callTime: Date,
    status: String,
    amount: String,
    discountCoupon: String,
    finalAmount: String,
    callStartTime: Date,
    callEndTime: Date,
    callDuration: String,
    areaOfExpertise: String,
    bookDate: Date,
    bookTime: Date,
    image: String,
    feedback: String,
    stateLog: {
        type: [{
            status: String,
            oldStatus: String,
            timestamp: Date
        }],
        index: true
    },
    transactionID: String,
    callRating: String,
    userRating: String,
    cancelReason: String,
    expertRating: String,
    query: String,
    from: String
});


module.exports = mongoose.model('Booking', schema);
var models = {
    saveData: function(data, callback) {
        var booking = this(data);
        var emailData = {};
        emailData.email = data.email;
        emailData.username = data.username;
        if (data._id) {
            this.findOneAndUpdate({
                _id: data._id
            }, data).lean().exec(function(err, data2) {
                if (err) {
                    callback(err, null);
                } else {
                    function callMe(data, data2) {
                        Notification.saveData({
                            user: data2.user,
                            notification: data.message,
                            image: data.expertimage
                        }, function(err, notRespo) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, data2);
                            }
                        });
                    }
                    switch (booking.status) {
                        case "accept":
                            async.parallel([function(callback1) {
                                var emailData = {};
                                emailData.email = data.email;
                                emailData.filename = 'dummy.ejs';
                                emailData.name = data.expertname;
                                emailData.timestamp = moment().format("MMM DD YYYY");
                                emailData.time = moment().format("HH.MM A");
                                emailData.content = "We have sent your response to the user. We will get back to you once the call is confirmed.";
                                emailData.subject = "Booking Status";
                                Config.email(emailData, function(err, json) {
                                    if (err) {
                                        console.log(err);
                                        callback(err, null);
                                    } else {
                                        console.log(json);
                                        data.message = data.expertname + " has reject your request.";
                                        callMe(data, data2);
                                    }
                                });
                            }, function(callback1) {
                                var emailData2 = {};
                                emailData2.email = data.useremail;
                                emailData2.filename = 'dummy.ejs';
                                emailData2.name = data.username;
                                emailData2.timestamp = moment().format("MMM DD YYYY");
                                emailData2.time = moment().format("HH.MM A");
                                emailData2.content = "You have received a response from the expert regarding your request. Please login to check.";
                                emailData2.subject = "Booking Status";
                                Config.email(emailData2, function(err, json) {
                                    if (err) {
                                        console.log(err);
                                        callback(err, null);
                                    } else {
                                        console.log(json);
                                        data.message = data.expertname + " has reject your request.";
                                        callMe(data, data2);
                                    }
                                });
                            }], function(err, asyncrespo) {
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    data.message = data.expertname + " has accept your request.";
                                    callMe(data, data2);
                                }
                            });
                            break;
                        case "reject":
                            async.parallel([function(callback1) {
                                var emailData = {};
                                emailData.email = data.email;
                                emailData.filename = 'dummy.ejs';
                                emailData.name = data.expertname;
                                emailData.timestamp = moment().format("MMM DD YYYY");
                                emailData.time = moment().format("HH.MM A");
                                emailData.content = "We have sent your response to the user. We will get back to you once the call is confirmed.";
                                emailData.subject = "Booking Status";
                                Config.email(emailData, function(err, json) {
                                    if (err) {
                                        console.log(err);
                                        callback(err, null);
                                    } else {
                                        console.log(json);
                                        data.message = data.expertname + " has reject your request.";
                                        callMe(data, data2);
                                    }
                                });
                            }, function(callback1) {
                                var emailData2 = {};
                                emailData2.email = data.useremail;
                                emailData2.filename = 'dummy.ejs';
                                emailData2.name = data.username;
                                emailData2.timestamp = moment().format("MMM DD YYYY");
                                emailData2.time = moment().format("HH.MM A");
                                emailData2.content = "You have received a response from the expert regarding your request. Please login to check.";
                                emailData2.subject = "Booking Status";
                                Config.email(emailData2, function(err, json) {
                                    if (err) {
                                        console.log(err);
                                        callback(err, null);
                                    } else {
                                        console.log(json);
                                        data.message = data.expertname + " has reject your request.";
                                        callMe(data, data2);
                                    }
                                });
                            }], function(err, asyncrespo) {
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    data.message = data.expertname + " has reject your request.";
                                    callMe(data, data2);
                                }
                            });
                            break;
                        case "paid":
                            async.parallel([function(callback1) {
                                var emailData = {};
                                emailData.email = data.expertemail;
                                emailData.filename = 'dummy.ejs';
                                emailData.name = data.expertname;
                                emailData.timestamp = moment().format("MMM DD YYYY");
                                emailData.time = moment().format("HH.MM A");
                                emailData.content = "The call with " + data.username + " is confirmed. We will connect you with the user on " + data2.bookTime + ".";
                                emailData.subject = "Booking Status";
                                Config.email(emailData, function(err, json) {
                                    if (err) {
                                        console.log(err);
                                        callback(err, null);
                                    } else {
                                        console.log(json);
                                        data.message = data.expertname + " has reject your request.";
                                        callMe(data, data2);
                                    }
                                });
                            }, function(callback1) {
                                var emailData2 = {};
                                emailData2.email = data.email;
                                emailData2.filename = 'dummy.ejs';
                                emailData2.name = data.username;
                                emailData2.timestamp = moment().format("MMM DD YYYY");
                                emailData2.time = moment().format("HH.MM A");
                                emailData2.content = "Thank you for the payment. Your call with " + data.expertname + " is confirmed. We will connect you with the expert at " + data2.bookTime + ".";
                                emailData2.subject = "Booking Status";
                                Config.email(emailData2, function(err, json) {
                                    if (err) {
                                        console.log(err);
                                        callback(err, null);
                                    } else {
                                        console.log(json);
                                        data.message = data.expertname + " has reject your request.";
                                        callMe(data, data2);
                                    }
                                });
                            }], function(err, asyncrespo) {
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    data.message = data.username + " has paid for service.";
                                    callMe(data, data2);
                                }
                            });
                            break;
                        default:
                            callback({
                                message: "Wrong status"
                            }, null);
                            break;
                    }
                }
            });
        } else {
            Booking.findOne({
                expert: data.expert,
                user: data.user,
                status: {
                    $in: ["accept", "paid", "pending"]
                }
            }).exec(function(err, foundme) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    if (_.isEmpty(foundme)) {
                        booking.status = "pending";
                        booking.save(function(err, data2) {
                            if (err) {
                                callback(err, null);
                            } else {
                                async.parallel([function(callback1) {
                                    var emailData = {};
                                    emailData.email = data.email;
                                    emailData.filename = 'dummy.ejs';
                                    emailData.name = data.username;
                                    emailData.timestamp = moment().format("MMM DD YYYY");
                                    emailData.time = moment().format("HH.MM A");
                                    emailData.content = "Your request has been sent across to the expert. Please await our confirmation";
                                    emailData.subject = "Booking Status";
                                    console.log(emailData);
                                    Config.email(emailData, function(err, json) {
                                        if (err) {
                                            callback1(err, null);
                                        } else {
                                            callback1(null, {
                                                message: "Done"
                                            });
                                        }
                                    });
                                }, function(callback1) {
                                    Notification.saveData({
                                        expert: booking.expert,
                                        notification: data.username + " has booked you.",
                                    }, function(err, notRespo) {
                                        if (err) {
                                            callback1(err, null);
                                        } else {
                                            callback1(null, {
                                                message: "Done"
                                            });
                                        }
                                    });
                                }, function(callback1) {
                                    var emailData2 = {};
                                    emailData2.email = data.expertemail;
                                    emailData2.filename = 'dummy.ejs';
                                    emailData2.name = data.expertname;
                                    emailData2.timestamp = moment().format("MMM DD YYYY");
                                    emailData2.time = moment().format("HH.MM A");
                                    emailData2.content = "Hi! You have received a request for a discussion. Please login to check and confirm. Thanks.";
                                    emailData2.subject = "Booking Status";
                                    console.log(emailData2);
                                    Config.email(emailData2, function(err, emailRespo) {
                                        if (err) {
                                            callback1(err, null);
                                        } else {
                                            callback1(null, {
                                                message: "Done"
                                            });
                                        }
                                    });
                                }], function(err, asyncrespo) {
                                    if (err) {
                                        console.log(err);
                                        callback(err, null);
                                    } else {
                                        console.log(err);
                                        callback(null, data2);
                                    }
                                });
                            }
                        });
                    } else {
                        callback(null, {
                            message: "Cannot Book Expert"
                        });
                    }
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
    getBooking: function(data, callback) {
        var matchobj = "";
        if (data.status == "") {
            matchobj = {
                user: data.user,
                status: {
                    $in: ["completed", "reject", "refunded"]
                }
            }
        } else {
            matchobj = {
                user: data.user,
                status: data.status
            };
        }

        Booking.find(matchobj).populate("expert", '-_id -password -forgotpassword -__v ').exec(callback);
    },

    getExpertBooking: function(data, callback) {
        var matchobj = "";
        if (data.status == "") {
            matchobj = {
                expert: data.expertuser,
                status: {
                    $in: ["completed", "reject", "refunded"]
                }
            }
        } else {
            matchobj = {
                expert: data.expertuser,
                status: data.status
            };
        }
        Booking.find(matchobj).populate("user", '-_id -password -forgotpassword -__v ').exec(callback);
    },


};
module.exports = _.assign(module.exports, models);
