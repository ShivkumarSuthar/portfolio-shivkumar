import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "@/styles/globals.css";
import MenuBar from '@/Components/MenuBar';
import Footer from '@/Components/Footer';


export default function App({ Component, pageProps }) {
  return <>
      <MenuBar />
      <Component {...pageProps} />
      <Footer />
    </>;
}
