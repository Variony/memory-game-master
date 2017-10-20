//Randomize array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Append pics randomly
function shuffleCards(){
    $('.card').empty();
    var cards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor'
    , 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor'
        , 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'
    ];
    shuffle(cards);
    var  cardsObject= $('.card');
    for(let i = 0; i < cards.length; i ++){
        $(cardsObject[i]).append('<i></i>');
        $(cardsObject[i]).children().addClass(cards[i]);
    }
}

//display the card's symbol
function displayPic(currentPic){
    currentPic.addClass('show open');
}

//add the former card information into list
function storeFormer(former, currentPic){
    var index = currentPic.index();
    var attr = currentPic.children().attr('class');
    former.push(index, attr);
}

//if the cards do match, lock the cards in the open position
function match(currentPic, formerPic){
    currentPic.addClass('match');
    formerPic.addClass('match');
    count ++;
}

//if the cards do match, lock the cards in the open position
function notMatch(currentPic, formerPic, former){
    formerPic.removeClass('show open');
    currentPic.removeClass('show open');
    former.length = 0;
}

//if all cards have matched, display a message with the final score
function success(){
    window.location.replace('success.html');
    sessionStorage.setItem('total', total);
    sessionStorage.setItem('star', star);
    sessionStorage.setItem('time', $('#minutes').text() +':' + $('#seconds').text());
}

//Adjust stars according to moves
function removeStar(){
    var stars = $('i.fa.fa-star');
    $(stars[--star]).hide();
}

//Set a timer when start
function timer(){
    var minutesLabel = $('#minutes');
    var secondsLabel = $('#seconds');
    setInterval(setTime, 1000);

    function setTime()
    {
        ++totalSeconds;
        secondsLabel.text(pad(totalSeconds%60));
        minutesLabel.text(pad(parseInt(totalSeconds/60)));
    }

    function pad(val)
    {
        var valString = val + "";
        if(valString.length < 2)
        {
            return "0" + valString;
        }
        else
        {
            return valString;
        }
    }
}

var totalSeconds = 0;
var count = 0;
var total = 0;
var star = 3;


$(function () {
    shuffleCards();
    timer();
    var former = [];

    $('.restart').on('click', function () {
       $('.deck li').removeClass().addClass('card');
       totalSeconds = 0;
       $('i.fa.fa-star').show();
       shuffleCards();
       console.log('s');
       count = 0;
       total = 0;
       $('.moves').text(0);
    });

    $('.card').on('click', function () {
        var currentPic = $(this);
        displayPic(currentPic);
        if(former.length === 0){
            storeFormer(former, currentPic);
        }else{
            if(currentPic.index() !== former[0]){
                var formerPic = $('.card').eq(former[0]);

                if(currentPic.children().attr('class') === former[1]) match(currentPic, formerPic);

                setTimeout(function(){
                    notMatch(currentPic, formerPic, former);
                }, 200);
            }
        }

        $('.moves').text(++ total);

        if(total === 20 || total === 30 || total === 40){
           removeStar();
        }

        if(count === 8){
            success();
        }

    });

});

