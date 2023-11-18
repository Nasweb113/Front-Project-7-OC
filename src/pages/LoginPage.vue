<script>
import{getUrlAndHeaders} from "./../../services/fetchOptions"
import axios from "axios"
export default {
  name: "LoginPage",
 
  data() {
return { 
  username: "Email@email.com", 
  password: "123456", 
  confirmPassword: "123456",
  hasInvalidCredentials: false, 
  error: null,
  isLoginMode: true,
}
},
  
  methods: {
    loginUser, 
    setFormValidity,
    toggleLoginMode(){
      this.isLoginMode = !this.isLoginMode
    },
    
    signUp: async function(email, password, confirmPassword, router)  {
      const {url, headers} = getUrlAndHeaders()
      console.log("signup:")
      const body = JSON.stringify({ 
        email,
        password, 
        confirmPassword
      })
      

const options = {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
  "Accept": "application/json"
}
      }
try{   
 await axios.post(url + "auth/signup",body, options)
this.$router.go("auth/login")
  
} catch(err) {
const error = err.response.data.error
this.error = error

 throw new Error("failed to signup " + error)
}      
}
},
  watch: {
    username(value){
    const isValueEmpty = value === ""
    this.setFormValidity 
    (!isValueEmpty)
    this.error = null
  },
  password(value){
    const isValueEmpty = value === ""
    this.setFormValidity 
    (!isValueEmpty)
    this.error = null
  }
}
};



function loginUser(email, password, router) {
  
  
  const {url, headers} = getUrlAndHeaders()

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  }
 

  fetch(url +"auth/login",options) 
  .then((res) => {
  if (res.ok) return res.json()//the res.JSON will then be injected ino the following .then res
  res.text().then((err) => {

const {error} = JSON.parse(err)

this.error = error
  throw new Error(error)
})
})
  .then((res) => {
    const token = res.token
    localStorage.setItem("token", token)
    

    let tokenInCache
    while (tokenInCache == null) {
      tokenInCache = localStorage.getItem('token')
    }
    this.$router.push("/home")
    
  })
 .catch((err) => {
    console.error(err);
    })
      
}
    

  
  function setFormValidity 

  (bool) {
  console.log("form is invalid", bool)
  this.hasInvalidCredentials = !bool
}






</script>

<template>
  <main class="form-signin w-100 m-auto">
    isLoginMode: {{ isLoginMode }}
  <form :class="this.hasInvalidCredentials ? 'hasErrors' : ''">
    <img 
    class="mb-4 d-block mx-auto" 
    src="src\assets\icon-above-font.png" 
    alt="" 
    width="72" 
    height="57">
    <h1 class="h3 mb-3 fw-normal">{{this.isLoginMode? "Please sign in" : "Create account"}}</h1>

    <div class="form-floating">
      <input type="email"  
      class="form-control" 
      id="floatingInput" 
      placeholder="name@example.com"
      v-model="username"
      required = "true"
      @invalid="setFormValidity
      "
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input 
      type="password" 
      class="form-control" 
      id="floatingPassword" 
      placeholder="password"
      v-model ="password"
      required = "true"
      @invalid="setFormValidity

      "
      />
      <label for="floatingPassword">password</label>
    </div>
    <div v-if="!isLoginMode" class="form-floating">
      <input 
      type="password" 
      class="form-control" 
      placeholder="Confirm password"
      v-model ="password"
      required = "true"
      @invalid="setFormValidity

      "
      />
      <label for="floatingPassword">Confirm password</label>
    </div>
    <div v-if="hasInvalidCredentials" class="error-msg">Fields must be completed</div>
    <div v-if="!hasInvalidCredentials && error" class="error-msg">{{ error }}</div>
    
    <button v-if="isLoginMode" class="w-100 btn btn-lg btn-primary" 
    type="submit"
    @click.prevent="() => loginUser
  
  (this.username, this.password, this.$router)"
    :disabled= "hasInvalidCredentials">
    Sign in
  </button>

  <button v-if="!isLoginMode" class="w-100 btn btn-lg btn-primary" 
    type="submit"
    @click.prevent="() => signUp(this.username, this.password, this.confirmPassword, this.$router)"
    :disabled= "hasInvalidCredentials">
    Register
  </button>


  <p  class="mt-1 mb-1 text-muted" @click.prevent= "toggleLoginMode" >
    <a href="">
    {{this.isLoginMode? "Create an account" : "Back to login"}}</a>
    </p>
    
  </form>
</main>


</template>
<style scoped>

.hasErrors input{
  border: 1px solid red;
  
  }

html,
body {
  height: 100%;
}

body {
  
  align-items: center;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.error-msg {
  color: red;
  font-size: large;
  
}


.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
