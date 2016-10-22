/*动态生成div*/
var n = 4;
var clickTime = 0;
var st;
/*position[i] : 现在第 i 个位置 所在的块 的序号！*/
/*SubImg[i]: 编号为 i 的图像块的 dom
SubImg[position[i]] : 现在第 i 个位置上的图像块*/
var position = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function CreateImg() {
    parent = document.getElementById("puzzle");
    SubImg = [];
    /*按位置顺序设定每个位置的初始状态*/
    for (var i = 0; i < n * n; ++i) {
        SubImg[i] = document.createElement("div");
        if (i != n * n - 1) SubImg[i].setAttribute("class", "SubImg background1");
        SubImg[i].setAttribute("id", "Img" + i);
        SubImg[i].setAttribute("class", SubImg[i].className + " Img-row" + Math.floor(i / n) + " Img-col" + i % n + " row" + Math.floor(i / n) + " col" + i % n);

        parent.appendChild(SubImg[i]);

    };
}

function Move() {
    var block = event.target;
    var k = -1;
    /*k： 现在块所在位置*/
    for (var i = 0; i < n * n; ++i)
        if (block == SubImg[position[i]]) {
            k = i;
            break;
        }
    var row = Math.floor(k / n);
    var col = k % n;

    /*判断移动方向！！！*/
    {
        if (col != 0 && position[k - 1] == n * n - 1) {
            position[k - 1] = position[k];
            position[k] = n * n - 1;
            if ($(block).hasClass("col" + col)) {
                $(block).removeClass("col" + col);
                $(block).addClass("col" + String(col - 1));
            }
            clickTime++;
        }
        else if (col != n - 1 && position[k + 1] == n * n - 1) {
            position[k + 1] = position[k];
            position[k] = n * n - 1;
            if ($(block).hasClass("col" + col)) {
                $(block).removeClass("col" + col);
                $(block).addClass("col" + String(col + 1));
            }
            clickTime++;
        }
        else if (row != 0 && position[k - n] == n * n - 1) {
            position[k - n] = position[k];
            position[k] = n * n - 1;
            if ($(block).hasClass("row" + row)) {
                $(block).removeClass("row" + row);
                $(block).addClass("row" + String(row - 1));
            }
            clickTime++;
        }
        else if (row != n - 1 && position[k + n] == n * n - 1) {
            position[k + n] = position[k];
            position[k] = n * n - 1;
            if ($(block).hasClass("row" + row)) {
                $(block).removeClass("row" + row);
                $(block).addClass("row" + String(row + 1));
            }
            clickTime++;
        }
        else {
        	$(block).addClass("warning");
        	setTimeout(function() {$(block).removeClass("warning");}, 300);
        	
        }
    }
    document.getElementById("movetime").innerHTML = "Amount order times: " + clickTime;
    if (IsWin()) {
        EndGame();
    }
}


var Pass = [false, false, false];

function Start() {
	clickTime = 0;
   /* for (var i = 1; i < 3; ++i)
        if (!Pass[i]) $("#pic" + String(i + 1)).addClass("hidden");*/
	document.getElementById("movetime").innerHTML = "Amount order times: " + clickTime;
    var prev = []; /*slice?*/
    for (var i = 0; i < n * n; i++)
        prev[i] = position[i];
    do {
    	if (IsSuit(RandomSequence())) break;
    } while (1);
    document.getElementById("info").innerHTML = "Game Start !";
    $("#info").removeClass("hidden");
    setTimeout(function() {$("#info").addClass("hidden");}, 1500);
    /*SuitableSequence();*/
    /*按照位置顺序遍历！*/
    for (var i = 0; i < n * n; i++) {
        /*之前 第i个位置 现在的位置*/
        var row = Math.floor(position.indexOf(prev[i]) / n);
        var col = position.indexOf(prev[i]) % n;
        if ($(SubImg[prev[i]]).hasClass("row" + Math.floor(i / n))) {
            $(SubImg[prev[i]]).removeClass("row" + Math.floor(i / n));
            $(SubImg[prev[i]]).addClass("row" + row);
        }/* else alert(i + "   row" + Math.floor(i / n));*/
        if ($(SubImg[prev[i]]).hasClass("col" + i % n)) {
            $(SubImg[prev[i]]).removeClass("col" + i % n);
            $(SubImg[prev[i]]).addClass("col" + col);
        }
            SubImg[i].addEventListener("click", Move);
    };
    st = new Date();
    Update = setInterval(ShowTime, 0);
    if ( !$("#pic").hasClass("hidden")) TipSwitch();
    document.getElementById("tip").addEventListener("click", TipSwitch);
}

