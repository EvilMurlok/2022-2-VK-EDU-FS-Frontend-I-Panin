/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman("228")).toBeFalsy();
  expect(convertBytesToHuman(-0.90)).toBeFalsy();
  expect(convertBytesToHuman(undefined)).toBeFalsy();
  expect(convertBytesToHuman(null)).toBeFalsy();
  expect(convertBytesToHuman("Why react and not vue?:(")).toBeFalsy();
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(5)).toBe("5 B");
  expect(convertBytesToHuman(0)).toBe("0 B");
  expect(convertBytesToHuman(1023)).toBe("1023 B");
  expect(convertBytesToHuman(1024)).toBe("1 KB");
  expect(convertBytesToHuman(2048)).toBe("2 KB");
  expect(convertBytesToHuman(123123123)).toBe("117.42 MB");
  expect(convertBytesToHuman(1000000000000)).toBe("931.32 GB");
  expect(convertBytesToHuman(10909097306900701000)).toBe("9.46 EB");
});
