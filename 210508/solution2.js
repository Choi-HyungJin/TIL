// 프로그래머스 정렬 레벨2 H-Index
function solution(citations) {
    let answer = 0;

    citations.sort((a, b) => b - a);

    let index = 0;
    while (index <= citations.length) {
        if (index + 1 <= citations[index]) {
            index++;
        } else {
            break;
        }
    }

    return index;
}
