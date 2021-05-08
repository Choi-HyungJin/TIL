// 프로그래머스 소수 찾기 (완전탐색 레벨2)
function solution(numbers) {
    let answer = "";
    let primeNumbers = [];

    // 소수 판별 함수
    const isPrime = (number) => {
        const notPrime = [0, 1];

        if (notPrime.includes(number)) return false;

        for (let i = 2; i * i <= number; i++) {
            if (number % i === 0) return false;
        }

        return true;
    };

    // 숫자 만들기
    const mergeNumbers = (arr, str) => {
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                const temp = [...arr];
                temp.splice(i, 1);
                mergeNumbers(temp, str + arr[i]);
            }
        }
        if (str.length > 0) {
            if (isPrime(+str)) {
                primeNumbers.push(parseInt(str));
            }
        }
    };

    mergeNumbers([...numbers], "");

    answer = [...new Set(primeNumbers)].length;

    return answer;
}
