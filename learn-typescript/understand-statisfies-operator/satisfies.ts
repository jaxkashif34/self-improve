// there is also a good documentation of satisfies operator in Learning/satisfied file
// Example 1:

/* basically satisfies operator applies on value ("{}" in this case) not on variable but 
if we use (score:Record<string, number>) it is applies on score variable
*/

/*there are some cases where we should not use the satisfies the operator
Not Use: where we are widening the type like below we may add the properties in score in future (widening)
const score: Record<string, number> = {}; 

Should Use: when we want to widening the type in future we should use variable annotation
const score: Record<string, number> = {}; 
 */ 

/*
in satisfies basically we are saying that this is what we want exactly for example if the object looks like
this {name:"Kashif", age:23} we are saying that this is exactly type what we want and if the the TS knows 
the type of object and it's properties then it will give us the type suggestions for that property
*/ 
const score: Record<string, number> = {}; 

score.english = 100;
score.maths = 60;
