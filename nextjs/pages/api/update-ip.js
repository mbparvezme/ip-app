export default async (req, res) => {

  // Destruct user's data from the request body
  let {id, label, oldLabel, user} = req.body
  let activeCookie = req.cookies.acctkn || null

  // Send request to backend API
  let data = await fetch(process.env.API_URL + id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + activeCookie
    },
    credentials : "include",
    body: JSON.stringify({label, oldLabel, user})
  })

  
  let result = await data.json()
  console.log(result)
  res.statusCode = data.status

  res.json(result)
  res.end()

  return
}

