'use client'

import styles from "@/styles/page.module.css";
import { useState, FC } from "react";
import useSWR from 'swr';
import axios from 'axios';
import Comment from '@/components/comment';

interface User {
    _id: string;
    username: string;
}

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

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Comments: FC<{ postID: string }> = ({ postID }) => {
    const [page, setPage] = useState<number>(1);
    const { data: comments, error } = useSWR<CommentVar[]>(`http://localhost:8080/api/posts/${postID}/comments?page=${page}`, fetcher);

    if (error) return <div>Failed to load comments</div>;
    if (!comments) return <div>Loading comments...</div>;

    return (
        <div className={styles.commentsList}>
            {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
            ))}
            {comments.length === 10 && (
                <button onClick={() => setPage(page + 1)}>Load more comments</button>
            )}
        </div>
    );
};

export default Comments;
