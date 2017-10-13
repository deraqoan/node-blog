<template>
    <div id="wrapper">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <my-header></my-header>
                </div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="4" :lg="4">
              <div class="grid-content bg-purple">
                  <mynav class="nav"></mynav>
              </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="20" :lg="20">
              <div class="grid-content bg-purple">
                  <router-view class="content"></router-view>
              </div></el-col>
        </el-row>
        
    </div>
</template>

<script>
import MyHeader         from './component/MyHeader'
import mynav              from './component/Nav'
import MyFooter         from './component/MyFooter'
import spinner          from '../share/spinner'
import {mapState}       from 'vuex'

export default {
    data () {
        return {
            show: false
        }
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    computed: {
        ...mapState(['isLoading'])
    },
    methods: {
        handleScroll () {
            this.show = window.scrollY > 400
        }
    },
    components: {
        MyHeader,
        MyFooter,
        spinner,
        mynav
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/icon.scss';
#wrapper {
    margin: 0 auto;
    width:1200px;
}
h1 {
    color: white;
    text-align: center;
}
.icon-huojian {
    font-size: 2.5rem;
    color: #C0CCDA;
    position: fixed;
    bottom: 1.25rem;
    right: 2.5rem;
    cursor: pointer;
    transition:  1s;
    &:hover {
         bottom: 1.875rem;
         color: #00ff7f;
         transition:  1s;
     }
}
.totop {
    bottom: 31.25rem;
    transition: 1s;
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
    background: #fff;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
@media screen and (max-width: 440px) {
    .icon-huojian {
        right: 0.5rem;
    }
    #wrapper {
    margin: 0 auto;
    width:100%;
    }
}
</style>
