module.exports = async function (context, req) {
    try {    
        let data = req.body
        const map = new Map()
        data.forEach(item => {
            map.set(item.doi, item)
        })
        
        const uniqueList = Array.from(map.values())
        data = uniqueList
        
        context.res = {
            status: 200,
            body: JSON.stringify(data),
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: JSON.stringify({
                message: `Internal server error! ${error.message}`
            }),
        }
    }
}