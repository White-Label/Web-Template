// Facebook Share
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=570788733024362";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Twitter Follow
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

// Hide modal on submit form
$('#signup_form').on('submit', function() {
  $('#myModal').modal('hide');
});

// poster frame click event
$(document).on('click','.js-videoPoster',function(ev) {
  ev.preventDefault();
  var $poster = $(this);
  var $wrapper = $poster.closest('.js-videoWrapper');
  videoPlay($wrapper);
});

// play the targeted video (and hide the poster frame)
function videoPlay($wrapper) {
  var $iframe = $wrapper.find('.js-videoIframe');
  var src = $iframe.data('src');
  // hide poster
  $wrapper.addClass('videoWrapperActive');
  // add iframe src in, starting the video
  $iframe.attr('src',src);
}

// stop the targeted/all videos (and re-instate the poster frames)
function videoStop($wrapper) {
  // if we're stopping all videos on page
  if (!$wrapper) {
    var $wrapper = $('.js-videoWrapper');
    var $iframe = $('.js-videoIframe');
  // if we're stopping a particular video
  } else {
    var $iframe = $wrapper.find('.js-videoIframe');
  }
  // reveal poster
  $wrapper.removeClass('videoWrapperActive');
  // remove youtube link, stopping the video from playing in the background
  $iframe.attr('src','');
}


// Cookie for Subscribe Modal
$(document).ready(function(){
    //Referances 
    //jQuery Cookie : https://github.com/carhartl/jquery-cookie
    //Modal : http://getbootstrap.com/javascript/#modals
    $modal = $('.modal-frame-subscribe');
    $overlay = $('.modal-overlay-subscribe');

    var my_cookie = $.cookie($('.modal-check').attr('name'));

    if (my_cookie && my_cookie == "true") {
        $(this).prop('checked', my_cookie);
    }
    else{
        $overlay.addClass('state-show');
        $modal.removeClass('state-leave').addClass('state-appear');
    }

    $(".modal-check").change(function() {
        $.cookie($(this).attr("name"), $(this).prop('checked'), {
            path: '/',
            expires: 90
        });
    });
});


$(function(){

  // SCROLL TO TOP
  // browser window scroll (in pixels) after which the "back to top" link is shown
  var offset = 300,
      //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
      offset_opacity = 1200,
      //duration of the top scrolling animation (in ms)
      scroll_top_duration = 700,
      //grab the "back to top" link
      $back_to_top = $('.cd-top');

  // hide or show the "back to top" link
  $(window).scroll(function(){
      ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
      if( $(this).scrollTop() > offset_opacity ) { 
          $back_to_top.addClass('cd-fade-out');
      }
  });
  
  // smooth scroll to top
  $back_to_top.on('click', function(event){
      event.preventDefault();
      $('body,html').animate({
          scrollTop: 0 ,
          }, scroll_top_duration
      );
  });

  // scroll to top when mixtape is selected
  $('.main__archive-grid').on('click', '.mixtapes', function() {
    $('body, html').animate({scrollTop: "0px"}, 700);
    // setTimeout(function() {
    //   var input = document.getElementById('markdown-input').textContent,
    //       outputEle = document.getElementById('markdown-output');
    //       string = input.replace("\\n", "</h1><p>");
    //   outputEle.innerHTML = micromarkdown.parse(string);
    // }, 1500);
  });

  // Lazy Load
  setTimeout(function() {
    $("img.lazy").lazyload({
        threshold : 100,
    });
  }, 2000);


  $('#submit_email').click(function(){
     if($('#email').val().trim() == ''){
        $('#email').addClass("validate");
     }
  });

  $('#submit_email_about').click(function(){
     if($('#email_about').val().trim() == ''){
        $('#email_about').addClass("validate");
     }
  });

  // volume slider
  $('.vslider').slider();

  // // Markdown
  // setTimeout(function() {
  //   var input = document.getElementById('markdown-input').textContent,
  //       outputEle = document.getElementById('markdown-output');
  //       string = input.replace("\\n", "</h1><p>");
  //   outputEle.innerHTML = micromarkdown.parse(string);
  //   console.image("http://i.imgur.com/BTNIDBR.gif");
  // }, 1500);

});


