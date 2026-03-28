let games = [];

// ترتيب المعالجات
const cpuRank = { i3: 1, i5: 2, i7: 3, i9: 4 };

// ترتيب كروت الشاشة
const gpuRank = {
  "GTX 1050": 1,
  "GTX 1050 Ti": 2,
  "GTX 1650": 3,
  "GTX 1650 Super": 4,
  "GTX 1660": 5,
  "GTX 1660 Super": 6,
  "GTX 1660 Ti": 7,
  "RTX 2060": 8,
  "RTX 2060 Super": 9,
  "RTX 3050": 10,
  "RTX 3050 Ti": 11,
  "RTX 3060": 12,
  "RTX 3060 Ti": 13,
  "RTX 3070": 14,
  "RTX 3070 Ti": 15,
  "RX 6600": 16,
  "RX 6600 XT": 17,
  "RX 6700 XT": 18,
  "RX 6750 XT": 19,
  "RTX 3080": 20,
  "RTX 3080 Ti": 21,
  "RX 6800": 22,
  "RX 6800 XT": 23,
  "RTX 4070": 24,
  "RTX 4070 Ti": 25,
  "RTX 4080": 26,
  "RX 6900 XT": 27,
  "RX 6950 XT": 28,
  "RTX 4090": 29,
  "RTX 4060": 30,
  "RTX 4060 Ti": 31,
  "RTX 4070 SUPER": 32,
  "RTX 4080 SUPER": 33,
  "RX 7600": 34,
  "RX 7700 XT": 35,
  "RX 7800 XT": 36,
  "RTX 3090": 37,
  "RTX 3090 Ti": 38,
  "RX 7900 XT": 39,
  "RX 7900 XTX": 40,
  "RTX 4090 Ti": 41,
  "RTX 5050": 42,
  "RTX 5060": 43,
  "RTX 5060 Ti": 44,
  "RTX 5070": 45,
  "RTX 5070 Ti": 46,
  "RTX 5080": 47,
  "RTX 5090": 48

};

// تحميل الألعاب
fetch("games.json")
  .then(res => res.json())
  .then(data => games = data);

function checkGames() {
  const userCPU = document.getElementById("cpu").value;
  const userGPU = document.getElementById("gpu").value;
  const userRAM = parseInt(document.getElementById("ram").value);

  const high = document.getElementById("high");
  const medium = document.getElementById("medium");
  const low = document.getElementById("low");

  high.innerHTML = "";
  medium.innerHTML = "";
  low.innerHTML = "";

  games.forEach(game => {
    const cpuUser = cpuRank[userCPU] || 0;
    const gpuUser = gpuRank[userGPU] || 0;

    const cpuMin = cpuRank[game.min.cpu];
    const gpuMin = gpuRank[game.min.gpu];

    const cpuRec = cpuRank[game.rec.cpu];
    const gpuRec = gpuRank[game.rec.gpu];

    if (cpuUser >= cpuRec && gpuUser >= gpuRec && userRAM >= game.rec.ram) {
      addGame(high, game.name);
    } 
    else if (cpuUser >= cpuMin && gpuUser >= gpuMin && userRAM >= game.min.ram) {
      addGame(medium, game.name);
    } 
    else if (cpuUser >= cpuMin - 1 && gpuUser >= gpuMin - 1) {
      addGame(low, game.name);
    }
  });
}

function addGame(list, name) {
  const li = document.createElement("li");
  li.textContent = name;
  list.appendChild(li);
}
