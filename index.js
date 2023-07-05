fetch('http://localhost:3000/locations')
    .then(res => res.json())
    .then(json => rankData(json)
    )

function rankData(data) {
    let result = data.sort((a, b) => b.votes - a.votes)
    result.forEach(element => {
        let locationDiv = document.createElement('div')
        locationDiv.classList.add('locationDiv')
        document.querySelector('.Locations').appendChild(locationDiv)

        let locationName = document.createElement('h1')
        locationName.innerText = element.name

        let locationImage = document.createElement('img')
        locationImage.src = element.image
        locationImage.classList.add('locationImage')

        let locationVotes = document.createElement('h2')
        locationVotes.votes = element.votes
        locationVotes.innerHTML = `Votes : ${locationVotes.votes}`

        let voteBtn = document.createElement('button')
        voteBtn.innerText = 'Vote'
        voteBtn.classList.add('voteBtn')


        locationDiv.appendChild(locationName)
        locationDiv.appendChild(locationImage)
        locationDiv.appendChild(locationVotes)
        locationDiv.appendChild(voteBtn)





    });

}


