<script>
import Logo from "../ui/Logo.vue"
export default {
  name: 'AppNavbar',
  components: { Logo },
  data(){
    return{
      isLoggedIn: false
    }
  },
  created() {
    const token = localStorage.getItem("token")
    if (token != null){
    this.isLoggedIn = true
    }
  },
  
methods: {
  logout() {
    localStorage.removeItem("token")
    this.$router.go()
  }
}
}
</script>
<template>
  
<header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <img src="src\assets\icon-above-font.png" class= "topImg" alt="">

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="/home" class="nav-link px-2 text-secondary">Home</router-link></li>
          
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search">
        </form>

        <div class="text-end">
          <button 
          @click="logout" 
          v-if="this.isLoggedIn" 
          type="button" 
          class="btn btn-outline-light me-2">Logout</button>
          <button v-if="!this.isLoggedIn" type="button" class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </header>

  <div class="b-example-divider"></div>
</template>
<style>
.bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }




.form-control-dark {
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  border-color: #fff;
  box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle:not(:focus) {
  outline: 0;
}
.topImg {
  width: 4rem;
}
</style>
