const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

const services = {};

services.login = async (username, password) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        username,
        password,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return {};
};

services.verifyToken = async (token) => {
    const response = await fetch(`${BASE_URL}/auth/whoami`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return {};
}   
//Agg usos de la API 
services.getOne = async (id) => {
    const response = await fetch(`${BASE_URL}/posts/one/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    }

    return {};
}
services.getAll = async (page) => {
    const response = await fetch(`${BASE_URL}/post/all?limit=10&page=${page}`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    } else {
        console.log("error");
    }
    return {};
}; 
services.getOwned = async (page) => {
    const response = await fetch(`${BASE_URL}/post/owned?limit=10&page=${page}`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    } else {
        console.log("error");
    }
    return {};
}; 


services.getFavorite = async () => {
    const response = await fetch(`${BASE_URL}/post/fav`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return [];
}

services.update= async (post, id) => {
    const response = await fetch(`${BASE_URL}/posts/update/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(post),
    });
    if (response.ok) {
        return true;
    }

    return false;
}

services.toggle = async (id, status) => {
    const response = await fetch(`${BASE_URL}/post/toggle/${id}`, {
        method : "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            active: status
        })
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("error");
    }
    return {};
}

services.likePost = async (id) => {
    const response = await fetch(`${BASE_URL}/post/like/${id}`, {
        method : "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (response.ok) {
        return true;
    }
    return false;
}

services.commentPost = async (id='', comment) => {
    const response = await fetch(`${BASE_URL}/post/comment/${id}`, {
        method : "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-type": "application/json"
        },
        body: JSON.stringify(comment),
    });
    if (response.ok) {
        return true;
    }
    return false;
}

export default services;