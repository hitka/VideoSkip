import { Slot } from '../models/slot.model';

export const percentsRefMap = new Map<string, HTMLSpanElement>();

export const updatePercents = (slots: Slot[]): void => {
  const totalSum = slots.reduce((accum, { amount }) => accum + (amount || 0), 0);

  slots.forEach(({ id, amount }) => {
    const ref = percentsRefMap.get(id);

    if (ref) {
      ref.innerHTML = ((amount || 0) / totalSum).toFixed(1);
    }
  });
};
