import cookie from "cookie"
export default async (req, res) => {

  // Destruct user's email and password from the request body
  let {email, password} = req.body

  // Fetch the user from the database
  let data = await fetch(process.env.API_URL + "login", {
    method: "post",
    headers: {"Content-Type": "application/json"},
    credentials : "include",
    body: JSON.stringify({email, password})
  })

  let result = await data.json()
  res.statusCode = data.status

  if(data.status === 201) {
    // Is user found set cookie and send response
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("acctkn", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
        sameSite: "lax",
        path: "/",
      })
    )
    let {id, name, email} = result.user
    let val = {
      success : result.success,
      error : result.error,
      token : result.token,
      user : {id, name, email}
    }
    res.json(val)
    res.end()
  }else{
    // If the user is not found, return an error
    res.json(result)
  }
  return
}

