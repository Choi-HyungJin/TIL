// 프린터 (스택/큐 레벨2)
function solution(priorities, location) {
    let answer = 0;
    let targetIndex = location;

    while (priorities.length > 0) {
        let first = priorities.shift();
        if (priorities.some((value) => value > first)) {
            priorities.push(first);
        } else {
            answer = answer + 1;
            if (targetIndex === 0) {
                break;
            }
        }
        if (targetIndex === 0) {
            targetIndex = priorities.length - 1;
        } else {
            targetIndex = targetIndex - 1;
        }
    }

    return answer;
}
