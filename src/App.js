import {useEffect, useState} from "react";

function App() {
    // process.env는 구조 분해 할당할 수 없다.
    // 내부적으로 정적(inline) 치환 방식으로 환경 변수를 처리한다.
    // 또한 번들러에 따라 인라인할 환경 변수의 "접두어 규칙"이 다르다.
    // e.g. Webpack → NEXT_PUBLIC_API_KEY, REACT_APP_API_KEY
    const ACCESS_TOKEN = process.env.REACT_APP_TMDB_API_ACCESS_TOKEN;
    // https://developer.themoviedb.org/docs/image-basics
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);

    const fetchGenres = async () => {
        const baseUrl = 'https://api.themoviedb.org/3/genre/movie/list';
        const queryParams = [
            'language=en'
        ];
        const url = `${baseUrl}?${queryParams.join('&')}`;
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'accept': 'application/json'
            }
        }
        return (await fetch(url, headers)).json();
    }
    const fetchMovies = async () => {
        const baseUrl = 'https://api.themoviedb.org/3/movie/popular';
        const queryParams = [
            'language=en-US',
            'page=1'
        ];
        const url = `${baseUrl}?${queryParams.join('&')}`;
        const headers = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'accept': 'application/json'
            }
        }
        return (await fetch(url, headers)).json();
    }

    useEffect(() => {
        let isMounted = true;

        // IIFE (Immediately Invoked Function Expression)
        (async () => {
            const fetchedGenres = await fetchGenres();
            const fetchedMovies = await fetchMovies();
            if (isMounted) {
                setGenres(_ => fetchedGenres.genres
                    .reduce((map, each) => {
                        map[each.id] = each.name;
                        return map;
                    }, {})
                );
                setMovies(_ => fetchedMovies.results);
                setLoading(false);
            }
        })();

        // cleanup할 때 isMounted를 false로 변경하여 언마운트 후 비동기 함수호출을 방지
        // @formatter:off
        return () => { isMounted = false; };
        // @formatter:on
    }, []);

    return (
        <div>
            {
                loading
                    ? <h1>Loading...</h1>
                    : <div>
                        {
                            // JSX의 { } 안은 "값을 반환하는 자리"이므로, 문장을 끝내는 세미콜론(;)을 붙이면 안된다.
                            movies.map(movie => {
                                return (
                                    <div key={movie.id}>
                                        {movie.poster_path && (
                                            <img
                                                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                                alt={movie.title}
                                                style={{ width: '200px' }}
                                            />
                                        )}
                                        <h3>{movie.title}</h3>
                                        <p>{movie.overview}</p>
                                        <ul>
                                            {movie.genre_ids.map(genreId => (
                                                <li key={genreId}>
                                                    {genres[genreId] || 'Unknown'}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })
                        }
                    </div>
            }
        </div>
    );
}

export default App;
