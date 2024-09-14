/*
The Facade Pattern is a structural design pattern that provides a simplified  
interface to a complex subsystem. It involves creating a facade class that  
delegates client requests to appropriate components of the subsystem,  
hiding its complexity. This pattern makes it easier for clients to interact  
with the subsystem by offering a unified and easier-to-use interface. The  
facade class encapsulates the complexities of the subsystem and helps in  
reducing dependencies between client code and the subsystem components.

*/ 

// Complex subsystem 1: TV class
class TV {
  turnOn(): void {
    console.log("Turning on the TV");
  }

  setChannel(channel: string): void {
    console.log(`Setting TV channel to ${channel}`);
  }
}

// Complex subsystem 2: Sound system class
class SoundSystem {
  turnOn(): void {
    console.log("Turning on the sound system");
  }

  setVolume(level: number): void {
    console.log(`Setting sound volume to ${level}`);
  }
}

// Complex subsystem 3: Lights class
class Lights {
  dim(level: number): void {
    console.log(`Dimming lights to ${level}%`);
  }
}

// Facade class: Provides a simple interface for controlling the entire entertainment system
class HomeTheaterFacade {
  private tv: TV;
  private soundSystem: SoundSystem;
  private lights: Lights;

  constructor(tv: TV, soundSystem: SoundSystem, lights: Lights) {
    this.tv = tv;
    this.soundSystem = soundSystem;
    this.lights = lights;
  }

  // Simplified method to start movie night
  startMovieNight(): void {
    console.log("Starting movie night...");

    this.lights.dim(20); // Dim the lights
    this.tv.turnOn(); // Turn on the TV
    this.tv.setChannel("Netflix"); // Set the TV to Netflix
    this.soundSystem.turnOn(); // Turn on the sound system
    this.soundSystem.setVolume(15); // Set a comfortable volume level
  }

  // Simplified method to end movie night
  endMovieNight(): void {
    console.log("Ending movie night...");
    this.lights.dim(100); // Bring the lights back to full brightness
    console.log("Turning off all devices");
  }
}

// Client code
const tv = new TV();
const soundSystem = new SoundSystem();
const lights = new Lights();

// Facade is created with the subsystems
const homeTheater = new HomeTheaterFacade(tv, soundSystem, lights);

// Client interacts only with the facade, no need to interact with the subsystems directly
homeTheater.startMovieNight(); // Simplifies starting the movie night
homeTheater.endMovieNight(); // Simplifies ending the movie night
