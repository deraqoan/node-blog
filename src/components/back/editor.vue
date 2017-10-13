<template>
<div class="container">
    <div class="wrapper">
        <div class="draft">提示：{{text}}</div>
        <div class="title">
            <input type="text" placeholder="文章标题" onfocus="this.placeholder=''" onblur="this.placeholder='文章标题'" v-model="title"/>
        </div>
        <div class="caption">
         <input type="text" placeholder="篇章名" v-model="caption"/>
         </div>
        <div id="tags">
            <tag-input
                    v-for="(item, index) in tags"
                    :tags="tags"
                    :index="index"
                    :key="index"
            ></tag-input>
        </div>
        <div class="info">
            <div class="right">
                <p @click="isMarked = true" :class="{active: isMarked}">原文</p>
                <p @click="isMarked = false" :class="{active: !isMarked}">预览</p>
            </div>
            <textarea
                    id="editor" spellcheck="false"
                    v-if="isMarked" v-model="mdContent"
                    @keydown.once.ctrl.13="saveDraft($route.query.aid)"
                    v-focus
            ></textarea>
            <div class="preview animated fadeIn" v-if="!isMarked" v-html="mdHtml" tabIndex="1" v-focus></div>
        </div>
        
        <div class="publish">
        <li  @click="saveoneArticle($route.query.aid)"><span>发布文章</span></li>
        <li  @click="saveDraft($route.query.aid)"><span>存为草稿</span></li>
        <li @click="insertletter('# ', '1')">标题</li>
        <li @click="insertletter('***', '2')">分割线</li>
        <li @click="insertletter('    ', 3)">文本块</li>
        <li @click="insertletter('* ', 4)">列表 </li>
        <li @click="insertletter('>', 5)">引用</li>
        <li @click="insertletter('![图片名](图片链接)', 6)">图片</li>
        <li @click="insertletter('[链接名](链接URL)', 7)">链接</li>
        <li @click="insertletter('| 示例文字        | 示例文字           | 示例文字  |', 8)">表头</li>
        <li @click="insertletter('| ---------- | -----------| -----------|', 9)">表头分割线</li>
        <li @click="insertletter('| 示例文字      | 示例文字 | 示例文字 |', 10)">一行列表</li>
        <li @click="insertletter('```示例代码```', 11)">代码框</li>
        </div>
    </div>
    </div>
</template>

