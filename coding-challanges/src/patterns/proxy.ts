/*
The Proxy Pattern is a structural design pattern that provides a surrogate or  
placeholder for another object. It controls access to the original object by  
intercepting requests and performing additional operations before or after  
delegating them to the real object. This pattern can be used for various  
purposes, such as controlling access, managing resources, or adding additional  
functionality. Proxies can be categorized into different types, including  
virtual proxies, protection proxies, and remote proxies, each serving specific  
purposes in controlling and managing interactions with the real object.





The Proxy Design Pattern is a structural design pattern that provides a surrogate or 
placeholder for another object to control access to it. Essentially, it allows you 
to create an intermediary object that acts as the actual object. This can be useful 
for various reasons, such as controlling access, lazy initialization, logging, or caching.

Let’s look at an example to understand the concept with and without the proxy design pattern.

Without Proxy Design Pattern:
In this scenario, the client interacts directly with the resource-consuming object.
*/

// A class representing a resource-consuming object
class RealImage {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk(); // This is an expensive operation
  }

  // Simulates loading an image from disk
  private loadFromDisk(): void {
    console.log(`Loading image from disk: ${this.filename}`);
  }

  // Method to display the image
  public display(): void {
    console.log(`Displaying image: ${this.filename}`);
  }
}


// Client code interacting with the real object directly
const image1 = new RealImage("image1.png");
image1.display(); // The image is loaded from disk, then displayed

/*
The RealImage class loads the image from disk immediately upon object creation. This can 
be costly, especially if the client doesn't need to display the image right away.
The client interacts directly with the RealImage object, and the expensive operation 
(loading the image from disk) happens even if it's not immediately needed.
*/

// ########## With Proxy Design Pattern: ###############

// RealImage class remains the same

// Proxy class controlling access to the RealImage
class ImageProxy {
  private realImage: RealImage | null = null;
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  // This method delays loading the actual image until it's needed
  public display(): void {
    if (this.realImage === null) {
      // Load the real image only when necessary
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Client code interacting with the proxy instead of the real object
const proxyImage = new ImageProxy("image2.png");

// The image is not loaded yet (lazy initialization)
console.log("Image has not been loaded yet.");

// Now the image is loaded from disk and displayed when needed
proxyImage.display();
