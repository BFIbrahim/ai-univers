// ====== Sort By Date Empty Array ====
let sortData = []

// ================ Load card ====================
const getData = (limit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayCards(data.data.tools, limit)

            // Sort By Date Function
            sortData = data.data.tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in))
        })
}


//================== Display Cards ===================
const displayCards = (cards, limit) => {

    // get card Container
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''

    const showAllCard = document.getElementById('show-all-cards')

    if(limit && cards.length > 6){
        cards = cards.slice(0, 6)
        showAllCard.classList.remove('d-none')
    }
    else{
        showAllCard.classList.add('d-none')
    }

    cards.forEach(data => {
        const cardDiv = document.createElement('div')
        cardDiv.classList.add('col')
        
        // Create Card
        cardDiv.innerHTML = `
        <div class="card h-100 p-3">
        <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <p class="card-text">
          <ol>
              <li>${data.features[0] ? data.features[0] : 'No Features here'}</li>
              <li>${data.features[1] ? data.features[1] : 'No Features here'}</li>
              <li>${data.features[2] ? data.features[2] : 'No Features here'}</li>
              <li>${data.features[3] ? data.features[3] : 'No Features here'}</li>
          </ol>
        </p>
        </div><hr>

        <div class = "d-flex justify-content-between align-items-center">
            <p>
                <span class = "fw-medium"><i class="fas fa-calendar-alt"></i> ${data.published_in}</span>
            </p>

            <button class="btn" onclick = "loadDetail(${data.id})" type="button" data-bs-toggle="modal" data-bs-target="#cardDetail"><i class="fa-solid fa-arrow-right text-danger"></i></button>
        </div>


      </div>
        `

        // Append Card to card container
        cardContainer.appendChild(cardDiv)

    })
}

// ============= Get Sorting Button ==============
document.getElementById('shortbtn').addEventListener('click', function () {
    // Display sorted card by date
    displayCards(sortData)
})

// ============== Load Card Detail ===============
const loadDetail = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${'0' + id}`

    fetch(url)
        .then(response => response.json())
        .then(data => displayCardDetail(data.data))
        .catch(error => {
            console.log(error)
        })
}


// ============== Display Card Dtail ===============
const displayCardDetail = card => {
    const detailCardContainer = document.getElementById('detail-card-container')
    detailCardContainer.innerHTML = ''

    const detailCard = document.createElement('div')
    detailCard.classList.add('col')

    // create Detail Card
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


// Get 
document.getElementById('show-all-btn').addEventListener('click', function(){
    getData() 
})



getData(6)