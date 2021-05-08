// 프로그래머스 카펫 (완전탐색 레벨2)
function solution(brown, yellow) {
    let answer = [];

    let sum = brown / 2 + 2;
    let product = yellow + 2 * sum - 4;

    for (let n = 0; n < 2500; n++) {
        for (let m = 0; m <= n; m++) {
            if (n * m === product && n + m === sum) {
                answer.push(n, m);
            }
        }
    }

    return answer;
}
