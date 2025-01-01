function toggleMenu() {
    const menu = document.getElementById('menu_items');
    const arrow = document.querySelector('.wrapper_body_left_heading .dropdown_arrow');
    
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)'; // Rotate arrow when expanded
        document.querySelector('.wrapper_body_left_heading').classList.add('active');
    } else {
        menu.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)'; // Reset arrow rotation
        document.querySelector('.wrapper_body_left_heading').classList.remove('active');
    }
}
