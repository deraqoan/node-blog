<template>
    <div class="container">
        <el-row  :gutter="10">
            <el-col :xs="24" :sm="24" :md="18" :lg="18">
        <section class="newBlog">
            <div class="posts animated fadeIn">
                <div class="flex">
                    <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: 1}, hash: '#article'}" v-for="(article, index) in articles" class="oneArticle" tag="div" :key="index">
                        <h2>{{article.title}}</h2>
                         <h4>篇章：{{article.caption}}</h4>
                         <time><i class="iconfont icon-shijian"></i>{{article.date | toDate}}</time>
                         <span class="articleTag"><i class="iconfont icon-label"></i>{{article.tags | toTag}}</span>
                         <span class="commentNumber"><i class="iconfont icon-huifu"></i>{{article.comment_n}}</span>         
                          <div class="contents animated fadeIn" v-html="article.content + '。。。。'"></div>
                    </router-link>
                </div>
            </div>
        </section>
        <section class="contact">
            <a href="#contactMe" class="title animated bounceIn">
                <p class="headline" id="contactMe">Contact me</p>
            </a>
            <div class="email animated fadeIn">
                <input type="text" placeholder=" 邮件主题" v-model="subject"/>
                <input type="text" placeholder=" 邮箱" v-model="address"/>
                <textarea placeholder=" 来唠唠嗑呗" spellcheck="false" v-model="content"></textarea>
                <button class="sendEmail" @click="send"  :disabled="sendFlag">
                    <span>{{sendFlag ? '发送中...' : '确认'}}</span>
                </button>
            </div>
        </section>
        </el-col>
        <el-col  :xs="0" :sm="0" :md="4" :lg="4"><div class="grid-content bg-purple side"><myasidebox></myasidebox></div></el-col>
        </el-row>
    </div>
</template>

<script>
import api from '@/api/api'
import myasidebox         from './component/asidebox'
import {mapMutations, mapGetters}   from 'vuex'

export default {
    data () {
        return {
            subject: '',
            address: '',
            content: '',
            page: 1,
            articles: [],
            sendFlag: false
        }
    },
    created () {
        this.getAllArticles('', '', this.page)
    },
    components: {
        myasidebox
    },
    methods: {
        ...mapMutations(['set_dialog']),
        getAllArticles(tag, caption, id) {
            api.getArticleList(tag, caption, id).then(response => {
                this.articles = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        send () {
            const re = /^[\w_-]+@[\w_-]+\.[\w\\.]+$/
            if (!this.subject || !this.content) {
                this.set_dialog({
                    info: '还有选项没填(⊙o⊙)？',
                    hasTwoBtn: false,
                    show: true
                })
                return
            } else if (!re.test(this.address)) {
                this.set_dialog({
                    info: '请正确填写邮箱地址',
                    hasTwoBtn: false,
                    show: true
                })
                return
            }
            this.sendFlag = true
            api.sendMail({
                subject: this.subject,
                address: this.address,
                content: this.content
            }).then(() => {
                this.subject = ''
                this.content = ''
                this.address = ''
                this.set_dialog({
                    info: '邮件发送成功',
                    hasTwoBtn: false,
                    show: true
                })
                this.sendFlag = false
            }).catch(() => {
                this.sendFlag = false
                this.set_dialog({
                    info: 'sorry, 邮件发送失败，请重新发送',
                    hasTwoBtn: false,
                    show: true
                })
            })
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
    background: #f5f7f9;
    .newBlog {
        min-height: 43.75rem;
        .posts {
            .flex {
                color: #777;
                .oneArticle {
                    display: block;
                    margin-bottom: 1em;
                    overflow: hidden;
                    height: 9.5em;
                    background: rgba(255,255,255,0.9);
                    padding: .5em;
                    padding: 0 2rem 1.25rem;
                    &:hover {
                             background: rgba(197,197,197,0.4);;
                             cursor: pointer;
                         }
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
            }
        }
    }
    .contact {
        background: rgba(255,255,255,0.9);
        padding: 0 1rem;
        padding-bottom: 2rem;
        min-height: 30rem;
        .title {
            color: #777;
            margin-bottom: 3.75rem;
            p {
                padding-top: 2.8125rem;
                width: 13rem;
            }
        }
        .email {
            margin: 3.125rem auto 0;
            width: 40%;
            input {
                color: #777;
                font-size: 1.125rem;
                border: 0.125rem solid #777;
                width: 70%;
                height: 1.5625rem;
                margin-bottom: 1.25rem;
                display: block;
                background: transparent;
            }
            textarea {
                color: #777;
                font-size: 1.125rem;
                border: 0.125rem solid #777;
                width: 100%;
                height: 15rem;
                resize: none;
                background: transparent;
                padding-top: 0.5rem;
                font-family: Georgia, "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
            }
            .sendEmail {
                height: 3em;
                width: 10em;
                outline: none;
                display: block;
                margin: 3em auto;
                border: none;
                color:#fff;
                background: #8a8a8a;
            }
        }
    }
}
p.headline {
    padding-top: 4.375rem;
    margin: 0 auto 1.25rem;
    text-align: center;
    color: #777;
    font-size: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 0.3125rem double #333;
}
.grid-content {
    border-radius: 4px;
    background-color: #f5f7f9;
    padding-right:1em;
    width: 16em;
  }
.commentNumber, .articleTag {
    color: #777;
    font-size: 1.25rem;
    margin-right:10px;
    i {
        font-size: 1.25rem;
        margin-right: 0.3125rem;
    }
}
@media screen and (max-width: 440px) {
    .oneArticle {
        flex-grow: 1;
        margin-left: 10px !important;
        margin-right: 10px !important;
        padding:0 10px !important;
    }
    .newBlog{
        margin-top:20px;
    }
    p:nth-child(3) {
        margin-top: 0.875rem !important;
        margin-bottom: 0.875rem !important;
    }
    .contact{
        margin-left: 10px !important;
        margin-right: 10px !important;
    }
    .email {
        width: 100% !important;
        text-align:center;
    }
    .side{
        display:none;
    }
}
</style>
