import {get} from 'radash';
export const sortObjectArray = <Type extends object>(
  value: Type[],
  key: keyof Type | string,
  descending = true,
): Type[] => {
  return [...value].sort((firstElement, secondElement): number => {
    const firstValue = get(firstElement, key as string) as number;
    const secondValue = get(secondElement, key as string) as number;

    if (firstValue < secondValue) {
      return descending ? 1 : -1;
    }
    if (firstValue > secondValue) {
      return descending ? -1 : 1;
    }

    return 0;
  });
};
