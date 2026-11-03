import MovieCard from '../MovieCard/MovieCard.jsx'
import './MovieList.css'

function MovieList({ movies }) {
  return (
    <section className="container" id="cartelera">
      <h2 className="section-title">Cartelera</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default MovieList
