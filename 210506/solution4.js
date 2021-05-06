// 이중우선순위 큐 (힙 레벨3)
function solution(operations) {
    let answer = [];
    let dualPriorityQueue = [];

    operations.forEach((operation) => {
        switch (operation[0]) {
            case "I": {
                dualPriorityQueue.push(parseInt(operation.slice(2)));
                break;
            }
            case "D": {
                if (operation.slice(2, 3) !== "-") {
                    if (dualPriorityQueue.length !== 0) {
                        dualPriorityQueue.splice(
                            dualPriorityQueue.indexOf(
                                Math.max(...dualPriorityQueue)
                            ),
                            1
                        );
                    }
                } else {
                    dualPriorityQueue.splice(
                        dualPriorityQueue.indexOf(
                            Math.min(...dualPriorityQueue)
                        ),
                        1
                    );
                }
                break;
            }
        }
        console.log(dualPriorityQueue);
    });

    if (dualPriorityQueue.length === 0) {
        answer.splice(0, 0, ...[0, 0]);
    } else {
        let max = Math.max(...dualPriorityQueue);
        let min = Math.min(...dualPriorityQueue);
        answer.splice(0, 0, ...[max, min]);
    }

    return answer;
}
