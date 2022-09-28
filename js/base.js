let search = document.querySelector("#search");
let searchItem = document.querySelector("#search-item");
let base =document.querySelector("#base");
let searchButton = document.querySelector("#search-button");
let bing=document.querySelector("#search-bing");
let baidu=document.querySelector("#search-baidu");
let change1 = document.querySelector("#change-1");
let change2 = document.querySelector("#change-2");
let change=document.querySelector("#change");
let body=document.querySelector("#body");
let searchEngine=document.querySelector("#search-engine");
let motto = document.querySelector("#motto");
let plate= document.querySelector("#plate");
let jump=document.querySelector("#jump");
let bottom=document.querySelector("#bottom");
let color=document.querySelector("#color");
let colorText=document.querySelector("#colorText");
let colorView=document.querySelector("#colorView");
let message=document.querySelector("#message");
let colorButton=document.querySelector("#colorButton");
let history=document.querySelector("#history");
let histories;
let isPhone=false;//是否为手机
let back=true;//日夜模式切换
let searchBing=true;//搜索引擎切
let isSearch=true;//是否为搜索页面

document.onclick=function (e) {
    e.stopPropagation();//阻止事件冒泡即可

}
window.onload=()=>{
    getFamous();
    selectDevice();
    setTimeout(()=>{
        search.style.transition='all 1s';
        base.style.transition='all 1s';
        searchItem.style.transition='all 1s';
        motto.style.transition='all 1s';
        body.style.transition='all 1s';
        plate.style.transition='all .5s';
        if(isPhone){
            bottom.style.transition='all 1.5s';
            jump.style.transition='all 1.5s';
        }
    },10)
    let mode=localStorage.getItem('mode');
    if(mode==='false'){
        back=false;
    }
    let searchMode=localStorage.getItem('searchMode');
    if(searchMode){
        searchBing=(searchMode==='true');
    }
    searchItem.addEventListener('focus',()=>{
        search.style.boxShadow='0 0 10px rgba(128,128,128,0.8)';
        base.style.height='75%';
        if(searchItem.value==='搜索网址') {
            searchItem.value = '';
        }
        getSearchHistory();
        history.style.opacity="1";
        setTimeout(()=>{
            motto.style.opacity='1';
            motto.style.bottom='111px';
        },300)
        search.style.width='100%';
    });
    searchItem.addEventListener('blur',()=>{
        search.style.boxShadow='0 0 0 white';
        base.style.height='55%';
        if(searchItem.value===''){
            searchItem.value='搜索网址';
        }
        history.style.opacity="0";
        setTimeout(()=>{
            motto.style.opacity='0';
            motto.style.bottom='66px';
        },100)
        search.style.width='60%';
    });
    searchEngine.addEventListener('click',()=>{
        searchBing=!searchBing;
        changeSearchEngine();
        localStorage.setItem('searchMode',searchBing);
    })
    change.addEventListener('click',()=>{
        localStorage.setItem('mode',back);
        back=!back;
        changeMode();
    })
    searchButton.addEventListener('click',()=>{
        if(searchItem.value!=='搜索网址'&&searchItem.value!==''){
            toSearch();
        }
    })
    document.onkeydown = function(event) {
       let e = event || window.event || arguments.callee.caller.arguments[0];//回车进行搜索
        if (e && e.keyCode === 13) {
            if(searchItem.value!=='搜索网址'&&searchItem.value!==''){
                toSearch();
            }
        }
    };
    body.addEventListener('mousedown',onMouseDown);
    document.oncontextmenu = ()=>{return false};
    jump.addEventListener('mousedown',(e)=>{e.stopPropagation()})
    jump.addEventListener("click",(e)=>{
        isSearch=!isSearch;
        if(isSearch){
            plate.style.opacity='-1';
            plate.style.zIndex='-1';
            search.style.opacity='10';
            search.style.zIndex='10';
            isSearch=true;
        }else{
            search.style.opacity='-1';
            search.style.zIndex='-1';
            plate.style.opacity='10';
            plate.style.zIndex='10';
            isSearch=false;
        }
    })
    window.addEventListener('resize', ()=>{//小屏幕让名言和底部域名消失
         borderChange();
    });
    color.addEventListener('input',()=>{
        colorText.innerHTML=color.value;
        colorView.style.backgroundColor=color.value;
        ///
        ///
    })
    color.addEventListener('change',()=>{
        copyText(color.value)
        commit("复制成功!")
    })

    colorButton.addEventListener('click',()=>{
        copyText(color.value)
        commit("复制成功!")
    })
    changeSearchEngine();
    changeMode();
    borderChange();
}