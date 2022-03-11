export default async (req, res) => {

  // Destruct user's data from the request body
  let {ip, label} = req.body
  let activeCookie = req.cookies.acctkn || null

  // Send request to backend API
  let data = await fetch(process.env.API_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + activeCookie
    },
    credentials : "include",
    body: JSON.stringify({ip, label})
  })

  let result = await data.json()
  res.statusCode = data.status

  res.json(result)
  res.end()

  return
}

