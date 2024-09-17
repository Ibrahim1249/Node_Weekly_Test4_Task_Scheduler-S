import { Navbar } from "./navbar"
import { Hero } from "./hero"
import { Profile } from "./Profile"

function Home() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <Hero />
      {/* <Profile/> */}
    </div>
    </>
  )
}

export default Home