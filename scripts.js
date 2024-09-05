function resizeCanvas() {
    const canvas = document.getElementById('silverBarCanvas');
    const container = document.querySelector('.silver-bar-container');

    // Set canvas dimensions to match the container
    canvas.width = container.clientWidth * 0.9; // 90% of the canvas width
    canvas.height = container.clientHeight * 0.1; // 10% of the canvas height
}

function drawSilverBar() {
    resizeCanvas(); // Ensure the canvas is resized before drawing

    const canvas = document.getElementById('silverBarCanvas');
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the silver bar
    const barX = (canvas.width - canvas.width) / 2;
    const barY = (canvas.height - canvas.height) / 2;

    context.fillStyle = 'silver';
    context.fillRect(barX, barY, canvas.width, canvas.height);

    // Add a shadow effect
    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
}

// Draw the silver bar when the window is resized
window.addEventListener('resize', drawSilverBar);

// Initial draw
window.addEventListener('load', drawSilverBar);


function appendToSummary(item, quantity) {
    const list = document.querySelector("#summary-list");
    const selectedOptions = Array.from(document.querySelectorAll('input[name="pack"]:checked')).map(option => ({
        value: option.value,
        type: option.dataset.type
    }));

    // Find the main item entry
    let mainItem = Array.from(list.children).find((li) => li.dataset.item === item);

    if (!mainItem) {
        // Create main item entry if it doesn't exist
        mainItem = document.createElement("li");
        mainItem.dataset.item = item;
        mainItem.textContent = `${item}`;
        list.appendChild(mainItem);
    }

    // Remove main item's remove button if it has sub-items
    if (mainItem.querySelector('button')) {
        mainItem.removeChild(mainItem.querySelector('button'));
    }

    // Add or update sub-entries for "and" options
    selectedOptions.forEach(option => {
        let subItem = Array.from(mainItem.children).find((li) => li.dataset.option === option.value);

        if (subItem) {
            // Update quantity of existing sub-item
            const existingQuantity = parseInt(subItem.dataset.quantity, 10);
            const newQuantity = existingQuantity + parseInt(quantity, 10);
            subItem.dataset.quantity = newQuantity;
            subItem.textContent = `${option.value} (Quantity: ${newQuantity})`;
        } else {
            // Create new sub-item
            subItem = document.createElement("li");
            subItem.dataset.option = option.value;
            subItem.dataset.quantity = quantity;
            subItem.textContent = `${option.value} (Quantity: ${quantity})`;

            // Add remove button to sub-item
            const subRemoveButton = document.createElement("button");
            subRemoveButton.textContent = "remove from order";
            subRemoveButton.onclick = function() {
                let currentQuantity = parseInt(subItem.dataset.quantity, 10);
                if (currentQuantity > 1) {
                    subItem.dataset.quantity = --currentQuantity;
                    subItem.textContent = `${option.value} (Quantity: ${currentQuantity})`;
                } else {
                    mainItem.removeChild(subItem);
                    if (mainItem.children.length === 0) {
                        list.removeChild(mainItem);
                    }
                }
            };
            subItem.appendChild(subRemoveButton);

            mainItem.appendChild(subItem);
        }
    });

    // If no sub-items are selected, update or create the main item
    if (selectedOptions.length === 0) {
        if (mainItem.querySelector('.quantity')) {
            // Update quantity of existing main item
            const existingQuantity = parseInt(mainItem.dataset.quantity, 10);
            const newQuantity = existingQuantity + parseInt(quantity, 10);
            mainItem.dataset.quantity = newQuantity;
            mainItem.querySelector('.quantity').textContent = `Quantity: ${newQuantity}`;
        } else {
            // Create new main item with remove button
            mainItem.dataset.quantity = quantity;
            
            const textSpan = document.createElement("span");
            textSpan.textContent = `${item} `;
            
            const quantitySpan = document.createElement("span");
            quantitySpan.className = 'quantity';
            quantitySpan.textContent = `Quantity: ${quantity}`;
            
            const removeButton = document.createElement("button");
            removeButton.textContent = "remove from order";
            removeButton.onclick = function() {
                let currentQuantity = parseInt(mainItem.dataset.quantity, 10);
                if (currentQuantity > 1) {
                    mainItem.dataset.quantity = --currentQuantity;
                    quantitySpan.textContent = `Quantity: ${currentQuantity}`;
                } else {
                    list.removeChild(mainItem);
                }
            };
            
            mainItem.appendChild(textSpan);
            mainItem.appendChild(quantitySpan);
            mainItem.appendChild(removeButton);
        }
    }
}
