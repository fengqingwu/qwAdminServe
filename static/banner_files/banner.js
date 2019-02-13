$(document).ready(function () {
    var bgColors = ["rgb(0,6,41)", "rgb(8,8,49)","rgb(10,24,46)","rgb(16,12,20)"];
    var t;
    var index = -1;
    var times = 3000;
    t = setInterval(play, times);
    function play() {
        index++;
        if (index > 3) {
            index = 0
        }
        $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000); 
        $('.cir').eq(index).addClass('cr').siblings().removeClass('cr');
        $("#imageBox").css("background", bgColors[index]);
        // alert(index);
    }
    $('.cir').click(function () {
        $(this).addClass('cr').siblings().removeClass('cr');
        var index = $(this).index();
        $('.img').eq(index).fadeIn(600).siblings().fadeOut(600);
        $("#imageBox").css("background", bgColors[index]);
    }) 
    $('.pre').click(function () {
        index--
        if (index < 0) {
            index = 3
        }
        $("#imageBox").css("background", bgColors[index]);
        $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000);
        $('.cir').eq(index).addClass('cr').siblings().removeClass('cr');
    }) 
    $('.next').click(function () {
        index++
        if (index > 3) {
            index = 0
        }
        $("#imageBox").css("background", bgColors[index]);
        $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000); 
        $('.cir').eq(index).addClass('cr').siblings().removeClass('cr');
    })
    $('.banner').hover(function () {
        clearInterval(t)
    },
    function () {
        t = setInterval(play, times)
        function play() {
            index++
            if (index > 3) {
                index = 0
            }
            $("#imageBox").css("background", bgColors[index]);
            $('.img').eq(index).fadeIn(1000).siblings().fadeOut(1000);
            $('.cir').eq(index).addClass('cr').siblings().removeClass('cr');
            // alert(index);
        }
    });
});