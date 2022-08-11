'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime; // タイマースタート
  let timeoutId; // タイマーストップ
  let elapsedTime = 0; // タイマーが走っていた時間

  // タイマーの動きや描画の設定
  function countUp() {
    // console.log(Date.now() - startTime);
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }
  //

  // ボタンの動きに制限をかけるためのコード(制限しないとおかしな動作するので…)
  function setButtonStateInitial() { // スタート時はスタートだけを押せる仕様にする
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateRunning() { // スタート後ストップだけを押せる仕様にする
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateStopped() { // ストップの時はストップだけを押せない仕様にする
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();

  start.addEventListener('click', () => { // クリックしたときの処理(スタート)
    if (start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning(); 
    startTime = Date.now();
    countUp();
  });

  stop.addEventListener('click', () => { // クリックしたときの処理(ストップ)
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });

  reset.addEventListener('click', () => { // クリックしたときの処理(リセット)
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000'; // タイマーを元に戻すのでテキストを0表記とする
    elapsedTime = 0; // これがないとリセットして再スタート際にリセット前のタイムから始まってしまう
  });
}
