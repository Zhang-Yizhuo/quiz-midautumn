var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
});

app.listen(process.env.PORT || 8888);

app.use(express.static("public"));

var jokes=[{setup:"嫦娥下凡（猜一花名）",punchline:"1.月季 2.玫瑰"},{setup:"嫦娥到了月亮后，仙丹变成了什么？",punchline:"1.玉兔 2.猴子"},{setup:"中秋节除了吃月饼，还会有什么食物？",punchline:"1.柚子 2.粽子"},{setup:"在古代月圆和月缺一般形容什么？",punchline:"1.悲欢离合 2.生老病死"},{setup:"在中秋吃月饼的习俗是在多少年前开始的？",punchline:"1.650年前 2.750年前"},{setup:"神箭横日穿，从此愁心散。决心无二意，祝君笑容展。（猜一贺语）",punchline:"1.中秋快乐 2.中秋幸福"},{setup:"吃月饼的意义是什么?",punchline:"1.团圆 2.和平"},{setup:"十字对十字，太阳对月亮。（猜一字）?",punchline:"1.朝 2.萌"},{setup:"中秋节又称为?",punchline:"1.月夕 2.除夕"},{setup:"后羿射下了几个太阳？",punchline:"1.九个 2.十个"},{setup:"纸能包住火。（猜一节日物品）",punchline:"1.灯笼 2.烟花"}];

app.route("/jokes").get(function(req,res,next){
	randomJokeIndex = Math.floor(Math.random()*jokes.length);

	jokes[randomJokeIndex].id = randomJokeIndex;

	res.send(jokes[randomJokeIndex]);
});

app.post('/upvote', function(req, res) {
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes++;

    res.send(jokes[jokeIndex]);
});

app.post('/downvote', function(req, res) {
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes--;

    res.send(jokes[jokeIndex]);
});
