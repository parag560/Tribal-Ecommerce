import React from 'react';
import Categories from '../../Components/Categories/Categories';
import Footer from '../../Components/Footer/Footer';
import HomeCorousel from '../../Components/HomeCorousel/HomeCorousel';
import Navbar from "../../Components/Navbar/Navbar"
import TopProduct from '../../Components/TopProduct/TopProduct';


function Home() {
  return <div>
      <Navbar/>
      <HomeCorousel/>
      <Categories/>
      <TopProduct/>
      <Footer/>
  </div>;
}

export default Home;
