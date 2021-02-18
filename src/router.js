import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Login from './components/Data Users/Login';
import Register from './components/Data Users/Register';
import Contact from "@/components/Contact/Contact";
import Information from "@/components/Data Users/Information";
import Valid from "@/components/Data Users/Valid";
import Blog from "@/components/Blog/Blog";
import listUsers from "@/components/Data Users/listUsers";
import addUser from "@/components/Data Users/addUser";
import editUser from "@/components/Data Users/editUser";
import addPost from "@/components/Blog/addPost";
import Post from "@/components/Blog/Post";
import Received from "@/components/Contact/Received";
import Sended from "@/components/Contact/Sended";
import EditPost from "@/components/Blog/EditPost";
Vue.use(VueRouter);


const router =  new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact,
        },


        {
            path: '/received',
            name: 'received',
            component: Received,
        },

        {
            path: '/info',
            name: 'information',
            component: Information,
        },

        {
            path: '/add',
            name: 'add',
            component: addUser,
        },


        {
            path: '/addPost',
            name: 'addPost',
            component: addPost,
        },

        {
            path: '/editPost',
            name: 'editPost',
            component: EditPost,
        },

        {
            path: '/edit',
            name: 'edit',
            component: editUser,
        },

        {
            path: '/sended',
            name: 'sended',
            component: Sended,
        },



        {
            path: '/post',
            name: 'post',
            component: Post,
        },

        {
            path: '/blog',
            name: 'blog',
            component: Blog,
        },

        {
            path: '/list',
            name: 'list',
            component: listUsers,
        },

        {
            path: '/valid',
            name: 'valid',
            component: Valid,
        }
    ]
});

export default router;