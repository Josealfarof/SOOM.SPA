import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import Ritual from "@/components/Ritual";
import FeaturedProducts from "@/components/FeaturedProducts";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BrandStory />
        <Ritual />
        <FeaturedProducts />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
