<template>
  <div class="main page">
    <b-navbar type="dark" variant="dark" class="nav">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item v-if="success" href="/exchangelist">Post list</b-nav-item>
        <b-nav-item v-if="success" href="/post">New Post</b-nav-item>
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

    <div v-if="success" class="overflow-auto">
      Profile
      <b-container class="profiles">
        <b-row>
          <b-col sm="3">
            <label>NAME</label>
          </b-col>
          <b-col sm="9">
            {{ userinfo.name }}
          </b-col>
          <b-col sm="3">
            <label>YOUR DORM</label>
          </b-col>
          <b-col v-if="userinfo.mydorm" sm="9">
            {{ userinfo.mydorm }}
          </b-col>
          <b-col v-else sm="9">
            <b-form-select
            v-model="mydorm"
            :options="['사랑', '소망', '성실', '진리', '신뢰', '지혜', '아름', '세종', '다솜', '희망', '미르', '나래', '나들', '여울', '문지', '화암']"
            :value="null"
            ></b-form-select>
        <b-button v-on:click="set">
          set your dorm
        </b-button>
          </b-col>
        </b-row>
      </b-container>
      My Post List
      <b-container class="tables">
        <b-table
          striped hover
          id="my-table"
          :items="posts"
          small
          :fields="fields"
        >
        <template v-slot:cell(show_comment)="row">
          <b-button size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? 'Hide' : 'Show' }}
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(comment, key) in row.item.comments" :key="key">{{comment[0]}}: {{comment[1]}}</li>
            </ul>
            <b-form-textarea rows="4" v-model="mycomment" placeholder="Your comment."
            ></b-form-textarea>
            <div align="right">
              <b-button @click="comment(row.item.postid)" size="sm" variant="outline-primary">
                Enter
              </b-button>
            </div>
          </b-card>
        </template>
        </b-table>
      </b-container>
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
        fields: ['dorm_from', 'dorm_to', {key: 'num_people', label: 'Number of change'}, {key: 'likenum', label: 'Likes'}, {key: "show_comment", label: 'Comment'}],
        userid: '',
        success: '',
        posts: [],
        userinfo: '',
        mycomment: '',
        mydorm: ''
      }
    },
    created: function(){
        this.success = this.$store.state.success
        this.userid = this.$store.state.userid
        this.$http.post('/api/user', {
          success: this.success,
          userid: this.userid
        }).then(res => {
          this.posts = res.data.posts
          this.userinfo = res.data.user
        })
    },
    computed: {
      rows() {
        return this.post.length
      }
    },
    methods: {
      set(){
        this.$http.post('/api/set', {
          mydorm: this.mydorm,
          userid: this.userid
        }).then(res => {
          this.userinfo = res.data.user
        })
      },
      comment(rowpostnum){
        console.log(this.mycomment)
        this.$http.post('/api/comment', {
          rowpostnum: rowpostnum,
          comment: this.mycomment,
          userid: '방주인'
        }).then(res => {
          this.posts = res.data.postinfo
          this.mycomment = ""
        })
      },
      logout: function(){
        this.$http.get('/api/logout').then(
          this.success = false,
          this.$store.commit('logout'),
          this.$router.go(this.$router.currentRoute)
        )
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

  .profiles {
    font-size: medium;
    width: 60%;
  }

  .tables {
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