const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
loadLessons();

const manageLoader = (stats) => {
  if (stats === true) {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const removeActive = () => {
  const allBtnLesson = document.querySelectorAll(".lesson-btn");
  allBtnLesson.forEach((button) => button.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageLoader(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWords(data.data);
    });
};

const loadDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.data);
};

const createElements = (arr) => {
  const elements = arr.map((el) => `<span class="btn">${el}</span>`);
  return elements.join(" ");
};

const displayDetails = (word) => {
  const detailsModel = document.getElementById("details-container");
  detailsModel.innerHTML = `
  <div class="">
            <h1 class="text-2xl font-bold">${
              word.word
            } <i class="fa-solid fa-microphone-lines"></i>
              :${word.meaning} 
            </h1>
          </div>
          <div class="">
            <h1 class="font-bold">Meaning</h1>
            <p class="font-bold">${word.meaning}</p>
          </div>
          <div class="">
            <h1 class="font-bold">Example</h1>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h1 class="font-bold">Synonym</h1>
            <div class="">
            ${createElements(word.synonyms)}
            </div>
          </div>
  `;
  document.getElementById("word_modal").showModal();
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // English
  window.speechSynthesis.speak(utterance);
}

const displayLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
       <div
          class="h-[300px]  text-center bg-sky-200 rounded-sm p-10 grid col-span-full space-y-5"
        >
        <div class="flex justify-center">
            <img class="" src="./assets/alert-error.png" alt="" />
          </div>     
        <p class="font-bangla text-xl text-[#79716b]">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h1 class="font-bangla text-4xl font-bold">নেক্সট Lesson এ যান
          </h1>
        </div>
      `;
    manageLoader(false);
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div
          class="bg-white shadow-sm  rounded-xl text-center py-10 px-5 space-y-5"
        >
          <h1 class="text-3xl font-bold font-bangla">${
            word.word ? word.word : " শব্দ পাওয়া যায়নি"
          }</h1>
          <p class="text-xl font-semibold">meaning / pronunciation</p>
          <h2 class="text-2xl ">${
            word.meaning ? word.meaning : "শব্দের অর্থ নেই"
          } / ${
      word.pronunciation ? word.pronunciation : "শব্দের অর্থ নেই"
    }</h2>
          <div class="flex justify-between items-center">
            <button 
            onclick="loadDetails(${word.id})"
            class="bg-[#1a91ff1a] rounded-xl p-4 hover:bg-[#1a91ff80]">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button 
            onclick="pronounceWord('${word.word}')"
            class="bg-[#1a91ff1a] rounded-xl p-4 hover:bg-[#1a91ff80]">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
    `;
    wordContainer.append(card);
  });
  manageLoader(false);
};

const displayLesson = (lessons) => {
  //1. lesson container id set
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  //2 loop
  for (let lesson of lessons) {
    // crate a div
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
    <button 
    id="lesson-btn-${lesson.level_no}"
    onclick="loadLevelWord(${lesson.level_no})"
    class="btn btn-primary btn-outline lesson-btn">
    <i class="fa-solid fa-book-open"></i> Learn- ${lesson.level_no}
    </button>
    
    `;
    levelContainer.append(btnDiv);
  }
};

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const inputValue = document.getElementById("input-search");

  const value = inputValue.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;

      const filterWord = allWords.filter((word) =>
        word.word.toLowerCase().includes(value)
      );
      displayLevelWords(filterWord);
    });
});
