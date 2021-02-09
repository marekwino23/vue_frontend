import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Contact from "@/components/Contact";
import Information from "@/components/Information";
import Valid from "@/components/Valid";
import Blog from "@/components/Blog";
import listUsers from "@/components/listUsers";
import addUser from "@/components/addUser";
import editUser from "@/components/editUser";

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
            path: '/edit',
            name: 'edit',
            component: editUser,
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