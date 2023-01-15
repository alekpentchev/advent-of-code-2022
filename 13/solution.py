import json

with open('input.txt', 'r', encoding='utf-8') as f:
    data = f.read().split('\n\n')


def compare(a, b):
    return 1 if a < b else -1 if a > b else 0


def compare_lists(a, b):
    if isinstance(a, int) and isinstance(b, int):
        return compare(a, b)
    elif isinstance(a, int) and isinstance(b, list):
        return compare_lists([a], b)
    elif isinstance(a, list) and isinstance(b, int):
        return compare_lists(a, [b])
    elif isinstance(a, list) and isinstance(b, list):
        for l, r in zip(a, b):
            res = compare_lists(l, r)
            if res != 0:
                return res
        return compare_lists(len(a), len(b))


def part_one_solution():
    indices = []

    for i, pair in enumerate(data):
        [first, second] = pair.split('\n')
        first = json.loads(first)
        second = json.loads(second)
        if compare_lists(first, second) == 1:
            indices.append(i+1)

    return sum(indices)


print(part_one_solution())
