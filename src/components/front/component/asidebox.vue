<template>
  <aside class="aside">
    <div class="aside-article">
      <p class="title">
        <i class="iconfont icon-list"></i>
        <span>热门文章</span>
      </p>
      <ul class="aside-article-list">
        <li class="item" :key="index" v-for="(article, index) in articles">
          <i class="index"></i>
          <router-link class="title" :to="{name: 'article', params: {id: article.aid, index: index, page: 1}, hash: '#article'}">
            <span>{{ article.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="aside-calendar">
      <myaside></myaside>
    </div>
    <div class="aside-fixed-box">
      <div class="aside-tag">
        <ul class="aside-tag-list">
          <li class="item" :key="index" v-for="(tag, index) in tags">
            <a class="title">
              <i class="iconfont"></i>
              <span>{{tag}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import api from '@/api/api'
import myaside from './Aside'
import {mapMutations, mapState}     from 'vuex'

export default {
    data () {
        return {
            selectIndex: 0,
            page: 1,
            majiorIndex: 0,
            articles: [],
            tags: []
        }
    },
    created () {
        this.getAllArticles('', '', this.page)
        this.getAllTags()
    },
    computed: {
        ...mapState(['curTag', 'loadMore', 'moreArticle', 'isLoading', 'noMore'])
    },
    methods: {
        ...mapMutations(['set_curtag']),
        switchTag (payload, index, tag) {
            this.getAllArticles(payload)
            this.selectIndex = index
            this.set_curtag(tag)
        },
        getAllArticles(tag, caption, id) {
            api.getArticleList(tag, caption, id).then(response => {
                this.articles = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        getAllTags() {
            api.getAllTags().then(response => {
                this.tags = response.data
            }).catch(err => {
                console.log(err)
            })
        },
    },
    components: {
        myaside
    }
}
</script>

<style lang="scss" scoped>
  aside {
    display: block;
    color:#777;
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
            font-style:normal;
            font-size: .8em;

            &::before {
              content: counter(hot-article-list);
               font-style:normal;
            }
          }

          .title {
            font-size: .9em;
            span{
              color:#777;
            }

            &:hover {
              margin-left: .5em;
              text-decoration: underline;
            }
          }
        }
      }
    }

    .aside-calendar {
      padding: .8em;
      margin-bottom: 1em;
    }

    .aside-ad {
      padding: .8em;
      margin-bottom: 1em;

      > .ad-box {
        opacity: .8;

        img {
          max-width: 100%;
          border-top: 1px solid #1c4767;
        }
      }
    }

    .aside-fixed-box {

      &.fixed {
        position: fixed;
        top: 5.5em;

        > .aside-tag {
          max-height: calc(100vh - 8em - 4.5em - 3em);
          overflow-y: auto;
        }
      }

      > .aside-tools {

        > .full-column {
          margin-right: 1rem;
        }

        > .full-column,
        > .full-page {
          display: inline-block;
          width: calc((100% - 1rem) / 2;
          height: 3rem;
          line-height: 3rem;
          text-align: center;
          background-color: rgba(255,255,255,0.6);
          cursor: pointer;

          &:hover {
            background-color: rgba(197,197,197,0.4);
          }
        }
      }

      > .aside-tag {
        width: 14em;
        padding-left: 1rem;
        padding-right: 1rem;
        border-top: 1rem solid transparent;
        border-bottom: 1rem solid transparent;
        margin-bottom: 1em;

        .empty-box {
          padding-right: .8em;
          padding-bottom: .8em;
        }

        .aside-tag-list {
          list-style: none;
          padding: 0;
          margin: 0;
          overflow: hidden;

          .item {
            display: inline-block;
            float: left;
            margin-right: 1rem;
            margin-bottom: 1rem;
            height: 2em;
            text-align: center;
            line-height: 2em;
            text-transform: capitalize;
            background-color: rgba(197,197,197,0.4);

            &:hover {
              background-color: darken(rgba(197,197,197,0.4), 40%);
            }

            &:last-child {
              margin: 0;
            }

            .title {
              display: block;
              font-size: .9em;
              padding: 0 .5em;
              span {
                color:#777;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>
