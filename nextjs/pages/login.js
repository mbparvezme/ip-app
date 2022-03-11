import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head'

const Login = () => {
  const [error, setError]       = useState(null)
  const [email, setEmail]       = useState()
  const [password, setPassword] = useState()

  let login = async (e) => {
    e.preventDefault()
    if(!email || !password) {
      setError("Please enter your email and password")
      return
    }

    let data = await fetch( "/api/login", {
      body: JSON.stringify({email, password}),
      method: "post", headers: {"Content-Type": "application/json"},
      credentials : "include"
    })
    .then(res => res.json())

    if(data.success){
      localStorage.setItem("userData", JSON.stringify(data.user))
      window.location.href = "/admin"
    }
    else{
      setEmail('')
      setPassword('')
      setError(data.message)
    }
  }
  return (
    <>
      <Head>
        <title>LOGIN - IP LOG</title>
        <meta name="description" content="Login to IP management system"/>
      </Head>

      <div className="sm:w-1/2 lg:w-2/5 xl:max-w-2xl mx-auto">
        <h1 className="pageTitle">LOG IN</h1>

        <p className={`${error ? "" : "hidden"}` + " bg-red text-red-light py-2 px-4 mb-6 rounded-md"}>
          {error}
        </p>

        <form className="mb-8 flex flex-col" onSubmit={(e)=>login(e)}>
          <div className='mb-8'>
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input id="email" type="email" placeholder="email@gmail.com" onInput={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="mb-12">
            <label htmlFor="password">PASSWORD</label>
            <input id="password" type="password" placeholder="Enter your password" onInput={(e)=>setPassword(e.target.value)}/>
          </div>
          <button className="cta-button">LOG IN</button>
        </form>
        <div className="text-sm font-display font-semibold text-center text-muted">
          Don't have an account ? <Link href='/register'><a className="cursor-pointer text-brand">Sign up</a></Link>
        </div>
      </div>
    </>
  );
}

export default Login