function EndGame() {
    /*alert("You Win!");*/
    for (var i = 0; i < n * n; i++) {
        SubImg[i].removeEventListener("click", Move);
    };
    document.getElementById("info").innerHTML = "You Win! With " + clickTime + " operations and " + Math.floor(GetTime() / 1000) + " s.";
    clearInterval(Update);
    $("#info").removeClass("hidden");
    if ($("#pic").hasClass("background3")){
        document.getElementById("info").innerHTML+= "And you have passed all Stages!";
        Pass[2] = true;
    }
    else {
        if ($("#pic").hasClass("background1")) {
            document.getElementById("pic2").disabled = false;
            Pass[0] = true;
        }
        if ($("#pic").hasClass("background2")) {
            document.getElementById("pic3").disabled = false;
            Pass[1] = true;
        }
        document.getElementById("info").innerHTML+= " Welcome to try next Stage!";
    }
    /*if ($(".choice").hasClass("hidden")) $(".choice").removeClass("hidden");*/
}

function IsWin() {
    for (var i = 0; i < n * n; ++i)
        if (i != position[i]) return false;
    return true;
}

function RandomSequence() {
    var t, a, b, count = 10 * n * n;
    for (var i = 0; i < count; ++i) {
        a = Math.floor((n * n - 1) * Math.random());
        b = Math.floor((n * n - 1) * Math.random());
        t = position[a];
        position[a] = position[b];
        position[b] = t;
    }
    /*调整blank位置*/
    
    b = position.indexOf(n * n - 1);
    if (b != n * n - 1) {
        t = position[n * n - 1];
        position[n * n - 1] = position[b];
        position[b] = t;
    }
    return position;

}


function IsSuit(arr) {
	var disorder = 0;
	for (var i = 0; i < arr.length; i++)
		for (var j = i; j < arr.length; j++)
			if (arr[i] > arr[j]) ++disorder;
	if (disorder % 2 == 0) return true;
	else return false;
}

function ShowTime() {
	document.getElementById("gametime").innerHTML = "Amount used time: " + Math.floor(GetTime() / 1000) + " s";
}
function GetTime() {
	ed = new Date();
	return (ed.getTime() - st.getTime());
}
function TipSwitch() {
    if ($("#pic").hasClass("hidden")) {
        $("#pic").removeClass("hidden");
        document.getElementById('tip').innerHTML = "Close Tips";
    }
    else {
        $("#pic").addClass("hidden");
        document.getElementById('tip').innerHTML = "Get Tips";
    }
}


function ChangePic(index) {
    var Img = $("#pic");
    for (var i = 1; i <= 3; ++i) {
        if (i != index && Img.hasClass("background" + i)) {
            $(".SubImg").removeClass("background" + i);
            $("#pic").removeClass("background" + i);
            $(".SubImg").addClass("background" + index);
            $("#pic").addClass("background" + index);
        }
    }
    Start();
}
window.onload = function() {
    CreateImg();
    document.getElementById("control").addEventListener("click", Start);
    document.getElementById("pic1").addEventListener("click", function(){ChangePic(1);});
    document.getElementById("pic2").addEventListener("click", function(){if (!Pass[0]) {alert("Please pass the previous stage first!")} else ChangePic(2);});
    document.getElementById("pic3").addEventListener("click", function(){if (!Pass[1]) {alert("Please pass the previous stage first!")} else ChangePic(3);});
}


/*下面这个methods也不错*/
/* 
function SuitableSequence() {
    var t, a, blank = n * n - 1, count = 1 * n * n;
    for (var i = 0; i < count; ++i) {
        switch (Math.floor(4 * Math.random())) {
            case 0:
                if (blank % n > 0) a = blank - 1;
                break;
            case 1:
                if (blank % n < n - 1) a = blank + 1;
                break;
            case 2:
                if (Math.floor(blank / n) > 0) a = blank - n;
                break;
            case 3:
                if (Math.floor(blank / n) < n - 1) a = blank + n;
                break;
            default : 
                a = blank;
        }
        t = position[a];
        position[a] = position[blank];
        position[blank] = t;
        blank = a;
}
    while (blank % n < n - 1) {
        t = position[blank + 1];
        position[blank + 1] = position[blank];
        position[blank] = t;
        ++blank;
    }
    while (Math.floor(blank / n) < n - 1) {
        t = position[blank + n];
        position[blank + n] = position[blank];
        position[blank] = t;
        blank = blank + n;
    }
}*/