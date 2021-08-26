export default class InputSection {
    constructor($app, onSearch) {
        this.$app = $app;
        this.$target = document.querySelector("input");
        this.inputWrapper = document.querySelector(".input-wrapper");
        this.curKeywords = document.createElement("div");
        this.curKeywords.className = "cur-keywords";

        this.state = {
            keywords: null,
            isEnd: false,
            keyword: null,
        };

        this.onSearch = onSearch;
        this.pageNum = 1;

        this.render();
    }

    setState(nxtState) {
        this.state = nxtState;
        this.render();
    }

    handleKeyup = (e) => {
        if (e.key === "Enter") {
            this.pageNum = 1;
            this.state.keyword = this.$target.value;
            this.onSearch(this.state.keyword, this.pageNum);
            this.$target.value = "";
        }
    };

    handleScroll = () => {
        if (
            !this.state.isEnd &&
            this.state.keyword &&
            Math.ceil(window.innerHeight + window.scrollY) >=
                this.$app.scrollHeight
        ) {
            this.onSearch(this.state.keyword, ++this.pageNum);
        }
    };

    printKeywords = () =>
        this.state.keywords.map((keyword) => {
            const btn = document.createElement("button");
            btn.className = "curBtn";

            const span = document.createElement("span");
            span.innerText = keyword;
            span.className = "cur-keyword";

            const delBtn = document.createElement("span");
            delBtn.innerText = "X";
            delBtn.className = "delBtn";

            btn.appendChild(span);
            btn.appendChild(delBtn);

            this.curKeywords.appendChild(btn);
        });

    handleClick = (e) => {
        if (e.target.className === "cur-keyword") {
            // 키워드 검색
            this.onSearch(e.target.innerText, 1);
        } else if (e.target.className === "delBtn") {
            // keyword 삭제
            const target = e.target.parentNode;
            let keywords = JSON.parse(localStorage.getItem("keywords"));
            keywords.splice(
                keywords.indexOf(target.childNodes[0].innerText),
                1
            );
            localStorage.setItem("keywords", JSON.stringify(keywords));
            this.curKeywords.removeChild(target);
        }
    };

    render() {
        this.curKeywords.innerHTML = "";

        this.state.keywords && this.printKeywords();

        this.inputWrapper.appendChild(this.curKeywords);

        this.curKeywords.addEventListener("click", this.handleClick);
        this.$target.addEventListener("keyup", this.handleKeyup);
        window.addEventListener("scroll", this.handleScroll);
    }
}