/**
 * Dubiously created by Adrian Cooney
 * http://dunxrion.github.io
 */(function(e){"use strict";function n(e,t){return{string:"+",style:"font-size: 1px; padding: "+Math.floor(t/2)+"px "+Math.floor(e/2)+"px; line-height: "+t+"px;"}}function r(e,t,n,r,o){n=n.toUpperCase();if(n.length<24){var u=Math.max(0,n.length-12),a=70+u*-3;i(e,a,n,r/2,o)}else if(n.length<29)i(e,40,n,r/2,o);else{var f=s(n,27);f.forEach(function(n,s){i(e,40,n,r/2,t=="lower"?o-(f.length-1)*40+s*40:o+s*40)})}}function i(e,t,n,r,i){e.font="bold "+t+"px Impact";e.fillStyle="#fff";e.textAlign="center";e.textBaseline="middle";e.lineWidth=7;e.strokeStyle="#000";e.strokeText(n,r,i);e.fillText(n,r,i)}function s(e,t){var n=[],r=e.split(" "),i=[];for(var s=0,o=r.length;s<o;s++)if((i+r[s]).length<t)i.push(r[s]);else{n.push(i.join(" "));i.length=0;i.push(r[s])}n.push(i.join(" "));return n}var t={"10 Guy":"//i.imgur.com/LaENqOV.jpg","3rd World Success Kid":"//i.imgur.com/WA5duA1.jpg","90's Problems":"//i.imgur.com/tL47qtp.jpg","Aaand It's Gone":"//i.imgur.com/yf12saq.jpg","Actual Advice Mallard":"//i.imgur.com/WymFmVy.jpg","Advice Dog":"//i.imgur.com/Qk0VO6D.jpg","Advice God":"//i.imgur.com/xH2fSFg.jpg","Almost Politically Correct Redneck":"//i.imgur.com/YqLgINf.jpg","Am I The Only One":"//i.imgur.com/gS9YL5U.jpg","Ancient Aliens":"//i.imgur.com/NfCknz0.jpg","Annoyed Picard":"//i.imgur.com/s9GmfSS.jpg","Annoying Childhood Friend":"//i.imgur.com/27VCyQw.jpg","Annoying Facebook Girl":"//i.imgur.com/ccczyGt.jpg","Anti-Joke Chicken (Rooster)":"//i.imgur.com/KOsW0jh.jpg","Awkward Penguin":"//i.imgur.com/ez1tQrq.jpg","Back In My Day Grandpa":"//i.imgur.com/zuJSZp8.jpg","Bad Advice Mallard":"//i.imgur.com/QEPvL2B.jpg","Bad Luck Brian":"//i.imgur.com/sRW8BiO.jpg","Bear Grylls":"//i.imgur.com/6Spqy1D.jpg","Brace Yourself":"//i.imgur.com/NhIq0LY.jpg","Captain Obvious":"//i.imgur.com/DmUcxBu.jpg","Chemistry Cat":"//i.imgur.com/8agP4Xe.jpg","College Freshman":"//i.imgur.com/2Ynyv9t.jpg","College Liberal":"//i.imgur.com/OWfvSFE.jpg","Condescending Wonka":"//i.imgur.com/D0e5fgL.jpg","Confession Bear":"//i.imgur.com/kH1SKhp.jpg","Confession Kid":"//i.imgur.com/jhOxR12.jpg","Confused Gandalf":"//i.imgur.com/iIb5SEo.jpg","Conspiracy Keanu":"//i.imgur.com/pFyk3J7.jpg","Courage Wolf":"//i.imgur.com/H5qoXFb.jpg","Dating Site Murderer":"//i.imgur.com/jffNNql.jpg","Depression Dog":"//i.imgur.com/wgad6P8.jpg","Drunk Baby":"//i.imgur.com/QvZdbRE.jpg","English Motherfucker":"//i.imgur.com/sJThEC0.jpg","Evil Plotting Raccoon":"//i.imgur.com/xMslWFf.jpg","First Day On The Internet Kid":"//i.imgur.com/TWfdmVu.jpg","First World Cat Problems":"//i.imgur.com/0vR5Slq.jpg","First World Problem":"//i.imgur.com/ATcIl08.jpg","Forever Alone":"//i.imgur.com/pcfXSUU.jpg","Forever Resentful Mother":"//i.imgur.com/pIrdwo2.jpg","Foul Bachelor Frog":"//i.imgur.com/JUFmusm.jpg","Foul Bachelorette Frog":"//i.imgur.com/dYf971U.jpg","Friendzone Fiona":"//i.imgur.com/Qu1eedL.jpg","Frustrated Farnsworth":"//i.imgur.com/U3SElKP.jpg","Fuck Me, Right?":"//i.imgur.com/J9gfxsx.jpg","Gangster Baby":"//i.imgur.com/C3XhI56.jpg","Good Girl Gina":"//i.imgur.com/qK6lYr2.jpg","Good Guy Greg":"//i.imgur.com/UXMPoKN.jpg","Grandma Finds The Internet":"//i.imgur.com/xPfGYqu.jpg","Grinds My Gears":"//i.imgur.com/t4JqU1j.jpg","Grumpy Cat (Tard)":"//i.imgur.com/dU5CDxN.jpg","High Expectations Asian Father":"//i.imgur.com/7QeB9LI.jpg","Hipster Barista":"//i.imgur.com/AbWxdy2.jpg","Horrifying House Guest":"//i.imgur.com/DxmoFp1.jpg","I Dare You Samuel Jackson":"//i.imgur.com/UQtpdqj.jpg","I Should Buy A Boat":"//i.imgur.com/XqlqPxn.jpg","I Too Like To Live Dangerously":"//i.imgur.com/qF70EL9.jpg","Idiot Nerd Girl":"//i.imgur.com/8hYPYwd.jpg","Insanity Wolf":"//i.imgur.com/GOOdg3k.jpg","Joker Mind Loss":"//i.imgur.com/qQIRaOD.jpg","Joseph Ducreux":"//i.imgur.com/QL7TyR9.jpg","Lame Joke Eel":"//i.imgur.com/oQXw3jF.jpg","Lame Pun Raccoon":"//i.imgur.com/nvALRK3.jpg","Lazy College Senior":"//i.imgur.com/PpkVfzz.jpg","Mad Karma":"//i.imgur.com/G0QMPum.jpg","Masturbating Spidey":"//i.imgur.com/dZ7AB4c.jpg","Matrix Morpheus":"//i.imgur.com/8Yrw6cZ.jpg","Mayonnaise Patrick":"//i.imgur.com/5jE0Y7f.jpg","Musically Oblivious 8th Grader":"//i.imgur.com/l5YHN5D.jpg","Not Sure Fry":"//i.imgur.com/7rFgBB1.jpg","Oblivious Suburban Mom":"//i.imgur.com/Y7o7UJs.jpg","One Does Not Simply":"//i.imgur.com/7LrwR1Y.jpg","Overly Attached Girlfriend":"//i.imgur.com/5blLJLR.jpg","Overly Manly Man":"//i.imgur.com/dOSn9Na.jpg","Paranoid Parrot":"//i.imgur.com/KooYHdg.jpg",Pedobear:"//i.imgur.com/c6JZKRW.jpg","Pepperidge Farm Remembers":"//i.imgur.com/uFde4v5.jpg",Philosoraptor:"//i.imgur.com/eERhI5h.jpg","Priority Peter":"//i.imgur.com/BBEFk0e.jpg","Rasta Science Teacher":"//i.imgur.com/Js6Ai5T.jpg","Redditor's Wife":"//i.imgur.com/d1XfJeD.jpg","Revenge Band Kid":"//i.imgur.com/dlvmaRI.jpg","Schrute Facts":"//i.imgur.com/UxcvPwT.jpg","Scumbag Brain":"//i.imgur.com/OZhhZdS.jpg","Scumbag Stacy":"//i.imgur.com/Qqz1axp.jpg","Scumbag Steve":"//i.imgur.com/Rfvoc0Y.jpg","Sexually Oblivious Rhino":"//i.imgur.com/RoaNuEC.jpg","Sheltering Suburban Mom":"//i.imgur.com/vMkSofv.jpg","Shut Up And Take My Money":"//i.imgur.com/uWe0rtQ.jpg","Skeptical Third World Kid":"//i.imgur.com/uwAusxV.jpg","Smug Spongebob":"//i.imgur.com/OTTRjrv.jpg","Socially Awesome Penguin":"//i.imgur.com/S6WgQW7.jpg","Success Kid":"//i.imgur.com/ZibijBz.jpg","Successful Black Man":"//i.imgur.com/ogIm0cy.jpg","Sudden Clarity Clarence":"//i.imgur.com/N3Xmfbe.jpg","Tech Impaired Duck":"//i.imgur.com/riz28ci.jpg","The Most Interesting Man In The World":"//i.imgur.com/MGv15MH.jpg","The Rent Is Too High":"//i.imgur.com/r5WLktQ.jpg","Tough Spongebob":"//i.imgur.com/2w0F1HX.jpg","Unhelpful Highschool Teacher":"//i.imgur.com/ohbGhuD.jpg","Vengeance Dad":"//i.imgur.com/0nUStsa.jpg","What Year Is It?":"//i.imgur.com/fj79hQS.jpg","X, X Everywhere":"//i.imgur.com/GGy94Gt.jpg","Yeah That'd Be Great":"//i.imgur.com/nz9M2pl.jpg","Yo Dawg Xzibit":"//i.imgur.com/XOyGqF2.jpg","You're Bad And You Should Feel Bad":"//i.imgur.com/YsabGnQ.jpg","You're Gonna Have A Bad Time":"//i.imgur.com/2tNR7P7.jpg"};e.meme=function(n,i,s,o,u){n||e.error("Yo, you forgot the text for the upper part of the meme. The bit at the top. Yeah, that bit.");i||e.error("You forgot the text for the bottom of the meme, stupid.");s||e.error("Dude, you forgot the meme type or url for the background image (CORS enabled, *hint* imgur *hint*). To see a list of supported memes, hit `console.meme()`");if(!n&&!i&&!s)return e.log("> "+Object.keys(t).join("\n> "));var a=document.createElement("canvas"),f=a.getContext("2d"),o=o||500,u=o||500,l=500,c=500,h=new Image;h.setAttribute("crossOrigin","anonymous");h.onload=function(){a.width=o;a.height=u;var t=n.toUpperCase();f.scale(o/500,u/500);f.drawImage(this,0,0,l,c);r(f,"upper",n,l,50);r(f,"lower",i,l,c-50);e.image(a.toDataURL())};if(t[s])var p=t[s];else var p=s;h.src=p};e.image=function(t,r){r=r||1;var i=new Image;i.onload=function(){var i=n(this.width*r,this.height*r);e.log("%c"+i.string,i.style+"background: url("+t+"); color: transparent;")};i.src=t;i.style.background="url("+t+")"}})(console);


