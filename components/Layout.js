import Head from "next/Head";
import Navbar from "./Navbar";

//Layout que utiliza la página
const Layout = ({ children }) => (
  <>
    <Head>
      <title>Users App</title>
    </Head>
    <Navbar />
    {children}
  </>
);

export default Layout;
