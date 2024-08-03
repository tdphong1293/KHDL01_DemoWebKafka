'use client';
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import styles from '../../styles/page.module.css';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Comments from '@/components/comment';
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { toast, ToastContainer } from 'react-toastify';
import io from 'socket.io-client';

interface User {
    _id: string;
    username: string;
    isAdmin: boolean;
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
    const initialPost = {} as Post;
    const [socketUpdate, setSocketUpdate] = useState<Post>(initialPost);


    var userString: string | null = "";
    var token: string | null = "";

    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
        userString = localStorage.getItem("user");
    }

    const user = userString && userString !== "undefined" ? JSON.parse(userString) : null;

    const { data: posts, error: postsError, mutate: mutatePosts } = useSWR<Post[]>('http://192.168.10.92:8080/api/posts', fetcher);


    useEffect(() => {
        const socket = io('http://192.168.10.92:8080');

        const handlePostUpdate = (updatedPost: Post) => {
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
            mutatePosts();
        }
    }, [socketUpdate])

    const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) {
            toast.error('Hãy đăng nhập để thực hiện chức năng này');
            return;
        }
        if (postContent.trim()) {
            try {
                await axios.post('http://192.168.10.92:8080/api/posts/create', { token, authorID: user.userID, authorName: user.username, content: postContent });
                setPostContent('');
                mutatePosts();
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    };

    const handleLike = async (postID: string) => {
        if (!user) {
            toast.error('Hãy đăng nhập để thực hiện chức năng này');
            return;
        }
        try {
            await axios.post(`http://192.168.10.92:8080/api/posts/${postID}/like`, { token, userID: user.userID });
            mutatePosts();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleCommentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentInput(event.target.value);
    };

    const handleCommentSubmit = async (postID: string) => {
        if (!user) {
            toast.error('Hãy đăng nhập để thực hiện chức năng này');
            return;
        }
        if (commentInput.trim()) {
            try {
                await axios.post(`http://192.168.10.92:8080/api/posts/${postID}/comments/create`, { token, commenterID: user.userID, commenterName: user.username, text: commentInput });
                setCommentInput('');
                mutatePosts();
                mutate(`http://192.168.10.92:8080/api/posts/${postID}/comments`);
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
            <ToastContainer />
            <h1 className={styles.title}>{user ? `Chào ${user.username} đến với TripleDuck` : "Chào bạn đến với TripleDuck"}</h1>
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
                        <div className="d-flex align-items-center">
                            <button className="btn d-flex align-items-center me-3 p-0" onClick={() => handleLike(post._id)}>
                                <FcLike size={21} className="me-2" /> <span className="align-middle">{post.likeCount}</span>
                            </button>
                            <button className="btn d-flex align-items-center p-0" onClick={() => setCurrentPostId(post._id)}>
                                <FaRegCommentDots size={21} className="me-2" /> <span className="align-middle">{post.commentCount}</span>
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