Vue.component('vue-header',{
    template:'<header class="site-header">'+
            '<div class="bestmenu row">'+
                `<router-link class="col-auto logo" :to="'/'" title="回影片列表">
                    <img src="img/logo.svg" style="width: 100%;">
                </router-link>`+
                '<div class="col">'+
                    `<div class="site-search">
                        <el-input class="input-with-select" v-model="chil_searchinput" placeholder="搜尋">
                            <el-button slot="append" icon="el-icon-search" @click="chil_click"></el-button>
                        </el-input>
                    </div>`+
                '</div>'+
                '<div class="col-right col-auto">'+
                    '<div class="admin">'+
                        '<button class="btn searchbtn" type="button" @click="mosearch=!mosearch"><i class="el-icon-search"></i></button>'+
                        `<router-link class="btn lovebtn" :to="'playlist'" title="我的最愛"><i class="el-icon-star-on"></i></router-link>`+
                        `<router-link class="btn userbtn" :to="'/'" style="pointer-events: none;"><i class="el-icon-user-solid"></i></router-link>`+
                    '</div>'+
                '</div>'+
            '</div>'+
            `<transition name="fixed-bottom" mode="out-in" appear>
                <div class="search-box" v-show="mosearch">
                    <div class="search-box-in">
                        <el-input class="input-with-select" v-model="chil_searchinput" placeholder="搜尋">
                            <el-button slot="append" icon="el-icon-search" @click="chil_click"></el-button>
                        </el-input>
                    </div>
                </div>
            </transition>`+
        '</header>',
    props: {
    },
    data: function() {
        return {
            marqueeShow:false,
            chil_searchinput:"",
            mosearch:false,
        }
    },
    methods: {
        chil_click(){
            const vm=this;
            vm.$emit('chilByValue',vm.chil_searchinput)
        }
    },
    watch: {
    },
    mounted:function(){
    }
})