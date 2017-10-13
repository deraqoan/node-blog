<template>
    <div id="nav">
        <el-menu class="menu" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1" @click ="$router.push({path: '/home'})">
                <i class="el-icon-menu"></i>HOME
            </el-menu-item>
            <el-menu-item index="2" @click ="$router.push({path: '/articles'})">
                <i class="el-icon-document"></i>博客
            </el-menu-item>
            <el-menu-item index="3" @click ="$router.push({path: '/about'})">
                <i class="el-icon-information"></i>
                    About
               </el-menu-item>
            <el-menu-item index="4" @click ="$router.push({path: '/project'})"><i class="el-icon-setting"></i>奇思妙想
            </el-menu-item>
            <el-menu-item index="5"  @click ="$router.push({path: '/contact'})">
                <i class="el-icon-message"></i>联系我
                </el-menu-item>
            <el-menu-item index="6"   @click ="$router.push({name: 'login'})"><i class="el-icon-setting"></i>管理</el-menu-item>
    </el-menu>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data () {
        return {
            text: ''
        }
    },
    computed: mapState(['headline']),
    methods: {
        ...mapActions(['searchArticles']),
        search () {
            this.$router.push({name: 'SearchResult', params: {text: this.text}, hash: '#search'})
        },
        handleOpen (key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose (key, keyPath) {
            console.log(key, keyPath)
        }
    },
    watch: {
        $route () {
            this.text = ''
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#nav {
    position: relative;
    .menu{
        display: inline-block;
        background-color: rgba(255,255,255,0.6) !important;
        font-weight: 700;
        color: #777;
        font-family: DINRegular, CenturyGothic;      
    }
}
@media screen and (max-width: 980px) {
    nav {
        width: 60% !important;
    }
}
@media screen and (max-width: 440px) {
    .container, .bgImage {
        height: 18rem !important;
    }
    #title {
        font-size: 2rem !important;
    }
    nav {
        width: 100% !important;
        ul {
            width: 100% !important;
            padding-left: 0 !important;
            li {
                font-size: 0.9rem !important;
                margin-right: 0 !important;
            }
        }
    }
    .search {
        z-index: 2;
        position: absolute !important;
        top: 3.2rem;
        left: 50%;
        margin-left: -8.125rem !important;
    }
}
</style>
