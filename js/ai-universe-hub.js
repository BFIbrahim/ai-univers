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
              <li>${data.features[0] ? data.features[0] : 'No Features here'}</li>
              <li>${data.features[1] ? data.features[1] : 'No Features here'}</li>
              <li>${data.features[2] ? data.features[2] : 'No Features here'}</li>
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
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/0${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayCardDetail(data.data))
        .catch(error => {
            console.log(error)
        })
}


const displayCardDetail = card => {
    const detailCardContainer = document.getElementById('detail-card-container')
    detailCardContainer.innerHTML = ''
    const detailCard = document.createElement('div')
    detailCard.classList.add('col')

    detailCard.innerHTML = `
        <div class="card bg-danger bg-opacity-10">
        <div class="card-body">
            <h5 class="card-title">${card.description}</h5>

            <div class = "d-flex mx-auto">
                <button class="btn btn-light text-success fw-medium me-3">${card.pricing[0].price} ${card.pricing[0].plan}</button>
                <button class="btn btn-light text-warning fw-medium me-3">${card.pricing[1].price} ${card.pricing[0].plan}</button>
                <button class="btn btn-light text-danger fw-medium me3">${card.pricing[2].price} ${card.pricing[0].plan}</button>
            </div>

            <div class = "d-flex justify-content-around mt-5">
                <div>
                    <h5>Features</h5>
                    <ul>
                        <li>${card.features[1].feature_name ? card.features[1].feature_name : 'No feature here'}</li>
                        <li>${card.features[2].feature_name ? card.features[2].feature_name : 'No feature here'}</li>
                        <li>${card.features[3].feature_name ? card.features[3].feature_name : 'No feature here'}</li>
                    </ul>
                </div>

                <div>
                    <h5>Integrations</h5>
                    <ul>
                        <li>${card.integrations[0] ? card.integrations[0] : 'No integrations'}</li>
                        <li>${card.integrations[1] ? card.integrations[1] : 'No integrations'}</li>
                        <li>${card.integrations[2] ? card.integrations[2] : 'No integrations'}</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>

    `
    detailCardContainer.appendChild(detailCard)

    const detailImage = document.createElement('div')
    detailImage.classList.add('col');

    detailImage.innerHTML = `
        <div class="card">
        <img src="${card.image_link[0]}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${card.input_output_examples[0].input ? card.input_output_examples[0].input : 'No question available here'}</h5>
            
            <p class="card-text">${card.input_output_examples[0].output ? card.input_output_examples[0].output : 'No Answer Found'}</p>
        </div>
    </div>
    `

    detailCardContainer.appendChild(detailImage)
}

getData()


{/* <img src = "${card.image_link[0]}" class="img-fluid"/> */ }