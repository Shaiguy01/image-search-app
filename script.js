const accessKey = "1Z3r_mHfxY4WPEMXPgOjTZ7M9JbJ-Bscu3Im9_jQMoU";

/* javascript notes and learning */
const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("Search-Input");
const searchResults = document.querySelector(".Search-Results");
const showMore = document.getElementById("show-more-btn");
const backtohome = document.getElementById("back-btn");

let InputData = ""; //storing input data blank for now
let page = 1; //page #1 default

async function searchImages() {
  //way to write method? async works with response and fetch
  InputData = inputE1.value; //now stores input
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${InputData}&client_id=${accessKey}`;

  const response = await fetch(url); //response. fetching images
  const data = await response.json(); //change into json

  const results = data.results; //storing data results

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("S-Result");

    const imageLink = document.createElement("a");
  imageLink.href = result.links.html;
  imageLink.target = "_blank";

  const image = document.createElement("img");
  image.src = result.urls.small;
  image.alt = result.alt_description;

  imageLink.appendChild(image); // Append the image inside the anchor tag

  const description = document.createElement("p");
  description.textContent = result.description;

  imageWrapper.appendChild(imageLink); // Append the anchor tag to the image wrapper
  imageWrapper.appendChild(description); // Append the description after the image
  searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }

  page++;
  if (page > 1) {
    backtohome.style.display = "block";
  }
}

formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages(); //function
});

showMore.addEventListener("click", () => {
  searchImages(); //function
});

backtohome.addEventListener("click", () => {
  window.location.href = "index.html";
});

