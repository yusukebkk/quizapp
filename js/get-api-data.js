//apiで値を取得する
const getQuestionData = async () => {
    //画面をリセットする
    reset();
    //取得中画面を表示
    loading();
    //フェッチ処理
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    //JSONデータの取得
    const jsonData = await response.json();
    const questionData = jsonData.results;
    return questionData;
}