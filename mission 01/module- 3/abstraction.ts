// //oop - abstraction

// /*
// two way of implementation
// 1. interface
// 2. abstract class
// */

// interface MediaPlayer {
//   play(): void;
//   pause(): void;
//   stop(): void;
// }

// //implementation
// class MusicPlayer implements MediaPlayer{
// play() {
//     console.log(`plaing music........`)
// }
// pause() {
//     console.log(`Music is pasued.....`)
// }
// stop(){
//     console.log("Music stoped.")
// }
// }

// const AmranPlayer = new MusicPlayer()
// AmranPlayer.play()

//2 Abstract Class
abstract class MediaPlayer {
  abstract play(): void;
  abstract pause(): void;
  abstract stop(): void;
}

class AmranPlayer extends MediaPlayer {
  play() {
    console.log(`Playing music.....`);
  }

  pause() {
    console.log(`music is pusedd..`);
  }

  stop() {
    console.log(`music is stopeeeed.`);
  }
}

const amranPlayer1 = new AmranPlayer();
amranPlayer1.play();
amranPlayer1.pause();
amranPlayer1.stop();
