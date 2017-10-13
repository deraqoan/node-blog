<template>
    <div id="contact">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="18" :lg="18" class="box">
        <div class="info">
            <img src="../../../static/me.jpg" alt="me"/>
            <div class="wraper">
                <p class="left">姓名:</p><p class="right">fengyan</p>
                <p class="left">邮箱:</p><p class="right">2314963088@qq.com</p>
                <p class="left">QQ:</p><p class="right">2314963088</p>
                <p class="left">学校:</p><p class="right">中科院大学</p>
                <p class="left">专业</p><p class="right">模式识别与智能系统</p>
                <p class="left">学历</p><p  class="right">在读研究生</p>
                <p class="left">技能</p><p  class="right">c,c++,vb,qt</p>
                <p class="left"></p><p  class="right">MATLAB,STM32,51单片机</p>
                <p class="left"></p><p  class="right">html,css,js,python</p>
                <p class="left">项目</p><p  class="right">一键式呼救设备</p>
                <p class="left"></p><p  class="right">基于ARM11的”智能电法工作站”</p>
                <p class="left"></p><p  class="right">智能近视预防器</p>
                <p class="left">专利</p><p  class="right">新型多功能智能摇篮车</p>
            </div>
        </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6"><div class="side grid-content bg-purple"><myasidebox></myasidebox></div></el-col>
        </el-row>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import myasidebox         from './component/asidebox'

export default {
    created () {
        this.set_headline({
            content: '关于我',
            animation: 'animated bounce'
        })
    },
    components: {
        myasidebox
    },
    methods: mapMutations(['set_headline'])
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#contact {
    color:#777;
    background: #f5f7f9;
    .title {
        p.headline {
            width: 13rem;
        }
    }
    .info {
        position: relative;
        width: 100%;
        margin: 6.875rem auto 0;
        padding-bottom: 2rem;
        border: 0.1875rem solid rgba(255,255,255,0.9);
        transition: all 2s;
        &:hover {
             background: #eee;
             transition: all 2s;
         }
        img {
            width: 9.375rem;
            height: 9.375rem;
            border: 0.1875rem solid #cccccc;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            margin-left: -4.6875rem;
            margin-top: -4.6875rem;
        }
        div.wraper {
            margin-top: 8.125rem;
            padding-left: 2rem;
            width: 70%;
            text-align: center;
            p {
                display: inline-block;
                font-size: 1.25rem;
                margin-bottom: 1.5625rem;
            }
            .left {
                width: 30%;
            }
            .right {
                width: 50%;
            }
        }
    }
}
.box{
    background: rgba(255,255,255,0.9);
}
p.headline {
    padding-top: 2.375rem;
    margin: 0 auto 1.25rem;
    text-align: center;
    color: #777;
    font-size: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 0.3125rem double #eee;
}
@media screen and (max-width: 440px) {
    .info {
        width: 100% !important;
    }
    .box{
        margin-top:20px;
    }
    .side{
        display:none;
    }
    .wraper {
        margin-left:50% !important;
        transform: translateX(-50%);
        padding-left: 1rem !important;
        p {
            display: block !important;
            margin-left:50% !important;
            transform: translateX(-50%);
            color:#555 !important;
            
        }
        p.left {
            width: 100% !important;
            color: #555 !important;
        }
        p.right {
            width: 100% !important;
        }
    }
}
</style>
