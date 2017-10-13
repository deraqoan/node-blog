<template>
  <aside class="aside">
      <div class="aside-article">
        <p class="title">
          <i class="iconfont icon-list"></i>
          <span>选择标签</span>
        </p>
        <ul class="aside-tag-list">
          <li class="item" :key="index" v-for="(tag, index) in allTags" v-bind:class="{activeBtn: selectIndex === index}"  v-on:click="switchTag({value: tag, page: 1, limit: 10}, index, tag)">
              <span>{{tag}}</span>
          </li>
        </ul>
      </div>
    <div class="aside-article">
      <p class="title">
        <i class="iconfont icon-list"></i>
        <span>选择篇章</span>
      </p>
      <ul class="aside-article-list">
        <li class="item" :key="index" v-for="(item, index) in capitalize" v-bind:class="{activeBtn: majiorIndex === index}" v-on:click="switchCaption({value: curTag, page: 1, capter: item}, index)">
          <i class="index"></i>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="aside-article">
      <p class="title">
        <i class="iconfont icon-list"></i>
        <span>选择后文章</span>
      </p>
      <ul class="aside-article-list">
        <li class="item" :key="index" v-for="(article, index) in reducedArticles" @click="getartilce(article.aid)">
          <i class="index"></i>
          <span>{{ article.title }}</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import {mapMutations, mapActions, mapGetters, mapState}     from 'vuex'

export default {
    data () {
        return {
            selectIndex: 0,
            page: 1,
            majiorIndex: -1
        }
    },
    created () {
        this.getAllArticles({page: 1, value: 'C语言', limit: 10})
        this.getAllTags()
    },
    computed: {
        ...mapGetters(['reducedArticles', 'allTags']),
        ...mapState(['curTag', 'articleid', 'loadMore', 'moreArticle', 'isLoading', 'noMore']),
        capitalize: function () {
            let selectcaption = []
            let arr = this.reducedArticles
            for (let i = 0; i < arr.length; i++) {
                selectcaption.push(arr[i].caption)
            }
            let captions = []
            let b = []
            for (var prop in selectcaption) {
                var d = selectcaption[prop]
                if (d === captions[prop]) continue
                if (b[d] !== 1) {
                    captions.push(d)
                    b[d] = 1
                }
            }
            return captions
        }
    },
    methods: {
        ...mapMutations(['set_headline', 'set_curtag', 'moreArticle_toggle', 'set_articleid']),
        ...mapActions(['getAllArticles', 'getAllTags', 'searchArticles', 'getArticle']),
        switchTag (payload, index, tag) {
            this.getAllArticles(payload)
            this.selectIndex = index
            this.set_curtag(tag)
        },
        switchCaption (payload, index) {
            this.getAllArticles(payload)
            this.majiorIndex = index
        },
        getartilce (id) {
            this.set_articleid(id)
            console.log(this.articleid)
        }
    }
}
</script>

<style lang="scss" scoped>
  aside {
    display: block;
    width: 16em;
    color:#777;
    margin-right:20px;
    .aside-search,
    .aside-article,
    .aside-calendar,
    .aside-ad,
    .aside-tag, {
      background-color: rgba(255,255,255,0.9);
    }
    > .aside-article {
      overflow: hidden;
      margin-bottom: 1em;

      > .title {
        height: 3em;
        line-height: 3em;
        margin: 0;
        padding: 0 .8em;
        border-bottom: 1px dashed #eee;
        .iconfont {
          margin-right: .5em;
        }
      }
    >.aside-tag-list {
          list-style: none;
          padding: .5em .8em;
          margin-bottom: 0;
          overflow: hidden;

          .item {
            display: inline-block;
            float: left;
            margin-right: 1rem;
            margin-bottom: 1rem;
            height: 2em;
            line-height: 2em;
            padding: 0 10px;
            text-transform: capitalize;
            background-color: rgba(197,197,197,0.4);

            &:hover {
              background-color: darken(rgba(197,197,197,0.4), 40%);
            }

            &:last-child {
              margin: 0;
            }
              span {
                color:#777;
              }
          }
          .activeBtn {
            transition:  1s;
            background: #333;
            span {
              color:#fff;
            }
  }
        }
      > .aside-article-list {
        list-style: none;
        padding: .5em 0;
        margin-bottom: 0;
        counter-reset: hot-article-list;

        .item {
          display: block;
          height: 1.9em;
          line-height: 1.9em;
          padding: 0 .8em;
          margin-bottom: .5em;
          color: #333;

          &:last-child {
            margin: 0;
          }

          .index {
            counter-increment: hot-article-list;
            background-color: rgba(197,197,197,0.4);
            width: 1.5em;
            height: 1.5em;
            line-height: 1.5em;
            display: inline-block;
            text-align: center;
            margin-right: .5em;
            color: #777;
            font-size: .8em;

            &::before {
              content: counter(hot-article-list);
            }
          }
            span{
              color:#777;
              font-size: .9em;
            }
            &:hover {
              margin-left: .5em;
              text-decoration: underline;
            }
        }
        .activeBtn {
           transition:  1s;
           span {
              color:orange;
            }
        }
      }
    }
  }
  
</style>
