import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js';
const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'rousong',
      products: [],
      currentProduct: {},
    }
  },
  methods: {
    checkLogin() {
      // 取出token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;

      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then((res) => {
          this.getData();
        })
        .catch((err) => {
          console.dir(err);
          alert(err.data.message);
          window.location = 'index.html';
        })
    },
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.dir(err);
        })
    },
    openProductDetail(item) {
      this.currentProduct = item;
    },
    deleteProduct(item) {
      const id = item.id;
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
      axios.delete(url)
        .then((res) => {
          alert('刪除成功');
          this.getData();
        })
        .catch((err) => {
          console.dir(err);
          alert('刪除失敗');
        })
    }
  },
  created() {
    this.checkLogin();
  }
});
app.mount('#app');