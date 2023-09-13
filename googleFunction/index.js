const functions = require('@google-cloud/functions-framework');

functions.http('helloHttp', (req, res) => {
    try { 
        let data = req.body
        const map = new Map()
        data.forEach(item => {
            map.set(item.doi, item)
        })
        
        const uniqueList = Array.from(map.values())
        data = uniqueList

        return res.status(200).json(data)    
    } catch (error) {
        return res.status(500).json(`Internal server error! ${error.message}`)
    }
});