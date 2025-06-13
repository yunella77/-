let questions = [
  "我能開懷的笑並看到事物有趣的一面",
  "我能夠以快樂的心情來期待事情",
  "當事情不順利時，我會不必要地責備自己",
  "我會無緣無故感到焦慮和擔心",
  "我會無緣無故感到害怕和驚慌",
  "事情壓得我喘不過氣來",
  "我很不開心以致失眠",
  "我感到難過和悲傷",
  "我的不快樂導致我哭泣",
  "我會有傷害自己的想法"
];

// 選項文字，分數不在畫面顯示，由後台計算
let options = [
  { label: "沒有改變／同以前一樣", value: 0 },
  { label: "沒有以前那麼多／很少這樣", value: 1 },
  { label: "肯定比以前少／有時候這樣", value: 2 },
  { label: "完全不能／相當多時候這樣", value: 3 }
];

let radios = [];
let submitButton;
let resultP;

function setup() {
  noCanvas();
  textSize(16);

  questions.forEach((q, i) => {
    createP(`${i + 1}. ${q}`).style("font-weight", "bold");
    let r = createRadio();
    r.style("margin-bottom", "10px");
    options.forEach(opt => r.option(opt.value, opt.label));
    // 設定每題的 input name，使 Radio 群組獨立
    let inputs = r.elt.querySelectorAll('input[type=radio]');
    inputs.forEach(input => input.name = `question${i}`);
    radios.push(r);
  });

  submitButton = createButton("送出並看結果");
  submitButton.mousePressed(calculateScore);

  resultP = createP("").style("font-size", "18px").hide();
}

function calculateScore() {
  // 確認每題皆有選擇
  for (let i = 0; i < radios.length; i++) {
    if (!radios[i].value()) {
      alert(`請回答第 ${i + 1} 題`);
      return;
    }
  }

  // 計算總分
  let total = radios.reduce((sum, r) => sum + int(r.value()), 0);

  // 解讀結果
  let interpretation = "";
  if (total < 9) {
    interpretation = "您的身心狀況不錯，請繼續維持。";
  } else if (total <= 12) {
    interpretation = "請注意～您目前狀況可能有情緒困擾，建議多與身旁的人聊聊，必要時可尋求專業人員協助。";
  } else {
    interpretation = "您的身心健康狀況可能需要醫療專業的協助，請找專業醫師協助處理。";
  }

  // 顯示結果並鎖定
  resultP.html(
    `您的總分是：<strong>${total}</strong> 分<br>` +
    `解讀：${interpretation}`
  ).show();

  radios.forEach(r => r.elt.querySelectorAll('input[type=radio]').forEach(inp => inp.disabled = true));
  submitButton.attribute("disabled", "");
}
