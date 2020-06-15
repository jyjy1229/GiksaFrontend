<template>
  <div class="main page">
    <b-navbar type="dark" variant="dark" class="nav">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/">Login</b-nav-item>
      </b-navbar-nav>
    </b-navbar>


    <div class="position main">
      Signup Page
      <b-container class="signup">
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
          <b-col sm="3">
            <label for="name">NAME</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="user.name" type="text"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <b-button v-on:click="signup">Signup</b-button>
    </div>
  </div>
</template>

<script>

export default {
    data: function(){
      return{
        user: {
          userid: '',
          password: '',
          name: ''
        },
        success: ''
      }
    },
    methods: {
      signup: function(){
        this.$http.post('/api/signup', {
          user: this.user
        }).then(res => {
            if(res.data.require){
              alert('Fill everything')
            }
            else{
              if(res.data.id_exist && res.data.pwd_len){
                alert('signup success')
                this.$router.push('/')
              }
              else if(res.data.id_exist && !res.data.pwd_len){
                alert('length of password should be 8 ~ 16')
              }
              else{
                alert('ID already exist')
              }
            }
            
          })
          .catch(err => {
            alert(err);
          })
      }
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

  .signup {
    font-size: medium;
    width: 60%;
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