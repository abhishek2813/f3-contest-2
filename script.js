async function main() {
    let jsondata = "";
    let apiUrl = "https://free-food-menus-api-production.up.railway.app/burgers"
    async function getMenu(url) {
        let response = await fetch(url);
        let data = await response.json()
        return data;
    }
    jsondata = await getMenu(apiUrl)
    console.log(jsondata);
    let data1 = "";
    jsondata.map((values) => {
        //Showing Menu of Burgers
        data1 += `<div class="col-lg-3 col-md-3 col-sm-6 cols-sm-6">
         <div class="card">
             <img src="${values.img}" class="card-img-top" alt="...">
         <div class="card-body">
             <h5 class="card-title">${values.name}</h5>
             <p class="card-text">${values.dsc}</p>
              <p class="card-text">Country <span>${values.country}</span></p>
             <p class="card-text"><b>Rating </b><spna>${values.rate}</spna></p>
             <h3 class="btn btn-success">price :- <b>Rs.${values.price}</b></h3>
         </div>
         </div>
     </div>`;
    })
    document.getElementById("cards").innerHTML = data1;

    // Function 2: takeOrder()
    function takeOrder() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const burgers = {
                    "Burger 1": jsondata[Math.floor(Math.random() * 60)],
                    "Burger 2": jsondata[Math.floor(Math.random() * 60)],
                    "burger 3": jsondata[Math.floor(Math.random() * 60)]
                }
                resolve(burgers);
            }, 2500);
        });
    }

    // Function 3: orderPrep()
    function orderPrep() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const orderStatus = true;
                const paidStatus = false;
                const order = {
                    order_status: orderStatus,
                    paid: paidStatus
                };
                resolve(order);
            }, 1500);
        });
    }

    // Function 4: payOrder()
    function payOrder() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const orderStatus = true;
                const paidStatus = true;
                const order = {
                    order_status: orderStatus,
                    paid: paidStatus
                };
                resolve(order);
            }, 1000);
        });
    }

    // Function 5: thankyouFnc()
    function thankyouFnc(order) {
        if (order.paid === true) {
            alert('Thank you for your payment!');
        } else {
            console.log('Error: Payment not received.');
        }
    }

    takeOrder().then(order => {
        console.log('Order received:', order);
        return orderPrep();
    }).then(order => {
        console.log('Order prepared:', order);
        return payOrder();
    }).then(order => {
        console.log('Order paid:', order);
        thankyouFnc(order);
    }).catch(error => {
        console.error('Error:', error);
    });
}
main();