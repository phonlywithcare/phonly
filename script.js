// ================= POPUP HANDLING ================= //
const loginPopup = document.getElementById("loginPopup");
const bookingPopup = document.getElementById("bookingPopup");

const openLogin = document.getElementById("openLogin");
const openBooking = document.getElementById("openBooking");

// Open Login Popup
openLogin?.addEventListener("click", () => {
  loginPopup.style.display = "flex";
});

// Open Booking Popup
openBooking?.addEventListener("click", () => {
  bookingPopup.style.display = "flex";
});

// Close Popups
const closeButtons = document.querySelectorAll("[data-close]");
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginPopup.style.display = "none";
    bookingPopup.style.display = "none";
  });
});

// Close when clicking outside box
window.addEventListener("click", (e) => {
  if (e.target === loginPopup) loginPopup.style.display = "none";
  if (e.target === bookingPopup) bookingPopup.style.display = "none";
});

// ================= TOAST ================= //
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => { toast.style.opacity = 1; }, 100);

  setTimeout(() => { 
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}


// ================= BOOKING SUBMIT (CONNECTED TO BACKEND) ================= //
const bookingBtn = bookingPopup?.querySelector(".primary-btn");

if (bookingBtn) {
  bookingBtn.addEventListener("click", async () => {
    
    const inputs = bookingPopup.querySelectorAll("input, select");

    const data = {
      name: inputs[0].value,
      phone: inputs[1].value,
      device: inputs[2].value,
      model: inputs[3].value,
      service: inputs[4].value,
      address: inputs[5].value,
      datetime: inputs[6].value,
    };

    try {
      const res = await fetch("https://backendwithapi.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

     const result = await res.json();

const successModal = document.createElement("div");

successModal.innerHTML = `
  <div style="
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.7);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:99999;
  ">
    <div style="
      background:white;
      padding:30px;
      border-radius:15px;
      text-align:center;
      max-width:400px;
      width:90%;
      box-shadow:0 10px 30px rgba(0,0,0,0.3);
    ">
      <h2>🎉 Booking Confirmed!</h2>

      <p>
        Thank you for choosing <b>Phonly</b>.
      </p>

      <p>
        Your Booking ID:
      </p>

      <h3 style="color:#2563eb;">
        ${result.bookingId}
      </h3>

      <p>
        Please save this Booking ID for future reference.
      </p>

      <button id="successOkBtn" style="
        background:#2563eb;
        color:white;
        border:none;
        padding:12px 25px;
        border-radius:8px;
        cursor:pointer;
        font-size:16px;
      ">
        OK
      </button>
    </div>
  </div>
`;

document.body.appendChild(successModal);

document
  .getElementById("successOkBtn")
  .addEventListener("click", () => {
    successModal.remove();
  });

bookingPopup.style.display = "none";

    } catch (err) {
      showToast("Server Error");
    }
  });
}


// ================= REVIEW SUBMIT (CONNECTED TO BACKEND) ================= //
const reviewForm = document.getElementById("reviewForm");

reviewForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("rName").value;
  const message = document.getElementById("rMessage").value;

  const data = {
    name,
    message,
    rating: selectedRating || 5
  };

  try {
    await fetch("https://backendwithapi.onrender.com/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    showToast("Review submitted!");
    reviewForm.reset();
  } catch (err) {
    showToast("Server error");
  }
});


