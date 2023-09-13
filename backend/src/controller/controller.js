const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config({path: '../.env' })

module.exports = {
    getListPapersAws : async (req, res) => {
        try {
            console.log("lendo arquivo com os papers...")
            data = fs.readFileSync(process.env.PAPERS)
            data = JSON.parse(data)
            data = data.papers
            console.log(data.length)
            const url = 'https://ezq21t35h9.execute-api.us-east-2.amazonaws.com/checkPapers'
            const response_aws = await fetch(url, {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            })
            const responseJson = await response_aws.json()
            console.log(responseJson.length)
            return res.status(200).json(responseJson)
        } catch (error) {
            console.log("Erro: ", error.message)
            return res.status(500).json({message: 'Erro no servidor!'})
        }
    },

    getListPapersGoogle : async (req, res) => {
        try{
            console.log("lendo arquivo com os papers...")
            data = fs.readFileSync(process.env.PAPERS)
            data = JSON.parse(data)
            data = data.papers
            console.log(data.length)
            const url = 'https://southamerica-east1-shaped-icon-390417.cloudfunctions.net/checkDuplicatePapers'
            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            })
            const responseJson = await response.json()
            console.log(responseJson.length)
            return res.status(200).json(responseJson)
        } catch (error){
            console.log("Erro: ", error.message)
            return res.status(500).json({message: 'Erro no servidor! Contate o administrador.'})
        }
    },

    getListPapersAzure : async (req, res) => {
        try{
            console.log("lendo arquivo com os papers...")
            data = fs.readFileSync(process.env.PAPERS)
            data = JSON.parse(data)
            data = data.papers
            console.log(data.length)
            const url = 'https://checkduplicatepapers.azurewebsites.net/api/HttpTrigger1?code=M61lLSNh_U-biYRY6iHfZv5wbJTVzb2INHBmdCcmquMXAzFuJ3La9w=='
            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            })
            const responseJson = await response.json()
            console.log(responseJson.length)
            return res.status(200).json(responseJson)
        } catch (error){
            console.log("Erro: ", error.message)
            return res.status(500).json({message: 'Erro no servidor! Contate o administrador.'})
        }
    },

    getListPapersDigitalocean : async (req, res) => {
        try {
            console.log("lendo arquivo com os papers...")
            data = fs.readFileSync(process.env.PAPERS)
            data = JSON.parse(data)
            console.log(data.papers.length)
            const url = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-72e3186e-a5ae-4dd8-8890-8c9ab664dcb7/default/verify_papers'
            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify(data),
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Basic ODgzN2Q0OGMtYzgyMS00OWFlLWFmNDgtMDQ4MDQzMGY4MTk5OmVXcjZFbklXVnR6b24wcWRsT2FaM2s5UGlPT3V0cFUxSDQyejQ5ZlVaMWxGTjhaSlkzZU1oVW9KSUk3Z2h4cVo="
                },
            })
            const responseJson = await response.json()
            console.log(responseJson.length)
            return res.status(200).json(responseJson)
        } catch (error) {
            console.log("Erro: ", error.message)
            return res.status(500).json({message: 'Erro no servidor! Contate o administrador.'})
        }
    }
}
