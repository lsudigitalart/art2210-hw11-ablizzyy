let crimeData; // To store the dataset
let crimeCounts = {}; // To store counts by type
let barWidth = 50; // Width of each bar
let maxCount; // Maximum count for scaling
let labels = []; // For sorting types
let canvasHeight = 600;
let canvasWidth = 800;

function preload() {
  // Load the dataset
  crimeData = loadTable('Baton_Rouge_Police_Crime_Incidents_20241210.csv', 'csv', 'header');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  processData();
  noLoop();
}

function processData() {
  // Count incidents by type
  for (let i = 0; i < crimeData.getRowCount(); i++) {
    let crimeType = crimeData.getString(i, 'Offense');
    if (crimeCounts[crimeType]) {
      crimeCounts[crimeType]++;
    } else {
      crimeCounts[crimeType] = 1;
    }
  }

  // Get sorted labels
  labels = Object.keys(crimeCounts).sort((a, b) => crimeCounts[b] - crimeCounts[a]);
  maxCount = max(Object.values(crimeCounts));
}

function draw() {
  background(220);
  textSize(16);
  textAlign(CENTER);

  // Draw the bars
  for (let i = 0; i < labels.length; i++) {
    let x = (i + 1) * (barWidth + 10);
    let y = map(crimeCounts[labels[i]], 0, maxCount, height - 50, 50);

    // Bar
    fill(100, 150, 255);
    rect(x, y, barWidth, height - y - 50);

    // Hover Interaction
    if (
      mouseX > x &&
      mouseX < x + barWidth &&
      mouseY > y &&
      mouseY < height - 50
    ) {
      fill(255, 0, 0);
      text(`${labels[i]}: ${crimeCounts[labels[i]]}`, width / 2, 30);
    }

    // Label
    fill(0);
    text(labels[i], x + barWidth / 2, height - 30);
  }
}
