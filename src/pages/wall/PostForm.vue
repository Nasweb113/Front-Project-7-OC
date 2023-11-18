<script>

import { getUrlAndHeaders } from "./../../../services/fetchOptions"
export default {
  name: "PostForm",
  data() {
    return {
      content: "",
      selectedImage: null
    }
  },
  methods: {
    handleNewFile(e) {
      this.selectedImage = e.target.files[0]
    },
    handleClick() {
      const { url, headers } = getUrlAndHeaders()
      const formData = new FormData()
      formData.append("content", this.content)
      formData.append("image", this.selectedImage)
      const options = {
        headers,
        method: "POST",
        body: formData
      }
      console.log("options:", options)
      fetch(url + "posts", options)
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error("Failed to fetch posts")
          }
        })
        .then((res) => {
          this.$router.go()
        })
        .catch((err) => console.log("err:", err))
    }
  }
}
</script>

<template>


    <div class="form-floating mt-4">
      <input class=" form-control py-3  mb-1" v-model="content" /> 
    </div>

<div class="d-flex">
<label for="file-input" class="btn btn-secondary" >Add Image </label>
<input id= "file-input" type="file" @change="handleNewFile"  />
<span v-if="selectedImage">{{ selectedImage.name }}</span>

<button @click="handleClick" type="button" class="btn btn-primary ms-auto rounded-pill">Post</button>

</div>

{{  }}
<hr class="dropdown-divider mt-4" />
</template>


<style scoped>


div span {
  font-size: 14px;
  color: black;
  display: grid;
  place-items: center;
  margin: 0.5rem;
}
label[for="file-input"]{
  background-color: grey;
}

dropdown-divider {
  border-top: none;
  
}
.form-floating div.form-control {
  height:auto;
  min-height: 6rem;
}

.form-floating > div.form-control:empty:not(:focus)::before {
  content:"Leave a comment...";
  color: #a0a0a0;
  display:block;
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  

}
</style>