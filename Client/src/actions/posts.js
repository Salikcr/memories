import * as api from '../api/index.js';

//action creator

export const getPosts = () => async(dispatch) => {
    
    try {
        // console.log("getting all");
        const { data } = await api.fecthPosts();
        // console.log(data);
        dispatch({type : 'FETCH_ALL',payload:data});

    }

    catch (error){
        console.log(error.message);
    }


}

export const createPost = (post) => async (dispatch) => {
    try{
        const {data} = await api.createPost(post);
        dispatch({type:'CREATE',payload:data});
    }
    catch(error)
    {
        console.log(error.message);
    }
}

export const updatePost = (id,post) =>async (dispatch) => {
    try{
        const {data} = await api.updatePost(id,post);
        dispatch({type:'UPDATE',payload:data});

    }
    catch(error)
    {
        console.log(error.message);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type : 'DELETE',payload:id});
    }
    catch(error){
        console.log(error);
    }
}