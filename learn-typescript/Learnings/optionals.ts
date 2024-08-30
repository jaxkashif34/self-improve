const printIngredients = (quantity: string, ingredients: string, extra?: string) => {
  console.log(`${quantity} ${ingredients} ${extra ? ` ${extra}` : ''}`);
};

// printIngredients('1 cup', 'flour');
// printIngredients('1 cup', 'flour', '1/2tsp');

interface User {
  id: string;
  info?: {
    email?: string;
  };
}

function getEmail(user: User): string {
  // bad code
  if (user.info) {
    if (user.info.email) {
      return user.info.email;
    }
  }
  return '';
}

function getEmailEasy(user: User): string {
  // good code
  return user?.info?.email ?? '';
}

function addWithCb(x: number, y: number, callback?: () => void) {
  console.log([x, y]);
  callback?.(); // if callback is undefined, it will not be called
}
