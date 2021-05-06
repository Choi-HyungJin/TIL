// 베스트앨범 (해시 레벨3)
function solution(genres, plays) {
    let answer = [];
    let songs = genres.map((genre, index) => {
        return {
            no: index,
            genre: genre,
            play: plays[index],
        };
    });

    let genrePlayCnt = [];
    songs.forEach((song) => {
        let thisGenre = genrePlayCnt.find(
            (genrePlay) => genrePlay.genre === song.genre
        );
        if (!thisGenre) {
            genrePlayCnt.push({
                genre: song.genre,
                play: song.play,
            });
        } else {
            thisGenre.play += song.play;
        }
    });

    genrePlayCnt.sort((a, b) => b.play - a.play);
    genrePlayCnt.forEach((genrePlay) => {
        let thisGenreSongs = songs.filter(
            (song) => genrePlay.genre === song.genre
        );
        thisGenreSongs.sort((a, b) => b.play - a.play);
        answer.push(thisGenreSongs[0].no);
        if (thisGenreSongs.length > 1) {
            answer.push(thisGenreSongs[1].no);
        }
    });

    return answer;
}
