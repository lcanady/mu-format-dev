const formatApi = async (body) => {

  const rawResponse = await fetch('https://mu-format-api.herokuapp.com', {
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