import Carousel from "../../components/store/HeroCarousel";
import ProductCard from "../../components/store/ProductCard";
import slide1 from "../../assets/slide1.jpg";
import slide2 from "../../assets/slide2.jpg";
import slide3 from "../../assets/slide3.jpg";

export default function HomePage() {
  return (
    <div className="space-y-20">

      {/* HERO */}
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

      {/* FEATURED */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-xl sm:text-2xl font-bold mb-8">
            Featured Products
          </h2>

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
                }}
              />
            ))}
          </div>

        </div>
      </section>

            {/* ================= CATEGORIES ================= */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Shop by Category
              </h2>
              <p className="text-gray-500 mt-2">
                Discover curated collections tailored for you.
              </p>
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                name: "Electronics",
                image: slide1
              },
              {
                name: "Fashion",
                image: slide2
              },
              {
                name: "Accessories",
                image: slide3
              }
            ].map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >

                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Text Content */}
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold">
                    {category.name}
                  </h3>
                  <span className="text-sm opacity-80">
                    Explore Collection →
                  </span>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* PROMO */}
      <section className="bg-gradient-to-r 
                          from-blue-600 
                          to-blue-500 
                          text-white 
                          py-16 sm:py-20">

        <div className="max-w-7xl mx-auto px-4 text-center">

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
                             transition">
            Explore Deals
          </button>

        </div>

      </section>

    </div>
  );
}