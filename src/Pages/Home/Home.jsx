import axios from "axios";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { getBanner } from "../../state/slices/bannerSlice";
import { setAllCategories } from "../../state/slices/categoriesSlice";
import { userLogout } from "../../state/slices/userSlice";
import { API_URL } from "../../utils/util";
import Banner from "./components/Banner";
import MainCategories from "./components/MainCategories";

const Home = () => {
  const dispatch = useDispatch();

  const fetchBanner = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/banner`);
      dispatch(getBanner(res.data[0].image));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.get(`${API_URL}/api/userData`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      if (err.response.data.message === "Unauthorized") {
        localStorage.removeItem("token");
        dispatch(userLogout());
      }
    }
  };

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/category/`);
      dispatch(setAllCategories(res.data));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchBanner();
    fetchAllCategories();
  }, []);

  return (
    <div className="bg-white flex flex-col gap-4">
      <Helmet>
        <title>Galaxy Grow - grow your business</title>
        <meta name="author" content="Galaxy Grow" />
        <link rel="canonical" href="https://www.galaxygrow.in" />
        <meta
          name="description"
          content="Grow your business with Galaxy Grow. Discover and rate services. Find ratings, reviews, images, and addresses for different services. Your go-to platform for service recommendations."
        />
        <meta
          name="keywords"
          content="services, service, service rating, service reviews, service images, service addresses, service recommendations, service search"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Galaxy Grow - grow your business"
        />
        <meta
          property="og:description"
          content="and discover a wide range of services on our platform. Find ratings, reviews, images, and addresses for different services. Your go-to platform for service recommendations."
        />
        <meta property="og:url" content="https://www.galaxygrow.in" />
        <meta property="og:site_name" content="Galaxy Grow" />
      </Helmet>

      <Banner />
      <MainCategories />
      {/* <ServiceCategories /> */}
    </div>
  );
};

export default Home;
