// src/components/Post.tsx
import Comment from './comment';
import LikeButton from './likeButton';

export default function Post({ post }) {
    return (
        <div className="post card mb-4">
            <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p className="card-text">{post.content}</p>
                <LikeButton />
                <Comment postId={post.id} />
            </div>
        </div>
    );
}
