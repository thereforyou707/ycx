function showArticles(year) {
    document.querySelectorAll(".year-articles").forEach(div => {
        div.classList.remove("active"); // 先隐藏所有文章
    });

    const articleDiv = document.getElementById(year + "-articles");
    articleDiv.classList.add("active"); // 显示选中的文章

    // 加载文章内容
    fetch(`articles/${year}.txt`)
        .then(response => {
            console.log('请求成功，返回状态:', response.status); // 输出状态码
            if (!response.ok) {
                throw new Error("文章加载失败");
            }
            return response.text();
        })
        .then(data => {
            console.log('文章内容:', data); // 输出文章内容
            articleDiv.querySelector(".content").innerHTML = `<p>${data.replace(/\n/g, "</p><p>")}</p>`;
        })
        .catch(error => {
            console.error("加载失败:", error);
            articleDiv.querySelector(".content").innerHTML = "<p style='color: red;'>无法加载文章</p>";
        });
}
