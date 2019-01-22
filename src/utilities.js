const formatApi = async (body) => {

  const rawResponse = await fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
          
          return await rawResponse.json()
}

export {formatApi}