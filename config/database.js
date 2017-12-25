const config=require("./config");

module.exports = {
    connectionString: 'mongodb://'+config.mongoUsername+':'+config.mongoPassword+'@'+config.mongoHost+':'+config.mongoPort+'/'+config.mongoDatabase
}