// sketch.js

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

// 每題專屬選項，標籤顯示文字，value 用於計算
let optionsList = [
  [ // Q1
    { label: "同以前一樣", value: 0 },
    { label: "沒有以前那麼多", value: 1 },
    { label: "肯定比以前少", value: 2 },
    { label: "完全不能", value: 3 }
  ],
  [ // Q2
    { label: "同以前一樣", value: 0 },
    { label: "沒有以前那麼多", value: 1 },
    { label: "肯定比以前少", value: 2 },
    { label: "完全不能", value: 3 }
  ],
  [ // Q3
    { label: "沒有這樣", value: 0 },
    { label: "很少這樣", value: 1 },
    { label: "有時候這樣", value: 2 },
    { label: "相當多時候這樣", value: 3 }
  ],
  [ // Q4
    { label: "沒有這樣", value: 0 },
    { label: "很少這樣", value: 1 },
    { label: "有時候這樣", value: 2 },
    { label: "相當多時候這樣", value: 3 }
  ],
  [ // Q5
    { label: "沒有這樣", value: 0 },
    { label: "很少這樣", value: 1 },
    { label: "有時候這樣", value: 2 },
    { label: "相當多時候這樣", value: 3 }
  ],
  [ // Q6
    { label: "我一直都能應付得好", value: 0 },
    { label: "大部分時候我都能像平時那樣應付得好", value: 1 },
    { label: "有時候我不能像平時那樣應付得好", value: 2 },
    { label: "大多數時候我都不能應付", value: 3 }
  ],
  [ // Q7
    { label: "沒有這樣", value: 0 },
    { label: "很少這樣", value: 1 },
    { label: "有時候這樣", value: 2 },
    { label: "相當多時候這樣", value: 3 }
  ],
  [ // Q8
    { label: "沒有這樣", value: 0 },
    { label: "很少這樣", value: 1 },
    { label: "有時候這樣", value: 2 },
    { label: "相當多時候這樣", value: 3 }
  ],
  [ // Q9
    { label: "沒有這樣", value: 0 },
    { label: "很少這樣", value: 1 },
    { label: "有時候這樣", value: 2 },
    { label: "相當多時候這樣", value: 3 }
  ],
  [ // Q10
    { label: "沒有這樣", value: 0 },
    { label: "很少這樣", value: 1 },
    { label: "有時候這樣", value: 2 },
    { label: "相當多時候這樣", value: 3 }
  ]
];

let radios = [];
let submitButton;
let resultP;

function setup() {
  noCanvas();
  const container = select('.container');
  textFont('Noto Sans TC');
  textSize(16);

  questions.forEach((q, i) => {
    createP(`${i + 1}. ${q}`)
      .parent(container)
      .style('font-weight', 'bold');

    let r = createRadio();
    r.parent(container)
     .style('margin-bottom', '10px');

    // 使用該題專屬選項
    optionsList[i].forEach(opt => r.option(opt.value, opt.label));

    // 確保群組獨立
    r.elt.querySelectorAll('input[type=radio]').forEach(inp => inp.name = `q${i}`);
    radios.push(r);
  });

  submitButton = createButton('送出並看結果')
                  .parent(container)
                  .style('font-family', 'Noto Sans TC');
  submitButton.mousePressed(calculateScore);

  resultP = createP('')
            .parent(container)
            .addClass('result')
            .hide();
}

function calculateScore() {
  // 檢查每題
  for (let i = 0; i < radios.length; i++) {
    if (!radios[i].value()) {
      alert(`請回答第 ${i + 1} 題`);
      return;
    }
  }

  // 累計
  let total = radios.reduce((sum, r) => sum + int(r.value()), 0);

  // 解讀
  let interpretation = '';
  if (total < 9) {
    interpretation = '您的身心狀況不錯，請繼續維持。';
  } else if (total <= 12) {
    interpretation = '請注意～您目前狀況可能有情緒困擾，建議多與身旁的人聊聊，必要時可尋求專業人員協助。';
  } else {
    interpretation = '您的身心健康狀況可能需要醫療專業的協助，請找專業醫師協助處理。';
  }

  resultP.html(
    `您的總分是：<strong>${total}</strong> 分<br>` +
    `解讀：${interpretation}`
  ).show();

  // 鎖定
  radios.forEach(r => r.elt.querySelectorAll('input[type=radio]').forEach(inp => inp.disabled = true));
  submitButton.attribute('disabled', '');
}
