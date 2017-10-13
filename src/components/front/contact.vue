<template>
    <div class="contact">
         <el-row  :gutter="10">
            <el-col :xs="24" :sm="24" :md="18" :lg="18" class="box">
        <div class="contactme">
        <div class="email animated fadeIn">
            <input type="text" placeholder=" 邮件主题" v-model="subject"/>
            <input type="text" placeholder=" 邮箱" v-model="address"/>
            <textarea placeholder=" 来唠唠嗑呗" spellcheck="false" v-model="content"></textarea>
            <button class="sendEmail" @click="send" :disabled="sendFlag">
                <span>{{sendFlag ? '发送中...' : '确认'}}</span>
            </button>
        </div>
        </div>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="6" :lg="6"><div class="grid-content bg-purple"><myasidebox></myasidebox></div></el-col>
        </el-row>
    </div>
</template>

<script>
import api from '@/api/api'
import myasidebox         from './component/asidebox'
import {mapMutations} from 'vuex'

export default {
    data () {
        return {
            subject: '',
            address: '',
            content: '',
            sendFlag: false
        }
    },
    components: {
        myasidebox
    },
    methods: {
        ...mapMutations(['set_dialog']),
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
.contactme {
    min-height: 30rem;
    background: rgba(255,255,255,0.9);
    padding: 1rem 2rem;
    .title {
        padding-top: 3.125rem;
        padding-bottom: 3.125rem;
        p {
            width: 13rem;
        }
    }
    
    .email {
        input {
            color: #777;
            font-size: 1.125rem;
            border: 0.125rem solid #777;
            width: 15em;
            margin: 0 auto;
            height: 1.5625rem;
            margin-bottom: 1.25rem;
            display: block;
            background: transparent;
        }
        textarea {
            color: #777;
            font-size: 1.125rem;
            margin: 0 auto;
            border: 0.125rem solid #777;
            width: 25em;
            height: 8em;
            resize: none;
            display: block;
            background: transparent;
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
.contact{
    background-color: #f5f7f9;
    .box{
        padding: 0rem 1em;
    }
}
p.headline {
    margin: 0 auto 0;
    text-align: center;
    color: #777;
    font-size: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 0.3125rem double rgb(129, 216, 208);
}
.grid-content {
    border-radius: 4px;
    background-color: #f5f7f9;
  }
@media screen and (max-width: 440px) {
    /*.title, .email {*/
        /*display: block !important;*/
    /*}*/
    .email {
        width: 100% !important;
    }
    .contactme{
        margin-top:20px;
        input{
            width:70% !important;
        }
        textarea{
            width:80% !important;
        }
    }
    .grid-content{
        margin-top:20px;
    }
}
</style>