/** tvOS **/
function atvImg(){function e(e,t,a,r,n,s){var i=l.scrollTop,o=l.scrollLeft,d=t?e.touches[0].pageX:e.pageX,c=t?e.touches[0].pageY:e.pageY,v=a.getBoundingClientRect(),m=a.clientWidth||a.offsetWidth||a.scrollWidth,f=a.clientHeight||a.offsetHeight||a.scrollHeight,h=320/m,g=.52-(d-v.left-o)/m,u=.52-(c-v.top-i)/f,p=c-v.top-i-f/2,y=d-v.left-o-m/2,C=(g-y)*(.07*h),E=(p-u)*(.1*h),I="rotateX("+E+"deg) rotateY("+C+"deg)",N=Math.atan2(p,y),x=180*N/Math.PI-90;0>x&&(x+=360),-1!=a.firstChild.className.indexOf(" over")&&(I+=" scale3d(1.07,1.07,1.07)"),a.firstChild.style.transform=I,s.style.background="linear-gradient("+x+"deg, rgba(255,255,255,"+(c-v.top-i)/f*.4+") 0%,rgba(255,255,255,0) 80%)",s.style.transform="translateX("+g*n-.1+"px) translateY("+u*n-.1+"px)";for(var b=n,L=0;n>L;L++)r[L].style.transform="translateX("+g*b*(2.5*L/h)+"px) translateY("+u*n*(2.5*L/h)+"px)",b--}function t(e,t){t.firstChild.className+=" over"}function a(e,t,a,r,n){var l=t.firstChild;l.className=l.className.replace(" over",""),l.style.transform="",n.style.cssText="";for(var s=0;r>s;s++)a[s].style.transform=""}var r=document,n=r.documentElement,l=r.getElementsByTagName("body")[0],s=window,i=r.querySelectorAll(".atvImg"),o=i.length,d="ontouchstart"in s||navigator.msMaxTouchPoints;if(!(0>=o))for(var c=0;o>c;c++){var v=i[c],m=v.querySelectorAll(".atvImg-layer"),f=m.length;if(!(0>=f)){for(;v.firstChild;)v.removeChild(v.firstChild);var h=r.createElement("div"),g=r.createElement("div"),u=r.createElement("div"),p=r.createElement("div"),y=[];v.id="atvImg__"+c,h.className="atvImg-container",g.className="atvImg-shine",u.className="atvImg-shadow",p.className="atvImg-layers";for(var C=0;f>C;C++){var E=r.createElement("div"),I=m[C].getAttribute("data-img");E.className="atvImg-rendered-layer",E.setAttribute("data-layer",C),E.style.backgroundImage="url("+I+")",p.appendChild(E),y.push(E)}h.appendChild(u),h.appendChild(p),h.appendChild(g),v.appendChild(h);var N=v.clientWidth||v.offsetWidth||v.scrollWidth;v.style.transform="perspective("+3*N+"px)",d?(s.preventScroll=!1,function(r,n,l,i){v.addEventListener("touchmove",function(t){s.preventScroll&&t.preventDefault(),e(t,!0,r,n,l,i)}),v.addEventListener("touchstart",function(e){s.preventScroll=!0,t(e,r)}),v.addEventListener("touchend",function(e){s.preventScroll=!1,a(e,r,n,l,i)})}(v,y,f,g)):!function(r,n,l,s){v.addEventListener("mousemove",function(t){e(t,!1,r,n,l,s)}),v.addEventListener("mouseenter",function(e){t(e,r)}),v.addEventListener("mouseleave",function(e){a(e,r,n,l,s)})}(v,y,f,g)}}}

