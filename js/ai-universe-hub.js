const getData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.data.tools))
}

const displayMeals = meals => {
    // console.log(meals);
    const mealContaainer = document.getElementById('card-container')
    meals.forEach(data => {
        // console.log(data);
        const mealDiv = document.createElement('div')
        mealDiv.classList.add('col')

        mealDiv.innerHTML = `
        <div class="card h-100 p-3">
        <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <p class="card-text">
          <ol>
              <li>${data.features[0] ? data.features[0]:'No Features here'}</li>
              <li>${data.features[1] ? data.features[1]:'No Features here'}</li>
              <li>${data.features[2] ? data.features[2]:'No Features here'}</li>
          </ol>
        </p>
        </div><hr>

        <div class = "d-flex justify-content-between align-items-center">
            <p>
                <span><i class="fas fa-calendar-alt"></i> 11/01/2022</span>
            </p>

            <button class="btn" onclick = "loadDetail(${data.id})" type="button" data-bs-toggle="modal" data-bs-target="#mealDetail"><i class="fa-solid fa-arrow-right text-danger"></i></button>
        </div>


      </div>
        `

        mealContaainer.appendChild(mealDiv)
    })
}


const loadDetail = id => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/0${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayCardDetail(data.data))
        .catch(error => {
            console.log(error)
        })
}


const displayCardDetail = card => {
    document.getElementById('cardDetail').innerText = card.description
    document.getElementById('cardDetailBody').innerHTML = `
        <img src = "${card.image_link[0]}" class="img-fluid"/>
    `
}

getData()


{/* <img src = "${card.image_link[0]}" class="img-fluid"/> */}