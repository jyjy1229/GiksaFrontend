<template>
  <div class="main page">
    <b-navbar type="dark" variant="dark" class="nav">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
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
      <b-container class="tables">
        <b-table
          striped hover
          id="my-table"
          :items="post"
          :per-page="perPage"
          :current-page="currentPage"
          small
          :fields="fields"
        >
          <template v-slot:cell(Like)="row">
            <b-button size="sm" @click="like(row.item.postid)">
              Like
            </b-button>
          </template>

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

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align="center"
          size="sm"
        ></b-pagination>
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
        fields: [{key: 'postuser', label: 'Author'}, 'dorm_from', 'dorm_to', {key: 'num_people', label: 'Number of Change'}, {key: 'likenum', label: 'Likes'}, {key: "show_comment", label: 'Comment'}],
        perPage: 15,
        currentPage: 1,
        mycomment: '',
        post: [],
        user: '',
        success: ''
      }
    },
    created: function(){
        this.success = this.$store.state.success
        this.userid = this.$store.state.userid
        this.$http.get('/api/exchangelist').then(res => {
          this.post = res.data.postinfo
        })
    },
    computed: {
      rows() {
        return this.post.length
      }
    },
    methods: {
      like(rowpostnum){
        this.$http.post('/api/like', {
          rowpostnum: rowpostnum,
          userid: this.user
        }).then(res => {
          if(res.data.id_exist){
            alert('already like this post')
          }
          else{
            alert('Okay, you like this post')
          }
        })
      },
      comment(rowpostnum){
        console.log(this.mycomment)
        this.$http.post('/api/comment', {
          rowpostnum: rowpostnum,
          comment: this.mycomment,
          userid: this.$store.state.userid
        }).then(res => {
          this.post = res.data.postinfo
          this.mycomment = ""
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
  ul {
    list-style-type: none;
    text-align: left;
  }
  .nav {
    font-size: medium;
  }

  .page {
    height: 100vh;
    font-weight: bold;
  }

  .tables {
    font-size: medium;
    width: 60%;
  }
   .button {

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