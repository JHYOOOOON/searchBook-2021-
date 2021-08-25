export default class InputSection {
    constructor($app, onSearch) {
        this.$app = $app;
        this.$target = document.querySelector("input");

        this.onSearch = onSearch;
        this.keyword = null;
        this.pageNum = 1;
        this.isEnd = false;

        this.render();
    }

    setState(isEnd) {
        this.isEnd = isEnd;
    }

    handleKeyup = (e) => {
        if (e.key === "Enter") {
            this.pageNum = 1;
            this.keyword = this.$target.value;
            this.onSearch(this.keyword, this.pageNum);
            this.$target.value = "";
        }
    };

    handleScroll = () => {
        if (
            Math.ceil(window.innerHeight + window.scrollY) >=
                this.$app.scrollHeight &&
            this.keyword &&
            !this.isEnd
        ) {
            this.onSearch(this.keyword, ++this.pageNum);
        }
    };

    render() {
        this.$target.addEventListener("keyup", this.handleKeyup);
        window.addEventListener("scroll", this.handleScroll);
    }
}
