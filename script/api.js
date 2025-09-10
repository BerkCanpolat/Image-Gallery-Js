const imagesWrapper = document.querySelector(".gallery__list");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".left-search input");
const lightBox = document.querySelector(".lightbox");
const closeBtn = document.querySelector(".fa-square-xmark");
const downloadImgBtn = document.querySelector(".fa-cloud-arrow-up");

const apiKey = "Your api is here";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgUrl) => {
    fetch(imgUrl).then(res => res.blob()).then(file => {
        console.log(file);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!"));
}

const showLightBox = (name, img) => {
    lightBox.querySelector("img").src = img
    lightBox.querySelector("span").innerText = name
    downloadImgBtn.setAttribute("data-img", img);
    lightBox.classList.add("show");

    document.body.style.overflow = "hidden";
}

const hideLightBox = () => {
    lightBox.classList.remove("show");
    document.body.style.overflow = "auto";
};

const generateHTML = (images) => {
    imagesWrapper.innerHTML += images.map(img =>
        `<li class="gallery__item" onclick="showLightBox('${img.photographer}','${img.src.large2x}')">
                        <img src="${img.src.large2x}" alt="">
                        <div class="gallery-details">
                            <div class="top">
                                <i class="fa-regular fa-bookmark"></i>
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <div class="bottom">
                                <p>${img.photographer}</p>
                                <a onclick="downloadImg('${img.src.large2x}');event.stopPropagation();"><i class="fa-solid fa-arrow-down"></i> Download</a>
                            </div>
                        </div>
                    </li>
        `
    ).join("");
};

const getImages = (apiUrl) => {
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled");
    fetch(apiUrl, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        console.log(data)
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failed to load images!"));
};

const loadMoreImages = () => {
    currentPage++;
    let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiUrl;
    getImages(apiUrl);
};

const loadSearchImages = (e) => {
    if(e.target.value === "") return searchTerm = null;
    if(e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
    }
};

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn.addEventListener("click", hideLightBox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));
