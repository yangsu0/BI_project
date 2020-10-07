var mongoose = require('mongoose');
var userModel = require('../models/user');
var wineModel = require('../models/wine');


class RSService {

    completeWithUnPopularWine1(kbWine, doc, callback) {
        wineModel.find({$and: [{ '_id': { $nin: doc.wineLiked }}, {'_id': { $nin: doc.wineLikedR }}, {'_id': { $nin: doc.notLiked }}], 'popular': undefined, 
        'flavors.flavors':  { $in :  doc.preference.flavors  }, 
        'flavors.fruitname': { $in: doc.preference.fruits},
        'price': { $lt: doc.preference.priceRange }}).exec((err, wineUnPopular) => {
            if (kbWine.length > 2)
                kbWine = kbWine.slice(0, 2);
            if (wineUnPopular.length > 2)
                wineUnPopular = wineUnPopular.slice(0, 3);

            var final_res = [].concat(kbWine, wineUnPopular);
            
            callback(final_res)
            
        });
    }

    completeWithUnPopularWine2(kbWine, doc, callback) {
        wineModel.find({$and: [{ '_id': { $nin: doc.wineLiked }}, {'_id': { $nin: doc.wineLikedR }}, {'_id': { $nin: doc.notLiked }}], 'popular': undefined, 
        'flavors.flavors':  { $in :  doc.preference.flavors  }, 
        'price': { $lt: doc.preference.priceRange }}).exec((err, wineUnPopular) => {
            if (kbWine.length > 2)
                kbWine = kbWine.slice(0, 2);
            if (wineUnPopular.length > 2)
                wineUnPopular = wineUnPopular.slice(0, 3);

            var final_res = [].concat(kbWine, wineUnPopular);
            
            callback(final_res);
        });
    }
    
    compute_kb_rs(userId, res) {
        userModel.findById(mongoose.Types.ObjectId(userId), 'wineLiked wineLikedR notLiked preference').exec((err, doc) => {
            if (doc.preference != undefined && doc.preference.flavors != undefined && doc.preference.fruits != undefined) {
                wineModel.find({$and: [{ '_id': { $nin: doc.wineLiked }}, {'_id': { $nin: doc.wineLikedR }}, {'_id': { $nin: doc.notLiked }}], 'popular': 1, 
                'flavors.flavors':  { $in :  doc.preference.flavors  }, 
                'flavors.fruitname': { $in: doc.preference.fruits},
                'price': { $lt: doc.preference.priceRange }} , (err, pro) => {
                    this.completeWithUnPopularWine1(pro, doc, res);
                });
            }
            else if (doc.preference != undefined && doc.preference.flavors != undefined && doc.preference.fruits == undefined) {
                wineModel.find({$and: [{ '_id': { $nin: doc.wineLiked }}, {'_id': { $nin: doc.wineLikedR }}, {'_id': { $nin: doc.notLiked }}], 'popular': 1, 
                'flavors.flavors':  { $in :  doc.preference.flavors  }} , (err, pro) => {
                    this.completeWithUnPopularWine2(pro, doc, res);
                });
            }
        })
    }


}

var rsService = new RSService();

module.exports = rsService;