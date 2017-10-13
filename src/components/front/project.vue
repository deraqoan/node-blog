<template>
    <div class="articleContent">
        <div id="articles">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="18" :lg="18">
                <div class="box animated fadeIn">
                <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: page}, hash: '#article'}" v-for="(article, index) in drafts" id="article" class="content animated fadeIn" tag="div" :key="index">
                         <h2>{{article.title}}</h2>
                         <h4>篇章：{{article.caption}}</h4>
                         <time><i class="iconfont icon-shijian"></i>{{article.date | toDate}}</time>
                         <span class="articleTag"><i class="iconfont icon-label"></i>{{article.tags | toTag}}</span>
                         <span class="commentNumber"><i class="iconfont icon-huifu"></i>{{article.comment_n}}</span>         
                          <div class="contents animated fadeIn" v-html="article.content"></div>
                </router-link>
                <p class="nomore" @click="getmore">
                    加载更多
                </p>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="6">
            <div class="tags animated fadeIn">
                <p class="title">
                   <i class="iconfont icon-list"></i>
                   <span>选择文章</span>
                 </p>
                <ul class="captionFlex">
                    <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: page}, hash: '#article'}" v-for="(article, index) in drafts" id="article" tag="li" v-bind:class="{active: catIndex === index}":key="index">
                        <i class="index"></i>
                        <span>{{article.title}}</span>
                     </router-link>
                </ul>
                <p class="more" @click="getmore">
                    加载更多
                </p>
            </div>
            </el-col>
           </el-row>
        </div>
    </div>
</template>

<script>
import api from '@/api/api'
import {mapState}     from 'vuex'
import myasidebox         from './component/asidebox'

export default {
    data () {
        return {
            page: 1,
            catIndex: -1,
            drafts: []
        }
    },
    created () {
        this.getAllDrafts(this.page)
    },
    components: {
        myasidebox
    },
    methods: {
        getAllDrafts(id) {
            api.getDrafts(id).then(response => {
                this.drafts = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        switchArticle (id, index) {
            this.getArticle(id)
            this.catIndex = index
        },
        getmore () {
            this.page++
            this.getAllDrafts(this.page)
        }
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.articleContent {
    background: #f5f7f9;
    color:#777;
    #articles {
        .tags {
            margin-bottom: 20px;
            counter-reset: hot-article-list;
            background-color: rgba(255,255,255,0.9);
            .title {
                height: 3em;
                line-height: 3em;
                margin: 0;
                padding: 0 .8em;
                border-bottom: 1px dashed #eee;
                .iconfont {
                  margin-right: .5em;
                }
            }
            .tagFlex {
                display: inline-block;
                list-style: none;
                padding: .5em .8em;
                margin-bottom: 0;
                overflow: hidden;
                li{
                    float: left;
                    margin-right: 1rem;
                    cursor: pointer;
                    margin-bottom: 1rem;
                    height: 2em;
                    line-height: 2em;
                    padding: 0 10px;
                    text-transform: capitalize;
                    background-color: rgba(197,197,197,0.4);
                }
                .activeBtn {
                    color: #0088f5;
                    transition:  1s;
                }
            }
            .captionFlex{
                list-style: none;
                padding: .5em 0;
                margin-bottom: 0;
                overflow: hidden;
                li{
                    display: block;
                    height: 1.9em;
                    line-height: 1.9em;
                    padding: 0 .8em;
                    margin-bottom: .5em;
                    cursor: pointer;
                    white-space: nowrap;
                    color: #777;
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
                }
                .active{
                    color: #0088f5;
                    transition:  1s;
                }
            }
            .more{
                width: 100%;
                height: 3em;
                line-height: 3em;
                color: #555;
                background: rgba(197,197,197,0.3);
                text-align: center;
            }
        }
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
        .nomore{
            text-align: center;
            height: 3em;
            line-height: 3em;
            color: #555;
            background: rgba(197,197,197,0.7)
        }
        .comment{
            background-color: rgba(255,255,255,0.9);
        }
    }
}
@media screen and (max-width: 440px) {
    #articles {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
    }
    .box{
        margin-top:20px;
    }
    .tags{
        margin-top:20px;
    }
}
</style>
