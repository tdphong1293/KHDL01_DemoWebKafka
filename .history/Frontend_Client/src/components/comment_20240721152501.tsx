// src/components/Comment.tsx
export default function Comment({ postId }) {
    return (
        <div className="comments mt-3">
            <form>
                <textarea className="form-control mb-2" placeholder="Add a comment"></textarea>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
