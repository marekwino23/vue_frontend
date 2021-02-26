import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Login from './components/Data Users/Login';
import Register from './components/Data Users/Register';
import Contact from "@/components/Contact/Contact";
import Information from "@/components/Data Users/Information";
import Valid from "@/components/Data Users/Valid";
import listUsers from "@/components/Data Users/listUsers";
import addUser from "@/components/Data Users/addUser";
import editUser from "@/components/Data Users/editUser";
import addSubject from "@/components/Blog/addSubject";
import Subject from "@/components/Blog/Subject";
import Received from "@/components/Contact/Received";
import Sended from "@/components/Contact/Sended";
import EditSubject from "@/components/Blog/EditCategory";
import addPost from "@/components/Blog/addPost";
import showPost from "@/components/Blog/showPost";
import EditCategory from "@/components/Blog/EditCategory";
import Category from "@/components/Blog/Category";
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
            path: '/addSubject/:id',
            name: 'addSubject',
            component: addSubject,
        },

        {
            path: '/addPost/:id',
            name: 'addPost',
            component: addPost,
        },

        {
            path: '/showPost/:id',
            name: 'showPost',
            component: showPost,
        },

        {
            path: '/editSubject/:id',
            name: 'editSubject',
            component: EditSubject,
        },

        {
            path: '/edit/:id',
            name: 'edit',
            component: editUser,
        },

        {
            path: '/sended',
            name: 'sended',
            component: Sended,
        },

        {
            path: '/editCategory/:id/:category',
            name: 'editCategory',
            component: EditCategory,
        },

        {
            path: '/subject/:id/:category',
            name: 'subject',
            component: Subject,
        },

        {
            path: '/category',
            name: 'category',
            component: Category,
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