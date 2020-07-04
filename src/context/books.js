import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listBooks } from '../graphql/queries'

const BookContext = React.createContext();

const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, [])

    const fetchBooks = async () => {
        try {
            setLoading(true);
            // Switch authMode to API_KEY for public access
            const { data } = await API.graphql({
                query: listBooks,
                authMode: 'API_KEY',
            })
            const books = data.listBooks.items
            const featured = books.filter(book => {
                return !!book.featured;
            });
            setBooks(books);
            setFeatured(featured);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <BookContext.Provider value={{ books, featured, loading }}>
            {children}
        </BookContext.Provider>
    )
}

export { BookContext, BookProvider }
