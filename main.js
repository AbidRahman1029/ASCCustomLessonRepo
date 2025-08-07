// Personal Dashboard with Local Storage
// Students: Complete the functions below to make the dashboard work!

// DOM Elements
const userNameInput = document.getElementById('user_name');
const themeSelect = document.getElementById('theme_select');
const savePreferencesBtn = document.getElementById('save_preferences');
const welcomeMessage = document.getElementById('welcome_message');

const gameNameInput = document.getElementById('game_name');
const scoreValueInput = document.getElementById('score_value');
const addScoreBtn = document.getElementById('add_score');
const scoresList = document.getElementById('scores_list');
const clearScoresBtn = document.getElementById('clear_scores');

const notesArea = document.getElementById('notes_area');
const saveNotesBtn = document.getElementById('save_notes');
const clearNotesBtn = document.getElementById('clear_notes');

const lastSavedDiv = document.getElementById('last_saved');
const viewStorageBtn = document.getElementById('view_storage');
const resetDashboardBtn = document.getElementById('reset_dashboard');

// Initialize the dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUserPreferences();
    loadScores();
    loadNotes();
    updateLastSaved();
});

// TASK 1: User Preferences Functions
function saveUserPreferences() {
    localStorage.setItem('userName', userNameInput.value);
    localStorage.setItem('userTheme', themeSelect.value);
    
    // TODO: Get values from userNameInput and themeSelect
    // TODO: Save them to localStorage using setItem
    // TODO: Apply the theme and show welcome message
    // HINT: Check the slides for localStorage.setItem() syntax

    applyTheme(themeSelect.value);
    showWelcomeMessage(userNameInput.value);
    updateLastSaved();
    
    console.log("Save preferences function called - complete this!");
}

function loadUserPreferences() {
    const savedName = localStorage.getItem('userName');
    const savedTheme = localStorage.getItem('userTheme');

    if (savedName) {
        userNameInput.value = savedName;
        showWelcomeMessage(savedName);
    }

    if (savedTheme) {
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);
    }
    
    // TODO: Get saved name and theme from localStorage using getItem
    // TODO: Populate the form fields if data exists
    // TODO: Apply saved theme and show welcome message
    // HINT: Remember to check if data exists (not null) before using it
    
    console.log("Load preferences function called - complete this!");
}

function applyTheme(theme) {
    // TODO: Set the data-theme attribute on document.body
    // HINT: document.body.setAttribute('data-theme', theme);

    document.body.setAttribute('data-theme', theme);
    
    console.log("Apply theme function called - complete this!");
}

function showWelcomeMessage(name) {
    // TODO: Display a personalized welcome message
    // HINT: Use welcomeMessage.textContent or innerHTML

    welcomeMessage.innerHTML =  `Welcome ${name}!`;
    
    console.log("Show welcome message function called - complete this!");
}

// TASK 2: High Scores Functions
function addScore() {
    // TODO: Get values from gameNameInput and scoreValueInput
    let gameName = gameNameInput.value;
    let scoreValue = scoreValueInput.value;
    
    // TODO: Create a score object with game name, score, and date

    const score = {
        game: gameName,
        score: parseInt(scoreValue),
        date: new Date()
    }
    
    // TODO: Get existing scores from localStorage (or create empty array)

    let scores = JSON.parse(localStorage.getItem('gameScores')) || [];
    scores.push(score);
    localStorage.setItem('gameScores', JSON.stringify(scores));

    gameNameInput.value = '';
    scoreValueInput.value = '';
    scoresList.innerHTML = '';
    loadScores();
    updateLastSaved();

    // TODO: Add new score to array
    // TODO: Save updated array back to localStorage using JSON.stringify
    // TODO: Clear input fields and refresh display
    // HINT: Use JSON.parse() and JSON.stringify() for arrays
    
    console.log("Add score function called - complete this!");
}

function loadScores() {
    // TODO: Get scores array from localStorage
    // TODO: Parse the JSON string back to an array
    // TODO: Sort scores by score value (highest first)
    // TODO: Display top 3 scores in the scoresList
    // HINT: Remember to handle the case where no scores exist yet

    let scores = JSON.parse(localStorage.getItem('gameScores')) || [];

    scores.sort((a,b) => b.score - a.score); //sort by score, highest score is first
    console.log(scores);

    const topScores = scores.slice(0,3);

    if (topScores.length > 0){
        for(let i = 0; i < topScores.length; i++){
            const scoreElement = createScoreElement(topScores[i], i);
            scoresList.appendChild(scoreElement);
        }
    }
    
    console.log("Load scores function called - complete this!");
}

