const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
loadLessons();
const removeActive = () => {
  const allBtnLesson = document.querySelectorAll(".lesson-btn");
  allBtnLesson.forEach((button) => button.classList.remove("active"));
};

const loadLevelWord = (id) => {
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
// {
// "id": 9,
// "level": 5,
// "word": "Illuminate",
// "meaning": "আলোকিত করা",
// "pronunciation": "ইলুমিনেট"
// }

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
            onclick="my_modal_5.showModal()"
            class="bg-[#1a91ff1a] rounded-xl p-4 hover:bg-[#1a91ff80]">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="bg-[#1a91ff1a] rounded-xl p-4 hover:bg-[#1a91ff80]">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
    `;
    wordContainer.append(card);
  });
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
