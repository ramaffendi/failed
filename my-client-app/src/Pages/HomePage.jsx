import { Categories } from "../Component/Category";
import Listings from "../Component/Listing";
import { NavigationBar } from "../Component/Navigationbar";
import Slide from "../Component/Slide";

const HomePage = () => {
  return (
    <>
      <NavigationBar />
      <Slide />
      <Categories />
      <Listings />
    </>
  );
};

export default HomePage;
