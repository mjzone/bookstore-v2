import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
// Amplify API
import { API, graphqlOperation, Storage } from "aws-amplify";
import { withAuthenticator } from '@aws-amplify/ui-react'
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { createBook } from '../graphql/mutations'
// import { listBooks } from '../graphql/queries'
import config from '../aws-exports'

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config


const Admin = () => {
    const [imageURL, setImageURL] = useState(null);
    const [setLoading] = useState(false);
    const [bookDetails, setBookDetails] = useState({ title: "", description: "", imageURL: "", author: "", price: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(bookDetails);
        try {
            if (!bookDetails.title || !bookDetails.price) return
            await API.graphql(graphqlOperation(createBook, { input: bookDetails }))
        } catch (err) {
            console.log('error creating todo:', err)
        }
    }

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        try {
            setLoading(true);
            // Upload the file to s3 with private access level. 
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });
            // Retrieve the uploaded file to display
            const imageURL = await Storage.get(key, { level: 'public' })
            setImageURL(imageURL);
            setBookDetails({ ...bookDetails, imageURL: url });
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AmplifyAuthenticator>
            <AmplifySignIn headerText="My Custom Sign In Text" slot="sign-in"></AmplifySignIn>
            <section className="add-book">
                <header className="form-header">
                    <h3>Add New Book</h3>
                    <AmplifySignOut></AmplifySignOut>
                </header>
                <form className="form-wrapper" onSubmit={handleSubmit}>
                    <div className="form-image">
                        {imageURL ? <img className="image-preview" src={imageURL} alt="" /> : <input
                            type="file"
                            accept="image/jpg"
                            onChange={(e) => handleImageUpload(e)} />}

                    </div>
                    <div className="form-fields">
                        <div className="title-form">
                            <p><label htmlFor="title">Title</label></p>
                            <p><input
                                name="email"
                                type="title"
                                placeholder="Type the title"
                                onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })}
                                required
                            /></p>
                        </div>
                        <div className="description-form">
                            <p><label htmlFor="description">Description</label></p>
                            <p><textarea
                                name="description"
                                type="text"
                                rows="8"
                                placeholder="Type the description of the book"
                                onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })}
                                required
                            /></p>
                        </div>
                        <div className="author-form">
                            <p><label htmlFor="author">Author</label></p>
                            <p><input
                                name="author"
                                type="text"
                                placeholder="Type the author's name"
                                onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
                                required
                            /></p>
                        </div>
                        <div className="price-form">
                            <p><label htmlFor="price">Price ($)</label></p>
                            <p><input
                                name="price"
                                type="text"
                                placeholder="What is the Price of the book (USD)"
                                onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })}
                                required
                            /></p>
                        </div>
                        <div className="submit-form">
                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        </AmplifyAuthenticator>


    )
}

export default withAuthenticator(Admin)
