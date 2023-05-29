"use client";

import { useState, useEffect } from 'react';
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
    fields: {
        title: string;
        category_name: string;
    }
}

function Movies() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [movies, setMovies] = useState<Movie[] | null>(null);

    useEffect(() => {
        fetch('/movies/api')
        .then(response => response.json())
        .then(data => {
            setMovies(data);
        })
        .catch(() => {
            setIsError(true);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, []);

    return (
        <main className="mt-6">
            <Header>Movies</Header>
            {isError && <p>Error!</p>}
            {isLoading && <p>Loading...</p>}
            <div>
                {movies && movies.map((elem) => {
                    return (
                        <div key={elem.id}>{elem.fields.title} ({elem.fields.category_name})</div>
                    )
                })}
            </div>
        </main>
    );
}

export default Movies;
