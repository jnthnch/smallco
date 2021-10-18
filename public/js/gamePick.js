const template = document.createElement('template');

template.innerHTML = `
    <style>
        .single-game-container {
            border: .1rem solid black;
        }
    </style>
    <div class="single-game-container">
        <div class="team-home-info">
            <h3>Home Team</h3>
            <p id='team-home-name'></p>
            <p id='team-home-spread'></p>
        </div>
        <div class="team-away">
            <h3>Away Team</h3>
            <p id='team-away-name'>49ers </p>
            <p id='team-away-spread'></p>
        </div>
        <div id="game-1">
            <form>
                Game Selection
                <select name="game-select" id="game-select">
                    <option value="">--Please choose an option--</option>
                </select>
            </form>
            <button id="submitButton">submit</button>
        </div>
    </div>
`

class GamePick extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' }); //access shadowDom via shadowRoot
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
    }

    // gets called after its inserted into DOM
    connectedCallback() {
        let homeTeamName = this.getAttribute('team-home-name');
        let homeTeamSpread = this.getAttribute('team-home-spread');
        let awayTeamName = this.getAttribute('team-away-name');
        let awayTeamSpread = this.getAttribute('team-away-spread');

        this.shadowRoot.getElementById('team-home-name').innerText = homeTeamName;
        this.shadowRoot.getElementById('team-away-name').innerText = awayTeamName;
        this.shadowRoot.getElementById('team-home-spread').innerText = homeTeamSpread;
        this.shadowRoot.getElementById('team-away-spread').innerText = awayTeamSpread;

        let gameSelect = this.shadowRoot.getElementById("game-select");
        let homeOptionTextAndValue = `${homeTeamName} ${homeTeamSpread}`;
        let awayOptionTextAndValue = `${awayTeamName} ${awayTeamSpread}`;

        let homeOption = new Option(homeOptionTextAndValue, homeOptionTextAndValue);
        let awayOption = new Option(awayOptionTextAndValue, awayOptionTextAndValue);
        gameSelect.add(homeOption, undefined);
        gameSelect.add(awayOption, undefined);

        let submitButton = this.shadowRoot.getElementById('submitButton')

        submitButton.addEventListener('click', () => {
            let options = gameSelect.value;
            console.log('options', options)
            this.dispatchEvent(new CustomEvent('jonEvent', { detail: 'lakers' }));
        })

        
    }



}

customElements.define('game-pick', GamePick)