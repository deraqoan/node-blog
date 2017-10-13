<template>
<div>
    <table>
        <thead>
        <tr>
            <th>标题</th>
            <th>标签</th>
            <th>日期</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="article in articles">
            <router-link :to="{name: 'editor', query: {aid: article.aid}}" tag="td" class="title">{{article.title}}</router-link>
            <td>{{article.tags | toTag}}</td>
            <td>{{article.date | toDate}}</td>
            <td>
                <router-link :to="{name: 'editor', query: {aid: article.aid}}" class="iconfont icon-biji-copy" tag="i"></router-link>
                <i class="iconfont icon-shanchu" @click="deleteConfirm(article.aid)"></i>
            </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td @click="prePage">上一页</td>
            <td colspan="2">第 {{page}} 页</td>
            <td @click="nextPage">下一页</td>
        </tr>
        </tfoot>
    </table>
    </div>
</template>

<script>
import api from '@/api/api'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
    data () {
        return {
            page: 1
        }
    },
    props: ['articles'],
    computed: {
        ...mapState(['dialog'])
    },
    methods: {
        ...mapMutations(['set_dialog']),
        delArticle (id) {
            api.delArticle(id).then(response => {
                this.$emit('relesh')
            }).catch(err => {
                console.log(err)
            })
        },
        nextPage () {
            this.page++
            this.$emit('addPage')   // 传递给父组件
        },
        prePage () {
            if (!(this.page - 1)) {
                alert('已经到第一页咯')
            } else {
                this.page--
                this.$emit('dropPage') // 传递给父组件
            }
        },
        deleteConfirm (aid) {
            this.set_dialog({
                info: '确认删除(⊙o⊙)？',
                hasTwoBtn: true,
                show: true
            })
            new Promise((resolve, reject) => {
                this.dialog.resolveFn = resolve
                this.dialog.rejectFn = reject
            }).then(() => {
                this.delArticle(aid)
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
table {
    border: 1px dashed #eee;
    text-align: center;
    min-width: 70%;
    background-color: rgba(255,255,255,0.9);
    th, td {
        width: 20%;
        border: 1px solid #eee;
        padding: 0 20px;
    }
    thead tr{
    }
    thead, tfoot {
        color: #333;
        border: 1px solid #eee;
    }
    tbody {
        color: #777;
    }
    .title {
        cursor: pointer;
        &:hover {
            color: #fff;
            background: #777;
        }
    }
    tr {
        height: 2.5rem;
        line-height: 1.875rem;
        border: 1px solid #eee;
    }
    i {
        font-size: 1.25rem;
        margin-right: 0.625rem;
        color: #777;
        cursor: pointer;
        &:hover {
            color: #ffc520;
        }
    }
    tfoot tr td:nth-child(1), tfoot tr td:nth-child(3) {
        cursor: pointer;
        &:hover {
            color: #fff;
            background: #777;
        }
    }
}
@media screen and (max-width: 440px) {
    .title {
        width:20%;
        position:absolute;
        
    }
}
</style>
