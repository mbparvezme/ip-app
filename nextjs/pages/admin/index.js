import cookie from "cookie"
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState } from "react"
import { ValidateIPaddress, humanReadableTime } from  "../../lib/function"

// This gets called on every request
export async function getServerSideProps(context) {
  const activeCookie = cookie.parse(context.req.headers.cookie).acctkn
  let data = await fetch(process.env.API_URL, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + activeCookie
    },
  })
  .then(res => res.json())
  return { props: { data } }
}

const Admin = ({data}) => {

  const router = useRouter()

  let [error, setError] = useState(null)
  let [editModal, setEditModal] = useState(null)
  let [id, setId] = useState(null)
  let [ip, setIp] = useState("")
  let [label, setLabel] = useState("")
  let [oldLabel, setOldLabel] = useState("")

  let handleEditModal = (id, ip, label) => {
    setId(id)
    setIp(ip)
    setLabel(label)
    setOldLabel(label)
    setEditModal(true)
  }

  let update = async (e) => {
    e.preventDefault()
    if(!ip || !label){
      setError("you must enter an IP and a label")
      return
    }

    let user = JSON.parse(localStorage.getItem("userData"))
    let data = await fetch( "/api/update-ip", {
      method: "put",
      headers: {"Content-Type": "application/json"},
      credentials : "include",
      body: JSON.stringify({id, label, oldLabel, user})
    })
    .then(res => res.json())

    if(data.success){
      setEditModal(false)
      setId(null)
      setIp("")
      setLabel("")
      setOldLabel("")
      router.reload(window.location.pathname)
    }
    else{
      setError(data.message)
    }
  }

  return (
    <>
      <Head>
        <title>DASHBOARD - IP LOG</title>
        <meta name="description" content="Dashboard of IP management system" />
      </Head>

      <div className="lg:w-4/5 xl:3/5 mx-auto">
        <h1 className="pageTitle">All IP's</h1>
        {editModal}
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th>Sl.</th>
              <th>IP</th>
              <th>Label</th>
              <th>Created</th>
              <th>Updated</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  {/* <td id={"data-ip-" + item.id} onDoubleClick={(n,e)=>handleDC(n,'ip',item.id, item.ip)}>{item.ip}</td>
                  <td id={"data-label-" + item.id} onDoubleClick={(n,e)=>handleDC(n,'label',item.id, item.label)}>{item.label}</td> */}

                  <td>{item.ip}</td>
                  <td>{item.label}</td>

                  <td>{item.created_at ? humanReadableTime(item.created_at) : "n/a"}</td>
                  <td>{item.updated_at && item.created_at != item.updated_at ? humanReadableTime(item.updated_at) : "n/a"}</td>
                  <td>
                    <button onClick={() => handleEditModal(item.id, item.ip, item.label)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {
        editModal ? 
          <div className='inset-0 fixed bottom-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center p-8 z-20'>
            <form className='bg-primary px-8 py-12 flex flex-col z-10 w-full md:w-1/2 lg:w-1/3 shadow-xl rounded-2xl' onSubmit={(e) => update(e)}>
              <h2 className="text-center font-bold mb-8 text-muted">
                UPDATE LABEL
                <p className="text-sm text-muted font-normal">Edit label of IP {ip}</p>
              </h2>
              <p className={`${error ? "" : "hidden"}` + " bg-red text-red-light py-2 px-4 mb-6 rounded-md"} onClick={()=>setError(null)}>
                {error}
              </p>
              <div className='mb-8'>
                <label  htmlFor="label">LABEL</label>
                <input id="label" type="text" placeholder="Type label" onInput={(e)=>setLabel(e.target.value)} value={label}/>
              </div>
              <input type="hidden" value={id} readOnly />
              <input type="hidden" value={oldLabel} readOnly />
              <button className="cta-button mb-4">UPDATE</button>
              <button type="button" onClick={()=>setEditModal(false)}>Cancel</button>
            </form>

          </div>
        : ""
      }



    </>
  );
}


export default Admin;

