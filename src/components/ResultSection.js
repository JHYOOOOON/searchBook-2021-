export default class ResultSection {
    constructor($app) {
        this.$app = $app;
        this.state = {
            keyword: null,
            data: null,
        };
        this.$target = document.querySelector(".result-wrapper");
        this.render();
    }

    setState(nxtState) {
        if (this.state.keyword !== nxtState.keyword)
            this.$target.innerText = "";
        this.state = nxtState;
        this.render();
    }

    printData() {
        this.state.data.map((item) => {
            const card = document.createElement("div");

            const img = document.createElement("img");
            img.src = item.thumbnail;

            const right = document.createElement("div");
            const title = document.createElement("p");
            title.innerText = item.title;

            const author = document.createElement("p");
            author.innerText = item.authors.join(", ");

            const contents = document.createElement("p");
            contents.innerText = item.contents;

            right.appendChild(title);
            right.appendChild(author);
            right.appendChild(contents);

            card.appendChild(img);
            card.appendChild(right);
            this.$target.appendChild(card);
        });
    }

    render() {
        if (this.state.data) {
            this.state.data.error
                ? (this.$target.innerHTML = `<div>데이터를 가져오는 도중 문제가 발생했습니다.</div>`)
                : this.printData();
        }
    }
}
