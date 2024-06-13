const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get('id');

document.addEventListener("DOMContentLoaded", async () => {
    const listPelatihan = document.getElementById("list_pelatihan");

    try {
        const response = await fetch("http://localhost:3000/trainings");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const trainings = await response.json();

        trainings.forEach(training => {
            const trainingItem = document.createElement("div");
            trainingItem.classList.add("card", "mb-3", "col-4");
            trainingItem.innerHTML = `
                <img src="../public/img/bg-masthead.jpg" class="card-img-top" alt="..." />
                <div class="card-body">
                    <p class="text-muted">Durasi: ${training.durasi}</p>
                    <h5 class="nama_pelatihan">${training.nama_pelatihan}</h5>
                    <h6 class="card-subtitle mb-2 text-muted penyelenggara">${training.penyelenggara}</h6>
                    <p class="text-muted deskripsi">${training.deskripsi}</p>
                    <p class="fw-bolder kategori">Kategori : ${training.kategori}</p>
                </div>
                <div class="card-body pt-0 d-flex">
                    <a href="" class="card-link"><i class="fa-regular fa-bookmark fa-3x" style="color: #543310"></i></a>
                    <a href="detail.html?id=${training.id}" class="border border-dark btn custom-btn card-link">Baca selengkapnya</a>
                </div>
            `;
            listPelatihan.appendChild(trainingItem);
        });

    } catch (error) {
        console.error("Error fetching trainings:", error);
        listPelatihan.innerHTML = `<p>Error fetching trainings: ${error.message}</p>`;
    }
});
