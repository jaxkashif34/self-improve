function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let val: T = initial;
  return [
    () => val,
    (v: T) => {
      val = v;
    },
  ];
}

const [str1Getter, str1Setter] = simpleState(10);
//   console.log(str1Getter());
//   str1Setter(20);
//   console.log(str1Getter());

const [str2Getter, str2Setter] = simpleState<number | null>(null);
//   console.log(str2Getter());
//   str2Setter(20);
//   console.log(str2Getter());

//   another example

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

const ranker = <RankItem>(items: RankItem[], rank: (v: RankItem) => number): RankItem[] => {
  const ranks: Rank<RankItem>[] = items.map((item) => ({ item, rank: rank(item) }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
};

interface Pokemon {
  name: string;
  hp: number;
}
const pokemon: Pokemon[] = [
  { name: 'Pikachu', hp: 100 },
  { name: 'Mew', hp: 80 },
  { name: 'Bulbasaur', hp: 50 },
];

const ranks = ranker<Pokemon>(pokemon, ({ hp }) => hp);
console.log(ranks);
export {};
