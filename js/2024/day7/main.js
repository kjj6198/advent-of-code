
function check(target, nums) {
    if (nums.length === 0) {
        return target === 0
    }
    
    return check(target - nums.slice(-1)[0], nums.slice(0, -1)) ||
        ((target % nums.slice(-1)[0]) === 0
            && check(
                Math.floor(target / nums.slice(-1)[0]),
                nums.slice(0, -1)
            )
        )
}

function check2(target, nums) {
    if (nums.length < 2) {
        return nums[0] === target
    }

    // length = 3
    if (check2(target, [nums[0] * nums[1], ...nums.slice(2)])) {
        return true;
    }

    if (check2(target, [nums[0] + nums[1], ...nums.slice(2)])) {
        return true;
    }
    
    if (check2(target, [Number(`${nums[0]}${nums[1]}`), ...nums.slice(2)])){
        return true;
    }
    
    return check2(target - nums.slice(-1)[0], nums.slice(0, -1)) ||
        ((target % nums.slice(-1)[0]) === 0
            && check2(
                Math.floor(target / nums.slice(-1)[0]),
                nums.slice(0, -1)
            )
        )
}

export function part1(input) {
    const lines = input.split('\n');
    let sum = 0;

    lines.forEach(line => {
        let [target, nums] = line.split(': ');
        target = Number(target);
        nums = nums.split(' ').map(Number);

        if (check(target, nums)) {
            sum += target;
        }
    })
    return [sum, lines]
}

export function part2(lines) {
    let sum = 0
    lines.forEach(line => {
        let [target, nums] = line.split(': ');
        target = Number(target);
        nums = nums.split(' ').map(Number);

        if (check2(target, nums)) {
            sum += target;
        }  
    })
    return sum
}