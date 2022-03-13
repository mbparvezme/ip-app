import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head'
import validator from 'validator'

const Register = () => {
  const [error, setError] = useState(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPass, setConfirmPass] = useState(null)

  let register = async (e) => {
    e.preventDefault()

    // if(!name || !email || !password || !confirmPass) {
    //   setError("Please complete the form properly!")
    //   return
    // }

    // if(!validator.isEmail(email)){
    //   setError('Please enter a valid email address!')
    //   return
    // }

    // if(password !== confirmPass) {
    //   setError("Passwords do not match!")
    //   return
    // }

    let data = await fetch("/api/register", {
      body: JSON.stringify({name, email, password, password_confirmation : confirmPass}),
      method: "post", headers: {"Content-Type": "application/json"}
    }).then(res => res.json())

    if(data.success){
      localStorage.setItem("userData", JSON.stringify(data.user))
      window.location.href = "/admin"
    }
    else{
      if(data.data){
        let obj = data.data
        let msg = ''
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            msg += obj[prop][0]+'<br>'
          }
        }
        setError( msg )
      }
      else setError(data.message)
    }
  }

  return (
    <>
      <Head>
        <title>REGISTER - IP LOG</title>
        <meta name="description" content="Create account to IP management system"/>
      </Head>

      <div className="sm:w-1/2 lg:w-2/5 xl:max-w-2xl mx-auto">
        <h1 className="pageTitle">REGISTER</h1>

        <p className={`${error ? "" : "hidden"}` + " bg-red text-red-light py-2 px-4 mb-8 rounded-md"} onClick={()=>setError(null)}>
        <span dangerouslySetInnerHTML={{__html: error}} />
        </p>

        <form className="mb-8 flex flex-col" onSubmit={(e)=>register(e)}>
          <div className='mb-8'>
            <label htmlFor="name">FULL NAME</label>
            <input id="name" type="text" placeholder="Your full name" onInput={(e)=>setName(e.target.value)}/>
          </div>
          <div className='mb-8'>
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input id="email" type="email" placeholder="email@gmail.com" onInput={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className='mb-8'>
            <label htmlFor="password">PASSWORD</label>
            <input id="password" type="password" placeholder="Password" onInput={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className='mb-8'>
            <label htmlFor="passwordConfirm">CONFIRM PASSWORD</label>
            <input id="passwordConfirm" type="password" placeholder="Retype password" onInput={(e)=>setConfirmPass(e.target.value)}/>
          </div>
          <button className="cta-button">CREATE ACCOUNT</button>
        </form>
        <div className="text-sm font-display font-semibold text-center text-muted">
          Already have an account ? <Link href='/login'><a className="cursor-pointer text-brand">Login</a></Link>
        </div>
      </div>
    </>
  )
}

export default Register;