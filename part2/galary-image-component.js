class MyComponent extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadow.innerHTML = `
        <style>
        div.gallery {
          border: 1px solid #ccc;
        }
        
        div.gallery:hover {
          border: 1px solid #777;
        }
        
        div.gallery img {
          width: 100%;
          height: auto;
        }
        
        div.desc {
          padding: 15px;
          text-align: center;
        }
        
        * {
          box-sizing: border-box;
        }
        
        .responsive {
          padding: 0 6px;
          float: left;
          width: 24.99999%;
        }
        
        @media only screen and (max-width: 700px) {
          .responsive {
            width: 49.99999%;
            margin: 6px 0;
          }
        }
        
        @media only screen and (max-width: 500px) {
          .responsive {
            width: 100%;
          }
        }
        
        .clearfix:after {
          content: "";
          display: table;
          clear: both;
        }
        </style>
        <div class="responsive">
            <div class="gallery">
              <a target="_blank" href="img_5terre.jpg">
                <img src="${this.getAttribute('src')}" width="600" height="400">
              </a>
              <div class="desc">${this.getAttribute('text')}</div>
            </div>
        </div>
        `
    }
}

customElements.define('gallery-image',MyComponent);