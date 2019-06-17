//ボタンの作成処理
const createButton = (text, eventListner) => {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.addEventListener ('click', (e, event = eventListner) => {
        　eventListner();
    });
    return button;
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

//テキストを変更
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

//ロード画面を表示
const loading = () => {
    //テキストを変更
    changeText('title', '取得中');
    changeText('message', '少々お待ちください');
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

