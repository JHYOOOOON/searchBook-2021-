export default class Header {
    constructor($app) {
        this.state = {
            darkmode: null,
        };

        this.$target = document.querySelector("header");
        this.darkmode = document.querySelector(".darkmode");

        this.render();
    }

    setState(nxtState) {
        this.state = nxtState;
        this.render();
    }

    // 모드 바꾸고 localStorage 저장
    changeMode = (mode) => {
        document.documentElement.setAttribute("color-theme", mode);
        localStorage.setItem("darkmode", mode);
    };

    // 로고 누르면 최상단으로 이동
    handleClick = (e) => {
        if (e.target.className === "logo")
            window.scrollTo({ top: 0, behavior: "smooth" });
        else if (e.target.className === "darkmode") {
            if (e.target.innerText === "🌞") {
                // light -> dark
                this.changeMode("dark");
                e.target.innerText = "🌛";
            } else {
                // dark -> light
                this.changeMode("light");
                e.target.innerText = "🌞";
            }
        }
    };

    render() {
        if (this.state.darkmode === "light") {
            document.documentElement.setAttribute("color-theme", "light");
            this.darkmode.innerText = "🌞";
        } else if (this.state.darkmode === "dark") {
            document.documentElement.setAttribute("color-theme", "dark");
            this.darkmode.innerText = "🌛";
        }
        this.$target.addEventListener("click", this.handleClick);
    }
}
