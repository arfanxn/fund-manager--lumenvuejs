import {
  createRouter,
  createWebHistory
} from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'


const routes = [{
    path: '/',
    name: 'Home',
    component: Home // import("../views/Home.vue") 
  }, {
    path: "/authenticate",
    name: "Authenticate",
    component: Auth,
    meta: {
      guest: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let docTitle = String();

  if ("name" in to) {
    docTitle = to.name;
  } else if ("title" in to.meta) {
    docTitle = to.meta.title;
  }
  if (docTitle.length) {
    document.title = docTitle + ` | ${process.env.VUE_APP_TITLE}`;
  } else document.title = `${process.env.VUE_APP_TITLE}`;



  if (to.name.toLowerCase() == "authenticate") {
    store.dispatch("auth/isAuthenticated").then(bool => {
      bool ? (window.location = "/") : null;
    });
  }

  if (!("guest" in to.meta)) {
    store.dispatch("auth/isAuthenticated").then(bool => {
      bool ? next() : next("/authenticate");
    });
  } else next();

  // next(); 

});


export default router