// ############### Without pattern Example ###############

// Existing MediaPlayer interface, which supports only MP4 files
interface MediaPlayer {
  playMP4(filename: string): void;
}

// Concrete class that implements the existing MediaPlayer interface
class MP4Player implements MediaPlayer {
  playMP4(filename: string): void {
    console.log(`Playing MP4 file: ${filename}`);
  }
}

// Client code that can only work with MP4 players
const player: MediaPlayer = new MP4Player();
player.playMP4("example.mp4"); // This works fine

// But if we want to support VLC files:
class VLCPlayer {
  playVLC(filename: string): void {
    console.log(`Playing VLC file: ${filename}`);
  }
}

// Client code cannot use VLCPlayer directly because the interfaces are incompatible
// @ts-expect-error
player.playVLC('example.vlc');  // Error: This method does not exist

// ############### With pattern Example ###############

// Adapter: Makes VLCPlayer compatible with MediaPlayer
class VLCPlayerAdapter implements MediaPlayer {
  private vlcPlayer: VLCPlayer;

  constructor(vlcPlayer: VLCPlayer) {
    this.vlcPlayer = vlcPlayer; // Injecting the adaptee (VLCPlayer)
  }

  // Adapting the playVLC method to the playMP4 interface
  playMP4(filename: string): void {
    this.vlcPlayer.playVLC(filename); // Delegating the call to VLCPlayer
  }
}

// Now the client can use VLCPlayer through the MediaPlayer interface
const vlcPlayer = new VLCPlayer();
const vlcAdapter: MediaPlayer = new VLCPlayerAdapter(vlcPlayer);

vlcAdapter.playMP4("example.vlc"); // Output: Playing VLC file: example.vlc
