import Web3 from "web3";

const web3 = new Web3();
export const WALLETID = {
  NATIVE: 0x01,
  LEDGER: 0x02,
  TREZOR: 0x03,
  KEYSTOREID: 0x05,
  RAWKEY: 0x06,
};
export const WANPATH = "m/44'/5718350'/0'/0/";

export function fromWei(data) {
  return web3.utils.fromWei(data);
}

export function formatNum(num) {
  if (num && num !== "N/A") {
    if (num < 1) {
      return num;
    }
    let tempNum = new BigNumber(num).toString();
    let [left, right] = tempNum.split(".");
    let tempLeft = left
      .split("")
      .reverse()
      .join("")
      .match(/(\d{1,3})/g);
    let tempRight = right ? `.${right}` : "";
    return tempLeft.join(",").split("").reverse().join("") + tempRight;
  } else {
    return num;
  }
}

export function toWei(data, unit) {
  return "0x" + web3.utils.toBN(web3.utils.toWei(data, unit)).toString(16);
}

export function checkCryptographic(pwd) {
  let reg = new RegExp("(?=^[^\\s]*$)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\S]{6,}");

  return reg.test(pwd);
}

export function checkPhrase(phrase) {
  let formatPhrase = phrase.split(" ");
  return (
    formatPhrase.length === 12 &&
    formatPhrase.every((val) => /^[a-z]{1,}$/.test(val))
  );
}

export function randomSort(arr) {
  return arr.sort(() => (Math.random() > 0.5 ? -1 : 1));
}

export function timeFormat(time) {
  const current = new Date(time * 1000);
  let date = ("0" + current.getDate()).substr(-2);
  let hours = ("0" + current.getHours()).substr(-2);
  let minutes = ("0" + current.getMinutes()).substr(-2);
  let secondes = ("0" + current.getSeconds()).substr(-2);
  let month = ("0" + (current.getMonth() + 1)).substr(-2);
  return `${current.getFullYear()}-${month}-${date} ${hours}:${minutes}:${secondes}`;
}

export function dateFormat(time) {
  const current = new Date(time * 1000);
  let date = ("0" + current.getDate()).substr(-2);
  let month = ("0" + (current.getMonth() + 1)).substr(-2);
  return `${current.getFullYear()}-${month}-${date}`;
}

export function promiseTimeout(ms, p, desc) {
  // Create a promise that rejects in <ms> milliseconds
  let id;
  let timeout = new Promise((resolve, reject) => {
    id = setTimeout(() => {
      clearTimeout(id);
      desc = desc || `Timed out in ${ms} ms!`;
      reject(desc);
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([p, timeout]);
}
