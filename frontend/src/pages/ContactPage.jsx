
import Contact from "../components/Contact";
import Footer from '../components/Footer';
import Map from "../components/Map";
import PageBanner from "../components/PageBanner";
import Navbar from '../components/Navbar';
import Preloader from "../components/Preloader";
import SearchArea from "../components/SearchArea";
import ScrollTop from "../components/ScrollTop";
function ContactPage() {
  return (
    <div>
      {/* <Preloader /> */}
      <Navbar/>
      <PageBanner/>
      <Contact />

      <Map />

    <Footer/>

    
    </div>
  );
}

export default ContactPage;
