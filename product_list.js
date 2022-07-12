const video_list_html=`<div class="site-page">
    <link rel="stylesheet" href="css/video.css">
    <div class="main-header">
        <vue-header @chilByValue="parentByValue"></vue-header>
        <div class="fastsearch">
            <div class="container">
                <ul class="list-inline">
                    <li>
                        <button class="btn" type="button">全部</button>
                    </li>
                    <li v-for="(item, i) in fastsearch">
                        <button class="btn" type="button">{{item.name}}</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="main-in">
        <div class="not_msg" v-show="list.length==0">
            <div class="title"><i class="el-icon-warning-outline"></i>沒有資料，請重新搜尋</div>
        </div>

        <div class="list-img" v-show="list.length>0">
            <ul class="list-con">
                <li v-for="(item, i) in list" :key="item.id">
                    <div class="item-in">
                        <div class="pic">
                            <a :href="item.link" target="_blank" :title="item.catename">
                                <span class="icon-box">15:30</span>
                                <img :src="item.img">
                            </a>
                        </div>
                        <div class="row">
                            <div class="col-auto mr-10">
                                <a class="authorimg" :href="item.authorlink" target="_blank" :title="item.authorname">
                                    <img :src="item.authorimg" :title="item.authorname">
                                </a>
                            </div>
                            <div class="col">
                                <div class="title"><a :href="item.link" target="_blank" :title="item.catename">{{item.catename}}</a></div>
                                <div class="row otherdata">
                                    <div class="col">
                                        <div><a :href="item.authorlink" target="_blank" :title="item.authorname">{{item.authorname}}</a></div>
                                        <div><a :href="item.link" target="_blank">觀看次數：<span class="see">{{item.see}}</span>{{item.time}}</a></div>
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" title="加入我的最愛" :class="{'active':item.like}" class="lovebtn" @click="play_cookie(item.id,i)">
                                            <i class="ii el-icon-star-off" v-show="!item.like"></i>
                                            <i class="ii el-icon-star-on" v-show="item.like"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>`;
