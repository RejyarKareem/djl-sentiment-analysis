// Load version info on page load
window.addEventListener('DOMContentLoaded', function() {
    fetch('/info')
        .then(response => response.json())
        .then(data => {
            document.getElementById('versionInfo').textContent = 
                `Java ${data.javaVersion} • Spring Boot ${data.springBootVersion}`;
        })
        .catch(error => {
            console.error('Error loading version info:', error);
            document.getElementById('versionInfo').textContent = 'System Ready';
        });
});

function getSentiment(event, text) {
    if (!text || event.key !== "Enter") {
        return;
    }

    const answerPart = document.getElementById('answerPart');
    const positiveBar = document.getElementById('positiveBar');
    const negativeBar = document.getElementById('negativeBar');
    const posValueLabel = document.getElementById('posValueLabel');
    const negValueLabel = document.getElementById('negValueLabel');

    answerPart.style.display = "block";

    // Get Sentiment
    fetch('/sentiment?' + new URLSearchParams({
        text: text,
    }), {
        method: 'GET'
    }).then(response => response.json())
    .then(data => {
        const posData = data.find(item => item.className === "Positive");
        const negData = data.find(item => item.className === "Negative");
        
        const positiveValue = (posData.probability * 100).toFixed(2);
        const negativeValue = (negData.probability * 100).toFixed(2);
        
        const positivePercent = positiveValue + "%";
        const negativePercent = negativeValue + "%";
        
        // Update progress bars
        positiveBar.style.width = positivePercent;
        positiveBar.setAttribute('aria-valuenow', positiveValue);
        
        negativeBar.style.width = negativePercent;
        negativeBar.setAttribute('aria-valuenow', negativeValue);
        
        // Update labels
        posValueLabel.textContent = positivePercent;
        negValueLabel.textContent = negativePercent;
        
        console.log(`Analysis complete: ${positivePercent} Pos / ${negativePercent} Neg`);
    })
    .catch(error => {
        console.error('Sentiment analysis failed:', error);
    });
}