import { useState } from 'react';
import { Header } from '../../components/Header';

const mockMovies = [{
    id: 1,
    title: 'Title one',
    category_name: 'Category 1'
}, {
    id: 2,
    title: 'Title two',
    category_name: 'Category 2'
}];

interface Movie {
    id: string;
    title: string;
    category_name: string;
}

function Movies() {
    const [movies, setMovies] = useState<Movie[] | null>(null);

    return (
        <main className="mt-6">
            <Header>Movies</Header>
            <p className="mt-5">Movies list</p>
            <div>
                {movies && movies.map((elem) => {
                    return (
                        <div key={elem.id}>{elem.title} ({elem.category_name})</div>
                    )
                })}
            </div>
        </main>
    );
}

export default Movies;
