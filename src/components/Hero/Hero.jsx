import './Hero.css'

function Hero({ movie }) {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${movie.image})` }}
    >
      <div className="hero-overlay">
        <div className="container hero-content">
          <img src={movie.image} alt={movie.title} className="hero-poster" />
          <div className="hero-info">
            <span className="hero-badge">Estreno destacado</span>
            <h1>{movie.title}</h1>
            <p className="hero-details">
              {movie.classification} · ★ {movie.rating}
            </p>
            <p className="hero-synopsis">{movie.synopsis}</p>
            <a href="#cartelera" className="hero-button">Ver horarios</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
