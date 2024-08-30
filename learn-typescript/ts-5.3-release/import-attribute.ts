/* before when we import an image we we are not sure about what type of file 
it is it could be a image url, image blob any it could be anything 

let's say sometimes want to image as a buffer and sometimes we want to 
image as a url in some bundlers we can add the query parameter 

example:
import imageAsBuffer from './image.png?buffer';
import imageAsUrl from './image.png?url';

but now ts 5.3 we have a proper way of doing this and in 
(only works when module option is set to esnext)
*/
import imageAsBuffer from "./images/cape town.jpg" with {type : "buffer"};
// or
import imageAsUrl from "./images/cape town.jpg" with {type : "url"};

// switch(true) Narrowing

// old way

function myFunc(input: unknown) {
  if (typeof input === 'string' || typeof input === 'number') {
    return input;
  } else if (typeof input === 'object' && !!input) {
    // we are checking that if input is an object and not null because typeof null is also object
    return input;
  }
}

// new way

function myFunc2(input: unknown) {
  switch (true) {
    case typeof input === 'string' || typeof input === 'number':
      return input;
    case typeof input === 'object' && !!input:
      return input;
  }
}

// Interactive Inlay Hints

type Point = {
  x: number;
  y: number;
};

/* before enabling this feature on hover on type we only see the type 
of the variable but we can't navigate to that type */
const point: Point = {
    x: 0,
    y: 0
}