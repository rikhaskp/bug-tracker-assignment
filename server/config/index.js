// Development
let config = {
    database: {
        mongoConnection: 'mongodb://'+process.env.MONGO_DB_HOST+':'+process.env.MONGO_DB_PORT+'/'+process.env.MONGO_DB_NAME
    },
    
    server: {
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT
    },
}

export default config