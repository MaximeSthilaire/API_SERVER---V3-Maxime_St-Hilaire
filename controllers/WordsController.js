const Repository = require('../models/Repository');
const CollectionFilter = require('../models/collectionFilter');
const { decomposePath } = require('../utilities');

module.exports = 
class WordsController extends require('./Controller') {
    constructor(req, res){
        super(req, res, false /* needAuthorization */);
        this.wordsRepository = new Repository('words', true /* cached */);
    }

    get(){
        let params = this.getQueryStringParams(); 
        // if we have no parameter, expose the list of possible query strings
        if (params === null) {
            this.response.JSON(this.wordsRepository.getAll(), this.wordssRepository.ETag);
        }
        else {
            if (Object.keys(params).length > 0) {
                let collectionFilter = new CollectionFilter(this.wordsRepository.getAll(), params);
                this.response.JSON(collectionFilter.get(), this.wordsRepository.ETag);
            }
        }
    }
}