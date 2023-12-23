const shortid = require('shortid'); //this will generate a unique combination of letters every time a new request is made
const Url = require('../models/urlSchema');

module.exports.shortenUrl = async function(req, res){
    try {

        if(!req.body.url){
            return res.status(400).json({ error: 'Please enter the url'});
        }

        const uniqueId = shortid.generate();
        
        const url = await Url.create({
            shortId: uniqueId,
            originalUrl: req.body.url,
        })
        res.status(200).json(url);

    } catch (error) {
        console.error('Internal server error', error);
        res.status(200).json(error);
    }
}

module.exports.redirect = async function(req, res){
    try {
        const shortId = req.params.shortId;
        const url = await Url.findOne({shortId});
        
        if (!url) {
            console.error('URL not found');
            return res.status(404).json({ error: 'Not Found' });
        }

        return res.redirect(url.originalUrl);

    } catch (error) {
        console.error('Internal server error', error);
        res.status(200).json(error);
    }
}