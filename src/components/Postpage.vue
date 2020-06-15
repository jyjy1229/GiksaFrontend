<template>
  <div class="main page">
    <b-navbar type="dark" variant="dark" class="nav">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item v-if="success" href="/exchangelist">Post list</b-nav-item>
      </b-navbar-nav>
      
      <b-navbar-nav v-if="success" class="ml-auto">
        <b-nav-item-dropdown text="User" left>
          <b-dropdown-item href="/user">My Page</b-dropdown-item>
          <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item href="/">Login</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <div v-if="success" class="position main">
      <b-container fluid class="post">
        <b-row>
          <b-col sm="3">
            <label>DORM FROM</label>
          </b-col>
          <b-col sm="9">
            {{ post.dorm_from }}
          </b-col>
          <b-col sm="3">
            <label>DORM TO</label>
          </b-col>
          <b-col sm="9">
            <b-form-select
            v-model="post.dorm_to"
            :options="['사랑', '소망', '성실', '진리', '신뢰', '지혜', '아름', '세종', '다솜', '희망', '미르', '나래', '나들', '여울', '문지', '화암']"
            :value="null"
            ></b-form-select>
          </b-col>
          <b-col sm="3">
            <label>NUMBER OF PEOPLE</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="post.num_people" type="number"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <b-button v-on:click="newpost">Signup</b-button>
    </div>
    <div v-else>
      Please Login.
    </div>
  </div>
</template>

<script>

export default {
    data: function(){
      return{
        userid: '',
        post: {
          dorm_from: '',
          dorm_to: '',
          num_people: '',
        },
        success: ''
      }
    },
    created: function(){
      this.success = this.$store.state.success
      this.userid = this.$store.state.userid
      this.$http.post('/api/getdorm', {
        userid: this.userid
      }).then(res => {
        this.post.dorm_from = res.data.mydorm
      })
    },
    methods: {
      newpost: function(){
        this.$http.post('/api/post', {
          post: this.post,
          user: this.userid
        }).then(res => {
          if(res.data.require && res.data.numispos){
            alert('success')
            this.$router.push('/')
          }
          else if(!res.data.numispos){
            alert('number should be positive')
          }
          else{
            alert('Fill everything')
          }
        })
      },
      logout: function(){
        this.$http.get('/api/logout').then(
          this.success = false,
          this.$store.commit('logout'),
          this.$router.go(this.$router.currentRoute)
        )}
    }
}
</script>

<style>
  .nav {
    font-size: medium;
  }

  .page {
    height: 100vh;
    font-weight: bold;
  }

  .post {
    font-size: medium;
  }

  .position {
    position: relative;
    top: 10%;
  }

  .main {
    text-align: center;
    font-size: 1.5em;
  }

  .card{
    width: 60%;
    text-align: center;
    margin: 0 auto;
    color: #000000;
  }
</style>