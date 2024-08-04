'use client'

import { useState, useEffect } from "react";
import styles from "@/styles/page.module.css";
import { FC } from "react";
import useSWR from 'swr';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import io from 'socket.io-client';


interface CommentVar {
    _id: string;
    commenterID: string;
    commenterName: string;
    post: Post;
    text: string;
    edited: boolean;
    parentComment?: string;
    createdAt: string;
    updatedAt: string;
}

interface Post {
    _id: string;
    authorID: string;
    authorName: string;
    content: string;
    likeCount: number;
    commentCount: number;
    edited: boolean;
    createdAt: string;
    updatedAt: string;
}

const host = process.env.NEXT_PUBLIC_SERVER_HOST || "localhost";

const formatDate = (dateString: string) => format(new Date(dateString), "dd MMM yyyy | HH:mm", { locale: vi });

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Comment: FC<{ postID: string }> = ({ postID }) => {
    const initialComment = {} as CommentVar;
    const [socketUpdate, setSocketUpdate] = useState<CommentVar>(initialComment);
    const { data: comments, error, mutate: mutatePostComment } = useSWR<CommentVar[]>(`http://${host}:8080/api/posts/${postID}/comments`, fetcher);
    
    useEffect(() => {
        const socket = io(`http://${host}:8080`);

        const handlePostUpdate = (updatedPost: CommentVar) => {
            setSocketUpdate(updatedPost);
        };

        socket.on('postUpdated', handlePostUpdate);

        return () => {
            socket.off('postUpdated');
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socketUpdate) {
            mutatePostComment();
        }
    }, [socketUpdate])

    if (error) return <div>Failed to load comments</div>;
    if (!comments) return <div>Loading comments...</div>;

    return (
        <div className={styles.commentsList}>
            {comments.map((comment, index) => (
                <div key={index} className={styles.comment}>
                    <span className={styles.postAuthorName}>{comment.commenterName}</span>
                    <span className={styles.commentText}>{comment.text}</span>
                    <span className={styles.commentDate}>{formatDate(comment.createdAt)}</span>
                </div>
            ))}
        </div>
    );
};

export default Comment;
