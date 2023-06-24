module.exports = async function (context, req) {
    try {    
        let data = req.body
        const map = new Map()
        data.papers.forEach(item => {
            map.set(item.doi, item)
        })
        
        const uniqueList = Array.from(map.values())
        data.papers = uniqueList
        data.number_of_papers = uniqueList.length
        data.number_of_papers_by_database.Scopus = uniqueList.length
        
        let result = data
        
        context.res = {
            status: 200,
            body: JSON.stringify(result),
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