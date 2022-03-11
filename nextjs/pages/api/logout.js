import cookie from "cookie"

export default async (req, res) => {

  // Get current cookie
  let activeCookie = req.cookies.acctkn || null

  // Send request to logout endpoint to delete cookie token
  let data = await fetch(process.env.API_URL + "logout", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + activeCookie
    },
  })

  // Reset cookie token to expire
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("acctkn", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "lax",
      path: "/",
    })
  )

  res.statusCode = 200
  res.json({ success: true })
  res.end()
  return

}