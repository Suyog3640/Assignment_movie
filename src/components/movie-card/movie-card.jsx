import './movie-card.css';
import { Link } from 'react-router-dom';

export function Card(props)
{

    return(
        <Link className="card bg-black text-white border shadow-lg text-decoration-none" to={`/moviedetail/${props.movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`} className="card-img-top card-image border-bottom"/>
            <div className="card-body">
                <h5 className="card-title">{props.movie.original_title}</h5>
                <p className="card-text"> <i className="bi bi-star-fill text-danger"></i> Ratings: {parseFloat(props.movie.vote_average.toFixed(1))}</p>
            </div>
        </Link>
    )
}