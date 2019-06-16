{
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
    //ボタンの追加処理
    const createButton = (text, func) => {
        const button = document.createElement('button');
        button.textContent = text;
        console.log(typeof func, "tyepeof func");
        console.log(typeof a, "typeof a");
        button.addEventListener ('click', (e, event = func) => {
            　func();
        });
        return button;
    }
    //ロード画面を表示
    const loading = () => {
        //テキストを変更
        changeText('title', '取得中');
        changeText('message', '少々お待ちください');
    }
    const changeText = (place, text)=>{
        cssPathList = {
            "title":'p.title',
            "category":"p.category",
            'difficulty':'p.difficulty',
            'message':'p.message'
        }
        cssPath = cssPathList[place];
        //受け取ったパスとテキストに応じてテキストを変更
        document.querySelector(cssPath).innerHTML = text;
    }
    //ボタン追加
    const addButton = button => {
        const br = document.createElement('br');
        document.querySelector('div.button-area').appendChild(button);
        document.querySelector('div.button-area').appendChild(br);
    }
    //ボタンエリア初期化
    const deleteAllbutton = () =>{
        document.querySelector('div.button-area').textContent ="";
    }
    //初期化処理
    const createInitialDisplay = () => {
        //bodyを空にする
        document.body.textContent = '';
        //要素の作成
        const top = document.createElement('div');
        const title = document.createElement('p');
        const category = document.createElement('p');
        const difficulty = document.createElement('p');
        const messageArea = document.createElement('div');
        const message = document.createElement('p');
        const buttonArea = document.createElement('div');
        //クラスの追加
        top.classList.add('top');
        messageArea.classList.add('message-area');
        message.classList.add('message');
        buttonArea.classList.add('button-area');
        title.classList.add('title', 'txtl');
        category.classList.add('category', 'txtm');
        difficulty.classList.add('difficulty', 'txtm');
        //bodyに追加
        messageArea.appendChild(message);
        top.appendChild(title);
        top.appendChild(category);
        top.appendChild(difficulty);
        document.body.appendChild(top);
        document.body.appendChild(messageArea);
        document.body.appendChild(buttonArea);
    }
    //画面リセット
    const reset = () => {
        changeText('title', '');
        changeText('category', '');
        changeText('difficulty', '');
        changeText('message', '')
        deleteAllbutton();
    }
    //最初の画面のテキストをセット
    const createfirstDisplay = () => {
        reset();
        changeText('title', 'ようこそ');
        changeText('message', '以下のボタンをクリック');
        const button = createButton('開始', makeQuestion);
        addButton(button);
    }
    //シャッフルする
    const arrShuffle = arr => {
        let len = arr.length;
        while(len > 0){
          let rnd = Math.floor(Math.random() * len);
          let tmp = arr[len-1];
          arr[len-1] = arr[rnd];
          arr[rnd] = tmp;
          len-=1;
        }
      }
    //エントリーポイント
    createInitialDisplay();
    createfirstDisplay();
}
