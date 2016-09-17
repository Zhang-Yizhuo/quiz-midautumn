var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
});

app.listen(process.env.PORT || 8888);

app.use(express.static("public"));

var jokes=[{setup:"嫦娥下凡（猜一花名）",punchline:"月季",nope:"玫瑰"},{setup:"嫦娥到了月亮后，仙丹变成了什么？",punchline:"玉兔",nope:"猴子"},{setup:"中秋节除了吃月饼，还会有什么食物？",punchline:"柚子",nope:"粽子"},{setup:"在古代月圆和月缺一般形容什么？",punchline:"悲欢离合",nope:"生老病死"},{setup:"在中秋吃月饼的习俗是在多少年前开始的？",punchline:"650年前" nope:"750年前"},{setup:"神箭横日穿，从此愁心散。决心无二意，祝君笑容展。（猜一贺语）",punchline:"中秋快乐",nope:"中秋幸福"},{setup:"吃月饼的意义是什么?",punchline:"团圆" ,nope:"和平"},{setup:"十字对十字，太阳对月亮。（猜一字）?",punchline:"朝" ,nope:"萌"},{setup:"中秋节又称为?",punchline:"月夕",nope:"除夕"},{setup:"后羿射下了几个太阳？",punchline:"九个",nope:"十个"},{setup:"纸能包住火。（猜一节日物品）",punchline:"灯笼",nope:"烟花"}];

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
