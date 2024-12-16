import { useEffect, useState, useCallback } from "react";
import { categories } from "../data";
// import "../Style/listing.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../Pages/Redux/State";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  // Membuat fungsi getFeedListings stabil dengan useCallback
  const getFeedListings = useCallback(async () => {
    setLoading(true); // Pastikan loading diatur ulang setiap kali fungsi ini dipanggil
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:5000/property?category=${selectedCategory}`
          : "http://localhost:5000/property",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      console.log("Fetched Data:", data.listings);

      // Pastikan data.listings adalah array
      if (Array.isArray(data.listings)) {
        dispatch(setListings({ listings: data.listings }));
      } else {
        dispatch(setListings({ listings: [] }));
      }
    } catch (err) {
      console.error("Fetch Listings Failed:", err.message);
      dispatch(setListings({ listings: [] })); // Reset listings jika gagal fetch
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, dispatch]);

  // Memanggil getFeedListings di useEffect
  useEffect(() => {
    getFeedListings();
  }, [getFeedListings]);

  console.log("Current Listings:", listings);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${
              selectedCategory === category.label ? "active" : ""
            }`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {Array.isArray(listings) && listings.length > 0 ? (
            listings.map(
              ({
                _id,
                creator,
                listingPhotoPaths,
                city,
                province,
                country,
                category,
                type,
                price,
                booking = false,
              }) => (
                <ListingCard
                  key={_id}
                  listingId={_id}
                  creator={creator}
                  listingPhotoPaths={listingPhotoPaths}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                />
              )
            )
          ) : (
            <p>No listings found for the selected category.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
