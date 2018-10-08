blog.posts = [

{
"title" : "Welcome to Jekyll!",
"time" : "2018/10/03",
"categories":"jekyll update",
"url" : "/posts/2018/10/03/welcome-to-jekyll.html"
}

,


{
"title" : "2018.8.2",
"time" : "2018/08/02",
"categories":"jekyll",
"url" : "/posts/2018/08/02/2018.8.2.html"
}

,


{
"title" : "主题预览",
"time" : "2015/01/01",
"categories":"jekyll",
"url" : "/posts/2015/01/01/%E4%B8%BB%E9%A2%98%E9%A2%84%E8%A7%88.html"
}


]


// 搜索功能
blog.addLoadEvent(function () {
    var text_input = document.getElementById("search-input");
    text_input.value='';
    var search_list = document.getElementById("search-list");
    var oldInput = "";
    blog.addEvent(text_input, 'input', function () {
        var newInput = blog.trim(text_input.value);
        if (oldInput != blog.trim(newInput)) {
            text_input.value = newInput;
            oldInput = newInput;
            search_list.innerHTML = '';
            if (newInput != '') {
                search(newInput);
            }
        }
    });

    function search(keywords) {
        keywords = keywords.split(/\s+/);
        for (var i = 0; i < blog.posts.length; i++) {
            var flag = true;
            for (var j = 0; j < keywords.length; j++) {
                // 多个关键词取交集
                if (!(blog.posts[i].time.match(keywords[j]) || blog.posts[i].title.toLowerCase().match(keywords[j].toLowerCase()) || blog.posts[i].categories.toLowerCase().match(keywords[j].toLowerCase()))) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                addResult(blog.posts[i]);
            }
        }
    }

    function addResult(post) {
        var node = document.getElementById('search-templete').children[0].cloneNode(true);
        node.getElementsByClassName('categories')[0].innerHTML = '';
        node.getElementsByClassName('time')[0].innerText = post.time;
        node.getElementsByClassName('title')[0].innerText = post.title;
        node.getElementsByClassName('title')[0].setAttribute('href', blog.contextPath + post.url);
        var categories = post.categories.split('@');
        for (var i = 0; i < categories.length; i++) {
            var cat = document.getElementById('search-templete').getElementsByTagName('a')[1].cloneNode(true);
            cat.innerText = categories[i];
            cat.setAttribute('href', cat.getAttribute('baseUrl')+ categories[i]);
            node.getElementsByClassName('categories')[0].appendChild(cat);
        }
        search_list.appendChild(node);
    }
});
