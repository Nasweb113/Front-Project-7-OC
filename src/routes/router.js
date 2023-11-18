import WallPage from "../pages/wall/WallPage.vue"

import LoginPage from "../pages/LoginPage.vue"

import {createRouter, createWebHistory } from "vue-router"

const routes = [ 
  { path: "/login",component: LoginPage},
  { path: "/signup",component: LoginPage},
  { path: "/home", component: WallPage }, 
  { path: "/", redirect: "/home"},
  
]


const router = createRouter({ history: createWebHistory(), routes })



// -----TOKEN VERIFICATION-----

 router.beforeEach((to) => {
   if (isLoginRequired(to)) {
     return router.push("/login")
    }
  })
  function isLoginRequired(to) {
    if (!isPrivatePage(to)) return false
    if (!isTokenInCache()) return true
    
    return false
  }
  
  function isPrivatePage(to) {
    const publicPages = ["/login", "/signup"]
    return !publicPages.includes(to.path)
  }
  function isTokenInCache(){
    return localStorage.getItem("token") != null
  }
  


export { router }




