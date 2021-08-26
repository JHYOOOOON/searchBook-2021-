export default class ResultSection {
    constructor($app) {
        this.$app = $app;
        this.state = {
            keyword: null,
            data: null,
            pageNum: null,
        };
        this.$target = document.querySelector(".result-wrapper");
        this.render();
    }

    setState(nxtState) {
        this.state = nxtState;
        if (this.state.pageNum === 1) this.$target.innerText = "";
        this.render();
    }

    printData() {
        this.state.data.map((item) => {
            const card = document.createElement("div");
            card.className = "card";

            const img = document.createElement("img");
            img.src = item.thumbnail;
            img.className = "thumbnail";

            const right = document.createElement("div");
            right.className = "card-right";

            const title = document.createElement("p");
            title.innerText = item.title;
            title.className = "title";

            const author = document.createElement("p");
            author.innerText = item.authors.join(", ");
            author.className = "author";

            const contents = document.createElement("p");
            contents.innerText = `${item.contents} ...`;
            contents.className = "contents";

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
