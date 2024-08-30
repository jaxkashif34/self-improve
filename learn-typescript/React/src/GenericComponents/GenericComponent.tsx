import React from 'react';

export const GenericComponent = () => {
  return (
    <>
      <Table
        rows={[{ name: 'Kashif' }]}
        /* now if we add the any other property in the row along with name 
        we then TS will automatically infer that property as well*/
        RowComponent={(row) => <td>{row.name}</td>}
      />

      <TableOld
        rows={[{ name: 'Kashif' }]}
        RowComponent={(row) => <td>{row.name}</td>}
      />
    </>
  );
};

const TableOld = ({
  rows,
  RowComponent,
}: {
  rows: any[];
  RowComponent: React.FC<any>;
}) => {
  return (
    <table>
      <tbody>
        {rows.map((row) => {
          // for now we don't know what the row will look like
          /* we can define the row type but that will be very 
          hard to maintain as we will have to change the type every time we change the row
          (row: {name: string}) like this
          */
          return <RowComponent {...row} />;
        })}
      </tbody>
    </table>
  );
};

// now lets create Generic Component

const Table = <T extends Record<string, any>>({
  rows,
  RowComponent,
}: {
  rows: T[];
  RowComponent: React.FC<T>;
}) => {
  return (
    <table>
      <tbody>
        {rows.map((row) => {
          return <RowComponent {...row} />;
          /*   before adding the constraint to T we have an error of saying 
          ( Type 'T' is not assignable to type 'IntrinsicAttributes'.) so to 
          resolve this we need to add constraint to T to tell that T is an object
           */
        })}
      </tbody>
    </table>
  );
};

/* now if we call table like this we can see the type of row whatever array type we pass in 
on hover we can see the type of row (string in this case)
if we don't call like this there is no way we can see the type of row
*/
Table({
  rows: [{ name: 'Kashif' }],
  RowComponent: (row) => <td>{row.name}</td>,
});
