var mongoose = require('mongoose');
var userModel = require('../models/user');
var wineModel = require('../models/wine');
var recommendation_service = require('../services/recommendation-service');

class UserService {
    addLikedWineWithId(userId, wineId, res) {
        userModel.findById(mongoose.Types.ObjectId(userId), (err, user) => {
            var id = mongoose.Types.ObjectId(wineId);

            if (user.wineLiked.includes(id))
                return res.status(400).send({
                    "message": "Wine already liked."
                });
            else {
                wineModel.findById(id, (err, wine) => {
                    if (err) {
                        return res.status(404).send({"message": "Wine not found"});
                    }
                    wine.liked += 1;
                    wine.save();
                    user.wineLiked.push(mongoose.Types.ObjectId(wineId));
                    user.save();
                    res.status(200).send({
                        "message": "Wine successfully added to your list"
                    });
                });
            }
        });
    }

    getLikedWine(userId, res) {
        userModel.findById(mongoose.Types.ObjectId(userId), 'wineLiked wineLikedR wineLikedK preference').populate('wineLiked', 'title description').populate('wineLikedR', 'title description').populate('wineLikedK', 'title description').exec((err, doc) => {
            if (err)
                return res.status(500).send({error: err})
            if (doc.preference != undefined && doc.wineLikedK != undefined && doc.wineLikedK.length < 5) {
                recommendation_service.compute_kb_rs(userId, function(resultat) {
                    doc['wineLikedK'] = resultat;
                    return res.status(200).send({data: doc});
                });
            }
            else {
                return res.status(200).send({data: doc});
            }
        });
    }

    getUserPreference(userId, res) {
        userModel.findById(mongoose.Types.ObjectId(userId), 'preference', (err, doc) => {
            if (err)
                return res.status(500).send({error: err})
            return res.status(200).send({data: doc});
        })
    }

    removeLikedWine(userId, wineId, res) {
        userModel.findById(mongoose.Types.ObjectId(userId), (err, user) => {
            var id = mongoose.Types.ObjectId(wineId);
            if (!user.wineLiked.includes(id) && !user.wineLikedR.includes(id) && !user.wineLikedK.includes(id) )
                res.status(400).send({
                    "message": "Wine not liked yet."
                });
            else {
                wineModel.findById(id, (err, wine) => {
                    wine.liked -= 1;
                    if (wine < 0)
                        wine = 0;
                    wine.save();
                    if (user.wineLiked.includes(id)) {
                        var index = user.wineLiked.indexOf(wineId);
                        if (index > -1)
                            user.wineLiked.splice(index, 1);
                        user.save();
                        res.status(200).send({
                            "message": "OK"
                        });
                        user.update({ $push: { notLiked: mongoose.Types.ObjectId(id) } }, (errU, res) => {
                            if (errU)
                                console.log(errU);
                        });
                    }
                    else if (user.wineLikedK != undefined && user.wineLikedK.includes(i)) {
                        var index = user.wineLikedK.indexOf(wineId);
                        if (index > -1)
                            user.wineLikedK.splice(index, 1);
                        user.save();
                        res.status(200).send({
                            "message": "OK"
                        });
                        user.update({ $push: { notLiked: mongoose.Types.ObjectId(id) } }, (errU, res) => {
                            if (errU)
                                console.log(errU);
                        });
                    }
                    else if (user.wineLikedR != undefined && user.wineLikedR.includes(i)) {
                        var index = user.wineLikedR.indexOf(wineId);
                        if (index > -1)
                            user.wineLikedR.splice(index, 1);
                        user.save();
                        res.status(200).send({
                            "message": "OK"
                        });
                        user.update({ $push: { notLiked: mongoose.Types.ObjectId(id) } }, (errU, res) => {
                            if (errU)
                                console.log(errU);
                        });
                    }
                });
            }
        });
    }

    updatePreference(userId, newPreference, res) {
        userModel.findById(mongoose.Types.ObjectId(userId), (err, user) => {
            if (err) return res.status(500).send({ error: err });
            user.update({ preference: newPreference }, {upsert:true}, (err, doc) => {
                if (err) return res.status(500).send({ error: err });
                res.status(200).send({message: "succesfully saved"});
            });
        })
    }

