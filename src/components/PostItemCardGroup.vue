<template>
  <!-- <div id="app"> -->
  <!-- <v-app id="inspire"> -->
  <v-sheet class="mx-auto" elevation="50">
    <v-slide-group
      v-model="model"
      class="pa-4"
      :prev-icon="prevIcon ? 'mdi-minus' : undefined"
      :next-icon="nextIcon ? 'mdi-plus' : undefined"
      :multiple="multiple"
      :mandatory="mandatory"
      :show-arrows="showArrows"
      :center-active="centerActive"
    >
      <v-slide-item
        v-for="item in posts"
        :key="item.id"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="post-item-card"
          height="500"
          width="350"
          @click="toggle"
        >
          <router-link
            class="article-more-a article-title"
            :to="'/blog/' + item.id"
          >
            <v-list-item>
              <v-list-item-avatar color="grey"></v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="title">{{
                  item.title
                }}</v-list-item-title>
                <v-list-item-subtitle
                  >by {{ item.author.username }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-img
              :src="
                item.cover
                  ? 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg'
                  : 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg'
              "
              height="250"
            ></v-img>

            <v-card-text>
              {{ item.summary }}
            </v-card-text>
          </router-link>
          <v-card-actions>
          <router-link
            class="article-more-a article-title"
            :to="'/blog/' + item.id"
          >
            <v-btn text color="deep-purple accent-4"> Read </v-btn>
          </router-link>
            <!-- <el-link type="primary">READ</el-link> -->
            <!-- <v-btn text color="deep-purple accent-4"> Bookmark </v-btn> -->
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
  <!-- </v-app> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: "PostItemCardGroup",

  data() {
    return {
      model: null,
      multiple: false,
      mandatory: false,
      showArrows: true,
      prevIcon: false,
      nextIcon: false,
      centerActive: false,
      posts: [],
    };
  },
  watch: {},
  methods: {
    getArticlesList() {
      let that = this;
      that
        .$get("/api/v1/blogs/articleshow/?limit=3")
        // .$get("http://127.0.0.1:8000/api/v1/blogs/articleshow/?limit=3")
        .then(function (response) {
          that.posts = response;
          console.log(that.posts);
        })
        .catch(function (error) {
          // console.log(error.data);
        });
    },
  },
  created() {
    this.getArticlesList();
  },
};
</script>
<style lang="stylus" scoped>
import '../assets/style/home.styl'

.post-item-card {
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  background-color: rgba(206, 210, 201, 0.05);
}
</style>

