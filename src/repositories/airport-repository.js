const CrudRepository=require('./crud-repository');

const { Airports }=require('../models')

class AirportsRepository extends CrudRepository{
    constructor(){
        super(Airports);
    }
}

module.exports=AirportsRepository;