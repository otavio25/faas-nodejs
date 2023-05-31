const model = require('../model/model')
const AWS = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config({path: '../.env' })

module.exports = {
    get_list_papers : async (req, res) => {
        try {
            let result = model.data_list()
            
            AWS.config.update({
                accessKeyId: process.env.ACCESSKEYID, 
                secretAccessKey: process.env.SECRETACCESSKEY,
                region: 'us-east-2'
            })
        
            const params = {
                FunctionName: 'aws-nodejs-dev-check_duplicate_papers', 
                Payload: JSON.stringify(result),
            };
        
            result = await (new AWS.Lambda().invoke(params).promise());
        
            return res.status(200).json(result) 
        } catch (error) {
            console.log("Erro: ", error.message)
        }
    }
}
