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



