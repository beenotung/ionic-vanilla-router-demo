class PageProductList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */ `
<style>
page-product-list img {
  width: 64px;
  height: 64px;
}
</style>
<ion-header>
  <ion-toolbar>
    <ion-title>Products</ion-title>
    <ion-buttons slot="end">
      <ion-button id="navbar-cart">
        <ion-icon name="cart"></ion-icon>
      </ion-button>
      <ion-popover trigger="navbar-cart" trigger-action="hover">
        <ion-content class="ion-padding">
          This can link to another page by setting "href" on ion-button.
        </ion-content>
      </ion-popover>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content class="ion-padding">
  <div class="loading-container">
    <p class="ion-text-center">
      <ion-note>Loading product list ...</ion-note>
    </p>
    <ion-progress-bar type="indeterminate"></ion-progress-bar>
  </div>
  <ion-list class="product-list">
    <ion-item class="product-item" href="/products/1">
      <img slot="start" src="https://picsum.photos/seed/picsum/64">
      <ion-label>Apple</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
`
    this.loadingContainer = this.querySelector('.loading-container')
    this.productList = this.querySelector('.product-list')
    this.productItem = this.querySelector('.product-item')
    this.loadProductList()
  }
  loadProductList() {
    this.loadingContainer.hidden = false
    this.productList.hidden = true
    this.productList.textContent = ''
    setTimeout(() => {
      let products = samples.products
      this.loadingContainer.hidden = true
      this.productList.hidden = false
      this.productList.textContent = ''
      for (let product of products) {
        let ionItem = this.productItem.cloneNode(true)
        ionItem.querySelector('ion-label').textContent = product.name
        ionItem.querySelector('img').src = product.image
        ionItem.href = '/products/' + product.id
        this.productList.appendChild(ionItem)
      }
    }, 500)
  }
}
customElements.define('page-product-list', PageProductList)
