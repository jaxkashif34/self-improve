interface BaseThing {
  name?: string;
  id: string;
}
interface CoolThing extends BaseThing {
  cool: boolean;
}
interface CoolThingUpdate extends CoolThing {
  modifiedEpoch: number;
}
const coolThing: Prettify<CoolThingUpdate> = {
  // without Prettify when we hover on coolThin this will display the TypeName in the tooltip and after applying Prettify it will display the properties of the object
  id: '1',
  cool: true,
  modifiedEpoch: Date.now(),
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
