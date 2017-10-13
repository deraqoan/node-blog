<template>
    <div class="wrapper">
        <el-row>
          <el-col :span="24">
        <div class="statusLine">
            <p class="left">
                <router-link :to="{name: 'home'}" class="iconfont icon-zhuye" tag="i"></router-link>
                <span>{{time}}好，{{name}}</span>
            </p>
            <p class="right"  @click="logout">
                <i class="iconfont icon-out"></i>
                <span>登出</span>
            </p>
        </div>
        </el-col>
        </el-row>
        <el-row  :gutter="10">
            <el-col :xs="24" :sm="24" :md="4" :lg="4" class="content">
           <nav>
            <ul>
                <router-link :to="{name: 'posts'}" tag="li"><i class="iconfont icon-biji-copy"></i>文章</router-link>
                <router-link :to="{name: 'search'}" tag="li"><i class="iconfont icon-search"></i>搜索</router-link>
                <router-link :to="{name: 'drafts'}" tag="li"><i class="iconfont icon-draft"></i>草稿</router-link>
                <router-link :to="{name: 'account'}" tag="li"><i class="iconfont icon-zhanghu"></i>账户</router-link>
                <router-link :to="{name: 'editor'}" tag="li" ><i class="iconfont icon-biji-copy"></i>添加文章</router-link>
                <router-link :to="{name: 'uload'}" tag="li" ><i class="iconfont icon-biji-copy"></i>上传图片</router-link>
            </ul>
            </nav>
          </el-col>
          <el-col :xs="24" :sm="24" :md="16" :lg="16">
              <div class="grid-content bg-purple">
                  <router-view class="content"></router-view>
              </div></el-col>
            <el-col :xs="24" :sm="24" :md="4" :lg="4">
        <div class="grid-content bg-purple">
            <myasidebox></myasidebox></div>
            </el-col>
        </el-row>
        </el-row>
    </div>
</template>

<script>
import {mapMutations, mapState}       from 'vuex'
import myasidebox         from '../front/component/asidebox'

export default {
    computed: {
        ...mapState(['user']),
        time () {
            const hours = new Date().getHours()
            if (hours > 5 && hours < 12) {
                return '早上'
            } else if (hours > 12 && hours < 19) {
                return '下午'
            } else if (hours === 12) {
                return '中午'
            } else {
                return '晚上'
            }
        },
        name () {
            return localStorage.userName
        }
    },
    methods: {
        ...mapMutations(['unset_user']),
        logout () {
            this.unset_user()
            this.$router.go({name: 'login'})
        }
    },
    components: {
        myasidebox
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/icon.scss';
.wrapper {
    .statusLine {
        background: transparent;
        width: 100%;
        height: 3.125rem;
        line-height: 3.125rem;
        color: #777;
        background-color: rgba(255,255,255,0.9);
        font-size: 1.125rem;
        display: flex;
        justify-content: space-between;
        p.left {
            margin-left: 1.25rem;
            i.icon-zhuye {
                font-size: 1.875rem;
                color: rgb(129, 216, 208);
                cursor: pointer;
                &:hover {
                     color: darkturquoise;
                 }
            }
        }
        p.right {
            cursor: pointer;
            margin-right: 1.25rem;
            color: rgb(129, 216, 208);
            i.icon-out {
                font-size: 1.25rem;
            }
            &:hover {
                 color: rgb(129, 216, 208);
             }
        }
    }
    nav {
        color: #777;
        height:15rem;
        background-color: rgba(255,255,255,0.9);
        ul {
            padding-left: 0;
            list-style: none;
            li {
                width: 6.25rem;
                height: 2.5rem;
                line-height: 2.5rem;
                text-align: center;
                cursor: pointer;
                transition: 1s;
                &:hover {
                     transition: 1s;
                     padding-left: 1.25rem;
                     color: darkturquoise;
                 }
                i {
                    font-size: 1.125rem;
                    margin-right: 0.625rem;
                }
            }
            li.router-link-active {
                background: rgba(204, 204, 204, 0.5);
            }
        }
    }
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background-color: #f5f7f9;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
@media screen and (max-width: 440px) {
    .content {
        margin-left: 0 !important;
    }
    nav {
        
        
    }
}
</style>
