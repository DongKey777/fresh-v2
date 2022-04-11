const sequelize = require('sequelize');

class Cart extends Model {
    static init(sequelize){
    return super.init({
        product:{
            primaryKey : true
        },
        user:{
            primaryKey : true  
        }
    })
}
}
