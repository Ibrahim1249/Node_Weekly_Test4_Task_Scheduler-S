import { Navbar } from "./navbar"
import { Hero } from "./hero"

function Home() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <Hero />
    </div>
    </>
  )
}

export default Home