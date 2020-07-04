import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

import { BookContext } from "../context/books";

const Home = () => {
    const { featured } = useContext(BookContext);
    if (!featured.length) {
        return <h3>Loading...</h3>
    }
    return (
        <>
            <Hero />
            <section className="featured">
                <header className="featured-head">
                    <h3>Featured Collection</h3>
                </header>
                <div className="books featured-list">
                    {/* {featured.length === 0 ? <h3>No featured books</h3> : <span />} */}
                    {featured.map(({ id, imageURL, title }) => (
                        <article key={id} className="book featured-book">
                            <div className="book-image">
                                <img src={imageURL} alt={title} />
                            </div>
                            <Link to={`books/${id}`} className="btn book-link">details</Link>
                        </article>
                    ))}
                </div>
            </section>
        </>

    )
}

export default Home;