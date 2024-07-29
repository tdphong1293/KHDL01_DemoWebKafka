'use client';
import { useState } from "react";
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import styles from '../../styles/page.module.css';
import useSWR from 'swr';
import axios from 'axios';
import Comments from '@/components/comments';

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


const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Home = () => {
    const [postContent, setPostContent] = useState('');
    const [commentInput, setCommentInput] = useState<string>('');
    const [currentPostId, setCurrentPostId] = useState<string | null>(null);

    const userString = localStorage.getItem("user");
    const user = userString && userString !== "undefined" ? JSON.parse(userString) : null;

    const token = localStorage.getItem("token");

    const { data: posts, error: postsError, mutate: mutatePosts } = useSWR<Post[]>('http://localhost:8080/api/posts', fetcher);

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (postContent.trim()) {
            try {
                await axios.post('http://localhost:8080/api/posts/create', { token, authorID: user.userID, authorName: user.username, content: postContent });
                setPostContent('');
                mutatePosts();
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    };

    const handleLike = async (postID: string) => {
        try {
            await axios.post(`http://localhost:8080/api/posts/${postID}/like`, { token, user: user.userID });
            mutatePosts();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleCommentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentInput(event.target.value);
    };

    const handleCommentSubmit = async (postID: string) => {
        if (commentInput.trim()) {
            try {
                await axios.post(`http://localhost:8080/api/posts/${postID}/comments/create`, { token, commenterID: user.userID, commenterName: user.username, text: commentInput });
                setCommentInput('');
                mutatePosts();
            } catch (error) {
                console.error('Error creating comment:', error);
            }
        }
    };

    const formatDate = (dateString: string) => format(new Date(dateString), "dd MMM yyyy | HH:mm", { locale: vi });

    if (postsError) {
        console.log(postsError);
        return <div>Failed to load posts</div>;
    }
    if (!posts) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{user ? `Chào ${user.username} đến với TripleDuck` : "Chào bạn đến với TrippleDuck"}</h1>
            <p className={styles.subtitle}>Bạn đang nghĩ gì thế? Có thể chia sẻ với mọi người được không 🥰😘</p>
            <div className={styles.postBox}>
                <form onSubmit={handlePostSubmit}>
                    <h2 className={styles.createPostTitle}>Tạo bài viết</h2>
                    <textarea
                        className={styles.textarea}
                        placeholder="Bạn đang nghĩ gì?"
                        value={postContent}
                        onChange={handlePostChange}
                    />
                    <button type="submit" className={styles.publishButton}>Đăng</button>
                </form>
            </div>
            <div className={styles.postsContainer}>
                {posts.map((post) => (
                    <div key={post._id} className={styles.post}>
                        <div className={styles.postHeader}>
                            <div className={styles.postAuthor}>
                                <span className={styles.postAuthorName}>{post.authorName}</span>
                                <span className={styles.postTime}>{formatDate(post.createdAt)}</span>
                            </div>
                        </div>
                        <div className={styles.postContent}>
                            {post.content}
                        </div>
                        <div className={styles.postActions}>
                            <button className={styles.actionButton} onClick={() => handleLike(post._id)}>
                                <FaThumbsUp className={styles.icon} /> {post.likeCount}
                            </button>
                            <button className={styles.actionButton} onClick={() => setCurrentPostId(post._id)}>
                                <FaComment className={styles.icon} /> {post.commentCount}
                            </button>
                        </div>
                        {currentPostId === post._id && (
                            <div className={styles.commentSection}>
                                <input
                                    type="text"
                                    className={styles.commentInput}
                                    placeholder="Thêm bình luận..."
                                    value={commentInput}
                                    onChange={handleCommentInputChange}
                                />
                                <button
                                    className={styles.commentButton}
                                    onClick={() => handleCommentSubmit(post._id)}
                                >
                                    Submit
                                </button>
                                <Comments postID={post._id} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;