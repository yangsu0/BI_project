var wineModel = require('../models/wine')

class WineService {
    /**
     * Filter list of wines based on his title
     * @param {*} name 
     * @param {*} res 
     */
    getWine(name, res) {
        wineModel.find( { "title": { $regex: name, $options: "i" } }, "_id title", (err, doc) => {
            if (err) {
                return res.status(500).send({error: "An error occured"})
            }
            res.status(200).send({
                message: "List of wines containing : " + name,
                data: doc
            });
        });
    }

    getPopularWine(res) {
        wineModel.find({popular: 1}, "_id title province price variety flavors").limit(10).exec((err, doc) => {
            if (err)
                return res.status(500).send({error: err})
            res.status(200).send({data: doc});
        });
    }
}


var wineService = new WineService();

module.exports = wineService;