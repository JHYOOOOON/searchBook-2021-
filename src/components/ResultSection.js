export default class ResultSection {
    constructor($app) {
        this.$app = $app;
        this.state = {
            keyword: null,
            data: null,
            pageNum: null,
        };
        this.$target = document.querySelector(".result-wrapper");
        this.section = document.createElement("section");

        this.render();
    }

    setState(nxtState) {
        this.state = nxtState;
        this.render();
    }

    printData() {
        this.state.data.map((item) => {
            const card = document.createElement("div");
            card.className = "card";

            const img = document.createElement("img");
            img.src = item.thumbnail ? item.thumbnail : "../img/notFound.png";
            img.className = "thumbnail";

            const right = document.createElement("div");
            right.className = "card-right";

            const title = document.createElement("p");
            title.innerHTML = `<a href=${item.url} target="_blank">${item.title}</a>`;
            title.className = "title";

            const author = document.createElement("p");
            author.innerText = item.authors.join(", ");
            author.className = "author";

            const contents = document.createElement("p");
            contents.innerText = item.contents ? `${item.contents} ...` : "";
            contents.className = "contents";

            right.appendChild(title);
            right.appendChild(author);
            right.appendChild(contents);

            card.appendChild(img);
            card.appendChild(right);
            this.section.appendChild(card);
        });
    }

    render() {
        if (this.state.data) {
            // 새검색이면 결과파트 초기화
            if (this.state.pageNum === 1) {
                this.$target.innerHTML = "";
                this.section.innerHTML = "";
            }

            // '키워드' 검색결과 프린트
            if (document.querySelector(".keyword-title") === null) {
                const p = document.createElement("p");
                p.className = "keyword-title";
                p.innerText = `'${this.state.keyword}' 검색결과`;
                this.$target.appendChild(p);
            }

            this.state.data.error
                ? (this.$target.innerHTML = `<div>데이터를 가져오는 도중 문제가 발생했습니다.</div>`)
                : this.state.data.length
                ? this.printData()
                : (this.section.innerHTML = `<div>데이터가 없습니다.</div>`);
        }
        this.$target.appendChild(this.section);
    }
}
