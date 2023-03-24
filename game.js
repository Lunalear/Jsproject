function gen_btn_id(){
    let random = Math.ceil(Math.random()*4);
    let btn;
    switch (random) {
        case 1:
            btn = 'green';
            break;
        case 2:
            btn = 'red';
            break;
        case 3:
            btn = 'yellow';
            break;
        case 4:
            btn = 'blue';
            break;
        default:
            alert(random);
            break;
    }
    return btn
};

function active_btn(btn_id){
    $('.'+ btn_id).addClass("pressed");
    setTimeout(function(){$('.'+btn_id).removeClass("pressed");},100)
    new Audio('sounds/'+btn_id+'.mp3').play()
};

var count_start = 0
function start(){
    let btn_id = gen_btn_id();
    stack[count_start] = btn_id;
    active_btn(btn_id);
    console.log(stack);
    count_start++;
}

var level  = 1;
var stack = {};
var click = [];
var count = 0;

$(".btn").click(function() {
    click.push(this.id);
    if (stack[count] !== click[count]){
        $('#level-title').text('game over!');
        $('body').addClass('game-over')
        new Audio('sounds/wrong.mp3').play()
        return //end
    };
    active_btn(this.id);
    count ++;
    if (count === level) {
        count = 0; //level complete
        click = []; //reset click
        level++;
        setTimeout(function(){
            $('#level-title').text('Level '+level);
            start(level);
        },1000)
    };
    console.log(count);
});

$(document).keypress(function(){
    $('#level-title').text('Level '+level);
    start(level);  
})