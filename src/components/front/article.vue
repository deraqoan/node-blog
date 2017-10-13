<template>
    <div class="wrapper" id="article">
         <el-row  :gutter="10">
            <el-col :xs="24" :sm="24" :md="18" :lg="18" class="box">
        <div id="content">
            <h1 class="title animated fadeIn">{{article.title}}</h1>
            <div class="appendInfo animated fadeIn">
                <time>
                    <i class="iconfont icon-shijian"></i>{{article.date | toDate}}
                </time>
                <span>
                    <i class="iconfont icon-label"></i>{{article.tags | toTag}}
                </span>
                <a class="commentCount" href="#comment" data-scroll>
                    <i class="iconfont icon-huifu"></i>{{article.comment_n}}
                </a>
            </div>
            <div class="content animated fadeIn" v-html="mdHtml"></div>
            <div class="indexes animated fadeIn">
                <div class="last animated fadeIn">
                    <router-link :to="{name: 'article', params: {id: articles[prePage].aid, index: prePage, page: $route.params.page}, hash: '#article'}"  v-if="articles[prePage]" tag="p" class="left">
                        <i class="iconfont icon-left"></i>{{articles[prePage].title}}</router-link>
                    <router-link :to="{name: 'article', params: {id: articles[nextPage].aid, index: nextPage, page: $route.params.page}, hash: '#article'}" v-if="articles[nextPage]" tag="p" class="right">
                        {{articles[nextPage].title}}<i class="iconfont icon-right"></i></router-link>
                </div>
            </div>
            <article-comment class="comment animated fadeIn"></article-comment>
        </div>
        <router-link :to="{name: 'articles'}" class="iconfont icon-fanhui" tag="i"></router-link>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="6" :lg="6"><div class="grid-content bg-purple"><myasidebox></myasidebox></div></el-col>
        </el-row>
    </div>
</template>

<script>
import api from '@/api/api'
import marked                                       from 'marked'
import hljs                                         from 'highlight.js'
import {mapState}                       from 'vuex'
import myasidebox         from './component/asidebox'
import ArticleComment                               from './component/ArticleComment'
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value
    },
    sanitize: true
})

const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
    return '<a href="#' + text + '" class="hashTitle" data-scroll><h' + level +
            ' id="' + text + '">' + text + '</h' + level + '></a>'
}

export default {
    data () {
        return {
            prePage: 0,
            nextPage: 0,
            count: 0,
            article: [],
            articles: []
        }
    },
    created () {
        this.getArticle(this.$route.params.id)
        this.initPage()
    },
    beforeRouteUpdate (to, from, next) {
    // 从foo/1跳到foo/2组件会复用，不会再执行created钩子函数，可以在这里执行
        this.getArticle(to.params.id)
        if (to.params.index === 0) {
            this.prePage = -1
            this.nextPage = 1
        } else if (to.params.index === this.articles.length - 1) {
            this.prePage = to.params.index - 1
            this.getAllArticles('', '', ++to.params.page, true)
            this.nextPage = to.params.index + 1
        } else if (to.hash && to.hash !== '#article') {   // 目录锚点跳转
            to.params.page = from.params.page
            to.params.index = from.params.index
            this.prePage = to.params.index - 1
            this.nextPage = parseInt(to.params.index) + 1
        } else {
            this.prePage = to.params.index - 1
            this.nextPage = parseInt(to.params.index) + 1
        }
        next()
    },
    computed: {
        ...mapState(['curTag']),
        mdHtml () {
            return marked(this.article.content || '', { renderer: renderer })
        }
    },
    methods: {
        mark: marked,
        initPage () {
            const index = this.$route.params.index - 0
            let page = this.$route.params.page - 0 || 1
            this.getAllArticles('', '', page, false)
            if (index === 0) {
                this.prePage = -1
                this.nextPage = 1
            } else if (index === this.articles.length - 1) {        // 加载更多文章
                this.prePage = index - 1
                this.nextPage = index + 1
            } else {
                this.prePage = index - 1
                this.nextPage = index + 1
            }
        },
        getAllArticles(tag, caption, id, add) {
            api.getArticleList(tag, caption, id).then(response => {
                if (add) {
                    this.articles = this.articles.concat(response.data)
                } else {
                this.articles = response.data
                }
                if (response.data.length === 0) {
                    alert('我是有底线的')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getArticle (id) {
            api.getArticle(id).then(response => {
              this.article = response.data
            }).catch(err => {
              console.log(err)
            })
        }
    },
    components: {
        ArticleComment,
        myasidebox
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    position: relative;
    background: #f5f7f9;
    min-height: 43.75rem;
    color: #000;
    #content {
        padding: 0;
        background: rgba(255,255,255,0.9);
        h1 {
            text-align: center;
            margin-top: 0;
            padding-top: 1em;
            margin-bottom: 1.25rem;
            color: #777;
        }
        .content {
            min-height: 31.25rem;
            margin-top: 1rem;
            text-align: left;
            font-size: 1rem;
            padding: 0 20px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .appendInfo {
            text-align: right;
            padding-right: 2em;
            time {
                color: #515151;
                display: inline-block;
            }
            span {
                color: #555;
                display: inline-block;
                margin-left: 0.625rem;
            }
            a.commentCount {
                display: inline-block;
                color: #555;
                cursor: pointer;
                margin-left: 0.625rem;
                &:hover {
                     color: #777;
                 }
            }
            i {
                margin-right: 0.3125rem;
            }
            i.icon-shijian, i.icon-label {
                font-size: 1.25rem;
            }
        }
        .indexes {
            margin-top: 2.125rem;
            border-top:10px solid #eee;
            border-bottom:10px solid #eee;
            border-radius: 5px;
            .last {
                color: #777;
                font-size: 1.25rem;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                margin-bottom: .5em;
                i {
                    font-size: 1.125rem;
                    color: #777;
                }
                i.icon-left {
                    margin-right: 0.625rem;
                }
                i.icon-right {
                    margin-left: 0.625rem;
                }
                p {
                    flex-grow: 1;
                    cursor: pointer;
                    color: #555;
                    display: inline-block;
                    padding: 0 0.625rem;
                    transition: 1s;
                    margin-top: 1rem;
                    &:hover {
                         color: #777;
                     }
                }
                p.left {
                    text-align: left;
                    &:hover {
                        transition:  1s;
                        padding-left: 0;
                     }
                }
                p.right {
                    text-align: right;
                    &:hover {
                        transition: 1s;
                        padding-right: 0;
                     }
                }
            }
        }
    }
    i.icon-fanhui {
        color: #777;
        font-size: 1.875rem;
        position: absolute;
        bottom: 1.25rem;
        left: 1.25rem;
        cursor: pointer;
        &:hover {
            color: #000;
         }
    }
}

@media screen and (max-width: 440px) {
    .list {
        display: none !important;
    }
    .appendInfo {
        text-align: center !important;
    }
    .wrapper {
        padding-left: 10px;
        padding-right: 10px;
    }
    i.icon-fanhui {
        display: none !important;
    }
    .last {
        p:hover {
            color: rgb(129, 216, 208) !important;
        }
    }
}
</style>
