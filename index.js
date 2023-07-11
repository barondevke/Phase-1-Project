fetch('https://barondevke.github.io/Phase-1-Project/db.json')
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
        voteBtn.id = element.id
        voteBtn.votes = element.votes
        voteBtn.addEventListener('click', function () { addVote(voteBtn.id, locationVotes) })
        voteBtn.classList.add('voteBtn')


        locationDiv.appendChild(locationName)
        locationDiv.appendChild(locationImage)
        locationDiv.appendChild(locationVotes)
        locationDiv.appendChild(voteBtn)





    });

}

function addVote(id, element) {
    let votes = 0
    let newVotes = 0

    fetch(`http://localhost:3000/locations/${id}`)
        .then(response => response.json())
        .then((data) => {
            votes = data.votes
            newVotes = votes + 1

            fetch(`http://localhost:3000/locations/${id}`, {

                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify(
                    {
                        "votes": newVotes
                    }
                )
            })
                .then(res => res.json())
                .then(json => {
                    element.innerText = `Votes: ${newVotes}`


                })

        })

}



const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    addLocation()
})

function addLocation() {
    let name = document.getElementById('name')
    let image = document.getElementById('image')

    let data = {
        "name": name.value,
        "image": image.value,
        'votes': 0
    }
    fetch('http://localhost:3000/locations', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(json => alert('Form submmitted successfully!'))
}

