let games = [];

// ترتيب المعالجات
const cpuRank = { i3: 1, i5: 2, i7: 3, i9: 4 };

// ترتيب كروت الشاشة
const gpuRank = {
  "GTX 660": 1,
  "GTX 1050": 2,
  "GTX 1060": 3,
  "GTX 1660": 4,
  "RTX 2060": 5
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