/* 把code写到code和style标签里 */
function writeCode(prefix, code, fn){//接收一个参数 prefix 前缀，避免后面被同名覆盖
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let id = setInterval(()=>{
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if(n >= code.length){
            window.clearInterval(id)
            fn.call()
        }
    },30)
}

/* paper 里加内容 */
function writeMarkdown(markdown, fn){
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let id = setInterval(()=>{
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(id)
            fn.call()
        }
    },30)
}

var result = `/* 
 * 面试官你好，我是XXX
 * 只用文字作自我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
html{
    background: #ddd; 
}
#code-wrapper{
    width: 100%;
    height: 100vh;
    padding: 16px;
}
#code{
    width: 100%;
    height: 100%;
    padding: 16px;
}
/* 我需要一点代码高亮 */
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
/* 加点投影吧 */
#code{
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
    width: 50%;
    height: 100vh;
    padding: 16px;
}
#paper{
    width: 50%;
    height: 100vh;  
    padding: 16px;
}
#paper>.content{
    width: 100%;
    height: 100%;
    padding: 16px;
    background: white;
}
/* 可以写字了，瞧左边 */
`

var md = `
# 自我介绍
我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍
熟悉 JavaScript CSS

# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`
var result2 = `
/* 接下来将 Markdown 变成 HTML */

`
var result3 = `/*
* 这就是我的会动的简历
* 谢谢观看
* 愿你生活愉快
*/ 
`

//writeCode 是异步任务，createPaper 是同步任务
writeCode('', result, ()=>{//'' 表示前缀是空的 
    createPaper(()=>{
        writeMarkdown(md, ()=>{//之前代码 result 作为前缀
            writeCode(result, result2,()=>{
                markdownToHtml(()=>{
                    writeCode(result + result2, result3)
                })
            })
        })
    })
})

function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function markdownToHtml(fn){
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContent = document.querySelector('#paper > .content')
    markdownContent.replaceWith(div)
    fn.call()
}


