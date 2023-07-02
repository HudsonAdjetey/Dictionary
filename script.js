/* backgroud theme */

const toggleBtn = document.querySelector('#toggleBtn')
const bodyMain = document.querySelector('body')
const btnSearch = bodyMain.querySelector('#search')
const resultContainer = document.querySelector('.result-container')
let sound = document.querySelector('#sound')



toggleBtn.addEventListener('click', function() {
    if(this.classList.contains('bxs-sun')) {
        this.classList.add('bxs-moon')
        this.classList.remove('bxs-sun')
        this.style.color = 'white'
        bodyMain.style.background = '#0a1219'
    }
    else {
        this.classList.add('bxs-sun')
        this.classList.remove('bxs-moon')
        this.style.color = '#fb9200'
        bodyMain.style.background = '#d6ecff'
        
    }
})


btnSearch.addEventListener('click', function() {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    const inputWord = document.querySelector('#inp-word')

    fetch(`${url}${inputWord.value}`)
    .then(response => response.json())
    .then(data => {
        resultContainer.innerHTML = `<div class="word-display">
        <p>${data[0].word}</p>
        <button  onclick = "playSound()" class="soundBtn" ><i class='bx bxs-volume-full' id="volume"></i></button>
    </div>
    <div class="min-word">
        <p class="pS" >${data[0].meanings[0].partOfSpeech}</p>
        <p class="pHo" >${data[0].phonetic || '' }</p>
    </div>

    <h4 class="definition">Definition</h4>
    <p class="meaning">${data[0].meanings[0].definitions[0].definition}</p>
    <p class="example">${data[0].meanings[0].definitions[0].example || '' } </p>

    <div class="syn wDiff">
                        <h4>Synonym</h4>
                        <p>${data[0].meanings[0].synonyms[0]}</p>
                    </div>
                    <div class="atony wDiff">
                        <h4>Antonym</h4>
                        <p>${data[0].meanings[0].antonyms[0] || 'No Antonym for the word'}</p>
                    </div>
                </div>
    `
    sound.setAttribute('src', `${data[0].phonetics[0].audio || data[0].phonetics[1].audio }`)
        
    })
    .catch(() => {
        resultContainer.innerHTML = "<h2>Couldn't find the word"
    })
})


function playSound () {
let sound = document.querySelector('#sound')

    sound.play()
    console.log(sound)
}