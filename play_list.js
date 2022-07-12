const play_list_html=`<div class="site-page">
    <link rel="stylesheet" href="css/play.css">
    <div class="main-header">
        <vue-header @chilByValue="parentByValue"></vue-header>
    </div>
    <div class="main-in">
        <div class="not_msg" v-show="list.length==0">
            <div class="title"><i class="el-icon-warning-outline"></i>沒有資料</div>
            <div class="btn-box">
                <router-link class="btn new rad-5" :to="'/'">回影片列表</router-link>
            </div>
        </div>
        <div class="list-data" v-show="list.length>0">
            <ul class="list-con">
                <li v-for="(item, i) in list" :key="item.id">
                    <div class="item-in">
                        <div class="id">{{i+1}}</div>

                        <div class="row">
                            <div class="col-auto pic">
                                <a :href="item.catelink" target="_blank" :title="item.catename">
                                    <span class="icon-box">15:30</span>
                                    <img :src="item.img" style="width: 100%;">
                                </a>
                            </div>
                            <div class="col title">
                                <div><a :href="item.catelink" target="_blank" :title="item.catename">{{item.catename}}</a></div>
                                <div class="authorname"><a :href="item.authorlink" target="_blank" :title="item.authorname">{{item.authorname}}</a></div>
                            </div>
                        </div>

                        <div class="ctrl">
                            <button type="button" title="從我的最愛移除" class="lovebtn" @click="play_cookie(item.id,i)">
                                <i class="el-icon-delete-solid"></i>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>`;
const play_list={
        template:play_list_html,
        props: {},
        data: function() {
            return{
                loading: true,
                list:[],
                videolist:[],
                play_arr:[],
                search_input:"",
            }
        },
        computed: {
        },
      	methods: {
            get_data(search){
                const vm=this;
                const listapi = [
                    {id:'01',like:false,seq:"00001",authorimg:'img/author_img_01.jpg',authorname:'欸你這週要幹嘛',     authorlink:'',time:'20小時前',see:'6.9萬次',  img: "img/video_img_01.jpg",catename: "【大姐產後全紀錄】與姊夫在醫院的戰爭！黑糖回家啦！",link: ""},
                    {id:'02',like:false,seq:"00002",authorimg:'img/author_img_02.jpg',authorname:'上班可以聽 LWW',     authorlink:'',time:'3天前',see:'6.9萬次',     img: "img/video_img_02.jpg",catename: "@吉支昏時間 X 馬克信箱 22w28-1 | 我要預測幾件事：",link: ""},
                    {id:'03',like:false,seq:"00003",authorimg:'img/author_img_03.jpg',authorname:'志祺七七 X 圖文不符',authorlink:'',time:'3週前',see:'6.9萬次',     img: "img/video_img_03.jpg",catename: "好不容易放假了，為什麼卻反而更焦慮？只想耍廢，錯了嗎？《 七七心理學 》EP 037｜志祺七七",link: ""},
                    {id:'04',like:false,seq:"00004",authorimg:'img/author_img_04.jpg',authorname:'末羊子 dontkjoanne', authorlink:'',time:'2年前',see:'6.9萬次',     img: "img/video_img_04.jpg",catename: "跟我一起優化家裡的各個角落！幾個調整讓家裡更整齊、好找東西！ft. 光泉超有料系列優酪",link: ""},
                    {id:'05',like:false,seq:"00005",authorimg:'img/author_img_05.jpg',authorname:'脑弟说电影',         authorlink:'',time:'4週前',see:'6.9萬次',     img: "img/video_img_05.jpg",catename: "【脑弟】李准基变身吸血鬼恋人！爱上人类假小子！一口气看完奇幻剧《吸血鬼书生》全集！",link: ""},
                    {id:'06',like:false,seq:"00006",authorimg:'img/author_img_06.jpg',authorname:'八婆 BESTIES',       authorlink:'',time:'1天前',see:'6.9萬次',     img: "img/video_img_06.jpg",catename: "【開箱】全家酷繽沙、7-11 哈根達斯冰沙！一杯149 vs 一杯60！值得買嗎？",link: ""},
                    {id:'07',like:false,seq:"00007",authorimg:'img/author_img_07.jpg',authorname:'小姐不熙娣',         authorlink:'',time:'1個月前',see:'6.9萬次',   img: "img/video_img_07.jpg",catename: "錄不下去了！趙正平嗆許雅鈞把小Ｓ閨蜜當「酒店妹」？鍾明軒昔日往事蔡康永躺著也中槍？【#小姐不熙娣】20220623 完整版  EP76 趙正平 加賀美智久、鍾明軒@小S徐熙娣 elephant DEE",link: ""},
                    {id:'08',like:false,seq:"00008",authorimg:'img/author_img_08.jpg',authorname:'Dr. Ivan 6',         authorlink:'',time:'2天前',see:'6.9萬次',     img: "img/video_img_08.jpg",catename: "汗皰疹如何治療與預防? 能根治嗎? 皮膚科醫師建議改善方法。",link: ""},
                ]
                vm.videolist=[];

                if(document.cookie!=''){
                    let cookie_arr = this.check_play_cookie('play').split(',');
                    vm.play_arr = cookie_arr;
                    for(let v=0; v<vm.play_arr.length; v++){
                        for(let i=0; i<listapi.length; i++){
                            if(listapi[i].id==vm.play_arr[v]){
                                vm.videolist.push(listapi[i])
                            }
                        }
                    }
                }
                
                if(search){
                    let new_arry=[];
                    vm.videolist.forEach((item)=>{
                        if(item.catename.includes(vm.search_input)){
                            new_arry.push(item);
                        }
                    })
                    console.log(new_arry)
                    vm.list = new_arry;
                }else{
                    vm.list = vm.videolist;
                }
            },
            parentByValue(val){//獲取搜尋子組件
                const vm=this;
                vm.search_input = val;
                vm.get_data(true)
            },
            check_play_cookie(name){//解析cookie
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            },
            play_cookie(id,index){
                const vm=this;
                //點後當下的變化
                vm.list.splice(index, 1);
                vm.$notify({
                    type: 'success',
                    message: '已移除',
                    position: 'bottom-right',
                    customClass: 'success_msg',
                });
                 
                //存入cookie
                let result2 = vm.play_arr.some(x => x === id);
                if(result2){
                    for(let i=0; i<vm.play_arr.length; i++){
                        if(vm.play_arr[i]==id){
                            vm.play_arr.splice(i, 1);
                        }
                    }
                }else{
                    vm.play_arr.push(id);
                }
                let json_str = vm.play_arr.toString();
                document.cookie = "play="+json_str+"; max-age=43200;"//3600秒(1小時)過期
            },
        },
        watch:{},
		mounted:function(){
            this.get_data();
        },
    }

    