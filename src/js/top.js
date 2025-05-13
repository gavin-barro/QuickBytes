const topbutton = document.getElementById('topbtn').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    console.log('Top button clicked');
})