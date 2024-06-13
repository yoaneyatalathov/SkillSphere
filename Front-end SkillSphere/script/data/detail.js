const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get('id');

document.addEventListener("DOMContentLoaded", async () => {
  const detailItem = document.getElementById("detail-item");

  try {
    const response = await fetch(`http://localhost:3000/trainings/${id}`);
    
    console.log(response)
    // Periksa jika respons berhasil dan dalam format JSON
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const training = await response.json();
    console.log(training)

    // Tampilkan data pelatihan
    const trainingItem = document.createElement("div");
    trainingItem.classList.add("p-4", "w-100");
    trainingItem.innerHTML = `
      <div class="detail_image my-3">
        <img src="../public/img/bg-masthead.jpg" class="img-fluid" alt="Pelatihan Image" />
      </div>
      <div class="card-body">
        <h3 class="card-title text-center">${training.nama_pelatihan}</h3>
        <h4 class="card-subtitle mb-2 fw-light text-center">${training.penyelenggara}</h4>
        <p class="card-text"><strong>Durasi:</strong> ${training.durasi}</p>
        <p class="card-text"><strong>Kategori:</strong> ${training.kategori}</p>
        <p class="card-text"><strong>Deskripsi:</strong> ${training.deskripsi}</p>
        <h5>Persyaratan:</h5>
        <ul>${training.persyaratan.map(item => `<li>${item}</li>`).join('')}</ul>
        <h5>Fasilitas:</h5>
        <ul>${training.fasilitas.map(item => `<li>${item}</li>`).join('')}</ul>
        <p class="card-text"><strong>Pendaftaran:</strong> ${training.pendaftaran}</p>
        <p class="card-text"><strong>Kontak:</strong></p>
        <ul>${training.kontak.map(item => `<li>${item}</li>`).join('')}</ul>
        <p class="card-text"><strong>Link Pendaftaran:</strong> <a href="${training.link_pendaftaran}" target="_blank">${training.link_pendaftaran}</a></p>
        <p class="card-text"><strong>Sumber Informasi:</strong> <a href="${training.sumber_informasi}" target="_blank">${training.sumber_informasi}</a></p>
      </div>
    `;
    detailItem.appendChild(trainingItem);

  } catch (error) {
    console.error("Error fetching trainings:", error);
    detailItem.innerHTML = `<p>Error fetching trainings: ${error.message}</p>`;
  }
});
