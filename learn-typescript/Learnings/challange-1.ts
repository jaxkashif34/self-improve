const houses: House[] = [
  { name: 'Atreides', planets: 'Calladan' },
  { name: 'Corrino', planets: ['Kaitan', 'Salusa Secundus'] },
  { name: 'Harkonnen', planets: ['Giedi Prime', 'Arrakis'] },
];

interface House {
  name: string;
  planets: string | string[];
}

interface HouseWithID extends House {
  id: number;
}

function findHouses(houses: string | House[], filter: (house: House) => boolean): HouseWithID[] {
  const housesJSON = typeof houses === 'string' ? JSON.parse(houses) : houses;
  const housesWithID: HouseWithID[] = housesJSON.map((house: House, index: number) => ({ ...house, id: index }));

  return housesWithID.filter(filter);
}

console.log(findHouses(JSON.stringify(houses), ({ name }) => name === 'Atreides'));
console.log(findHouses(houses, ({ name }) => name === 'Harkonnen'));
export {}