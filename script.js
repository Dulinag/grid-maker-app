// Declare global variables
let numRows = 0; // Number of rows in the grid
let numCols = 0; // Number of columns in the grid
let colorSelected; // Selected color for painting cells

// Function to set the global variable for the selected color
function selectColor() {
    // Get the value of the selected color from the dropdown
    colorSelected = document.getElementById("selectedColorId").value;
    console.log("Selected color:", colorSelected);
}

// Function to add a row to the grid
function addR() {
    // Get the grid table element
    let table = document.getElementById("grid");

    // Insert a new row at the end (-1 index)
    let newRow = table.insertRow(-1);

    // Insert a cell into the new row at index 0
    newRow.insertCell(0);

    // Increment the number of rows
    numRows++;

    // Increment the number of columns if it's the first row
    if (numRows == 1) numCols++;

    // Add cells for existing rows if there are more than one column
    if (numCols > 1) {
        for (let i = 0; i < numCols - 1; i++) {
            newRow.insertCell(0);
        }
    }

    console.log("Added a row. Rows:", numRows, "Columns:", numCols);
}

// Function to create a cell with event listener for coloring
function createCell() {
    let cell = document.createElement("td");
    // Add event listener to the cell for coloring
    cell.addEventListener("click", function () {
        if (!this.style.backgroundColor) {
            this.style.backgroundColor = colorSelected;
        }
    });
    return cell;
}

// Function to fill all uncolored cells with the selected color
function fillU() {
    // Check if a color is selected
    if (!colorSelected) {
        alert("Select a Color");
        return;
    }
    // Get all cells in the grid that are not colored
    let cells = document.querySelectorAll("td:not([style])");
    // Loop through each uncolored cell and fill it with the selected color
    cells.forEach(cell => {
        cell.style.backgroundColor = colorSelected;
    });
    console.log("Filled all uncolored cells with", colorSelected);
}

// Function to fill all cells with the selected color
function fillAll() {
    // Check if a color is selected
    if (!colorSelected) {
        alert("Select a Color");
        return;
    }
    // Get all cells in the grid
    let cells = document.querySelectorAll("td");
    // Loop through each cell and fill it with the selected color
    cells.forEach(cell => {
        cell.style.backgroundColor = colorSelected;
    });
    console.log("Filled all cells with", colorSelected);
}

// Function to clear all cells
function clearAll() {
    // Get all cells in the grid
    let cells = document.querySelectorAll("td");
    // Loop through each cell and clear its background color
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    });
    console.log("Cleared all cells");
}

// Function to delete the entire grid
function deleteTab() {
    // Get the grid table element
    let tab = document.getElementById("grid");
    // Clear the inner HTML of the table
    tab.innerHTML = "";
    // Reset the global variables
    numRows = 0;
    numCols = 0;
    colorSelected = null;
    console.log("Deleted the grid");
}

// Function to add a column to the grid
function addC() {
    // Check if there are no rows
    if (numRows === 0) {
        addR(); // Add a row if there are none
    } else {
        // Get all rows in the grid
        let rows = document.querySelectorAll("tr");
        // Loop through each row and append a new cell to it
        rows.forEach(row => {
            row.appendChild(createCell());
        });
    }
    // Increment the number of columns
    numCols++;
    console.log("Added a column. Rows:", numRows, "Columns:", numCols);
}

// Function to remove the last row from the grid
function removeR() {
    // Check if there's only one row
    if (numRows <= 1) {
        alert('Cannot remove last row!');
        return;
    }
    // Get the grid table element
    let table = document.getElementById("grid");
    // Delete the last row
    table.deleteRow(-1);
    // Decrement the number of rows
    numRows--;
    console.log("Removed a row. Rows:", numRows, "Columns:", numCols);
}

// Function to remove the last column from the grid
function removeC() {
    // Check if there's only one column
    if (numCols <= 1) {
        alert('Cannot remove last column!');
        return;
    }
    // Get all rows in the grid
    let rows = document.querySelectorAll("tr");
    // Loop through each row and delete the last cell
    rows.forEach(row => {
        row.deleteCell(-1);
    });
    // Decrement the number of columns
    numCols--;
    // Clear the grid if there are no columns left
    if (numCols === 0) {
        deleteTab();
    }
    console.log("Removed a column. Rows:", numRows, "Columns:", numCols);
}
