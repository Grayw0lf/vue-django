function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);

                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
var csrftoken = getCookie('csrftoken');

new Vue({
   delimiters: ["${", "}"],
   el: '#starting',
   headers: {"X-CSRFToken": csrftoken},
   data: {
       articles: [],
       loading: false,
       currentArticle: {},
       message: null,
       newArticle: {
           title: null,
           body: null,
       }
   },
   mounted: function () {
       this.getArticles();
   },
   methods: {
       getArticles: function() {
           this.loading = true;
           axios.get('/api/article/')
               .then((response) => {
                   this.articles = response.data;
                   this.loading = false;
               })
               .catch((err) => {
                   this.loading = false;
                   console.log(err);
               })
       },
       getArticle: function(id) {
          this.loading = true;
          axios.get('/api/article/' + id + '/')
              .then((response) => {
                  this.currentArticle = response.data;
                  this.loading = false;
              })
              .catch((err) => {
                  this.loading = false;
                  console.log(err);
              })
       },
       addArticle: function() {
          this.loading = true;
          axios.post('/api/article/',this.newArticle)
              .then((response) => {
                  this.loading = false;
                  this.getArticles();
              })
              .catch((err) => {
                  this.loading = false;
                  console.log(err);
              })
       },
       updateArticle: function() {
          this.loading = true;
          axios.put('/api/article/${currentArticle.id}/',
              this.currentArticle)
              .then((response) => {
                  this.loading = false;
                  this.currentArticle = response.data;
                  this.getArticles();
              })
              .catch((err) => {
                  this.loading = false;
                  console.log(err);
              })
       },
       deleteArticle: function(id) {
          this.loading = true;
          axios.delete('/api/article/' + id + '/')
              .then((response) => {
                  this.loading = false;
                  this.getArticles();
              })
              .catch((err) => {
                  this.loading = false;
                  console.log(err);
              })
       }
   }
});
