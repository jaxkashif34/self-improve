export {};
const beforeLoad = 'beforeLoad';
const loading = 'loading';
const loaded = 'loaded';

enum loadingState {
  beforeLoad = 'beforeLoad',
  loading = 'loading',
  loaded = 'loaded',
}

const isLoading = (state: loadingState) => state === loadingState.loading;

console.log(isLoading(loadingState.beforeLoad)); // false

const englishLoadingState = {
  [loadingState.beforeLoad]: 'Before Load',
};
// enums are just like strings
console.log(englishLoadingState); // { beforeLoad: 'Before Load' }

// Literal Types

const rollDice = (dice: 1 | 2 | 3): number => {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    const dice = Math.floor(Math.random() * 5);
    pip += dice + 1;
  }
  return pip;
};

console.log(rollDice(3)); // 12

// function overloading

function sendEvent(name: 'addToCart', data: { productId: number }): void;
function sendEvent(name: 'checkout', data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEvent('addToCart', { productId: 123 });
