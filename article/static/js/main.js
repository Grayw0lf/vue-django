new Vue({
   delimiters: ["${", "}"],
   el: '#starting',
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
           console.log(this.currentArticle);
       },
       getArticle: function(id) {
          this.loading = true;
          axios.get('/api/article/${this.currentArticle.id}/')
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
          axios.post('/api/article/',{
              title: this.newArticle.title,
              body: this.newArticle.body})
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
          axios.put('/api/article/${this.currentArticle.id}/',
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
          axios.delete('/api/article/${id}/')
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