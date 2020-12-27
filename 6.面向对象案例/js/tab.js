var that
// 定义一个tab类并实例化
class Tab{
    constructor(id){
        // 获取元素，执行初始化
        that = this
        this.main = document.querySelector(id)
        this.add = this.main.querySelector('.tabadd')
        this.ul = this.main.querySelector('.fisrstnav ul:first-child')
        this.tabscon = this.main.querySelector('.tabscon')
        this.init();    
    }
    // 初始化init(),绑定事件
    init(){
        //获取元素
        this.updata();
        // 点击加号
        this.add.onclick=this.addTab
        // 循环每个li绑定点击事件
        for(var i=0; i<this.lis.length;i++){
            this.lis[i].index = i;
            // 点击调用切换功能函数
            this.lis[i].onclick = this.toggleTab
            // 删除功能
            this.remove[i].onclick = this.removeTab            
            // 编辑功能
            this.spans[i].ondblclick = this.changeTab
        }
    }
        // 获取创建的新元素
        updata(){
            this.lis = this.main.querySelectorAll('li')
            this.sections = this.main.querySelectorAll('section')
            this.remove = this.main.querySelectorAll('.icon-guanbi')
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
        }
    // 清除所有li和section的active类名
        clearClass(){
            for(var i=0;i<this.lis.length;i++){
                this.lis[i].className='';
                this.sections[i].className=''
            }
        }
// 切换功能
toggleTab(){
//清除所有样式,that(constructor)调用的所以有lis和sections 
that.clearClass();
// this指向调用者，这里指向调用这个函数的每个 li
this.className = 'liactive';
//that=>构造函数 构造函数中的sections的第index个（和每个小li相对应）显示
that.sections[this.index].className='conactive'
}
// 添加功能
addTab(){
    that.clearClass();
    // 创建新的li和sections
    var li ='<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
    var section='<section class="conactive">测试</section>';
    // 添加到父元素中 insertAdjacentHTML支持字符串
    that.ul.insertAdjacentHTML('beforeend',li)
    that.tabscon.insertAdjacentHTML('beforeend',section)
    // 更新元素后初始化
    that.init()
}
// 删除功能
removeTab(e){
//阻止冒泡，避免点击X之后跳转对应页面
e.stopPropagation();    
// 删除父元素对应index的li和section
var index = this.parentNode.index
that.lis[index].remove()
that.sections[index].remove()
that.init()
// 当删除的不是当前选中的，则不执行将删除的其哪一个变为选定状态
if(document.querySelector('.liactive')) return;
// 删除这个当前选中的li之后将前一个变为选定状态 手动调用前一个的点击事件
index--
// callback && callback() 判断时是否有that.lis[index]，如果没有（最后一个）就不执行点击事件
that.lis[index]&&that.lis[index].click()
}
// 修改功能,双击触发事件（生成一个文本框）,失去焦点或确定就将文字给原来的元素，禁止默认行为(双击选中文字)
changeTab(){
    // 获取当前文字,this指的是当前调用双击调用这个函数的span
    var str = this.innerHTML
    // 双击禁止选中
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    // 生成文本框
    this.innerHTML='<input type="text" />'
    // 获取文本框
    var input = this.children[0]
    // 给文本框赋值
    input.value = str
    // 默认选中文字
    input.select()
    //失去焦点将input的值赋值给span(input的父元素)
    input.onblur = function(){
        // 这里的this是input,因为是input调用这个函数
        input.parentNode.innerHTML = this.value
    }
    // 键盘事件,按下回车调用blur事件，e指input.onkeyup这个事件
    input.onkeyup = function(e){
        // 回车键的keycode是13
        if(e.keyCode === 13){
            // 手动调用失去焦点事件
            this.blur()
        }
    }
}       
}

// 实例化传递将tab的id传值
new Tab('#tab')