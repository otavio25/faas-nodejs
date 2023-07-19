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
            result = await (new AWS.Lambda().invoke(params).promise())
            return res.status(200).json(result) 
        } catch (error) {
            console.log("Erro: ", error.message)
            return res.status(500).json({message: 'Erro no servidor! Contate o administrador.'})
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
            return res.status(200).json(responseJson)
        } catch (error){
            console.log("Erro: ", error.message)
            return res.status(500).json({message: 'Erro no servidor! Contate o administrador.'})
        }
    },

    get_list_papers_azure : async (req, res) => {
        try{
            let result = model.data_list()
            const url = 'https://checkduplicatepapers.azurewebsites.net/api/HttpTrigger1?code=6o1JmTbW8PorgPKEG_76DbMh8gj_lCvu8mf1dIu2KjPOAzFuSHSjzw=='
            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify(result),
                headers: { "Content-Type": "application/json" },
            });
            const responseJson = await response.json()
            return res.status(200).json(responseJson)
        } catch (error){
            console.log("Erro: ", error.message)
            return res.status(500).json({message: 'Erro no servidor! Contate o administrador.'})
        }
    },

    get_list_papers_digitalocean : async (req, res) => {
        try {
            let result = model.data_list()
            const url = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-72e3186e-a5ae-4dd8-8890-8c9ab664dcb7/actions/verify_papers?blocking=true&result=true'
            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify(result),
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Basic ODgzN2Q0OGMtYzgyMS00OWFlLWFmNDgtMDQ4MDQzMGY4MTk5OmVXcjZFbklXVnR6b24wcWRsT2FaM2s5UGlPT3V0cFUxSDQyejQ5ZlVaMWxGTjhaSlkzZU1oVW9KSUk3Z2h4cVo="
                },
            });
            console.log(response)
            const responseJson = await response.json()
            return res.status(200).json(responseJson)
        } catch (error) {
            console.log("Erro: ", error.message)
            return res.status(500).json({message: 'Erro no servidor! Contate o administrador.'})
        }
    }
}
