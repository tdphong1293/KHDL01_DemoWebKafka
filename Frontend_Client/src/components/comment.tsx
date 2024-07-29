'use client'

import styles from "@/styles/page.module.css";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface User {
    _id: string;
    username: string;
}

interface Comment {
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

const formatDate = (dateString: string) => format(new Date(dateString), "dd MMM yyyy | HH:mm", { locale: vi });

const Comment: React.FC<{ comment: Comment }> = ({ comment }) => {
    return (
        <div className={styles.comment}>
            <span className={styles.postAuthorName}>{comment.commenterName}</span>
            <span className={styles.commentText}>{comment.text}</span>
            <span className={styles.commentDate}>{formatDate(comment.createdAt)}</span>
        </div>
    );
};

export default Comment;