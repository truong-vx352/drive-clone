import axios from 'axios'
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/admin/';

class AdminService {
    async getListUser() {
        return await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('user')}`
            },
        })
        // AdminService.getListUser().then((response) => {
        //     response.json().then(data => ({
        //         data: data,
        //         status: response.status
        //     })).then(res => {
        //         this.setState({ user_data: res.data })
        //     })
        // })
    }

    deleteUser(id) {
        console.log(API_URL + 'delete/' + id)
        debugger
        return fetch(API_URL + 'delete/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('user')}`
            },
        })
    }

    searchTitle(keyword) {
        return axios.get(API_URL + 'search', {headers: authHeader(), params: {keyword: keyword}} )
    }

    changePlan(pid, uid) {
        return fetch(API_URL + 'plan?pid=' + pid + '&id=' + uid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('user')}`
            },
        })
    }
}

export default new AdminService();
