import React from "react";
// import propTypes from "prop-types";

// import { Link, withRouter } from "react-router-dom";
// import { ReactComponent as Logo } from "assets/images/logo.svg";
import { ReactComponent as Circle } from "assets/images/circle.svg";
// import { ReactComponent as Sunshine } from "assets/images/sunshine.svg";

import Header from "parts/Header";
import Hero from "parts/Hero";
import Partners from "parts/Partners";
import Syarat from "parts/Syarat";
// import ListBlogs from "src/parts/ListBlogs";
// import ListCategories from "src/parts/ListCategories";
import Footer from "parts/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import blogs from "src/constants/api/blogs";

function Home({ data }) {
  return (
    <>
      {/* <Head>
        <title>SiDepresi</title>
        <link rel="icon" src="public/images/logo.png " />
      </Head> */}

      <main>
        <section className="header-clipping pt-10 min-h-screen md:min-h-0">
          {/* <div className="sunshine max-w-full"></div> */}
          <Circle className="absolute left-0 bottom-0"></Circle>
          <div className="container mx-auto px-4">
            <Header></Header>
            <ToastContainer />
            <Hero></Hero>
          </div>
        </section>
        <section className="container px-4 mx-auto md:pt-24">
          <Partners></Partners>
        </section>
        <section className="container px-4 mx-auto md:pt-24">
          <Syarat></Syarat>
        </section>
        <section className="container px-4 mx-auto md:pt-24">
          {/* <ListCategories></ListCategories> */}
        </section>
        <section className="mt-24 bg-blue-500 py-12">
          <Footer></Footer>
        </section>
      </main>
    </>
  );
}

// Home.getInitialProps = async () => {
//   try {
//     const data = await blogs.all();
//     return { data: data.data };
//   } catch (error) {
//     return error;
//   }
// };

export default Home;
