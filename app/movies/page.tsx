import { Header } from '../../components/Header';

// export default function Contact() {
function Movies() {

    const movies = [{
        id: 1,
        title: 'Title one',
        category_name: 'Category 1'
    }, {
        id: 2,
        title: 'Title two',
        category_name: 'Category 2'
    }];

    return (
        <main className="mt-6">
            <Header>Movies</Header>
            <p className="mt-5">Movies list</p>
            <div>
                {movies.map((elem) => {
                    return (
                        <div key={elem.id}>{elem.title} ({elem.category_name})</div>
                    )
                })}
            </div>
        </main>
    );
}

export default Movies;
