export function updateStatusDiv(status) {
    console.log(status);
    const statusDiv = document.getElementById('status-div');
    const newStatus = document.createElement('p');
    newStatus.textContent = status;
    statusDiv.appendChild(newStatus);
    const statuses = statusDiv.getElementsByTagName('p');
    if (statuses.length > 3) {
        statusDiv.removeChild(statuses[0]);
    }
}

export function startTurn(player) {
    let activePlayer = player;
};

