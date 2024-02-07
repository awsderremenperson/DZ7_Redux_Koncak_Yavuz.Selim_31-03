import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await fetch('https://dummyjson.com/posts');
        return response.json();
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData) => {
        const response = await fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        return response.json();
    }
);

// Создаем асинхронный thunk для удаления поста
export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId) => {
        const response = await fetch(`https://dummyjson.com/todos/${postId}`, {
            method: 'DELETE',
        });
        return response.json();
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        [createPost.pending]: (state) => {
            state.status = 'loading';
        },
        [createPost.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.posts.push(action.payload);
        },
        [createPost.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        // Обработка результатов запроса на удаление поста
        [deletePost.pending]: (state) => {
            state.status = 'loading';
        },
        [deletePost.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.posts = state.posts.filter(post => post.id !== action.payload.id);
        },
        [deletePost.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export default postsSlice.reducer;

