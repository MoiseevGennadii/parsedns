==UserScript==
@name parse notebook
@version 1
@grant none
==/UserScript==

const url = "http://localhost:3000/";

setTimeout(() => {   
  let divs = document.querySelectorAll('.product-card-top');  

  divs.forEach(div => {
    let product = {
        name: div.querySelector('.product-card-top__name').innerText,
        marketArticle: div.querySelector('.product-card-top__code').innerText,
        onlinePrice: div.querySelector('.product-buy__price') !== null ? 
      	    div.querySelector('div.product-buy__price').innerText.match(/^\d+\s\d+;?/g)[0]+' ' + '₽': "no-price",
        discountPrice: div.querySelector('span.product-buy__prev') !== null ? 
    	    div.querySelector('span.product-buy__prev').innerText : 'no-discont price',
    	imageUrls: div.querySelector('.product-images-slider__img').getAttribute('src'),
        reviewsCount: div.querySelector('.product-card-top__rating').innerText,
        rating: div.querySelector('.product-card-top__service-rating').innerText,
    	availability: div.querySelector('.order-avail-wrap').innerText == "Товара нет в наличии" ?
            'OutOfStock' : 'InStock'
    }    
    
    fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      .then(response => {
        console.log("Success:", response);
      })
      .catch(error => {
        console.error("Error:", error);
      });         
    })  
     
}, 10000);
