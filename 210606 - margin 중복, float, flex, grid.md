# 210606 - margin 중복, float, flex, grid

## margin - 중복 (Collapse)

- 부모의 margin-top과 자식의 margin-top이 겹칠 때
- 부모의 margin-bottom과 자식의 margin-bottom이 겹칠 때
- 형제 간의 margin-top, margin-bottom이 겹칠 때
1. 두 값이 모두 양수일 경우 더 큰 값으로 지정
2. 두 값이 모두 음수일 경우 더 작은 값으로 지정
3. 양수와 음수일 경우 두 값의 합으로 지정

## float, float 디스플레이 수정

- flex, inline-flex 를 제외하고 나머지 display 값을 block으로 변경
- float 해제 - clear `left` `right` `both`
- float가 지정된 요소의 부모 요소에 clearfix 클래스 지정

```css
.classfix::after {
	content: "";
	display: block;
	clear: both;	
}
```

## position의 display 수정

- absolute, fixed 속성 값이 적용된 요소는 display 속성의 값이 대부분 block으로 수정됨
- flex, inline-flex는 수정되지 않음

## flex

### containers

- display: `flex`, `inline-flex`
- flex-direction: `row` `row-reverse` `column` `column-reverse`
- flex-wrap: `wrap` `nowrap` `wrap-reverse`
- justify-content: `flex-start` `flex-end` `center` `space-between` `space-around`
- align-content: flex-wrap 속성을 통해 Items가 여러 줄(2줄 이상)이고 여백이 있을 경우만 사용 가능
    - `stretch` `flex-start` `flex-end` `center` `space-between` `space-around`
- align-items: Items가 한 줄일 경우 많이 사용. 여러 줄일 경우 align-content가 우선
    - `stretch` `flex-start` `flex-end` `center` `baseline`

### items

- order: 숫자가 클수록 순서가 밀림. 음수 허용. HTML 구조와 상관없이 순서 변경 가능. 기본값 0
- flex-grow: 증가 너비 비율. 기본값 0.
- flex-shrink: 감소 너비 비율. 기본값 1.
- flex-basis: Item의 (공간 배분 전) 기본 너비 설정. 기본값 auto. 값이 auto일 경우 width, height로 너비 설정.
- flex: `flex-grow` 기본값 0  `flex-shrink` 기본값 1  `flex-basis` 기본값 auto
    - flex: 1; ⇒ flex-grow: 1, flex-shrink: 1, **flex-basis: 0**
- align-self: 교차 축에서 **개별 Item의 정렬 방법** 설정. align-items 속성보다 우선
    - `auto` `flex-start` `flex-end` `center` `baseline`

## grid

2차원 레이아웃 시스템 제공

### Containers

- display: `grid`, `inline-grid`;
- grid-template-rows, grid-template-columns: 열과 행 크기 정의 및 라인 이름 정의 가능. fr(fraction, 공간 비율) 단위 사용 가능. repeat() 함수 사용가능
- grid-template-areas: 지정된 그리드 영역 이름(`grid-area`)을 참조해 그리드 템플릿 생성
    - `grid-area` 는 Item에 적용하는 속성
- row-gap, column-gap: 각 행과 행, 열과 열 사이의 간격(Gutter)을 지정
    - gap: <row-gap>  <column-gap>
- grid-auto-rows, grid-auto-columns: 암시적 행(Track)의 크기를 정의. 명시적 행 외부에 배치되는 경우 암시적 행의 크기가 적용됨. 양수 라인 번호만 사용 가능함.
- gird-auto-flow: 배치하지 않은 아이템을 어떤 방식의 '자동 배치 알고리즘'으로 처리할지 정의
    - `row` `column` `row dense` `column dense`
- grid-template: <grid-template-rows> / <grid-template-columns>
    - <grid-template-areas>
- grid: <grid-template>
    - <grid-template-rows> / <grid-template-columns>
    - <grid-template-rows> / <grid-auto-flow> <grid-auto-columns>
    - <grid-auto-flow> <grid-auto-rows> / <grid-template-columns>
- align-content: 그리드 콘텐츠의 수직 정렬. 세로 너비가 그리드 컨테이너보다 작아야 함.
- justify-content: 그리드 콘텐츠의 수평 정렬. 가로 너비가 그리드 컨테이너보다 작아야 함.
- align-items: 그리드 아이템들의 수직 정렬. 아이템의 세로 너비가 자신이 속한 그리드 행의 크기보다 작아야 함
- justify-items: 그리드 아이템들의 수평 정렬. 아이템의 가로 너비가 자신이 속한 그리드 열의 크기보다 작아야 함

### Items

- grid-column: <grid-column-start> / <grid-column-end>
- grid-row: <grid-row-start> / <grid-row-end>
- grid-area: <grid-row-start> / <grid-column-start> / <grid-row-end> / <grid-column-end>
    - 영역 이름 설정 가능
- align-self, justify-self: 단일 그리드 아이템을 수직 / 수평 정렬. 자신이 속한 행 / 열의 크기 보다 작아야 함.
- order: 자동 배치되는 순서 변경. 숫자가 작을 수록 앞서 배치
- z-index: 아이템이 쌓이는 순서를 변경

### Grid Items 함수 - repeat, minmax, fit-content

- repeat: 행/열의 크기 정의 반복. (반복되는 횟수, 행/열의 크기 정의)
- minmax: 행/열의 최소/최대 크기 정의 (최솟값, 최댓값)
- fit-content: 행/열의 크기를 그리드 아이템이 포함하는 내용 크기에 맞춤. (내용의 최대 크기)

### Grid Units

- fr (fractional unit): 사용 가능한 공간에 대한 비율
- min-content: 그리드 아이템이 포함하는 내용의 최소 크기
- max-content: 그리드 아이템이 포함하는 내용의 최대 크기
- auto-fill, auto-fit: 행/열의 개수를 그리드 컨테이너 및 행/열 크기에 맞게 자동으로(암시적) 조정
    - repeat() 함수와 같이 사용
    - auto-fill은 모든 아이템을 수용하고 남는 공간이 있을 때 남는 공간 유지, auto-fit은 남는 공간 축소