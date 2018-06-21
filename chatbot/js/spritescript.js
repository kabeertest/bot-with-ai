$(document).ready(function () {
    sprite = $('#sprite');
    //alert($('#sprite').length)
    spriteAnimator = sprite.spriteAnimator({
        debug: true,
        top: 200,
        left: 100,
        cols: 2,
        rows: 4
    })

    /*.play({
        script: 'all', run: -1, delay: 100
    });*/

    sprite.trigger('stop');

    var wordkeys = ["A", "O", "E", "S", "L", "M", "F", "NO"]
    var wordvalues = ["AI", "OUWR", "EI", "CDGKNRSTHYZ", "L", "MBP", "FV", " "]

    var currentslide = 0;
    function animatesprite() {
     

    }


    makesprite = function (speechtext) {
            var timeoutval=speechtext.length*100
        var animatesprites = setInterval(animatesprite, 1000)
        console.log(timeoutval,"makesprite ->", speechtext.length,'-------->',timeoutval/10)
        for (var i = 0; i < speechtext.length; i++) {
            var matched = 0
            var fetcher = [{ 'A': 'AI' }, { 'O': 'OUWR' }, { 'E': 'EI' }, { 'S': 'CDGKNRSTHYZ' }, { 'L': 'L' }, { 'M': 'MBP' }, { 'F': 'FV' },
            { 'NO': " " }]

            wordvalues.forEach(function (value, key) {
                if (value.indexOf(speechtext.charAt(i)) >= 0) {
                    //matched = wordkeys(key)
                    console.log('match found', key);
                    currentslide = key           ;
                    setTimeout(function(){
                        sprite.trigger('goToFrame', key);
                    },(parseInt(timeoutval/10)))
                



                }
                else {
                    
                    //  sprite.trigger('goToFrame', 0);
                    // console.log('no match found', key);
                }
                console.log(key + ': ' + value);
            });

            //   var frameNumber = parseInt(matched) || 0;
            //  sprite.trigger('setTempo', 0.5);
            //  console.log("go to frame ", frameNumber)


        }

        

        setTimeout(function(){
            sprite.trigger('goToFrame', 0);
        }, timeoutval)
        // sprite.trigger('play', { script: 'all', run: -1, delay: 100 })
    }
    
    stopsprite = function () {
        // alert(' stop called')
        // sprite.trigger('goToFrame', 0);
        // sprite.trigger('stop');
    }

})



$('button#play').on('click', function (event) {
    alert('play clicked')
    event.preventDefault();
    sprite.trigger('play');
});

$('button#stop').on('click', function (event) {
    event.preventDefault();
    sprite.trigger('stop');
});

$('button#reset').on('click', function (event) {
    event.preventDefault();
    sprite.trigger('reset');
});

$('button#nextFrame').on('click', function (event) {
    event.preventDefault();
    sprite.trigger('nextFrame');
});

$('button#previousFrame').on('click', function (event) {
    event.preventDefault();
    sprite.trigger('previousFrame');
});

$('button#reverse').on('click', function (event) {
    event.preventDefault();
    sprite.trigger('reverse');
});

$('button#goToFrame').on('click', function (event) {
    event.preventDefault();
    var frameNumber = $('input#framenumber').val() || 0;
    sprite.trigger('goToFrame', frameNumber);
});

$('button#setTempo').on('click', function (event) {
    event.preventDefault();
    var tempo = $('input#tempo').val() || 1;
    sprite.trigger('setTempo', tempo);
});