$(function() {
  atvImg();
});


/** Active link checker **/
$(function() {
  $('.sidebar__nav a[href$="/' + location.pathname.split("/")[1] + '"]').addClass('active');
});

/** Modals **/

$(document).on('ready', function(){
    $appModal = $('.modal-frame');
    $appOverlay = $('.modal-overlay');

    /* Need this to clear out the keyframe classes so they dont clash with each other between ener/leave. Cheers. */
    $appModal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
      if($appModal.hasClass('state-leave')) {
        $appModal.removeClass('state-leave');
      }
    });

    $('.close, .modal-frame').on('click', function(){
      $appOverlay.removeClass('state-show');
      $appModal.removeClass('state-appear').addClass('state-leave');
    });

    $('.open-app').on('click', function(){
      $appOverlay.addClass('state-show');
      $appModal.removeClass('state-leave').addClass('state-appear');
    });

  });

$(document).on('ready', function(){
    $subscribeModal = $('.modal-frame-subscribe');
    $subscribeOverlay = $('.modal-overlay-subscribe');

    /* Need this to clear out the keyframe classes so they dont clash with each other between ener/leave. Cheers. */
    $subscribeModal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
      if($subscribeModal.hasClass('state-leave')) {
        $subscribeModal.removeClass('state-leave');
      }
    });

    $('.close-subscribe').on('click', function(){
      $subscribeOverlay.removeClass('state-show');
      $subscribeModal.removeClass('state-appear').addClass('state-leave');
    });

    $('#signup_form').on('submit', function(){
      $subscribeOverlay.removeClass('state-show');
      $subscribeModal.removeClass('state-appear').addClass('state-leave');
    });

    $('.open-subscribe').on('click', function(){
      $subscribeOverlay.addClass('state-show');
      $subscribeModal.removeClass('state-leave').addClass('state-appear');
    });

  });