import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchForm from "../Components/SearchForm";
import Card from "../Components/Card";
import { supabase } from "../../Supabase/supabaseClient";
import ShowProperty from "../Components/ShowProperty";
import { Link } from "react-router-dom";

const Home = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [properties, setProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from("Room")
        .select(`
          *,
          owner (
            email,
            phone_no
          )
        `)
        .order("created_at", { ascending: false })
        .limit(12);

      if (!error) {
        setProperties(data);
      }

      setLoading(false);
    };

    fetchProperties();
  }, []);
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center">
        <img
          src="https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg"
          alt="Home"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-6xl px-4 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Home
          </h1>
          <p className="text-gray-200 mb-8 text-lg">
            Verified Listings • Trusted owners • Hassle-free renting
          </p>

          <SearchForm />
        </div>
      </section>
      <section>
      {/* PROPERTY LISTINGS */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Available Properties
          </h2>

          {loading ? (
            <p className="text-slate-600">Loading properties...</p>
          ) : properties.length === 0 ? (
            <p className="text-slate-600">No properties available.</p>
          ) : (
            <ShowProperty properties={properties} />
          )}
        </div>
      </div>
      <Link
        to="/search"
        className="px-8 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition font-semibold"
      >
        View More →
      </Link>
      </section>
      {/* BENEFITS SECTION */}
      <section className="bg-[#0277bd] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-white text-3xl font-semibold mb-10">
            Benefits of Our Service
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              imageSrc="https://imgs.search.brave.com/YQzZy2x_MLn9OopuEeK60JMXYXOvmgC1QQ4xOEHDdI0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/MzI2Mzg1MS92ZWN0/b3IvdmVyaWZpZWQt/c3RhbXAtaW1wcmlu/dC1zZWFsLXRlbXBs/YXRlLWdydW5nZS1l/ZmZlY3QtdmVjdG9y/LXN0b2NrLWlsbHVz/dHJhdGlvbi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9azV5/bGdMV2RTdDdvYTQ4/eEROTUVOd0kxbU85/Z2dKZDJza3VsSHdT/Z1lKRT0"
              title="Verified Listings"
              description="Every room is verified to ensure safety and reliability."
            />

            <Card
              imageSrc="https://imgs.search.brave.com/Qp2VP7FZZJG2AosviU5NRknyFTIv-78hfhpNZaz9mN8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1Lzk4LzIzLzU2/LzM2MF9GXzE1OTgy/MzU2NDhfM05LbGwx/eUtqS2E2V0dDNFBR/NU5ObmN3TkZvNlFU/MDcuanBn"
              title="Trusted Owners"
              description="Connect with verified owners for a smooth renting experience."
            />

            <Card
              imageSrc="https://imgs.search.brave.com/MqL_9ApNg-9nJwSrr8H47Vk4M-s9GvDN-CM8UfGnMJo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z3N0YXRpYy5jb20v/bWFya2V0aW5nLWNt/cy9hc3NldHMvaW1h/Z2VzLzI3LzE1LzNh/MzZmMDhmNDhjYzgy/ODRjZTY0NGE2YWEx/MWEvaHN3LW92ZXJ2/aWV3LW0yLWtleS1l/bGVtZW50cy1yYW5r/aW5nLXJlc3VsdHMu/cG5nPW4tdzc0Ni1o/NDA3LWZjcm9wNjQ9/MSwyMmU5MDAwMGRk/M2FmZmZmLXJ3"
              title="Advanced Search"
              description="Powerful filters to help you find the perfect match fast."
            />
          </div>
        </div>
      </section>

      {/* POPULAR TYPES */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-slate-800 mb-10">
            Popular Listing Types
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              imageSrc="https://imgs.search.brave.com/6iz63fTdMxAUy3BAghlkUEra2zCg1dhJMFm8cX4ZZnk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5kZXNpZ25jYWZl/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMS8wMy8wNjE3/MzQwNC9lbGVnYW50/LWxpdmluZy1yb29t/LWRlc2lnbi13aXRo/LWNvc3ktc29mYS1p/bi0xYmhrLWFwYXJ0/bWVudC1kZXNpZ24u/anBn"
              title="1BHK Apartments"
              description="Ideal for individuals or couples."
            />

            <Card
              imageSrc="https://imgs.search.brave.com/tDzqL6ntJjhX3k2dUEYu6CECsoZYfJB7OX0kz1Vex64/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/c3RhdGljbWIuY29t/L21icGhvdG8vcHJv/cGVydHkvY3JvcHBl/ZF9pbWFnZXMvMjAy/NS9Ob3YvMjYvUGhv/dG9faDMwMF93NDUw/LzgyMzIzMTgxXzFf/aGF0c0FwcEltYWdl/MjAyNTEwMTVhdDE4/LjAxLjMzMzk2OTBi/NzVfMzAwXzQ1MC5q/cGc"
              title="2BHK Apartments"
              description="Perfect for small families."
            />

            <Card
              imageSrc="https://imgs.search.brave.com/MqL_9ApNg-9nJwSrr8H47Vk4M-s9GvDN-CM8UfGnMJo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z3N0YXRpYy5jb20v/bWFya2V0aW5nLWNt/cy9hc3NldHMvaW1h/Z2VzLzI3LzE1LzNh/MzZmMDhmNDhjYzgy/ODRjZTY0NGE2YWEx/MWEvaHN3LW92ZXJ2/aWV3LW0yLWtleS1l/bGVtZW50cy1yYW5r/aW5nLXJlc3VsdHMu/cG5nPW4tdzc0Ni1o/NDA3LWZjcm9wNjQ9/MSwyMmU5MDAwMGRk/M2FmZmZmLXJ3"
              title="3BHK Apartments"
              description="Spacious homes for larger families."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
