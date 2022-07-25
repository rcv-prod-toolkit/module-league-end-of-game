const namespace = 'module-league-end-of-game'
let staticURL = '/serve/module-league-static'
let champions = []

const champUrl = (championId) => {
  const champ = champions.find((c) => {
    return c.key === championId.toString()
  })

  if (champ === undefined) return ''

  return `${staticURL}/img/champion/tiles/${champ.id}_0.jpg`
}

function calcK(amount) {
  switch (true) {
    case amount > 1000:
      return `${(amount / 1000).toFixed(1)} K`
    default:
      return amount
  }
}

function displayData(emdOfGameData) {
  const state = emdOfGameData.state

  if (state.status !== 'GAME_LOADED') return

  const teams = state.teams
  displayTeamStats(teams)

  const frames = state.goldFrames
  displayGoldGraph(frames)

  const participants = state.participants
  displayDamageGraph(participants)
}

const themeBlue = document
  .querySelector(':root')
  .style.getPropertyValue('--blue-team')
const themeRed = document
  .querySelector(':root')
  .style.getPropertyValue('--red-team')

function changeColors(e) {
  if (
    e.teams.blueTeam?.color !== undefined &&
    e.teams.blueTeam?.color !== '#000000'
  ) {
    document
      .querySelector(':root')
      .style.setProperty('--blue-team', e.teams.blueTeam.color)
  } else {
    document.querySelector(':root').style.setProperty('--blue-team', themeBlue)
  }
  if (
    e.teams.redTeam?.color !== undefined &&
    e.teams.redTeam?.color !== '#000000'
  ) {
    document
      .querySelector(':root')
      .style.setProperty('--red-team', e.teams.redTeam.color)
  } else {
    document.querySelector(':root').style.setProperty('--red-team', themeRed)
  }
}

LPTE.onready(async () => {
  const teams = await window.LPTE.request({
    meta: {
      namespace: 'module-teams',
      type: 'request-current',
      version: 1
    }
  })

  if (teams !== undefined) {
    changeColors(teams)
  }

  window.LPTE.on('module-teams', 'update', changeColors)

  const constantsRes = await LPTE.request({
    meta: {
      namespace: 'module-league-static',
      type: 'request-constants',
      version: 1
    }
  })
  const constants = constantsRes.constants
  champions = constants.champions

  const emdOfGameData = await LPTE.request({
    meta: {
      namespace,
      type: 'request',
      version: 1
    }
  })
  displayData(emdOfGameData)

  LPTE.on(namespace, 'update', displayData)
})
