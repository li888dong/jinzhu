function MouseGame() {
    this.mousesWrap = this.$('.game-content');
    this.mouses = this.$('.game-content div');
    this.gameStart = this.$('#game-start');
    this.gameTime = this.$('#game-time');
    this.gameScore = this.$('#game-score');
    this.goodScore = 100;
    this.badScore = 50;

    this.bindEvent();
}

MouseGame.prototype = {
    constructor: MouseGame,    

    /**
     * 获取元素
     * @param  {String} elem 元素的字符串标识
     * @example
     * $('div') | $('p.active')
     * @return {NodeList}      获取的元素集
     */
    $: function(elem) {
        return document.querySelectorAll(elem);
    },    

    /**
     * 获取给定范围的随机数
     * @param  {Number} from 起始
     * @param  {Number} to   结束
     * @return {Number}      随机数
     */
    getRandom: function(from, to) {
        return Math.floor(Math.random() * (to - from + 1)) + from;
    },    

    /**
     * 设置元素内容
     * @param  {HTMLElement} elem 要设置的元素
     * @param  {String} val  设置的内容
     * @return {String}      设置好的内容|元素本身的内容
     */
    text: function(elem, val) {
        if (elem.textContent) {
            return val !== undefined ? elem.textContent = val : elem.textContent;
        } else if (elem.innerText) {
            return val !== undefined ? elem.innerText = val : elem.innerText;
        }
    },    

    // 运动操作
    moveUpAndDown: function() {
        var that = this;        

        // 定时器随机定义good|bad老鼠个数，以及需要显示的个数
        that.moveTime = setInterval(function() {            

            for (var i = 0, j = that.mouses.length; i < j; ++i) {
                that.mouses[i].setAttribute('clicked', '0');
                that.mouses[i].className = 'good active';
                that.mouses[i].style.display = 'none';
                that.mouses[i].firstChild.src = './img/good-pig.png'
            }            

            // bad 的个数
            var badNum = that.getRandom(5, 8);
            for (var i = 0; i < badNum; i++) {
                that.mouses[that.getRandom(0, 8)].className = 'bad active';
                that.mouses[that.getRandom(0, 8)].firstChild.src = './img/bad-pig.png'
            }            

            // 要显示的个数
            var showNum = that.getRandom(2, 6);
            for (var i = 0; i < showNum; i++) {
                that.mouses[that.getRandom(0, 8)].style.display = 'block';
            }
        }, 2000);
    },    

    // 打地鼠操作
    bindEvent: function() {
        var that = this;        

        // 监听游戏开始/重新开始
        // that.gameStart[0].addEventListener('click', function() {
        //     that.startGame();
        // }, false);

        // 打地鼠操作
        that.mousesWrap[0].addEventListener('click', function(e) {
            e = e || window.event;
            var elem = e.target.parentElement || e.srcElement.parentElement;
            // 如果当前项被隐藏则不操作，多次点击只取第一次分数
            if (elem.style.display !== 'block' || elem.getAttribute('clicked') === '1') {
                return;
            }

            // 扣分
            if (elem.firstChild.src.indexOf('bad')>-1) {
                that.score -= that.badScore;
                document.getElementById('media').src = './mp3/failed.mp3';
                setTimeout(function () {
                    document.getElementById('media').src = './mp3/music.mp3';
                },800)
            }

            // 加分
            else {
                document.getElementById('media').src = './mp3/success.mp3';
                showText();
                setTimeout(function () {
                    document.getElementById('media').src = './mp3/music.mp3';
                },1000);
                that.score += that.goodScore;
                that.totalTime = that.totalTime + 1;
                // alert('游戏结束，得分为：' + that.score);
                for (var i = 0, j = that.mouses.length; i < j; ++i) {
                    that.mouses[i].style.display = 'none';
                }
                that.pause()
            }            

            elem.setAttribute('clicked', '1');
            that.text(that.gameScore[0], that.score);
        }, false);
    },
    // 暂停
    pause: function(){
        clearInterval(this.timer);
        clearInterval(this.moveTime);
    },
    // 继续
    continue: function(){
        this.countDown();
        this.moveUpAndDown();
    },
    // 倒计时，当前剩余游戏时间
    countDown: function() {
        var that = this;

        this.timer = setInterval(function() {
            that.text(that.gameTime[0], --that.totalTime);            

            if (that.totalTime === 0) {
                clearInterval(that.timer);
                clearInterval(that.moveTime);
                
                for (var i = 0, j = that.mouses.length; i < j; ++i) {
                    that.mouses[i].style.display = 'none';
                }                

                alert('游戏结束，得分为：' + that.score);
            }
        }, 1000);
    },    

    // 开始游戏
    startGame: function() {
        document.getElementsByClassName('go-btn')[0].style.opacity = '0';
        document.getElementById('media').src = './mp3/music.mp3';
        this.score = 0;
        this.totalTime = 60;
        this.text(this.gameTime[0], this.totalTime);
        this.text(this.gameScore[0], this.score);        

        this.countDown();
        this.moveUpAndDown();
    }
};

var game = new MouseGame();
// 文本的显示隐藏
function hideText(){
    document.getElementById('textContainer').style.display = 'none';
    game.continue();

}

function showText(){
    document.getElementById('textContainer').style.display = 'block';
    document.getElementById('textTitle').innerHTML = article[currentIndex].title;
    document.getElementById('text').innerHTML = article[currentIndex].text;
    document.getElementById('textImg').src = article[currentIndex].imgUrl;
    if (article.length -1 >currentIndex){
        currentIndex++;
    } else {
        currentIndex = article.length-1
    }

}

// 文本信息
var article = [
    {
        title:'礼包一：',
        text:'新增城镇就业110万人。',
        imgUrl:'asdadas'
    },
    {
        title:'礼包二：',
        text:'参加城乡居民基本医保的80岁以上高龄老人住院报销比例在现行政策基础上提高5个百分点，实施80岁以上老人高龄津贴制度。',
        imgUrl:'asdadas'
    },
    {
        title:'礼包三：\n',
        text:'继续免费开展妇女宫颈癌和乳腺癌筛查、预防出生缺陷产前筛查和新生儿疾病筛查。\n',
        imgUrl:'asdadas'
    },
    {
        title:'礼包四：\n',
        text:'实施残疾儿童康复救助。\n',
        imgUrl:'asdadas'
    },
    {
        title:'礼包五：\n',
        text:'开展农村人居环境“千村示范、万村整治”工程，完成300万户农村户用卫生厕所改造，完成剩余45个县(市、区)农村垃圾治理省级达标验收任务。\n',
        imgUrl:'asdadas'
    },
    {
        title:'礼包六：\n',
        text:'持续改善大气环境质量，全省空气优良天数比例达到59.5%。\n',
        imgUrl:'asdadas'
    },
    {
        title:'礼包七：\n',
        text:'实施“百县通村入组工程”，新改建农村公路5000公里以上；开展“万村通客车提质工程”，所有具备条件的行政村通客车率达到100%。\n',
        imgUrl:'asdadas'
    },
    {
        title:'礼包八：\n',
        text:'新建和改扩建城乡幼儿园1000所，新增学位10万个。\n',
        imgUrl:'asdadas'
    },
    {
        title:'礼包九：\n',
        text:'完成3000个电网薄弱行政村电网改造。\n',
        imgUrl:'asdadas'
    },
    {
        title:'礼包十：\n',
        text:'加快县(市)人民医院提质升级。\n',
        imgUrl:'asdadas'
    }
];

// 数组乱序
if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
}

article.shuffle();
var currentIndex = 0;