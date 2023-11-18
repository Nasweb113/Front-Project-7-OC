<script>
import Comment from "./Comment.vue"
import Avatar from "../Avatar.vue"
import {getUrlAndHeaders} from "./../../../../services/fetchOptions"
export default {
  name: "Card",
  components: {
    Comment,
    Avatar
  },
  props: ["email", "content", "url", "comments", "id", "currentUser", "user"],
  data() {
    return {
      currentComment: null
    }
  },
  mounted() {},
  methods: {
    addComment(e) {
      console.log(this.currentComment)
      console.log(this.$props.id)
      const { url, headers } = getUrlAndHeaders()
      const options = {
        headers: { ...headers, "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          comment: this.currentComment
        })
      }
      fetch(url + "posts/" + this.$props.id, options)
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error("Failed to fetch posts")
          }
        })
        .then((res) => {
          console.log("res:", res)
          this.$router.go()
          // this.currentComment = null
        })
        .catch((err) => console.log("err:", err))
    },
    deletePost(e) {
      console.log("id of the post to delete:", this.$props.id)
      const { url, headers } = getUrlAndHeaders()
      fetch(url + "posts/" + this.$props.id, {
        headers: { ...headers, "Content-Type": "application/json" },
        method: "DELETE"
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error("Failed to delete post")
          }
        })
        .then((res) => {
          console.log("res:", res)
          this.$router.go()
        })
        .catch((err) => console.log("err:", err))
    }
    
  }
}


</script>

<template>
<div class="card mb-3 m-auto">
  
  <div class="card-header">
    <img src="https://picsum.photos/200/200" style="width: 50px;"
  alt="Avatar" class="rounded-circle"/>
   
  <span>{{ email }}</span>
  
  <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  class="bi bi-trash" @click="deletePost"  viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
  </svg>
</div>

  <img v-if="url" :src="url" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{ content }}
      </p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>


    <div v-for="comment in comments">
    <Comment :email="comment.user.email" :content="comment.content"></Comment>
    
  </div>
    <div class="d-flex gap-1 align-items-center">
      <Avatar></Avatar>
      <input 
      type="text" 
      class="form-control" 
      placeholder="Username" 
      aria-label="Username"
      v-model="currentComment"
      />
      <button type="button" class="btn btn-primary ms-auto rounded-pill" @click="addComment">Post</button>
    </div>
  </div>
</div>
</template>

<style>
@media (min-width: 768px){

  .card{
    width: 70%;
    object-fit: cover;
  }
}
.card-header img {
  width: 50px;
  margin-inline: 1rem;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.bi-trash {
margin-left: auto;
}
.bi-trash:hover {
cursor: pointer;
color: red;
transform: scale(1.1); 
}
.bi-trash:before{
  font-size: 20px
}

</style>