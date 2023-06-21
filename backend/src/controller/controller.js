const model = require('../model/model')
const AWS = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config({path: '../.env' })

module.exports = {
    get_list_papers_aws : async (req, res) => {
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
    },

    get_list_papers_google : async (req, res) => {
        try{
            let result = model.data_list()
            const url = 'https://us-central1-shaped-icon-390417.cloudfunctions.net/check_duplicate_papers'
            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify(result),
                headers: { "Content-Type": "application/json" },
            });
            const responseJson = await response.json()

            console.log("resposta: ", responseJson)
            return res.status(200).json(responseJson)
        } catch (error){
            console.log("Erro: ", error.message)
        }
    },
    //get_list_papers_microsoft : async (req, res) => {}
}
