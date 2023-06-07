function handleImageUpload(event) {
    var imageFile = event.target.files[0];
    var imagePreview = event.target.nextElementSibling.nextElementSibling;
    var addButton = event.target.parentNode.querySelector('.add-image-button');

    if (imageFile) {
        var reader = new FileReader();

        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            addButton.style.display = 'none';

            // Resim eklendiğinde butonu etkinleştir
            var createButton = document.querySelector('.btn');
            createButton.classList.add('enabled');
            createButton.removeAttribute('disabled');
        }

        reader.readAsDataURL(imageFile);
    }
}

function openImageUpload(element) {
    var inputElement = element.parentNode.querySelector('.image-upload');
    inputElement.click();
}

function updateText(element) {
    var text = element.value.trim();
    if (text !== "") {
        element.previousElementSibling.innerText = text;
        element.style.display = "none";
        element.previousElementSibling.style.display = "block";
    }
}

function editText(element) {
    var inputElement = element.nextElementSibling;
    inputElement.style.display = "block";
    inputElement.value = element.innerText;
    element.style.display = "none";
    inputElement.focus();
}

function createNewPage() {
    var container = document.querySelector('.container');
    var newPage = container.cloneNode(true);

    var inputs = newPage.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }

    var textAreas = newPage.getElementsByTagName('textarea');
    for (var i = 0; i < textAreas.length; i++) {
        textAreas[i].disabled = true;
    }

    newPage.querySelector('h1').classList.add('hidden');
    newPage.querySelector('h2').classList.add('hidden');

    var currentTitle = container.querySelector('h1').innerText;
    var currentDescription = container.querySelector('h2').innerText;
    var currentImageSrc = container.querySelector('.image-preview').src;

    newPage.querySelector('h1').innerText = currentTitle;
    newPage.querySelector('h2').innerText = currentDescription;
    newPage.querySelector('.image-preview').src = currentImageSrc;

    container.parentNode.insertBefore(newPage, container.nextSibling);

    var currentInputs = container.getElementsByTagName('input');
    for (var i = 0; i < currentInputs.length; i++) {
        currentInputs[i].value = '';
    }

    var currentTextAreas = container.getElementsByTagName('textarea');
    for (var i = 0; i < currentTextAreas.length; i++) {
        currentTextAreas[i].value = '';
    }

    var currentAddButton = container.querySelector('.add-image-button');
    currentAddButton.style.display = 'block';

    var currentImagePreview = container.querySelector('.image-preview');
    currentImagePreview.src = '';

    var currentTitleHeader = container.querySelector('h1');
    currentTitleHeader.innerText = 'New Title';
    currentTitleHeader.style.display = 'block';

    var currentDescriptionHeader = container.querySelector('h2');
    currentDescriptionHeader.innerText = 'Description';
    currentDescriptionHeader.style.display = 'block';

    var currentEditableInputs = container.querySelectorAll('.editable-input');
    for (var i = 0; i < currentEditableInputs.length; i++) {
        currentEditableInputs[i].style.display = 'none';
    }

    var newPageButton = newPage.querySelector('.btn');
    newPageButton.parentNode.removeChild(newPageButton);

    // Yeni kart oluşturulduktan sonra butonu gri renge döndür
    var createButton = document.querySelector('.btn');
    createButton.classList.remove('enabled');
    createButton.disabled = true;
}
