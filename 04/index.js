const fs = require("fs");

// 1.) First, we get the string input for the puzzle
const input = fs.readFileSync("input.txt", "utf-8");
const pairs = input.split("\n");

const range = (start, end) =>
	new Array(end - start + 1).fill().map((d, i) => i + start);

function findFullOverlaps(pairs) {
    let overlaps = []
    let intersections = 0

    for (let pair of pairs) {
        const areas = pair.split(',')
        const firstPart = areas[0].split('-')
        const secondPart = areas[1].split('-')
        
        const firstRange = range(parseInt(firstPart[0]), parseInt(firstPart[1]))
        const secondRange = range(parseInt(secondPart[0]), parseInt(secondPart[1]))

        const firstContainsSecond = firstRange.every(val => secondRange.includes(val))
        const secondContainsFirst = secondRange.every(val => firstRange.includes(val))
        // check if one fully contains the other
        if (firstContainsSecond || secondContainsFirst) {
            overlaps.push(pair)
        }

        // check the intersection of two arrays
        const intersection1Length = firstRange.filter(x => secondRange.includes(x)).length
        const intersection2Length = secondRange.filter(x => firstRange.includes(x)).length
        if (intersection1Length > 0 || intersection2Length > 0) {
            intersections += 1
        }
    }

    return [overlaps.length, intersections]
}

console.log(findFullOverlaps(pairs))