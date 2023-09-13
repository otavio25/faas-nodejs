function main(args) {
    try {
        const map = new Map()
        args.forEach(item => {
            map.set(item.doi, item)
        })
        
        const uniqueList = Array.from(map.values())

        return {
            statusCode: 200,
            body:JSON.stringify(uniqueList)
        }   
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
            message: `Internal server error! ${error.message}`
            }),
        }
    }
}