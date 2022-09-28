function styleChangeBack(){//样式切换暗模式
    body.className='body-black';
    search.className='search-white';
    searchItem.className='search-item-white';
    searchButton.src='./image/search2.svg';
    bing.src='./image/bing-black.svg';
    baidu.src='./image/baidu-black.svg';
    motto.style.color='white';
    document.querySelector(".translate").style.backgroundColor='white';
    document.querySelector(".translate").style.color='#99CCCC';
    document.querySelector(".translate img").src='./image/translate-black.svg';

}
function styleChangeWhite(){//样式切换白模式
    body.className='body-white';
    search.className='search-black';
    searchItem.className='search-item-black';
    searchButton.src='./image/search.svg';
    bing.src='./image/bing-white.svg';
    baidu.src='./image/baidu-white.svg';
    motto.style.color='#99CCCC';
    document.querySelector(".translate").style.backgroundColor='#99CCCC';
    document.querySelector(".translate").style.color='white';
    document.querySelector(".translate img").src='./image/translate-white.svg';
}
function changeBack(){//图标切换暗模式
    change.title='纯白模式';
    change2.style.left='60px';
    change1.style.backgroundColor='#ffce54';
    change2.style.backgroundColor='#99CCCC';
}
function changeWhite(){//图标切换白模式
    change.title='雅兰模式';
    change2.style.left='25px';
    change1.style.backgroundColor='#ff8000';
    change2.style.backgroundColor='white';
}
function changeMode(){//更改日夜模式
    if(back){
        changeBack();
        styleChangeBack();
    }else{
        changeWhite();
        styleChangeWhite();
    }
    localStorage.setItem('mode',back);
}
function changeSearchEngine(){//切换搜索引擎图标
    if(searchBing){
        baidu.style.display='none';
        bing.style.display='block';
    }else{
        baidu.style.display='block';
        bing.style.display='none';
    }
}
function toSearch(){//搜索跳转
    if(searchBing){
        window.open("https://cn.bing.com/search?q="+searchItem.value)
    }else{
        window.open("http://www.baidu.com/s?wd="+searchItem.value);
    }
    axios({
        method:'get',
        url:"https://blackjun.cn/BlackJun/beginner/recording/"+searchItem.value,
    })
    searchItem.value='';
    history.style.opacity="0";
}
function getSearchHistory(){
    let searchText='';
    if(searchItem.value===''){
        searchText="null";
    }else{
        searchText=searchItem.value;
    }
    axios({
        method:'get',
        url:"https://blackjun.cn/BlackJun/beginner/get_recording/"+searchText,
    }).then(res=>{
        histories=res.data.data;
        let historyHtml="<h3 style='color: white;height: 50px;line-height: 50px;background-color: #99cccc'>历史记录</h3>";
        histories.forEach(function(item,index){
            historyHtml+="<div onclick='historySearch("+index+")'>『 "+item.history.substring(0,15)+" 』"+"</div>"
        })
        history.innerHTML=historyHtml;
    }, error=>console.log(error));
}
function historySearch(index){
    searchItem.value=histories[index].history;
    toSearch();
}
function onMouseDown(e){
    search.style.transition='all .5s';
    e = e || window.event;
    if(e.button===0 || e.button===1){//左键
        if(!isSearch){
            plate.style.opacity='-1';
            plate.style.zIndex='-1';
            search.style.opacity='10';
            search.style.zIndex='10';
            isSearch=true;
        }
    } else if(e.button===2){//右键
        if(isSearch){
            search.style.opacity='-1';
            search.style.zIndex='-1';
            plate.style.opacity='10';
            plate.style.zIndex='10';
            isSearch=false;
        }
    }
    search.style.transition='all 1s';
}
function selectDevice(){
    let p=navigator.platform;
    if(p){
        let win=p.indexOf("Win") === 0;
        let mac=p.indexOf("Mac") === 0;
        let x11=(p === "X11") || (p.indexOf("Linux") === 0);//平板或手机
        isPhone= win || mac ;
    }
}
function borderChange(){
    if(window.innerHeight<=460||window.clientHeight<=460){
        motto.style.display="none";
        bottom.style.opacity="0";
        jump.style.opacity="0";
        return 0;
    }
    motto.style.display="block";
    bottom.style.opacity="1";
    if(window.innerWidth<=980||window.clientWidth<=980){
        jump.style.opacity="0";
        return 0;
    }
    jump.style.opacity="1";
}
function getFamous(){
    axios({
        method:'get',
        url:"https://blackjun.cn/BlackJun/beginner/getFamous",
    }).then(res=>{
        document.querySelector("#motto_title").innerHTML="「"+res.data.famous+"」";
        document.querySelector("#motto_author").innerHTML="— "+res.data.author;
    }, error=>console.log(error));
}

function copyText(text){
    let inputDom = document.createElement('input');  // 创建一个input元素
    inputDom.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
    inputDom.value = text; // 给input元素赋值
    document.body.appendChild(inputDom); // 添加到body
    inputDom.select(); //选中input元素的内容
    document.execCommand('Copy'); // 执行浏览器复制命令
    inputDom.style.display = 'none';
    inputDom.remove(); // 移除input元素
}
function commit(text){
    message.innerHTML=`<img src=\"image/success.svg\" style=\"height: 25px;margin-right: 3px\"/>`+text;
    message.style.opacity=1;
    setTimeout(function(){
        message.style.opacity=0;
    },1000)
}
