// src/app/home/page.tsx
'use client';
import { useState } from "react";
import { FaThumbsUp, FaComment } from 'react-icons/fa'; // Import FontAwesome icons
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import styles from '../../styles/page.module.css';
import useSWR from 'swr';
import axios from 'axios';

const Home = () => {
    const [postContent, setPostContent] = useState('');
    const [posts, setPosts] = useState<{ content: string, likes: number, comments: { text: string, date: Date }[], date: Date }[]>([]);
    const [commentInput, setCommentInput] = useState<string>('');
    const [currentPostIndex, setCurrentPostIndex] = useState<number | null>(null);

    const userString = localStorage.getItem('user');
    const user = userString && userString !== "undefined" ? JSON.parse(userString) : null;

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (postContent.trim()) {
            setPosts([...posts, { content: postContent, likes: 0, comments: [], date: new Date() }]);
            setPostContent('');
        }
    };

    const handleLike = (index: number) => {
        const updatedPosts = [...posts];
        updatedPosts[index].likes += 1;
        setPosts(updatedPosts);
    };

    const handleCommentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentInput(event.target.value);
    };

    const handleCommentSubmit = (index: number) => {
        if (commentInput.trim()) {
            const updatedPosts = [...posts];
            updatedPosts[index].comments.push({ text: commentInput, date: new Date() });
            setPosts(updatedPosts);
            setCommentInput('');
        }
    };

    const formatDate = (date: Date) => format(date, "dd MMM yyyy | HH:mm", { locale: vi });

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
                {posts.map((post, index) => (
                    <div key={index} className={styles.post}>
                        <div className={styles.postHeader}>
                            <div className={styles.postAuthor}>
                                <span className={styles.postAuthorName}>{user.username}</span>
                                <span className={styles.postTime}>{formatDate(post.date)}</span>
                            </div>
                        </div>
                        <div className={styles.postContent}>
                            {post.content}
                        </div>
                        <div className={styles.postActions}>
                            <button className={styles.actionButton} onClick={() => handleLike(index)}>
                                <FaThumbsUp className={styles.icon} /> {post.likes}
                            </button>
                            <button className={styles.actionButton} onClick={() => setCurrentPostIndex(index)}>
                                <FaComment className={styles.icon} /> {post.comments.length}
                            </button>
                        </div>
                        {currentPostIndex === index && (
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
                                    onClick={() => handleCommentSubmit(index)}
                                >
                                    Submit
                                </button>
                                <div className={styles.commentsList}>
                                    {post.comments.map((comment, idx) => (
                                        <div key={idx} className={styles.comment}>
                                            <span className={styles.postAuthorName}>{user.username}</span>
                                            <span className={styles.commentText}>{comment.text}</span>
                                            <span className={styles.commentDate}>{formatDate(comment.date)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
