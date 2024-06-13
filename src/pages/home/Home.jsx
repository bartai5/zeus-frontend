import Filter from "../../components/filter/Filter"
import NavBar from "../../components/navigation/NavBar"
import './Home.css'
import PropertyContainer from "../../components/property-container/PropertyContainer"
const Home = () => {
  return (
    <section className="home-section">
      <NavBar />
      <section className="home-container">
      <Filter />
      <PropertyContainer/>
      </section>
    </section>
  )
}

export default Home