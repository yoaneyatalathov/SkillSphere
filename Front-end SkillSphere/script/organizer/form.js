document.addEventListener('DOMContentLoaded', function () {
    const trainingForm = document.getElementById('trainingForm');
    const requirementsList = document.getElementById('requirements-list');
    const facilitiesList = document.getElementById('facilities-list');
    const contactsList = document.getElementById('contacts-list');

    document.getElementById('add-requirement').addEventListener('click', () => {
        const requirementInput = document.getElementById('requirement-input');
        addListItem(requirementsList, requirementInput.value);
        requirementInput.value = '';
    });

    document.getElementById('add-facility').addEventListener('click', () => {
        const facilityInput = document.getElementById('facility-input');
        addListItem(facilitiesList, facilityInput.value);
        facilityInput.value = '';
    });

    document.getElementById('add-contact').addEventListener('click', () => {
        const contactInput = document.getElementById('contact-input');
        addListItem(contactsList, contactInput.value);
        contactInput.value = '';
    });

    trainingForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const requirements = getListItems(requirementsList);
        const facilities = getListItems(facilitiesList);
        const contacts = getListItems(contactsList);

        const trainingData = {
            nama_pelatihan: document.getElementById('nama_pelatihan').value,
            penyelenggara: document.getElementById('penyelenggara').value,
            durasi: document.getElementById('duration').value,
            kelompok_umur: document.getElementById('kelompok_umur').value,
            kategori: document.getElementById('category').value,
            deskripsi: document.getElementById('description').value,
            persyaratan: requirements,
            fasilitas: facilities,
            pendaftaran: document.getElementById('registration').value,
            kontak: contacts,
            link_pendaftaran: document.getElementById('link').value,
            sumber_informasi: document.getElementById('source').value
        };

        try {
            const response = await fetch('http://localhost:3000/trainings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(trainingData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                alert('Data pelatihan berhasil ditambahkan!');
                trainingForm.reset();
                requirementsList.innerHTML = '';
                facilitiesList.innerHTML = '';
                contactsList.innerHTML = '';
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menambahkan data pelatihan.');
        }
    });

    function addListItem(list, value) {
        if (value.trim() === '') return;
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = value;

        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger btn-sm ml-2';
        removeButton.textContent = 'Hapus';
        removeButton.addEventListener('click', () => listItem.remove());
        listItem.appendChild(removeButton);
        list.appendChild(listItem);
    }

    function getListItems(list) {
        return Array.from(list.children).map(item => item.firstChild.textContent.trim());
    }
});
