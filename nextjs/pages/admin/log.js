import Head from 'next/head'
import cookie from "cookie"
import { humanReadableTime } from  "../../lib/function"
import { useState } from 'react';

// This gets called on every request
export async function getServerSideProps(context) {
  const activeCookie = cookie.parse(context.req.headers.cookie).acctkn;
  let data = await fetch(process.env.API_URL + "log", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + activeCookie
    },
  })
  .then(res => res.json())
  return { props: { data } }
}

const Logs = ({data}) => {

  let [tab, setTab] = useState("ip")

  return (
    <>
      <Head>
        <title>ACTIVITY LOGS - IP LOG</title>
        <meta name="description" content="Activity logs of IP management system"/>
      </Head>

      <div className="lg:w-4/5 xl:3/5 mx-auto">
        <h1 className="pageTitle">Activity Logs</h1>
        <div className='flex items-center justify-start mb-8'>
          <button className={'px-4 py-3 rounded-lg mr-4 ' + (tab=="ip" ? 'active' : 'muted')} onClick={()=>setTab("ip")}>IP LOGS</button>
          <button className={'px-4 py-3 rounded-lg ' + (tab=="user" ? 'active' : 'muted')} onClick={()=>setTab("user")}>USER LOGS</button>
        </div>
        {
          tab=="ip" ?
          <table className="table-auto w-full text-left topAlign">
            <thead>
              <tr>
                <th>Sl.</th>
                <th>IP</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {data.ipLog.map((item, index) => {
                let d = JSON.parse(item.data)
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.ip}</td>
                    <td className='border-l border-black/10 dark:border-black/50'>
                      {d.map(v => {
                        return (
                          <p className='text-sm border-t border-black/10 dark:border-black/50 py-1 first:border-t-0'>
                            <span dangerouslySetInnerHTML={{__html: `Updated to <b>${v.data.newLabel}</b> from <b>${v.data.oldLabel}</b>  by <b>${v.user.name}</b> on <i>${humanReadableTime(v.time)}</i>`}} />
                          </p>
                        )
                      })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          :
          <table className="table-auto w-full text-left topAlign">
            <thead>
              <tr>
                <th>Sl.</th>
                <th>User</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {data.authLog.map((item, index) => {
                let d = JSON.parse(item.data)
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td className='border-l border-black/10 dark:border-black/50'>
                      <p className='text-sm border-t border-black/10 dark:border-black/50 py-1 first:border-t-0'>
                        <span dangerouslySetInnerHTML={{__html: `${d.data} on <i>${humanReadableTime(d.time)}</i>`}} />
                      </p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        }
      </div>
    </>
  );
}

export default Logs;