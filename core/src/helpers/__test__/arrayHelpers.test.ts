import {sortObjectArray} from '../arrayHelpers';

describe('sortObjectArray', () => {
  const objectArray = [
    {id: 1, value: 30},
    {id: 2, value: 20},
    {id: 3, value: 40},
    {id: 4, value: 10},
  ];

  it('should sort the array in descending order based on the specified key', () => {
    const sortedArray = sortObjectArray(objectArray, 'value', true);

    expect(sortedArray).toEqual([
      {id: 3, value: 40},
      {id: 1, value: 30},
      {id: 2, value: 20},
      {id: 4, value: 10},
    ]);
  });

  it('should sort the array in ascending order based on the specified key', () => {
    const sortedArray = sortObjectArray(objectArray, 'value', false);

    expect(sortedArray).toEqual([
      {id: 4, value: 10},
      {id: 2, value: 20},
      {id: 1, value: 30},
      {id: 3, value: 40},
    ]);
  });

  it('should handle sorting based on non-numeric keys', () => {
    const stringArray = [
      {id: 1, name: 'Alice'},
      {id: 2, name: 'Bob'},
      {id: 3, name: 'Charlie'},
    ];

    const sortedArray = sortObjectArray(stringArray, 'name', true);

    expect(sortedArray).toEqual([
      {id: 3, name: 'Charlie'},
      {id: 2, name: 'Bob'},
      {id: 1, name: 'Alice'},
    ]);
  });

  it('should handle sorting with equal values', () => {
    const equalValuesArray = [
      {id: 1, value: 30},
      {id: 2, value: 30},
      {id: 3, value: 30},
    ];

    const sortedArray = sortObjectArray(equalValuesArray, 'value', true);

    expect(sortedArray).toEqual([
      {id: 1, value: 30},
      {id: 2, value: 30},
      {id: 3, value: 30},
    ]);
  });

  it('should not modify the original array', () => {
    const originalArray = [...objectArray];
    sortObjectArray(objectArray, 'value', true);

    expect(objectArray).toEqual(originalArray);
  });
});
