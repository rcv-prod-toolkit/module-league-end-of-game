const blueTeam = document.querySelector('#blueTeam .picks');
const blueBan = document.querySelector('#blueBan');

const redTeam = document.querySelector('#redTeam .picks');
const redBan = document.querySelector('#redBan');

async function displayPUBOrder(data) {
  if (!data) {
    return;
  }

  // Reset
  blueTeam.innerHTML = '';
  redTeam.innerHTML = '';
  blueBan.innerHTML = '';
  redBan.innerHTML = '';

  // Bans
  for (const ban of data.blueTeam.bans) {
    const img = document.createElement('img');
    img.src = ban.champion.squareImg;

    blueBan.appendChild(img);
  }

  for (const ban of data.redTeam.bans) {
    const img = document.createElement('img');
    img.src = ban.champion.squareImg;

    redBan.appendChild(img);
  }

  // Picks
  for (const pick of data.blueTeam.picks) {
    const img = document.createElement('img');
    img.src = pick.champion.squareImg;

    blueTeam.appendChild(img);
  }

  for (const pick of data.redTeam.picks) {
    const img = document.createElement('img');
    img.src = pick.champion.squareImg;

    redTeam.appendChild(img);
  }
}

const themeBlue = document
  .querySelector(':root')
  .style.getPropertyValue('--blue-team');
const themeRed = document
  .querySelector(':root')
  .style.getPropertyValue('--red-team');

function changeColors(e) {
  if (e.teams.blueTeam.color !== '#000000') {
    document
      .querySelector(':root')
      .style.setProperty('--blue-team', e.teams.blueTeam.color);
  } else {
    document.querySelector(':root').style.setProperty('--blue-team', themeBlue);
  }
  if (e.teams.redTeam.color !== '#000000') {
    document
      .querySelector(':root')
      .style.setProperty('--red-team', e.teams.redTeam.color);
  } else {
    document.querySelector(':root').style.setProperty('--red-team', themeRed);
  }
}

window.LPTE.onready(async () => {
  const leagueState = await LPTE.request({
    meta: {
      namespace: 'module-league-state',
      type: 'request',
      version: 1,
    },
  });
  displayPUBOrder(leagueState.state.lcu.champselect.order);

  LPTE.on('module-league-state', 'champselect-update', (e) => {
    displayPUBOrder(e.order);
  });

  window.LPTE.on('module-teams', 'update', changeColors);

  const teams = await window.LPTE.request({
    meta: {
      namespace: 'module-teams',
      type: 'request-current',
      version: 1,
    },
  });

  if (teams !== undefined) {
    changeColors(teams);
  }
});
