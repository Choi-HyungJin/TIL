// 프로그래머스 정렬 레벨2 가장 큰 수
function solution(numbers) {
    let answer = "";
    numbers = numbers
        .map((value) => value + "")
        .sort((a, b) => b + a - (a + b));
    answer[0] === "0" ? (answer = "0") : (answer = numbers.join(""));

    return answer;
}
