//クイズのメイン処理
const makeQuestion = async (questionData, count = 0, score = 0) => {
    //画面をリセットする
    reset();
    //questionDataがない場合にquestionDataを取得する
    if (!questionData){
        console.log('no data')
        //問題データの取得
        questionData = await getQuestionData();
    }
    //最終問題が完了したかどうかチェック
    if (count < 10){
        //count番目の問題情報を取得
        const category = questionData[count]['category'];
        const difficulty = questionData[count]['difficulty'];
        const question = questionData[count]['question'];
        const correctAnswer = questionData[count]['correct_answer'];
        const incorrectAnswers = questionData[count]['incorrect_answers'];
        //問題の情報を画面のテキストに反映
        changeText('title', '問題'+(count+1));
        changeText('category', '[ジャンル]'+category);
        changeText('difficulty', '[難易度]'+difficulty);
        changeText('message', question);
        //選択肢を追加
        addChoiceButtons(correctAnswer, incorrectAnswers, score, count, questionData);
    //最終問題が完了していれば結果を表示する
    }else{
        //結果表示
        showResult(score);
    }
}

//ボタンの追加処理
const addChoiceButtons = (correctAnswer, incorrectAnswers, score, count, questionData) =>{
    //ボタンリスト作成
    const buttonList =[];
    //全ての選択肢のリスト作成
    const allChoice = incorrectAnswers;
    //選択肢に正解を追加
    allChoice.push(correctAnswer);
    //それぞれの選択肢の
    for (let i = 0; i < 4; i++){
        //各選択肢を選んだ際に発生するイベントを規定
        const checkAnswer = (
            currentScore = score,
            currentCount = count,
            currentQuestionData = questionData,
            currentI = i
        ) =>{
            //正解の選択肢の場合正解数をプラスする
            if (currentI === 3){
                currentScore++;
            }
            //次の問題を表示
            makeQuestion(currentQuestionData, currentCount+1, currentScore);
        }
        //規定したイベントをもつボタンを作成してリストに追加
        const button = createButton(allChoice[i], checkAnswer);
        buttonList.push(button);
        
    }
    //ボタンリストをシャッフルする
    arrShuffle(buttonList);
    Array.from(buttonList, button => {
        addButton(button);
    });
}

//最初の画面のテキストをセット
const createfirstDisplay = () => {
    reset();
    changeText('title', 'ようこそ');
    changeText('message', '以下のボタンをクリック');
    const button = createButton('開始', makeQuestion);
    addButton(button);
}

//結果を表示する
const showResult = score =>{
    //画面リセット
    reset();
    //表示テキスト更新
    changeText('title', 'あなたの正答数は'+score+'です！！');
    changeText('message', '再度チャレンジしたい場合は以下をクリック');
    //ボタン作成
    const button = createButton('ホームに戻る', createfirstDisplay);
    //ボタン追加
    addButton(button);
}