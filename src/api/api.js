import * as Axios from "axios";

export const instance = Axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { "API-KEY": "0a4d5e42-bfac-4525-abce-dd128f2c8444" }

})

export const usersAPI = {
    getUsers (currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    }
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get('profile/' + userId)
        .then(response => {
            return response.data;
        })
    }
}

export const followedAPI = {
    postFollow (id) {
        return instance.post(`follow/${id}`)
        .then(response => {
            return response.data;
        })
    },
    deleteFollow (id) {
        return instance.delete(`follow/${id}`)
        .then(response => {
            return response.data;
        })
    }
}