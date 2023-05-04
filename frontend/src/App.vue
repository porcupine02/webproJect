<template>
  <div id="app">
    <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import axios from '@/plugins/axios'
export default {
  data () {
       return {
         user: null
       }
     },
   mounted () {
     this.onAuthChange()
   },
   methods: {
     onAuthChange () {
       const token = localStorage.getItem('user')

       if (token) {
         this.getUser()
       }
       else{
        this.$router.push({path: '/'})
       }
     },
     getUser () {
      //  const token = localStorage.getItem('user')
       axios.get('http://localhost:3000/user/me').then(res => {
         this.user = res.data

       })
     },
   }
}
</script>

<style>

@font-face {
  font-family: "prompt";
  src: local("prompt"),
   url(./fonts/prompt/Prompt-Light.ttf) format("truetype");
}
#app {
  font-family: "prompt", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
