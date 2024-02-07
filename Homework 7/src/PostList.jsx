import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from './postsSlice';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const status = useSelector(state => state.posts.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const handleDeletePost = (postId) => {
        dispatch(deletePost(postId));
    };

    return (
        <div>
            <h2>Posts</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error loading posts</p>}
            {status === 'succeeded' && (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            {post.title} - <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostList;

