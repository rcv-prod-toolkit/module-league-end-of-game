const namespace = 'module-league-end-of-game';

const updateUi = (state) => {
  $('#gold-embed').val(`${location.href}/gfx/gold.html${window.apiKey !== null ? '?apikey' + window.apiKey : ''}`);
  $('#damage-embed').val(`${location.href}/gfx/end-of-game.html?damage${window.apiKey !== null ? '&apikey' + window.apiKey : ''}`);
  $('#items-embed').val(`${location.href}/gfx/end-of-game.html${window.apiKey !== null ? '?apikey' + window.apiKey : ''}`);
  $('#pickban-embed').val(`${location.href}/gfx/pick-ban-order.html${window.apiKey !== null ? '?apikey' + window.apiKey : ''}`);
  $('#all-in-one-embed').val(`${location.href}/gfx/all-in-one.html${window.apiKey !== null ? '?apikey' + window.apiKey : ''}`);
}

const updateState = async () => {
  updateUi();
}

export const showItems = () => {
  window.LPTE.emit({
    meta: {
      namespace,
      type: 'end-of-game',
      version: 1
    },
    state: 'ITEMS'
  })
}

export const showDmg = () => {
  window.LPTE.emit({
    meta: {
      namespace,
      type: 'end-of-game',
      version: 1
    },
    state: 'DAMAGE'
  })
}

updateState();
setInterval(updateState, 1000);