<template>
    <div id="nav">
        <div class="flexDiv">
            <nav>
                <ul class="catalog">
                    <img src='../../../../static/auto.png' class="logo" alt="logo"/>
                    <span class="logotext">FENGYAN</span>
                </ul>
            </nav>
            <div class="search">
                <input
                        type="text"
                        placeholder="搜索一下"
                        v-model="text"
                        v-on:input ="inputFunc"
                        @keydown.enter="search"
                />
                <i class="iconfont icon-search" @click="search"></i>
            </div>
        </div>
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
        inputFunc () {
            this.$router.push({path: '/'})
        },
        handleOpen (key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose (key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#nav {
    position: relative;
    .flexDiv {
        display: flex;
        background: #fff;
        justify-content: space-between;
        flex-wrap: wrap-reverse;
        width: 100%;
        .search {
            margin-top: 0.55rem;
            margin-right: 0.625rem;
            position: relative;
            width: calc(45%-0.625rem);
            input {
                color: #777;
                outline: none;
                background: transparent;
                width: 15.625rem;
                height: 1.875rem;
                line-height: 1.875rem;
                border-radius: 1.25rem;
                font-size: 1.125rem;
                padding-left: 0.625rem;
                border: 0.125rem solid #cccccc;
            }
            .icon-search {
                cursor: pointer;
                font-size: 1.875rem;
                color: #777;
                position: absolute;
                right: 0.5rem;
                top: 0.2rem;
            }
        }
        nav {
            width: 50%;
            height: 3.125rem;
            ul {
                background-color: #fff !important;
                color: #0088f5;
                position: fixed;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                width: 100%;
                height: 3.125rem;
                padding:auto .5em;
                .logo{
                    width: 4em;
                    border: none;
                }
                .logotext{
                    font-size: 2em;
                    line-height: 3.125rem;
                    width: 6em;
                }
                .navbar-slogan{
                    font-family: DINRegular, CenturyGothic;
                }
            }
        }
    }
    .menu{
        background: #fff !important;
        width: 10em;
        position: fixed;
        top: 5.5em;
        display: inline-block;
        width: 11.5em;
        background: #fff;
        font-weight: 700;
        color: #777;
        font-family: DINRegular, CenturyGothic;      
    }
    .container {
        overflow: hidden;
        width: 100%;
        height: 37.5rem;
    }
    .bgImage {
        display: block;
        width: 100%;
        height: 37.5rem;
        transform: perspective(62.5rem) translateZ(0);
        transition:  8s;
        &:hover {
             transform: perspective(62.5rem) translateZ(6.25rem);
             transition:  8s;
         }
    }
    #title {
        font-family: Georgia, "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
        color: #777;
        text-align: center;
        font-size: 3.125rem;
        width: 31.25rem;
        height: 3.125rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -0.625rem;
        margin-left: -15.625rem;
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
    #nav{
        margin-bottom:30px;
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
