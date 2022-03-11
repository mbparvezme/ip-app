import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from "next/head"
import Link from 'next/link'
import useDarkMode from "../lib/useDarkMode"
import { ValidateIPaddress, toggleTheme } from  "../lib/function"


const Layout = ({ children }) => {

  let [modal, setModal] = useState(false)
  let [error, setError] = useState(null)
  let [ip, setIp] = useState("")
  let [label, setLabel] = useState("")
  const router = useRouter()
  const [colorTheme, setTheme] = useDarkMode();

  let logout = async () => {
    let data = await fetch( "/api/logout", {headers: {"Content-Type": "application/json"}})
    .then(res => res.json())

    if(data.success){
      localStorage.removeItem("userData")
      window.location.href = "/login"
    }
    else{
      alert("Something went wrong! Please try again.")
    }
  }

  let addIP = async (e) => {
    e.preventDefault()
    if(!ip || !label){
      setError("Please enter the IP and label")
      return
    }

    if(!ValidateIPaddress(ip)){
      setError("Please enter a valid IP address")
      return
    }

    let data = await fetch( "/api/add-ip", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      credentials : "include",
      body: JSON.stringify({ip, label})
    })
    .then(res => res.json())

    if(data.success){
      setModal(false)
      setIp('')
      setLabel('')
      router.reload(window.location.pathname)
    }
    else{
      setError(data.message)
    }
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-7xl mx-auto min-h-screen relative">
        <nav className="w-full flex items-center bg-dark dark:bg-secondary text-light">
          <div className="logo">
            <Link href="/"><a>LOGO</a></Link>
          </div>
          <div className="links">

            <Link href="/admin"><a>Dashboard</a></Link>
            <Link href="/admin/log"><a>Logs</a></Link>
            <button className='border border-brand rounded-full py-2 px-4' onClick={()=>logout()}>Logout</button>
            <Link href="/"><a> </a></Link>
            <Link href="/"><a> </a></Link>
            <Link href="/login"><a>Login</a></Link>
            <Link href="/register"><a className='border border-brand rounded-full'>Register</a></Link>


          </div>
            <button onClick={() => setTheme(colorTheme=="light"?"light":"dark")} className="flex items-center p-0 w-4 h-4 flex-shrink-0 ml-6">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
              </svg>
            </button>
        </nav>
        <section className="pageContent py-24 px-8 md:px-16">
          {children}
        </section>
        <footer className="pb-8 text-center text-xs">&copy; All rights reserved</footer>
        {
          modal ? 
            <div className='inset-0 fixed bottom-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center p-8'>
              <form className='bg-primary px-8 py-12 flex flex-col z-10 w-full md:w-1/2 lg:w-1/3 shadow-xl rounded-2xl' onSubmit={(e) => addIP(e)}>
                <h2 className="text-xl font-bold mb-8 text-muted">ADD NEW IP</h2>
                <p className={`${error ? "" : "hidden"}` + " bg-red text-red-light py-2 px-4 mb-6 rounded-md"} onClick={()=>setError(null)}>
                  {error}
                </p>
                <div className='mb-8'>
                  <label htmlFor="ip">IP</label>
                  <input id="ip" type="text" placeholder="111.222.111.222" onInput={(e)=>setIp(e.target.value)}/>
                </div>
                <div className='mb-8'>
                  <label  htmlFor="label">LABEL</label>
                  <input id="label" type="text" placeholder="Type label" onInput={(e)=>setLabel(e.target.value)}/>
                </div>
                <button className="cta-button">ADD IP</button>
              </form>

            </div>
          : ""
        }

        <button className="fixed bottom-8 right-8 text-white bg-brand p-4 w-12 h-12 rounded-full flex shadow-xl shadow-brand/20 hover:shadow-lg hover:shadow-brand/50 transition-shadow duration-300" onClick={()=>setModal(!modal)}>
        <svg xmlns="http://www.w3.org/2000/svg" className={"w-full h-full stroke-light transform" + (modal ? ' rotate-45' : '')} viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </button>

      </main>
    </>
  )
}

export default Layout;