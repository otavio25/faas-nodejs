module.exports.handler = async (event) => {
  try {
    if (!event || !event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Entrada inválida!',
        }),
      }
    }
    let data = JSON.parse(event.body)

    const map = new Map()
      
    data.forEach(item => {
        map.set(item.doi, item)
    })
    
    const uniqueList = Array.from(map.values())
    data = uniqueList

    return data

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Internal server error! ${error.message}`
      }),
    }
  }
};
