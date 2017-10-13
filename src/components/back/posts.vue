<template>
    <div class="container">
       <el-row  :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
               <div class="wrapper">  
        <p>所有文章</p>
        <article-content v-on:addPage="nextPage" v-on:dropPage="prePage" :articles="articles" v-on:relesh="fresh"></article-content>
        </div>
        </el-col>
        </el-row>
    </div>
</template>

<script>
import api from '@/api/api'
import ArticleContent           from './component/ArticleContent'
import myasidebox         from '../front/component/asidebox'
export default {
    created () {
        this.getAllArticles('', '', this.page)
    },
    data () {
        return {
            page: 1,
            articles: []
        }
    },
    methods: {
        getAllArticles(tag, caption, id) {
            api.getArticleList(tag, caption, id).then(response => {
                this.articles = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        nextPage () {
            this.page++
            this.getAllArticles('', '', this.page)
        },
        prePage () {
            this.page--
            this.getAllArticles('', '', this.page)
        },
        fresh () {
            this.getAllArticles('', '', this.page)
        }
    },
    components: {
        ArticleContent,
        myasidebox
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    position: relative;
    padding-top: 0.625rem;
    background-color: #fff;
    color: #777;
    p {
        border-bottom: 0.1875rem double #eee;
        width: 12.5rem;
        font-size: 1.875rem;
        margin:0 auto 2.5rem;
        padding-bottom: 0.625rem;
        text-align: center;
    }
    .addPost {
        position: fixed;
        bottom: 1.25rem;
        right: 1.25rem;
    }
}
.container{
    background-color: #f5f7f9;
}
@media screen and (max-width: 440px) {
    .wrapper {
        margin-top:20px !important;
        padding-top: 2rem !important;
        margin-bottom: 4rem;
        .addPost {
            position: absolute !important;
            bottom: -3rem !important;
        }
    }
}
</style>
