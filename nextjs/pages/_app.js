import              "../styles/globals.css"
import Layout from  "../components/Layout"
import {AuthProvider} from "../lib/AuthContext"
import cookie from "cookie"

function MyApp({ Component, pageProps, authenticated }) {
  return (
    <AuthProvider authenticated={authenticated}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  let authenticated = false;
  const request = appContext.ctx.req;
  if (request) {
    request.cookies = cookie.parse(request.headers.cookie || '');
    authenticated = !!request.cookies.acctkn;
  }
  return { authenticated };
}

export default MyApp
