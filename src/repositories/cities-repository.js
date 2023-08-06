const CrudRepository=require('./crud-repository');

const {Cities}=require('../models')

class CitiesRepository extends CrudRepository{
    constructor(){
        super(Cities);
    }
}

module.exports=CitiesRepository;