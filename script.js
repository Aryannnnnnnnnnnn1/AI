const inputbar = document.querySelector("#inputbar");
const herotext = document.querySelector("#herotext");

inputbar.disabled=true;

const arr = [
  "How Are You Doing ?",
  "What Is Weather Today ?",
  "What Is Happening Now ?",
  "Want A Recipe ?"
];

async function herotextwrite() {
  return new Promise((resolve) => {
    new TypeIt(herotext, {
      cursor: false,
      afterComplete: () => {
        resolve();
      }
    })
    .type("Start searching your thoughts<br>with AI. At Zero Cost,<br><span>With maximum satisfaction.</span>", { delay: 800 })
    .go();
  });
}

async function inputbarwrite() {
  await herotextwrite();
  const instance = new TypeIt(inputbar, {
    loop: true,
    cursor: false,
  });

  for (let i in arr) {
    instance
      .type(arr[i], { delay: 2000 })
      .pause(1500)
      .delete(arr[i].length, { delay: 2000 });
  }

  instance.go();
}

inputbarwrite();
