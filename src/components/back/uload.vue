<template>
    <div class="account">
        <el-row class="box">
            <el-col :span="24">
       <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,点击图片获取URL用于文章</div>
        </el-upload>
        <div class="tags animated fadeIn">
            <p class="title">
               <i class="iconfont icon-list"></i>
               <span>url列表</span>
             </p>
            <ul class="captionFlex">
                <li v-for="item in filelist">
                    <i class="index"></i>
                    <span>{{item.url}}</span>
                </li>
            </ul>
        </div>
        </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapState, mapMutations}     from 'vuex'

export default {
    data () {
        return {
            fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            flie: []
        }
    },
    computed: {
        ...mapState(['filelist'])
    },
    methods: {
        ...mapMutations(['set_uploads']),
        handleRemove (file, fileList) {
            console.log(file, fileList)
        },
        handlePreview (file) {
            console.log(file)
            this.fileList2.push({
                name: file.name,
                url: file.url
            })
            this.set_uploads(this.fileList2)
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .account {
        position: relative;
        padding: 2em;
        margin:20px;
        background-color: rgba(255,255,255,0.9);
        color:#777;
        .tags{
            margin: 20px;
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
           .captionFlex{
                list-style: none;
                padding: .5em 0;
                margin-bottom: 0;
                overflow: hidden;
                li{
                    display: block;
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
        }
    }
    .box{
    background-color: rgba(255,255,255,0.9);
    padding: 2em 0;
    }
</style>
