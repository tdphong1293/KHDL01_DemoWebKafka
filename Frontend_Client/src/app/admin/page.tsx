"use client";

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Admin: React.FC = () => {
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<string>('users');

    useEffect(() => {
        // Fetch data when component mounts
        const fetchData = async () => {
            try {
                const [usersRes, postsRes, logsRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/users/getAllUser'),
                    axios.get('http://localhost:8080/api/posts/'),
                    axios.get('http://localhost:8080/api/logs/')
                ]);
                setUsers(usersRes.data);
                setPosts(postsRes.data);
                setLogs(logsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                            <Button variant="warning"><Link href={"/home"} className="nav-link" >Log out</Link></Button>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={9} className="mb-4">
                    <div className="bg-light p-4 rounded-3 shadow-sm" style={{ height: '90vh', overflowY: 'auto' }}>
                        <h3>Dashboard</h3>
                        <p className="text-muted">
                            Welcome to the admin panel. Manage users, review content, and check site analytics here.
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

