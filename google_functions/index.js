exports.check_duplicate_papers = (req, res) => {
    try {
        const map = new Map()
        data.papers.forEach(item => {
            map.set(item.doi, item)
        })
        
        const uniqueList = Array.from(map.values())
        data.papers = uniqueList
        data.number_of_papers = uniqueList.length
        data.number_of_papers_by_database.Scopus = uniqueList.length
        
        return data
        
    } catch (error) {
        return res.json(`Internal server error! ${error.message}`)
    }
};