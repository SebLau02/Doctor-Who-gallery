const tower = document.querySelector(".tower");
const globalContainer = document.querySelector(".global-container");
const image = document.querySelectorAll(".image");
const loader = document.querySelector(".loader");
const article = document.querySelectorAll("article");

window.addEventListener("scroll", () => {
	const scrollY = window.scrollY;
	handleScroll(scrollY);
});

const handleScroll = (scrollY) => {
	const screenWidth = window.innerWidth;
	const bgPosRatio = Math.min(Math.max(0, 100 - scrollY / 80), 100);
	const towerRotateRatio = image[0].offsetHeight / 72;

	tower.style.transform = `rotateY(-${scrollY / towerRotateRatio}deg)`; //rotation au scroll de la tour qui contient les images
	if (screenWidth > 425) {
		globalContainer.style.backgroundPosition = `50% ${bgPosRatio}%`; //translation du background au scroll
	}

	const imageObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio === 1) {
				entry.target.style.filter = `grayscale(0%) blur(0)`; //passage au noir et blanc + floutage au scroll
			} else {
				entry.target.style.filter = `grayscale(100%) blur(2px)`;
			}
		});
	});

	image.forEach((element) => {
		imageObserver.observe(element);
	});
};

window.addEventListener("load", function () {
	setTimeout(() => {
		loader.classList.add("inactive");
		loader.style.display = "flex";
		setTimeout(() => {
			article.forEach((article) => (article.style.display = "block"));
			loader.style.display = "none";
		}, 200);
	}, 1000);
});
