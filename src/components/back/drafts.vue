<template>
    <div class="container">
        <el-row class="box">
            <el-col :span="24">
        <p>所有草稿</p>
        <article-content v-on:addPage="nextPage" v-on:dropPage="prePage" :articles="drafts" v-on:relesh="fresh"></article-content>
        <router-link
                :to="{name: 'editor'}"
                class="addPost" tag="button"
        ><span>添加草稿</span></router-link>
        </el-col>
        </el-row>
    </div>
</template>

<script>
import api from '@/api/api'
import {mapState}   from 'vuex'
import ArticleContent           from './component/ArticleContent'
export default {
    created () {
        this.getAllDrafts(this.page)
    },
    data () {
        return {
            page: 1,
            drafts: []
        }
    },
    methods: {
        getAllDrafts(id) {
            api.getDrafts(id).then(response => {
                this.drafts = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        nextPage () {
            this.page++
            this.getAllDrafts(this.page)
        },
        prePage () {
            if (!(this.page - 1)) {
                alert('已经到第一页咯')
            } else {
                this.page--
                this.getAllDrafts(this.page)
            }
        },
        fresh () {
            this.getAllDrafts(this.page)
        }
    },
    computed: {
        ...mapState(['articles'])
    },
    components: {
        ArticleContent
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
    padding-top: 0.625rem;
    color: #777;
    position: relative;
    background-color: #f5f7f9;
    P {
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
         height: 3em;
         width: 10em;
         outline: none;
         display: block;
         border: none;
         color:#fff;
         background: #8a8a8a;
     }
}
.box{
    background-color: rgba(255,255,255,0.9);
    padding: 2em 0;
}
@media screen and (max-width: 440px) {
    .container {
        padding-top: 2rem !important;
        margin-bottom: 3rem;
        .addPost {
            position: absolute;
            bottom: -3rem;
        }
    }
}
</style>