    completeWithUnPopularWine1(kbWine, doc, res, userId) {
        wineModel.find({$and: [{ '_id': { $nin: doc.wineLiked }}, {'_id': { $nin: doc.wineLikedR }}, {'_id': { $nin: doc.notLiked }}], 'popular': undefined, 
        'flavors.flavors':  { $in :  doc.preference.flavors  }, 
        'flavors.fruitname': { $in: doc.preference.fruits},
        'price': { $lt: doc.preference.priceRange }}).exec((err, wineUnPopular) => {
            if (kbWine.length > 2)
                kbWine = kbWine.slice(0, 2);
            if (wineUnPopular.length > 2)
                wineUnPopular = wineUnPopular.slice(0, 3);

            var final_res = [].concat(kbWine, wineUnPopular);
            
            res.status(200).send({data: final_res});
            var ids_list = []
            final_res.forEach(elem => {
                ids_list.push(elem._id);
            })
           
            
            userModel.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { wineLikedK: ids_list }, (err, doc) => {
                if (err)
                    console.log(err)
            });
        });
    }

    completeWithUnPopularWine2(kbWine, doc, res, userId) {
        wineModel.find({$and: [{ '_id': { $nin: doc.wineLiked }}, {'_id': { $nin: doc.wineLikedR }}, {'_id': { $nin: doc.notLiked }}], 'popular': undefined, 
        'flavors.flavors':  { $in :  doc.preference.flavors  }, 
        'price': { $lt: doc.preference.priceRange }}).exec((err, wineUnPopular) => {
            if (kbWine.length > 2)
                kbWine = kbWine.slice(0, 2);
            if (wineUnPopular.length > 2)
                wineUnPopular = wineUnPopular.slice(0, 3);

            var final_res = [].concat(kbWine, wineUnPopular);
            
            res.status(200).send({data: final_res});
            userModel.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { wineLikedK: ids_list }, (err, doc) => {
                if (err)
                    console.log(err)
            });
        });
    }

    getUserKbRecommendation(userId, res) {
        userModel.findById(mongoose.Types.ObjectId(userId), 'wineLiked wineLikedK wineLikedR notLiked preference').populate('wineLikedK').exec((err, doc) => {
            if (err)
                return res.status(500).send({err: err});
            if (doc.wineLikedK != undefined && doc.wineLikedK.length == 5) {
                return res.status(200).send({data: doc.wineLikedK})
            }
            if (doc.preference != undefined && doc.preference.flavors != undefined && doc.preference.fruits != undefined) {
                wineModel.find({$and: [{ '_id': { $nin: doc.wineLiked }}, {'_id': { $nin: doc.wineLikedR }}, {'_id': { $nin: doc.notLiked }}], 'popular': 1, 
                'flavors.flavors':  { $in :  doc.preference.flavors  }, 
                'flavors.fruitname': { $in: doc.preference.fruits},
                'price': { $lt: doc.preference.priceRange }} , (err, pro) => {
                    this.completeWithUnPopularWine1(pro, doc, res, userId);
                });
            }
            else if (doc.preference != undefined && doc.preference.flavors != undefined && doc.preference.fruits == undefined) {
                wineModel.find({$and: [{ '_id': { $nin: doc.wineLiked }}, {'_id': { $nin: doc.wineLikedR }}, {'_id': { $nin: doc.notLiked }}], 'popular': 1, 
                'flavors.flavors':  { $in :  doc.preference.flavors  }} ,(err, pro) => {
                    this.completeWithUnPopularWine2(pro, doc, res, userId);
                });
            }
            else {
                return res.status(200).send({data: []});
            }
        })
    }

    getUserCbRecommendation(userId, res) {
        userModel.findById(mongoose.Types.ObjectId(userId), "recommendationWineCB").populate("recommendationWineCB.wine").exec((err, doc) => {
            if (err)
                return res.status(500).send({error: err})
            return res.status(200).send({data: doc});
        });
    }

}

var userService = new UserService();

module.exports = userService;