import Head from 'next/head'
import cookie from "cookie"
import { humanReadableTime } from  "../../lib/function"

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
  return (
    <>
      <Head>
        <title>ACTIVITY LOGS - IP LOG</title>
        <meta name="description" content="Activity logs of IP management system"/>
      </Head>

      <div className="lg:w-4/5 xl:3/5 mx-auto">
        <h1 className="pageTitle">Activity Logs</h1>
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th>Sl.</th>
              <th>IP</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              let d = JSON.parse(item.data)
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.ip_id}</td>
                  <td>
                    {d.map((v, i) => {
                      return (
                        <p className='text-sm'>
                          {v.action == "update" ?
                          `Updated to ${v.data.newLabel} from ${v.data.oldLabel}  by ${v.user.name} on ${humanReadableTime(v.time)}`:
                          `Deleted by ${v.user.name} on ${humanReadableTime(v.time)}`}
                        </p>
                      )
                    })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    </>
  );
}

export default Logs;