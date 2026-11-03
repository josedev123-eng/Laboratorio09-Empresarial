import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Footer from './components/Footer/Footer.jsx'
import movies from './data/movies.js'

function App() {
  const featuredMovie = movies[2]

  return (
    <>
      <Header />
      <Hero movie={featuredMovie} />
      <Footer />
    </>
  )
}

export default App
