/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * понятную человеку строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
    if (typeof bytes !== "number" || bytes < 0) {
        return false;
    }
    const BYTES_PER_KILOBYTE = 1024;
    const iterationsToUnits = {
        0: "B",
        1: "KB",
        2: "MB",
        3: "GB",
        4: "TB",
        5: "PB",
        6: "EB",
    }
    let numberOfIterations = 0;
    while (bytes / BYTES_PER_KILOBYTE >= 1) {
        bytes /= BYTES_PER_KILOBYTE;
        ++numberOfIterations;
    }
    // если число дробное получилось, округлим до сотых, как в примере
    if (bytes % 1) {
        bytes = bytes.toFixed(2);
    }
    return `${bytes} ${iterationsToUnits[numberOfIterations]}`;
}
