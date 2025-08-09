let role = null;
let callsign = "";
let atcAvailable = false; // placeholder for multiplayer

const screens = {
    roleSelection: document.getElementById('role-selection'),
    callsignEntry: document.getElementById('callsign-entry'),
    pilotInterface: document.getElementById('pilot-interface'),
    atcInterface: document.getElementById('atc-interface')
};

function selectRole(selectedRole) {
    role = selectedRole;
    screens.roleSelection.classList.add('hidden');
    if (role === 'pilot') {
        screens.callsignEntry.classList.remove('hidden');
    } else {
        screens.atcInterface.classList.remove('hidden');
    }
}

function confirmCallsign() {
    const input = document.getElementById('callsign-input').value.trim();
    if (!input) {
        alert("Please enter a callsign.");
        return;
    }
    callsign = input;
    document.getElementById('display-callsign').innerText = callsign;
    screens.callsignEntry.classList.add('hidden');
    screens.pilotInterface.classList.remove('hidden');
}

function sendPreset(type) {
    let message = "";
    if (type === 'requestTaxi') {
        message = `${callsign}, requesting taxi to active runway.`;
    } else if (type === 'requestTakeoff') {
        message = `${callsign}, ready for departure.`;
    } else if (type === 'requestLanding') {
        message = `${callsign}, inbound for landing.`;
    }
    logPilot(message);
    autoATC(message);
}

function sendEmergency(type) {
    let message = "";
    if (type === 'engineFailure') {
        message = `Mayday, Mayday, Mayday, ${callsign}, engine failure, requesting immediate landing.`;
    } else if (type === 'medicalEmergency') {
        message = `Mayday, ${callsign}, medical emergency onboard, requesting priority landing.`;
    } else if (type === 'fuelEmergency') {
        message = `${callsign}, minimum fuel, requesting immediate landing.`;
    }
    logPilot(message);
    autoATC(message);
}

function logPilot(msg) {
    const log = document.getElementById('pilot-log');
    log.innerHTML += `<div><strong>Pilot:</strong> ${msg}</div>`;
}

function autoATC(pilotMessage) {
    if (!atcAvailable) {
        // generate a simple preset ATC response
        let response = "";
        if (pilotMessage.includes("taxi")) {
            response = `${callsign}, taxi to runway 27 via Alpha and Bravo.`;
        } else if (pilotMessage.includes("departure")) {
            response = `${callsign}, cleared for takeoff runway 27, wind calm.`;
        } else if (pilotMessage.includes("landing")) {
            response = `${callsign}, cleared to land runway 27, wind calm.`;
        } else if (pilotMessage.includes("Mayday")) {
            response = `${callsign}, roger, emergency services are standing by, cleared to land immediately runway 27.`;
        }
        logPilot(`<em>ATC:</em> ${response}`);
    }
}

function sendATCResponse() {
    const input = document.getElementById('atc-response').value.trim();
    if (!input) return;
    const log = document.getElementById('atc-log');
    log.value += `ATC: ${input}\n`;
    document.getElementById('atc-response').value = "";
}
