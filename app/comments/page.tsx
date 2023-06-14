"use client";

import { useState, useEffect, useRef, FormEventHandler } from 'react';
import { format } from 'date-fns';
import { Header } from '../../components/Header';
import './comments.css'

interface Comment {
    id: string;
    createdTime: string;
    fields: {
        content: string;
        status: 'Done' | 'Todo' | 'In Progress'
    }
}

const formatDate = (date: string) => {
    return format(new Date(date), 'd.MM.Y HH:mm:ss');
}

function Comments() {
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [comments, setComments] = useState<Comment[] | null>(null);

    const loadComments = () => {
        fetch('/comments/api')
        .then(response => response.json())
        .then(data => {
            setComments(data);
        })
        .catch(() => {
            setIsError(true);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        loadComments();
    }, []);

    const handleSubmit: FormEventHandler  = (event) => {
        event.preventDefault();
        const commentContent = commentRef.current?.value || '';
        if (commentContent) {
            // console.log('handleSubmit', commentRef.current?.value);
            fetch('/comments/api', {
                method: 'POST',
                body: JSON.stringify({ commentContent: commentContent }),
            })
            .then(response => {
                if (response.ok) {
                    loadComments();
                }
            })
        }
    }

    return (
        <main className="mt-6">
            <h1 className='header'>Comments</h1>
            {/* {isError && <p>Error!</p>} */}
            {isError ? <p>Error!</p> : null}
            {isLoading && <p>Loading...</p>}
            <div className='comment-list'>
                {comments && comments.map((elem) => {
                    return (
                        <div key={elem.id} className='comment'>
                            <h2 className='comment-content'>
                                {elem.fields.content}
                            </h2>
                            <p className='comment-status'>
                                {elem.fields.status}
                            </p>
                            <p className='comment-time' >
                                {formatDate(elem.createdTime)}
                            </p>
                        </div>
                    )
                })}
            </div>
            <div className='write-comment'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="comment_body"></label>
                        <textarea id="comment_body" ref={commentRef} style={{ color: 'black '}} cols={100} rows={10} />
                    </div>
                    <div>
                        <input type="submit" value="Send" />
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Comments;
