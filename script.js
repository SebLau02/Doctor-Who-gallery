const tower = document.querySelector(".tower");
const globalContainer = document.querySelector(".global-container");
const image = document.querySelectorAll(".image");

window.addEventListener("scroll", () => {
	const { clientHeight } = document.documentElement;
	const scrollY = window.scrollY;
	handleScroll(clientHeight, scrollY);
});

const handleScroll = (clientHeight, scrollY) => {
	const screenWidth = window.innerWidth;
	const bgPosRatio = Math.min(Math.max(0, 100 - scrollY / 80), 100);
	const towerRotateRatio = image[0].offsetHeight / 72;

	tower.style.transform = `rotateY(-${scrollY / towerRotateRatio}deg)`; //rotation au scroll de la tour qui contient les images
	globalContainer.style.backgroundPosition = `50% ${bgPosRatio}%`; //translation du background au scroll

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
