# searchBook(2021)

[searchBook](https://github.com/JHYOOOOON/searchBook)<br/>
&nbsp;이 프로젝트를 기능을 추가해서 다시 만들어보는 프로젝트<br/>

<strong>📚 해야하는 것</strong>

-   [ ] 책 검색(카카오 검색 api 이용)
-   [ ] 최근 키워드 5개까지 저장, 키워드 클릭하면 검색 가능
-   [ ] 데이터 캐싱
-   [ ] 무한스크롤
-   [ ] 다크모드
-   [ ] 반응형

---

계획 (변동될 수 있음)<br/>

<strong>📚 1일차(0824)</strong>

-   [x] 전체적인 구조 짜기
-   [x] api 연결 및 화면에 뿌리기

😎 ReadableStream<br/>
&nbsp;fetch로 데이터를 요청했을 때 ReadableStream이 받아와져서 놀랐다. ~~원하던 데이터는 안 오고 웬 이상한 객체가..~~<br/>
&nbsp;ReadableStream은 바이트 데이터를 읽을 수 있는 스트림을 제공한다. 받은 데이터를 읽고 싶으면 이와같이 코드를 짜면 된다. then을 두번 쓰면 되더라!

```
// api.js
fetch(`${API_ENDPOINT}/v3/search/book?query=${keyword}&page=${pageNum}`, {
        headers: { "Authorization": `KakaoAK ${APP_KEY}` },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data, ":::data");
        return data;
    })
```

-   https://developer.mozilla.org/ko/docs/Web/API/ReadableStream
-   https://stackoverflow.com/questions/40385133/retrieve-data-from-a-readablestream-object

<strong>📚 2일차(0825)</strong>

-   [x] 무한스크롤 구현
-   [ ] 데이터 양이 많을 경우 레이지로딩 구현

```
// InputSection.js
handleScroll = () => {
        if (
            !this.isEnd &&
            this.keyword &&
            Math.ceil(window.innerHeight + window.scrollY) >=
                this.$app.scrollHeight
        ) {
            this.onSearch(this.keyword, ++this.pageNum);
        }
    };
```

😎 window.innerHeight<br/>
보이는 창 height

😎 window.scrollY<br/>
스크롤한 값<br/>

<strong>📚 3일차(0826)</strong>

-   [x] 최근 키워드 저장(localstorage 사용)
-   [x] 키워드 클릭시 검색

<strong>📚 4일차(0827)</strong>

-   [ ] 데이터캐싱 -> 페이지가 계속 들어오는데 할 수 있나..? 일단 보류
-   [ ] 다크모드
-   [ ] 로딩중인거 보이게끔 만들기

<strong>📚 5일차(0828)</strong>

-   [ ] 반응형 및 css 손보기
