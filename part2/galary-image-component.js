class MyComponent extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render();
        this.shadowRoot.querySelector('img').src = this.getAttribute('src');
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
          width: 300px;
          height: 300px
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
          height: 12%
        }
        
        @media only screen and (max-width: 700px) {
          .responsive {
            width: 49.99999%;
            margin: 6px;
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
              
                <img  width="600" height="400">
              
            </div>
        </div>
        `
    }
}

customElements.define('gallery-image',MyComponent);

//src="${this.getAttribute('src')}"