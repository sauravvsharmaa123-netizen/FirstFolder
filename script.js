document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.mind-map-container');
    const centerNode = document.getElementById('center');
    // Get all elements with the class 'node' but NOT 'center-node'
    const nodes = document.querySelectorAll('.node:not(.center-node)');

    // Draw a line from the center to every other node
    nodes.forEach(node => {
        createLine(centerNode, node, container);
    });
});

/**
 * Draws a line element between two nodes.
 * @param {HTMLElement} node1 - The first node.
 * @param {HTMLElement} node2 - The second node.
 * @param {HTMLElement} container - The parent container to draw in.
 */
function createLine(node1, node2, container) {
    const line = document.createElement('div');
    line.classList.add('line');
    container.appendChild(line);

    // Get center coordinates of nodes relative to the viewport
    const rect1 = node1.getBoundingClientRect();
    const rect2 = node2.getBoundingClientRect();
    // Get the position of the container relative to the viewport
    const containerRect = container.getBoundingClientRect();

    // Calculate positions relative to the container
    // This finds the center of each node
    const x1 = rect1.left + rect1.width / 2 - containerRect.left;
    const y1 = rect1.top + rect1.height / 2 - containerRect.top;
    const x2 = rect2.left + rect2.width / 2 - containerRect.left;
    const y2 = rect2.top + rect2.height / 2 - containerRect.top;

    // Calculate distance (length of the line)
    const length = Math.hypot(x2 - x1, y2 - y1);
    // Calculate angle
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    // Apply styles to the line element
    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;
}