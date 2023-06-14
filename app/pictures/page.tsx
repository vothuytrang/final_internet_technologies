"use client";

import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import './picture.css'

export interface GetPicturesResults {
    results: Pictures[]
}

export interface Pictures {
    fields: {
    pic_name:       string;
    author:         string;
    published_date: string;
    category_name:       string;
    comments:       string;
    file:           string;
    pictures: string;
    }
    id: string;
}

function Picture() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [pictures, setPictures] = useState<Pictures[] | null>(null);

    useEffect(() => {
        fetch('/pictures/api')
        .then(response => response.json())
        .then(data => {
            setPictures(data);
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
            <h1 className='header'>Pictures</h1>
            {/* {isError && <p>Error!</p>} */}
            {isError ? <p>Error!</p> : null}
            {isLoading && <p>Loading...</p>}
            <div className='picture'>
                {pictures && pictures.map((picture) => {
                    return (
                    <div key={picture.id}>
                        <img src={picture.fields.file} alt='' className='picture_img' />
                        <div className='picture_name'>
                            {picture.fields.pic_name}
                        </div>
                        <div className='picture_author'>
                            {picture.fields.author}
                        </div>
                        <div className='picture_category'>
                            {picture.fields.pictures}
                        </div>
                        <p className='picture_published_date'>
                            {picture.fields.published_date}
                        </p>
                        
                    </div>
                    )
                })}
            </div>
        </main>
    );
}

export default Picture;
