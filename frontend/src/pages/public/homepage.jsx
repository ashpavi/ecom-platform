import ProductCard from "../../components/store/productCard";

export default function HomePage() {
  return (
    <div className="space-y-16">

      {/* HERO SECTION */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Discover Premium Products For Your Lifestyle
            </h1>
            <p className="mt-6 text-gray-600 text-lg">
              Shop the latest collections with fast delivery and secure checkout.
            </p>
            <div className="mt-8 space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Shop Now
              </button>
              <button className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-200 transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gray-300 rounded-xl"></div>
          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Products</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map((item) => (
                <ProductCard
                key={item}
                product={{
                    name: "Premium Product",
                    price: 4500,
                    image: ""
                }}
                />
            ))}
            </div>
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Special Weekend Sale</h2>
          <p className="mt-4 text-lg">
            Get up to 40% off on selected items.
          </p>
          <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
            Explore Deals
          </button>
        </div>
      </section>

    </div>
  );
}
