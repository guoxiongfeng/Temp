score = 0;
var St = new Date(),
    Ed = new Date();
RemainTime = 0;

window.onload = function() {

    /*创建按钮*/
    var text = "";
    for (i = 0; i < 6; ++i)
        for (j = 0; j < 10; ++j)
            text = text + "<button class = 'btn' onclick='deal();' name = btn" + String(10 * i + j) + ">" + String(10 * i + j) + "</button>";
    document.getElementById("game").innerHTML = text;

    /*处理不同情况（状态）下的情况， 用ID= flag 中的value 来识别*/
    control = document.getElementById("control");
    control.onclick = function() {
        flag = document.getElementById("flag");
        if (flag.value == "Wait to start" || flag.value == "Game Over") {
            flag.value = "Playing...";
            score = 0;
            RemainTime = 30 * 1000;
            TimeSet();
            Update();
            Create();
            watch = setInterval(IsOver, 0);
        } else if (flag.value == "Pausing...") {
            flag.value = "Playing...";
            TimeSet();
            watch = setInterval(IsOver, 0);
        } else if (flag.value == "Playing...") {
            flag.value = "Pausing...";
            clearInterval(watch);
        }
    }
}

var aim = -1;

function Create() {
    aim = Math.floor(Math.random() * 60);
    btn = document.getElementsByName("btn" + String(aim));
    btn[0].style.backgroundColor = "rgb(67,155,210)";
    btn[0].style.color = "rgb(67,155,210)";
}

function deal() {
    x = event.target.innerHTML;
    if (flag.value != "Playing...") return;
    if (x == aim) {
        AddScore();
    } else {
        SubScore();
    }
    Update();
}

function AddScore() {
    score++;
    btn = document.getElementsByName("btn" + String(aim));
    btn[0].style.backgroundColor = "white";
    btn[0].style.color = "white";
    Create();
}

function SubScore() {
    score--;
}

function Update() {
    document.getElementsByName("score")[0].value = score;
}


/*下面是对时间的处理*/
function TimeSet() {
    St = new Date();
    Ed = new Date(St.getTime() + RemainTime);
}

function UpdateTime() {
    now = new Date();
    RemainTime = Ed.getTime() - now.getTime();
    document.getElementsByName('time')[0].value = Math.floor(RemainTime / 1000);

}

function IsOver() {
    if (RemainTime < 5) {
        btn = document.getElementsByName("btn" + String(aim));
        btn[0].style.backgroundColor = "white";
        btn[0].style.color = "white";
        ShowGrade();
        flag.value = "Game Over";
        clearInterval(watch);
    } else UpdateTime();
}



function ShowGrade() {
    alert("Game Over.\nYour score is " + score + ".");
}