function clearAllScores() {
    // TODO: Remove scores from localStorage using removeItem
    // TODO: Clear the display
    // TODO: Show confirmation message

    localStorage.removeItem('gameScores');
    scoresList.innerHTML = '';
    alert('Scores cleared.');
    updateLastSaved();
    
    console.log("Clear scores function called - complete this!");
}

// TASK 3: Notes Functions  
function saveNotes() {
    // TODO: Get text from notesArea
    // TODO: Save to localStorage
    // TODO: Update last saved time
    // TODO: Show confirmation to user

    const notes = notesArea.value;
    localStorage.setItem('dashboardNotes', notes);
    updateLastSaved();
    alert('Notes saved.');
    
    console.log("Save notes function called - complete this!");
}

function loadNotes() {
    // TODO: Get saved notes from localStorage
    // TODO: Put text back in notesArea if it exists

    const savedNotes = localStorage.getItem('dashboardNotes');
    if (savedNotes) {
        notesArea.value = savedNotes;
    }
    
    console.log("Load notes function called - complete this!");
}

function clearNotes() {
    // TODO: Clear the textarea
    // TODO: Remove notes from localStorage
    // TODO: Show confirmation message

    notesArea.value = '';
    localStorage.removeItem('dashboardNotes');
    alert('Notes cleared.');
    updateLastSaved();
    
    console.log("Clear notes function called - complete this!");
}

// TASK 4: Dashboard Control Functions
function viewStorageData() {
    // TODO: Loop through all localStorage data and console.log it
    // TODO: Show user how many items are stored
    // HINT: Use localStorage.length and localStorage.key(i)

    console.log("View storage function called - complete this!");
    console.log("Total items in localStorage:", localStorage.length);

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`${key}:`, value);
    }
}

function resetDashboard() {
    // TODO: Ask user for confirmation (use confirm())
    // TODO: If confirmed, use localStorage.clear() to remove all data
    // TODO: Reset all form fields and displays
    // TODO: Show success message

    const confirmed = confirm('Are you sure you want to reset everything?');
    if (confirmed) {
        localStorage.clear();
        userNameInput.value = '';
        themeSelect.value = 'light';
        applyTheme('light');
        welcomeMessage.innerHTML = '';
        scoresList.innerHTML = '';
        notesArea.value = '';
        lastSavedDiv.innerHTML = '';
        alert('Dashboard reset.');
    }

    console.log("Reset dashboard function called - complete this!");
}

function updateLastSaved() {
    // TODO: Get current date and time
    // TODO: Save to localStorage as 'lastSaved'
    // TODO: Display in lastSavedDiv
    // HINT: Use new Date().toLocaleString()

    const now = new Date().toLocaleString();
    localStorage.setItem('lastSaved', now);
    lastSavedDiv.innerHTML = `Last saved: ${now}`;

    console.log("Update last saved function called - complete this!");
}

// Helper function to format date
function formatDate(date) {
    return new Date(date).toLocaleString();
}

// Helper function to create score display
function createScoreElement(score, index) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span><strong>${score.game}</strong>: ${score.score} points</span>
        <small>${formatDate(score.date)}</small>
    `;
    return li;
}

// Event Listeners - Connect buttons to functions
savePreferencesBtn.addEventListener('click', saveUserPreferences);
addScoreBtn.addEventListener('click', addScore);
clearScoresBtn.addEventListener('click', clearAllScores);
saveNotesBtn.addEventListener('click', saveNotes);
clearNotesBtn.addEventListener('click', clearNotes);
viewStorageBtn.addEventListener('click', viewStorageData);
resetDashboardBtn.addEventListener('click', resetDashboard);

// EXTRA CREDIT: Advanced Features
// Uncomment and complete these for extra credit!

/*
// Auto-save notes while typing (advanced)
notesArea.addEventListener('input', function() {
    // TODO: Implement auto-save with a delay
    // HINT: Use setTimeout and clearTimeout
});

// Export data feature
function exportData() {
    // TODO: Get all dashboard data
    // TODO: Convert to JSON string
    // TODO: Create downloadable file
    // HINT: Use Blob and URL.createObjectURL
}

// Import data feature  
function importData(file) {
    // TODO: Read uploaded file
    // TODO: Parse JSON data
    // TODO: Save to localStorage
    // TODO: Refresh all displays
}
*/
