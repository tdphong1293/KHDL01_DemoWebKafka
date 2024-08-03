"use client";

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import io from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config({ path: "../../../.env" });

interface User {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
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

interface Log {
    type: string;
    userID: string;
    postID: string;
    timestamp: Date;
    text: string;
    details: any;
}

const host = process.env.SERVER_HOST || "localhost";
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Admin: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>('users');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const initialPost = {} as Post;
    const [socketUpdatePost, setSocketUpdatePost] = useState<Post>(initialPost);
    const initialUser = {} as User;
    const [socketUpdateUser, setSocketUpdateUser] = useState<User>(initialUser);
    const initialLog = {} as Log;
    const [socketUpdateLog, setSocketUpdateLog] = useState<Log>(initialLog);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userString = localStorage.getItem("user");
        const user = userString && userString !== "undefined" ? JSON.parse(userString) : null;

        if (!token || !user || !user.isAdmin) {
            router.push("/home");
        } else {
            setIsAdmin(true);
        }
    }, [router]);

    const { data: users, error: userError, mutate: mutateUsers } = useSWR(isAdmin ? `http://${host}:8080/api/users` : null, fetcher);
    const { data: posts, error: postError, mutate: mutatePosts } = useSWR(isAdmin ? `http://${host}:8080/api/posts` : null, fetcher);
    const { data: logs, error: logError, mutate: mutateLogs } = useSWR(isAdmin ? `http://${host}:8080/api/logs` : null, fetcher);

    useEffect(() => {
        const socket = io(`http://${host}:8080`);

        const handlePostUpdate = (updatedPost: Post) => {
            setSocketUpdatePost(updatedPost);
        };

        const handleUserUpdate = (updatedUser: User) => {
            setSocketUpdateUser(updatedUser);
        }

        const handleLogUpdate = (updatedLog: Log) => {
            setSocketUpdateLog(updatedLog);
        }

        socket.on('postUpdated', handlePostUpdate);
        socket.on('userUpdated', handleUserUpdate);
        socket.on('logUpdated', handleLogUpdate);

        return () => {
            socket.off('postUpdated');
            socket.off('userUpdated');
            socket.off('logUpdated');
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socketUpdatePost) {
            mutatePosts();
        }
        if (socketUpdateUser) {
            mutateUsers();
        }
        if (socketUpdateLog) {
            mutateLogs();
        }
    }, [socketUpdatePost, socketUpdateUser, socketUpdateLog])

    if (userError) return <div>Failed to load Users</div>;
    if (!users) return <div>Loading Users...</div>;
    if (postError) return <div>Failed to load Posts</div>;
    if (!posts) return <div>Loading Posts...</div>;
    if (logError) return <div>Failed to load Logs</div>;
    if (!logs) return <div>Loading Logs...</div>;

    if (!isAdmin) {
        return null;
    }

    return (
        <Container fluid className="p-4">
            <Row>
                <Col xs={12} md={3} className="mb-4">
                    <div className="bg-light p-3 rounded-3 shadow-sm">
                        <h4 className="text-center mb-3">Menu</h4>
                        <div className="d-grid gap-2">
                            <Button variant="success" onClick={() => setActiveTab('users')}>Users</Button>
                            <Button variant="primary" onClick={() => setActiveTab('posts')}>Posts</Button>
                            <Button variant="info" onClick={() => setActiveTab('logs')}>Logs</Button>
                            <Button variant="warning"><Link href={"/home"} className="nav-link" >Home Page</Link></Button>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={9} className="mb-4">
                    <div className="bg-light p-4 rounded-3 shadow-sm" style={{ height: '90vh', overflowY: 'auto' }}>
                        <h3>Dashboard</h3>
                        <p className="text-muted">
                            Dùng để theo dõi Users, Posts và Logs
                        </p>
                        <div className="mt-4 p-3 bg-white border rounded-3 shadow-sm" style={{ height: '70vh', overflowY: 'auto' }}>
                            {activeTab === 'users' && (
                                <div>
                                    <h4>Users</h4>
                                    <div>
                                        {users.map((user: any) => (
                                            <div key={user._id} className="mb-2 p-2 border rounded-2">
                                                <p><strong>ID: </strong>{user._id}</p>
                                                <p><strong>Username: </strong>{user.username}</p>
                                                <p><strong>Email: </strong> {user.email}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'posts' && (
                                <div>
                                    <h4>Posts</h4>
                                    <div>
                                        {posts.map((post: any) => (
                                            <div key={post._id} className="mb-2 p-2 border rounded-2">
                                                <p><strong>ID: </strong>{post._id}</p>
                                                <p><strong>Author: </strong>{post.authorName}</p>
                                                <p><strong>Content: </strong> {post.content}</p>
                                                <p><strong>Like: </strong> {post.likeCount}</p>
                                                <p><strong>Comment: </strong> {post.commentCount}</p>
                                                <p><strong>Create Date: </strong> {post.createdAt}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'logs' && (
                                <div>
                                    <h4>Logs</h4>
                                    <div>
                                        {logs.map((log: any) => (
                                            <div key={log._id} className="mb-2 p-2 border rounded-2">
                                                <p><strong>ID: </strong> {log._id}</p>
                                                <p><strong>Type: </strong>{log.type}</p>
                                                <p><strong>UserID: </strong>{log.userID}</p>
                                                <p><strong>PostID: </strong>{log.postID}</p>
                                                <p><strong>Time: </strong>{log.timestamp}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;

