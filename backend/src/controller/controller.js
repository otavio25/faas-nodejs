const model = require('../model/model')
const AWS = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config({path: '../.env' })

console.log("access key id: ", process.env.ACCESSKEYID)
console.log("secret access key: ", process.env.SECRETACCESSKEY)

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
                FunctionName: 'VerificaDuplicidade', 
                Payload: JSON.stringify(result),
            };
        
            result = await (new AWS.Lambda().invoke(params).promise());
        
            console.log(result);
        
            return res.status(200).json(result) 
        } catch (error) {
            console.log("Temos um erro: ", error.message)
        }
    }
}