<script>
import api from '@/api/api'
import marked                                   from 'marked'
import hljs                                     from 'highlight.js'
import {mapMutations, mapState}     from 'vuex'
import TagInput                                 from './component/TagInput'

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
            isMarked: true,
            firstUpdate: true,
            isChange: false,
            mdHtml: '',
            text: '',
            textalert: ['语法：符号不能连用，一符一行', '# 一级标题,## 二级标题以此论推', '三个***', '四个空格', '*加空格代表一行列表', '>后直接输入文字且文字后空一行', '示例![icon](http://baidu.com/1.jpg)', '示例[baidu](http://baidu.com)', '表头要和表分割表身一起用，要分段', '表头和表身的分割线要enter分段', '一行表格，要几行点几行要enter分段', '符号文字要分段，即符号<br>文字<br>符号']
        }
    },
    directives: {
        focus: {
            inserted: (el) => {
                el.focus()
            }
        }
    },
    created () {
        const aid = this.$route.query.aid
        this.isSaving_toggle(false)
        if (aid) {
            return this.getArticle(aid)
        }
        this.set_article({
            content: '',
            title: '',
            caption: '',
            tags: ['']
        })
    },
    mounted () {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 40 && e.ctrlKey) {                //  ctrl + ↓ 切换
                this.isMarked = !this.isMarked
            }
        })
    },
    updated () {
    // 因为切换预览模式，也会触发数据更新，所以不用beforeUpdate, 而用watch监听数据变化
        if (this.firstUpdate) {
            this.isChange = false
        }
        this.firstUpdate = false
    },
    computed: {
        ...mapState(['article', 'isSaving', 'dialog']),
        mdContent: {
            get () {
                this.mdHtml = marked(this.article.content || '', { renderer: renderer })
                return this.article.content
            },
            set (value) { this.update_post_content(value) }
        },
        title: {
            get () { return this.article.title || '' },
            set (value) { this.update_post_title(value) }
        },
        tags () {
            return this.article.tags
        },
        caption: {
            get () { return this.article.caption || '' },
            set (value) { this.update_post_caption(value) }
        }
    },
    methods: {
        ...mapMutations(['set_article', 'update_post_content', 'update_post_title', 'update_post_tags', 'update_post_caption', 'isSaving_toggle', 'set_dialog']),
        insertletter (item, i) {
            this.mdContent += item
            this.text = this.textalert[i]
        },
        getArticle (id) {
            api.getArticle(id).then(response => {
              this.article = response.data
            }).catch(err => {
              console.log(err)
            })
        },
        saveoneArticle () {
            const aid = this.$route.query.aid
            if (aid) {
                console.log(this.article)
                api.refleshArticle(aid, this.article).then(response => {
                  this.isSaving_toggle(true)
                  this.$router.push({name: 'posts'})
                }).catch(err => {
                  console.log(err)
                  alert('保存失败')
                })
            } else {
                console.log( this.article)
                api.saveArticle(this.article).then(response => {
                  this.isSaving_toggle(true)
                  this.$router.push({name: 'posts'})
                }).catch(err => {
                  console.log(err)
                  alert('保存失败')
                })
            }
        },
        saveDraft () {
            const aid = this.$route.query.aid
            if (aid) {
                console.log(this.article)
                api.refleshDraft(aid, this.article).then(response => {
                  this.isSaving_toggle(true)
                  this.$router.push({name: 'drafts'})
                }).catch(err => {
                  console.log(err)
                  alert('保存失败')
                })
            } else {
                console.log(this.article)
                api.saveDraft(this.article).then(response => {
                  this.isSaving_toggle(true)
                  this.$router.push({name: 'drafts'})
                }).catch(err => {
                  console.log(err)
                  alert('保存失败')
                })
            }
        }


    },
    components: {
        TagInput
    },
    watch: {
        title () {
            this.isChange = true
            console.log('1')
        },
        tags () {
            this.isChange = true
        },
        caption () {
            this.isChange = true
        },
        mdContent () {
            this.isChange = true
            setTimeout(() => {                                  // 按下tab键后重新获得焦点
                document.getElementById('editor').focus()
            }, 0)
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.isChange && !this.isSaving) {
            this.set_dialog({
                info: '还没保存，确认离开(⊙o⊙)？',
                hasTwoBtn: true,
                show: true
            })
            new Promise((resolve, reject) => {
                this.dialog.resolveFn = resolve
                this.dialog.rejectFn = reject
            }).then(
                () => { next() },
                () => { next(false) }
            ).catch((err) => {
                console.log(err)
            })
        } else {
            next()
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    position: relative;
    padding: 0 3.125rem 0;
    background-color: rgba(255,255,255,0.9);
    input {
        border: none;
        border-bottom: 0.125rem solid #777;
        outline: none;
        background: transparent;
        color: #777;
        margin-bottom: 0.625rem;
        text-align: center;
    }
    .title input {
        width: 100%;
        height: 3.125rem;
        font-size: 1.875rem;
    }
    .caption input{
        height: 2.125rem;
        font-size: 1.875rem;
    }
    .draft {
        height: 2em;
        font-size: 16px;
        line-height: 2em;
        background: rgba(255,255,255,0.9);
        color:#777;
        text-align: center;
    }
    #tags {
        input {
            width: 6.25rem;
            height: 1.875rem;
            font-size: 1rem;
            margin-right: 0.125rem;
        }
    }
    .info {
        border: 0.125rem solid #777;
        position: relative;
        height: 29.375rem;
        .right {
            color: #333;
            position: absolute;
            right: -0.125rem;
            top: -2rem;
            border-top: 0.125rem solid #777;
            border-right: 0.125rem solid #777;
            border-left: 0.125rem solid #777;
            p {
                float: left;
                width: 5rem;
                height: 1.875rem;
                line-height: 1.875rem;
                text-align: center;
                cursor: pointer;
            }
            p:nth-child(1) {
                border-right: 0.125rem solid #777;
            }
        }
        #editor {
            width: 100%;
            height: 29.375rem;
            border: none;
            padding: 0 1em;
            background: transparent;
            resize: none;
            outline: none;
            font-size: 20px;
            line-height: 2em;
            overflow-y: auto;
            white-space: pre-wrap;
            font-family: Georgia, "Times New Roman", "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
            color: #777;
        }
        .preview {
            font-family: Georgia, "Times New Roman", "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
            display: block;
            height: 26.875rem;
            color: #777;
            font-size: 1rem;
            overflow-y: auto;
            padding: 1.25rem 1.25rem;
            white-space: pre-wrap;
            word-wrap: break-word;
            outline: none;
            border: none;
        }
    }
}
.publish {
    width: 13em;
    position: fixed;
    left: 1rem;
    bottom:2.5rem;
    background-color: #f5f7f9;
    li {
        height: 2em;
        width: 5em;
        float: left;
        margin-bottom: 10px;
        margin-right: 10px;
        outline: none;
        display: block;
        text-align: center;
        line-height: 2em;
        border-radius: 3px;
        border:1px solid #777;
        padding: 0 3px;
        color:#777;
        background: rgba(255,255,255,0.9);
    }
}
.container{
    background-color: #f5f7f9;
}
.active {
    background: #eee;
    color: #111111;
}
@media screen and (max-width: 440px) {
    .wrapper {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
        margin-bottom: 5rem;
        margin-top:20px;
    }
    .publish {
        position: absolute !important;
        bottom: -20rem !important;
        left: 1rem !important;
    }
    #tags {
        width: 13.7rem !important;
    }
    .icon-zengjia {
        margin-left: -1rem !important;
    }
}
</style>
