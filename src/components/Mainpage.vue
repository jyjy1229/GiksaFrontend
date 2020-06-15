<template>
  <div class="main page">
    <b-navbar type="dark" variant="dark" class="nav">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item v-if="success" href="/exchangelist">Post list</b-nav-item>
        <b-nav-item v-if="success" href="/post">New Post</b-nav-item>
      </b-navbar-nav>
      
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if="success" text="User" left>
          <b-dropdown-item href="/user">My Page</b-dropdown-item>
          <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <div class="position main" v-if="success">
      Welcome, {{ user.userid }} !
    </div>

    <div class="position main" v-else>
      Dorm exchange service
      <b-container class="login card">
        <b-row>
          <b-col sm="3">
            <label for="id">ID</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="user.userid" type="text"></b-form-input>
          </b-col>
          <b-col sm="3">
            <label for="password">PASSWORD</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="user.password" type="password"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <b-button v-on:click="login">Login</b-button>
      <b-button href="/signup">Signup</b-button>
    </div>
  </div>
</template>

<script>

export default {
    data: function(){
      return{
        user: {
          userid: '',
          password: ''
        },
        success: ''
      }
    },
    created: function(){
      this.success = this.$store.state.success
      this.user.userid = this.$store.state.userid
    },
    methods: {
      login: function(){
        this.$http.post('/api/login', {
          user: this.user
        }).then(res => {
            console.log(res)
            if(res.data.id_correct && res.data.pwd_correct){
              alert('login success')
              this.success = true
              this.$store.commit('login', this.user.userid)
              this.$router.push('/')
            }
            else if(res.data.id_correct && !res.data.pwd_correct){
              alert('password wrong')
            }
            else{
              alert('No such ID exist')
            }
          })
          .catch(err => {
            alert(err);
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

  .login {
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