const video_list={
        template:video_list_html,
        props: {},
        data: function() {
            return{
                loading: true,
                list:[],
                fastsearch:[],
                play_arr:[],
                search_input:"",
            }
        },
        computed: {},
      	methods: {
            get_data(search){
                const vm=this;
                const listapi = [
                    {id:'01',like:false,seq:"00001",authorimg:'img/author_img_01.jpg',authorname:'欸你這週要幹嘛',     authorlink:'https://www.youtube.com/channel/UCFycVZXj9fRWB_OZfFKe2PA',time:'20小時前',see:'6.9萬次',  img: "img/video_img_01.jpg",catename: "【大姐產後全紀錄】與姊夫在醫院的戰爭！黑糖回家啦！",link: "https://www.youtube.com/watch?v=g87f0NaH7w8"},
                    {id:'02',like:false,seq:"00002",authorimg:'img/author_img_02.jpg',authorname:'上班可以聽 LWW',     authorlink:'https://www.youtube.com/c/MARCORANGE',time:'3天前',see:'6.9萬次',     img: "img/video_img_02.jpg",catename: "@吉支昏時間 X 馬克信箱 22w28-1 | 我要預測幾件事：",link: "https://www.youtube.com/watch?v=8-9nnrDjtpw&t=10s"},
                    {id:'03',like:false,seq:"00003",authorimg:'img/author_img_03.jpg',authorname:'志祺七七 X 圖文不符',authorlink:'https://www.youtube.com/c/shasha77',time:'3週前',see:'6.9萬次',     img: "img/video_img_03.jpg",catename: "好不容易放假了，為什麼卻反而更焦慮？只想耍廢，錯了嗎？《 七七心理學 》EP 037｜志祺七七",link: "https://www.youtube.com/watch?v=D9Lct3eVzP8"},
                    {id:'04',like:false,seq:"00004",authorimg:'img/author_img_04.jpg',authorname:'末羊子 dontkjoanne', authorlink:'https://www.youtube.com/c/%E6%9C%AB%E7%BE%8A%E5%AD%90dontkjoanne',time:'2年前',see:'6.9萬次',     img: "img/video_img_04.jpg",catename: "跟我一起優化家裡的各個角落！幾個調整讓家裡更整齊、好找東西！ft. 光泉超有料系列優酪",link: "https://www.youtube.com/watch?v=aFiCylKu_eM"},
                    {id:'05',like:false,seq:"00005",authorimg:'img/author_img_05.jpg',authorname:'脑弟说电影',         authorlink:'https://www.youtube.com/c/%E8%84%91%E5%BC%9F%E8%AF%B4%E7%94%B5%E5%BD%B1',time:'4週前',see:'6.9萬次',     img: "img/video_img_05.jpg",catename: "【脑弟】李准基变身吸血鬼恋人！爱上人类假小子！一口气看完奇幻剧《吸血鬼书生》全集！",link: "https://www.youtube.com/watch?v=v10bNRwG5ec"},
                    {id:'06',like:false,seq:"00006",authorimg:'img/author_img_06.jpg',authorname:'八婆 BESTIES',       authorlink:'https://www.youtube.com/c/%E5%85%AB%E5%A9%86BESTIES',time:'1天前',see:'6.9萬次',     img: "img/video_img_06.jpg",catename: "【開箱】全家酷繽沙、7-11 哈根達斯冰沙！一杯149 vs 一杯60！值得買嗎？",link: "https://www.youtube.com/watch?v=WWCuaxOpZcQ"},
                    {id:'07',like:false,seq:"00007",authorimg:'img/author_img_07.jpg',authorname:'小姐不熙娣',         authorlink:'https://www.youtube.com/c/%E5%B0%8F%E5%A7%90%E4%B8%8D%E7%86%99%E5%A8%A3DeeGirlsTalk',time:'1個月前',see:'6.9萬次',   img: "img/video_img_07.jpg",catename: "錄不下去了！趙正平嗆許雅鈞把小Ｓ閨蜜當「酒店妹」？鍾明軒昔日往事蔡康永躺著也中槍？【#小姐不熙娣】20220623 完整版  EP76 趙正平 加賀美智久、鍾明軒@小S徐熙娣 elephant DEE",link: "https://www.youtube.com/watch?v=7jy_aCSo6eo"},
                    {id:'08',like:false,seq:"00008",authorimg:'img/author_img_08.jpg',authorname:'Dr. Ivan 6',         authorlink:'https://www.youtube.com/c/DrIvan6',time:'2天前',see:'6.9萬次',     img: "img/video_img_08.jpg",catename: "汗皰疹如何治療與預防? 能根治嗎? 皮膚科醫師建議改善方法。",link: "https://www.youtube.com/watch?v=kNjP_UC6m8Q"},
                    {id:'09',like:false,seq:"00009",authorimg:'img/author_img_09.jpg',authorname:'好味小姐腦波弱',     authorlink:'https://www.youtube.com/c/%E5%A5%BD%E5%91%B3%E5%B0%8F%E5%A7%90%E8%85%A6%E6%B3%A2%E5%BC%B1',time:'2天前',see:'6.9萬次',     img: "img/video_img_09.jpg",catename: "知道我懷孕時的反應！？竟然踢我！【腦波弱日常】EP3",link: "https://www.youtube.com/watch?v=i39yuHsj8W0"},
                    {id:'10',like:false,seq:"00010",authorimg:'img/author_img_10.jpg',authorname:'劉芒',               authorlink:'https://www.youtube.com/c/%E5%8A%89%E8%8A%92lioumonn',time:'2天前',see:'6.9萬次',     img: "img/video_img_10.jpg",catename: "走到哪都是團寵！快背這10條最強精神勝利法公式｜劉芒",link: "https://www.youtube.com/watch?v=Dx4dQMCXeUQ"},
                    {id:'11',like:false,seq:"00011",authorimg:'img/author_img_11.jpg',authorname:'安啾咪',             authorlink:'https://www.youtube.com/c/anjouclever103',time:'2天前',see:'6.9萬次',     img: "img/video_img_11.jpg",catename: "生啤酒放題的日系書店！情不自禁差點喝太多...！ | 安啾 (ゝ∀･) ♡",link: "https://www.youtube.com/watch?v=tc2J4OEK86Q"},
                    {id:'12',like:false,seq:"00012",authorimg:'img/author_img_12.jpg',authorname:'好味營養師品瑄',     authorlink:'https://www.youtube.com/channel/UCLwFOT4tHGaK9kqXXExhPFQ',time:'2天前',see:'6.9萬次',     img: "img/video_img_12.jpg",catename: "【營養師出去吃EP72】再這樣吃冰絕對胖！！營養師教你吃剉冰～",link: "https://www.youtube.com/watch?v=0J1WfFberhc"},
                ]
                vm.fastsearch = [
                    {name:'直播中'},
                    {name:'遊戲'},
                    {name:'美妝'},
                    {name:'音樂'},
                    {name:'烹飪節目'},
                    {name:'觀光'},
                    {name:'房地產'},
                    {name:'寵物'},
                    {name:'視覺藝術'},
                    {name:'動作冒險遊戲'},
                    {name:'最新上傳'},
                ]
                
                if(document.cookie!=''){
                    let cookie_arr = this.check_play_cookie('play').split(',');
                    this.play_arr = cookie_arr;
                }

                if(search){
                    let new_arry=[];
                    listapi.forEach((item)=>{
                        if(item.catename.includes(vm.search_input)){
                            new_arry.push(item);
                        }
                    })
                    vm.list = new_arry;
                }else{
                    vm.list = listapi;
                }
            },
            parentByValue(val){//獲取搜尋子組件
                const vm=this;
                vm.search_input = val;
                vm.get_data(true)
            },
            check_play_cookie(name){
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            },
            play_cookie(id,index){
                const vm=this;
                //點後當下的變化
                vm.list[index].like=!vm.list[index].like;
                
                 
                //存入cookie
                let result2 = vm.play_arr.some(x => x === id);
                if(result2){
                    for(let i=0; i<vm.play_arr.length; i++){
                        if(vm.play_arr[i]==id){
                            vm.play_arr.splice(i, 1);
                        }
                    }
                    vm.$notify({
                        type: 'success',
                        message: '已移除我的最愛',
                        position: 'bottom-right',
                        customClass: 'success_msg',
                    });
                }else{
                    vm.play_arr.push(id);
                    vm.$notify({
                        type: 'success',
                        message: '已新增到我的最愛',
                        position: 'bottom-right',
                        customClass: 'success_msg',
                    });
                }
                let json_str = vm.play_arr.toString();
                document.cookie = "play="+json_str+"; max-age=43200;"//3600秒(1小時)過期
            },
        },
        watch:{
            play_arr:function(){
                const vm=this;
                for(let v=0; v<vm.play_arr.length; v++){
                    for(let i=0; i<vm.list.length; i++){
                        if(vm.list[i].id==vm.play_arr[v]){
                            vm.list[i].like=true;
                        }
                    }
                }
            },
        },
		mounted:function(){
            this.get_data();
        },
    }

    