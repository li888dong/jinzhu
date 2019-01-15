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
            }            

            // bad 的个数
            var badNum = that.getRandom(5, 8);
            for (var i = 0; i < badNum; i++) {
                that.mouses[that.getRandom(0, 8)].className = 'bad active';
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
        that.gameStart[0].addEventListener('click', function() {
            that.startGame();
        }, false);

        // 打地鼠操作
        that.mousesWrap[0].addEventListener('click', function(e) {
            e = e || window.event;
            var elem = e.target || e.srcElement;

            // 如果当前项被隐藏则不操作，多次点击只取第一次分数
            if (elem.style.display !== 'block' || elem.getAttribute('clicked') === '1') {
                return;
            }

            // 扣分
            if (elem.className.indexOf('bad') !== -1) {
                that.score -= that.badScore;
            }

            // 加分
            else {
                showText();
                that.score += that.goodScore;
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
        document.getElementById('game-start').style.opacity = '0';

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
        title:'标题1',
        text:'111111111111111111',
        imgUrl:'asdadas'
    },
    {
        title:'标题2',
        text:'22222222222222222',
        imgUrl:'asdadas'
    },
    {
        title:'标题3',
        text:'33333333333333333',
        imgUrl:'asdadas'
    },
    {
        title:'标题4',
        text:'33333333333333333',
        imgUrl:'asdadas'
    },
    {
        title:'标题5',
        text:'33333333333333333',
        imgUrl:'asdadas'
    },
    {
        title:'标题6',
        text:'33333333333333333',
        imgUrl:'asdadas'
    },
    {
        title:'标题7',
        text:'33333333333333333',
        imgUrl:'asdadas'
    },
    {
        title:'标题8',
        text:'33333333333333333',
        imgUrl:'asdadas'
    },
    {
        title:'标题9',
        text:'33333333333333333',
        imgUrl:'asdadas'
    },
    {
        title:'标题10',
        text:'33333333333333333',
        imgUrl:'asdadas'
    },
    {
        title:'标题11',
        text:'33333333333333333',
        imgUrl:'asdadas'
    },
    {
        title:'标题12',
        text:'33333333333333333',
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