<template>
     <div>
     <el-row  :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" class="box">
    <div id="search">
        <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: page}, hash: '#article'}" v-for="(article, index) in articles" id="article" class="content animated fadeIn" tag="div" :key="index">
            <h2>{{article.title}}</h2>
            <h4>篇章：{{article.caption}}</h4>
            <time><i class="iconfont icon-shijian"></i>{{article.date | toDate}}</time>
            <span class="articleTag"><i class="iconfont icon-label"></i>{{article.tags | toTag}}</span>
            <span class="commentNumber"><i class="iconfont icon-huifu"></i>{{article.comment_n}}</span>         
            <div class="contents animated fadeIn" v-html="article.content"></div>
        </router-link>
        <spinner v-show="loadMore" class="loading"></spinner>
        
    </div>
    </el-col>
        </el-row>
    </div>
</template>

<script>
import api from '@/api/api'
import {mapState, mapActions, mapMutations, mapGetters}     from 'vuex'
import spinner                                              from '../share/spinner'

export default {
    data () {
        return {
            page: 1,
            loadMore: false,
            articles: []
        }
    },
    created () {
        this.searchArticles('title', this.$route.params.text)
    },
    beforeRouteUpdate (to, from, next) {
        if (to.params.text) {
            this.searchArticles('title', this.$route.params.text)
        }
        next()
    },
    methods: {
        getmore () {
            this.searchArticles('title', this.$route.params.text, ++this.page)
        },
        searchArticles (value, id) {
            api.searchArticles ('title', this.$route.params.text, this.page).then(response => {
                this.articles = response.data
                this.$nextTick(() => {
                    this.articles = response.data
                })
            }).catch(err => {
                console.log(err)
            })
        },
    },
    components: {
        spinner
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#search {
    padding: 0 10px;
    .content {
            color: #777;
            margin-bottom: 20px;
            border-radius: 5px;
            background-color: rgba(255,255,255,0.9);
            border-bottom: 1px dashed #eee;
            h2 {
                color: #777;
                text-align: center;
                margin-bottom: 1.25rem;
            }
            h4{
                color:#777;
                padding: 0 0 0 10em;
                text-align: center;
            }
            time {
                margin-top: 0.625rem;
                margin-right: 2.625rem;
            }
            p {
                white-space: pre-wrap;
                word-wrap: break-word;
                margin-top: 1.875rem;
                margin-bottom: 1.875rem;
            }
            button {
                width: 8.75rem;
                height: 2.5rem;
                line-height: 2.5rem;
                margin-bottom: 1.25rem;
                border-radius: 0.25rem;
                margin-left: calc(100% - 8.75rem);
            }
            .articleTag {
                margin-bottom: 1.875rem;
                margin-right: 0.625rem;
            }
            .commentNumber {
                color: #777;
                i {
                    font-size: 1.125rem;
                    margin-right: 0.3125rem;
                }
            }
            .contents{
                padding: 1em;
            }
            i.icon-label, i.icon-shijian {
                color: #777;
                font-size: 1.25rem;
                margin-right: 0.3125rem;
            }
        }
    p.noMore {
        width: 100%;
        color: #555;
        cursor: pointer;
        background: rgba(197,197,197,0.7);
        margin-top: 1.875rem;
        height: 3em;
        line-height: 3em;
        margin-bottom: 1.875rem;
        text-align: center;
    }
}
.box{
    background-color: #f5f7f9;
}
@media screen and (max-width: 440px) {
    #search {
        margin-top:20px;
    }
}
</style>
