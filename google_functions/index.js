exports.check_duplicate_papers = (req, res) => {
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
        return res.status(200).json(result)    
    } catch (error) {
        return res.status(500).json(`Internal server error! ${error.message}`)
    }
};