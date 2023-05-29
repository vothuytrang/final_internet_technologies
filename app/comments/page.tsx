"use client";

import { useState, useEffect, useRef, FormEventHandler } from 'react';
import { format } from 'date-fns';
import { Header } from '../../components/Header';

interface Comment {
    id: string;
    createdTime: string;
    fields: {
        content: string;
        movie_name: string;
        status: 'published' | 'pending-for-moderation'
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
            <Header>Comments</Header>
            {/* {isError && <p>Error!</p>} */}
            {isError ? <p>Error!</p> : null}
            {isLoading && <p>Loading...</p>}
            <div>
                {comments && comments.map((elem) => {
                    return (
                        <div key={elem.id}>{elem.fields.content} ({elem.fields.status}, {formatDate(elem.createdTime)})</div>
                    )
                })}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="comment_body"></label>
                        <textarea id="comment_body" ref={commentRef} style={{ color: 'black '}} />
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
