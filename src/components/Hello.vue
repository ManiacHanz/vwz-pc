<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <!-- {{this.test}} -->
    <ul>
      <li v-for="item in arr" @click="liClick(item)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      type:'',
      arr:[1111,2222,3333,4444],
      timer:'',
    }
  },
  computed: {
    ...mapState([
      
      ])
  },
  mounted () {
    // this.type = this.test
    // setTimeout( () => {
    //   this.TEST(2)
    //   // console.log(this.test)
    // },5000)
  },
  watch: {
    // test: function() {
    //   // alert(this.test)
    // }
  },
  methods: {
    ...mapMutations([
        // 'TEST'
      ]),
    tttt(attribute) {
      // this.TEST(attribute)
    },
    liClick (item) {
      clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        console.log(item)
      },1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
