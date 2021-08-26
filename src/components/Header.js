export default class Header {
    constructor($app) {
        this.$target = document.querySelector("header");
        this.logo = document.querySelector(".logo");

        this.render();
    }

    // 로고 누르면 최상단으로 이동
    handleClick(e) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    render() {
        this.logo.addEventListener("click", this.handleClick);
    }
}
