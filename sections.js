function createConfetti(x, y) {
  const colors = ['#ff0','#ff6666','#66ff66','#66ccff','#ff66ff'];
  for(let i=0;i<50;i++){
    const conf = document.createElement('div');
    conf.style.position = 'absolute';
    conf.style.width = '6px';
    conf.style.height = '6px';
    conf.style.background = colors[Math.floor(Math.random()*colors.length)];
    conf.style.left = x + 'px';
    conf.style.top = y + 'px';
    conf.style.borderRadius = '50%';
    conf.style.opacity = 1;
    document.body.appendChild(conf);

    conf.animate(
      [
        { transform: `translate(0,0)`, opacity: 1 },
        { transform: `translate(${Math.random()*200-100}px,${Math.random()*200-100}px)`, opacity: 0 }
      ],
      { duration: 1000 + Math.random()*500, easing: 'ease-out' }
    );

    setTimeout(() => conf.remove(), 1500);
  }
}

document.getElementById('wordsBox').addEventListener('click', e => {
  createConfetti(e.clientX, e.clientY);
  // Optional: show a temporary message div instead of alert
  const msg = document.createElement('div');
  msg.textContent = "Here are my heartfelt words to you! 💛";
  msg.className = "temp-msg";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
});

document.getElementById('galleryBox').addEventListener('click', e => {
  createConfetti(e.clientX, e.clientY);
  
  // Stop all audio in current tab
  document.getElementById('bgAudio').pause();
  document.getElementById('bgMusic').pause();
  
  // Open gallery in new tab
  window.open("gallery.html", "_blank");
});

const wordsBox = document.getElementById("wordsBox");
const messageBox = document.getElementById("personalMessageBox");
const messageContent = document.getElementById("messageContent");

const messageText = `Hey didi,

I hope you’re doing your best and that life is being kind to you — both physically and mentally. You truly deserve every bit of peace, success, and happiness in this world.

There’s something I’ve wanted to say for a long time… I’m quite an introverted person, and honestly, I overthink a lot. Every time I think of talking to you, my mind starts whispering that maybe my presence would bother you… or that maybe you don’t really want to talk to me. I know that’s not true, but my overthinking always wins.

Still, deep down, I really miss those carefree days — when we were kids, laughing, playing, teasing each other, and sharing those small, unforgettable moments. Those memories might seem ordinary, but to me, they’re precious — tiny pieces of my childhood that always make me smile.

Do you remember when we were at Grandma’s house — me, Pinku bhaiya, and you on the first floor — and how me and Pinku bhaiya used to enjoy irritating you? That was one of the best moments I still remember. And the other one — when we met at Karishma didi’s jagran — that day was special too. After such a long time, seeing you again and having fun like old times meant so much to me. There are so many small moments like these, and I don’t even know if you remember them all, but for me, they’re treasures.

I know I’m not as mature as you and Pinku bhaiya, but in the future I will be. Still, I love this dual identity — being mature in front of others, yet, for myself, still a child holding onto these memories. I think I might forget some of them as I grow, but I will try my best to treasure them forever.

Didi, I’ve always admired you — your confidence, your calmness, and the way you handle everything with so much grace. Papa often tells me about how well you’re doing, and even though I might pretend not to care, the truth is, I feel proud. Deep down, you’ve always been a quiet inspiration to me, even if I never said it out loud.

Today, I just wanted to talk to you — even if just for five minutes — to laugh a little and feel that old bond again. But somehow, I couldn’t find the courage to ask for those five minutes. Maybe that’s just the introvert in me… or maybe it’s because I don’t want to sound too emotional.

Also, didi, this thing I made — it’s one of the skills I’ve developed over the past three years. It might look small or even silly to others, but it took me three days and nights to complete. For me, it’s not just a project — it’s a small piece of my heart, something that holds all my effort, emotion, and love for you.

If God gives me another life, I truly wish you’d be my real big sister — someone I could hug without hesitation, someone I could tell everything to as i know being oldest son is not good due to duties and tension on our head and also due to sometimes, didi, there’s so much I wish I could share, but I can’t — not even with my parents (you know how it is with boys).

And didi… I know this letter is emotional,
but this is the only way I can express myself.
I can’t really say it in words, because I’m an introvert —
so I wrote it instead, hoping it reaches your heart the way I mean it to. ❤️

I just want to say one last thing — no matter how far life takes us, you’ll always hold a special place in my heart. I’m genuinely proud of you, and I’ll always keep cheering for you silently from my side.

Happy Bhai Dooj, Mishu didi.
You’ll always be more than just a cousin — you’re my sister, my inspiration, and my silent strength. ❤️ and one last request don't show this letter to any elser as if parents find out I will be done just I need this relief and help from you `;

wordsBox.addEventListener("click", () => {
  messageBox.classList.add("show");
  messageContent.textContent = "";
  
  let i = 0;
  const typing = setInterval(() => {
    if (i < messageText.length) {
      messageContent.textContent += messageText.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 30);
});

// close when clicking anywhere outside message
messageBox.addEventListener("click", (e) => {
  if (e.target === messageBox) {
    messageBox.classList.remove("show");
  }
});

