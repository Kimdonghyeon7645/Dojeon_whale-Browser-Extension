const UNICODE_KOR_START_NUM = 44032,
  UNICODE_KOR_END_NUM = 55199;

const FIRST_JAMO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ",
  SECOND_JAMO = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ",
  LAST_JAMO = " ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

const FIRST_ROMAJA = [
    ["g", "k"],
    "kk",
    "n",
    ["d", "t"],
    "tt",
    ["r", "l"],
    "m",
    ["b", "p"],
    "pp",
    "s",
    "ss",
    "",
    "j",
    "jj",
    "ch",
    "k",
    "t",
    "p",
    "h",
  ],
  SECOND_ROMAJA = [
    "a",
    "ae",
    "ya",
    "yae",
    "eo",
    "e",
    "yeo",
    "ye",
    "o",
    "wa",
    "wae",
    "oe",
    "yo",
    "u",
    "wo",
    "we",
    "wi",
    "yu",
    "eu",
    "ui",
    "i",
  ],
  LAST_ROMAJA = [
    "",
    ["g", "k"],
    "kk",
    ["g", "k"], // ㄳ - ㄱ
    "n",
    "ch", // ㄵ - ㄴ
    "n", // ㄶ - ㄴ
    ["d", "t"],
    ["r", "l"],
    ["g", "k"], // ㄺ - ㄱ
    "m", // ㄻ - ㅁ
    ["r", "l"], // ㄼ - ㄹ
    ["r", "l"], // ㄽ - ㄹ
    ["r", "l"], // ㄾ - ㄹ
    "p", // ㄿ - ㅍ[ㅂ]
    ["r", "l"], // ㅀ - ㄹ
    "m",
    ["b", "p"],
    ["b", "p"], // ㅄ - ㅂ
    "s",
    "ss",
    "ng",
    "j",
    "ch",
    "k",
    "t",
    "p",
    "h",
  ];

function getJamoList(charCode) {
  const firstJamo = Math.floor((charCode - UNICODE_KOR_START_NUM) / 28 / 21),
    secondJamo = Math.floor(((charCode - UNICODE_KOR_START_NUM) / 28) % 21),
    lastJamo = (charCode - UNICODE_KOR_START_NUM) % 28;
  return [firstJamo, secondJamo, lastJamo];
}

function convertRmoajaWord(jamoList) {
  let firstRomaja = FIRST_ROMAJA[jamoList[0]];
  if (typeof firstRomaja == "object" && firstRomaja.length > 1)
    firstRomaja = firstRomaja[0];
  let secondRomaja = SECOND_ROMAJA[jamoList[1]];
  let lastRomaja = LAST_ROMAJA[jamoList[2]];
  if (typeof lastRomaja == "object" && lastRomaja.length > 1)
    lastRomaja = lastRomaja[0];
  return firstRomaja + secondRomaja + lastRomaja;
}

function convertMain(target) {
  let result = "";
  for (const idx in target) {
    const charCode = target.charCodeAt(idx);
    if (charCode >= UNICODE_KOR_START_NUM && charCode <= UNICODE_KOR_END_NUM) {
      const jamoList = getJamoList(charCode);
      result += convertRmoajaWord(jamoList);
    } else {
      result += target[idx]
    }
  }
  console.log(result);
  return result;
}

const inputBox = document.getElementsByClassName("convert-input")[0];
const outputBox = document.getElementsByClassName("convert-output")[0];

inputBox.addEventListener("input", (e) => {
  const val = e.target.value;
  outputBox.textContent = convertMain(val);
});
