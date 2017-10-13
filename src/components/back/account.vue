<template>
    <div class="account">
         <el-row class="box">
            <el-col :span="24">
        <h2 class="title">reset</h2>
        <div>
            <input type="text" placeholder="请输入新的用户名" v-model="name" />
            <i class="iconfont icon-zhanghu"></i>
        </div>
        <div>
            <input type="password" placeholder="请输入你的密码" v-model="password"/>
            <i class="iconfont icon-yuechi"></i>
        </div>
        <div>
            <input type="password" placeholder="请再次输入你的密码" v-model="repassword"/>
            <i class="iconfont icon-yuechi"></i>
        </div>
        <transition name="fade" enter-active-class="animated zoomInLeft"><p v-if="show">{{msg}}</p></transition>
        <button @click="reset"><span>确认修改</span></button>
         </el-col>
        </el-row>
    </div>
</template>

<script>
import api from '@/api/api'
import {_debounce}                  from '../../lib/utils.js'
import {mapMutations, mapState}       from 'vuex'
export default {
    data () {
        return {
            msg: 'haha',
            name: '',
            password: '',
            repassword: '',
            show: false
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        ...mapMutations(['unset_user']),
        checkName () {
            if (this.name.length > 5) {
                this.msg = '请输入合适长度的用户名'
            }
        },
        reset () {
            if (this.repassword === this.password) {
                api.resetUser({id: this.user.id, name: this.name, password: this.password}).then(response => {
                    this.unset_user()
                    this.$router.push({ name: 'login' })
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    },
    watch: {
        name: _debounce(function () {
            if (this.name.length > 5) {
                this.msg = '请输入合适长度的用户名'
                this.show = true
            } else {
                this.msg = ''
                this.show = false
            }
        }, 500),
        password: _debounce(function () {
            if (this.password.length < 6) {
                this.msg = '请输入长度大于6位的密码'
                this.show = true
            } else {
                this.msg = ''
                this.show = false
            }
        }, 500),
        repassword: _debounce(function () {
            if (this.repassword !== this.password) {
                this.msg = '请输入相同的密码'
                this.show = true
            } else {
                this.msg = ''
                this.show = false
            }
        }, 500)
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .account {
        position: relative;
        background-color: #f5f7f9;
        height: 25rem;
        padding: 2em 0;
        color:#777;
        .title {
            font-size: 3.75rem;
            color: #777;
            text-align: center;
            font-family: DINRegular, CenturyGothic;
        }
        div {
            width: 18.75em;
            margin: 0 auto;
            position: relative;
            i {
                font-size: 1.875rem;
                display: block;
                position: absolute;
                top: 0;
                left: 1.25rem;
                transition:  0.5s;
            }
        }
        input {
            width: 12.5rem;
            height: 1.875rem;
            display: block;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            margin-left: 4.375rem;
            outline: none;
            border: none;
            border-bottom: 0.1875rem solid #777;
            background: transparent;
            font-size: 1rem;
            padding-left: 0.625rem;
            &:focus + i {
                 color: darkturquoise;
             }
        }
        button {
            height: 3em;
            width: 10em;
            outline: none;
            display: block;
            margin: 3em auto;
            border: none;
            color:#fff;
            background: #8a8a8a;
            margin-top: 1.25rem;
            text-align: center;
        }
    }
    p{
        text-align: center;
        height: 1rem;
    }
    .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    .box{
    background-color: rgba(255,255,255,0.9);
    padding-bottom: 2em;
    }
</style>
