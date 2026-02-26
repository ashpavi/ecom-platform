import Carousel from "../../components/store/heroCarousel";
import ProductCard from "../../components/store/productCard";
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";

export default function HomePage() {
  return (
    <div className="space-y-20">

      {/* ================= HERO SECTION ================= */}
      <section>
        <Carousel 
          slides={[
            {
              tag: "New Collection",
              title: "Refined Essentials For Modern Living",
              subtitle:
                "Crafted with precision and designed for those who value timeless quality.",
              image: slide1
            },
            {
              tag: "Signature Series",
              title: "Elevate Your Everyday Experience",
              subtitle:
                "Minimal design. Maximum impact. Discover products made to inspire.",
              image: slide2
            },
            {
              tag: "Editor's Pick",
              title: "Curated For Excellence",
              subtitle:
                "Hand-selected premium pieces tailored to your lifestyle.",
              image: slide3
            }
          ]}
        />
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section>
        <div className="max-w-7xl mx-auto px-10 sm:px-4 lg:px-4">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold">
              Featured Products
            </h2>
          </div>

          <div className="grid grid-cols-1 
                          sm:grid-cols-2 
                          md:grid-cols-3 
                          lg:grid-cols-4 
                          gap-6">
            {[1, 2, 3, 4].map((item) => (
              <ProductCard
                key={item}
                product={{
                id: item,
                    name: "Premium Product",
                    price: 4500,
                    image: ""
                  name: "Premium Product",
                  price: 4500,
                  image: ""
                }}
              />
            ))}
          </div>

        </div>
      </section>


      {/* ================= PROMOTIONAL BANNER ================= */}
      <section className="relative overflow-hidden 
                          bg-linear-to-r 
                          from-blue-600 
                          to-blue-500 
                          text-white 
                          py-16 sm:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Special Weekend Sale
          </h2>

          <p className="mt-4 text-base sm:text-lg opacity-90">
            Get up to 40% off on selected items.
          </p>

          <button className="mt-8 bg-white text-blue-600 
                             px-8 py-3 rounded-xl 
                             font-semibold 
                             hover:bg-gray-200 
                             active:scale-95
                             transition-all">
            Explore Deals
          </button>

        </div>

      </section>

    </div>
  );
}