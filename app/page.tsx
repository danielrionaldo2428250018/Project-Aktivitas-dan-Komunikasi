import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Categories } from "@/components/landing/categories"
import { FeaturedCreators } from "@/components/landing/featured-creators"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedCreators />
      </main>
      <Footer />
    </div>
  )
}
