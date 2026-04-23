(function () {
  const config = window.CHAKRA_CONFIG || { studios: {}, plans: {} };
  const siteData = window.CHAKRA_SITE_DATA || { business: {}, payment: {} };
  const dbSeed = window.CHAKRA_DB_SEED || {
    users: [],
    bookings: [],
    payments: [],
    franchise: [],
    queries: [],
    admins: [],
    reports: []
  };
  const DB_KEY = "chakraLocalDb";

  function getQueryParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getDb() {
    const saved = localStorage.getItem(DB_KEY);
    const runtime = saved ? JSON.parse(saved) : {};
    return {
      users: [...clone(dbSeed.users), ...(runtime.users || [])],
      bookings: [...clone(dbSeed.bookings), ...(runtime.bookings || [])],
      payments: [...clone(dbSeed.payments), ...(runtime.payments || [])],
      franchise: [...clone(dbSeed.franchise), ...(runtime.franchise || [])],
      queries: [...clone(dbSeed.queries), ...(runtime.queries || [])],
      admins: [...clone(dbSeed.admins), ...(runtime.admins || [])],
      reports: [...clone(dbSeed.reports), ...(runtime.reports || [])]
    };
  }

  function appendToDb(collection, item) {
    const saved = localStorage.getItem(DB_KEY);
    const runtime = saved ? JSON.parse(saved) : {};
    runtime[collection] = runtime[collection] || [];
    runtime[collection].push(item);
    localStorage.setItem(DB_KEY, JSON.stringify(runtime));
  }

  function getPlan() {
    const id = getQueryParam("plan") || localStorage.getItem("chakraPlan") || "3-classes";
    return config.plans[id] || config.plans["3-classes"];
  }

  function getStudio() {
    const id = getQueryParam("studio") || localStorage.getItem("chakraStudio") || "central-blr";
    return config.studios[id] || config.studios["central-blr"];
  }

  function saveSelection(planId, studioId) {
    if (planId) localStorage.setItem("chakraPlan", planId);
    if (studioId) localStorage.setItem("chakraStudio", studioId);
  }

  document.querySelectorAll(".plan-link").forEach((link) => {
    link.addEventListener("click", () => {
      const url = new URL(link.href, window.location.href);
      saveSelection(url.searchParams.get("plan"), url.searchParams.get("studio"));
    });
  });

  function setLink(id, href) {
    const el = document.getElementById(id);
    if (el && href) el.href = href;
  }

  setLink("iosAppLink", siteData.business.iosAppUrl);
  setLink("androidAppLink", siteData.business.androidAppUrl);
  setLink("customerWhatsappHome", `https://wa.me/${siteData.business.customerWhatsapp || ""}`);
  setLink("customerWhatsappLink", `https://wa.me/${siteData.business.customerWhatsapp || ""}`);
  setLink("franchiseWhatsappLink", `https://wa.me/${siteData.business.franchiseWhatsapp || ""}`);
  setLink("instagramHome", siteData.business.instagramUrl);
  setLink("supportEmailLink", `mailto:${siteData.business.supportEmail || ""}`);

  const heroImage = document.getElementById("chakraHeroImage");
  if (heroImage) heroImage.src = siteData.media?.heroImage || "";
  const secondaryImage = document.getElementById("chakraSecondaryImage");
  if (secondaryImage) secondaryImage.src = siteData.media?.secondaryImage || "";
  const communityImage = document.getElementById("chakraCommunityImage");
  if (communityImage) communityImage.src = siteData.media?.communityImage || "";
  const videoFrame = document.getElementById("chakraVideoFrame");
  if (videoFrame) videoFrame.src = siteData.media?.youtubeEmbedUrl || "";

  const requestEmailAction = document.getElementById("requestEmailAction");
  if (requestEmailAction) {
    requestEmailAction.href = `mailto:${siteData.business.supportEmail || ""}`;
  }

  const page = document.body.dataset.page;

  if (page === "payment") {
    const plan = getPlan();
    const studio = getStudio();
    saveSelection(plan.id, studio.id);

    const map = {
      paymentStudioLabel: studio.paymentLabel,
      planStepLabel: plan.stepLabel,
      planSummaryTitle: plan.title,
      planSummaryName: plan.subtitle,
      planSummaryCredits: plan.credits,
      planSummaryValidity: plan.validity,
      summaryLocation: studio.location,
      planSummaryTotal: plan.displayPrice,
      paymentPriceValue: plan.displayPrice,
      paymentUsingStudio: studio.shortLabel
    };

    Object.entries(map).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    });

    const provider = document.getElementById("paymentProviderLabel");
    if (provider) provider.textContent = siteData.payment.razorpayLabel || "Razorpay Trusted Business";

    const mobile = document.getElementById("paymentMobileDisplay");
    if (mobile) mobile.textContent = siteData.payment.paymentMobileDisplay || "+91 XXXXXXXXXX";

    const upiId = document.getElementById("paymentUpiId");
    if (upiId) upiId.textContent = siteData.payment.upiId || "sampleupi@okbank";

    const qrImage = document.getElementById("paymentQrImage");
    if (qrImage && siteData.payment.qrImage) qrImage.src = siteData.payment.qrImage;

    const desc = document.getElementById("planDescription");
    if (desc) desc.textContent = plan.description;

    const notes = document.getElementById("planNotes");
    if (notes) {
      notes.innerHTML = "";
      plan.notes.forEach((note) => {
        const li = document.createElement("li");
        li.textContent = note;
        notes.appendChild(li);
      });
    }

    const paymentForm = document.getElementById("paymentFlowForm");
    if (paymentForm) {
      paymentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        appendToDb("payments", {
          id: `pay_local_${Date.now()}`,
          payer: localStorage.getItem("chakraUserName") || "Local User",
          email: localStorage.getItem("chakraUserEmail") || "localuser@example.com",
          pack: plan.stepLabel,
          amount: plan.displayPrice,
          method: "UPI",
          status: "Captured",
          offerUsed: plan.id === "ride30" ? "RIDE30" : plan.id === "ride50" ? "RIDE50" : "None"
        });
        alert("Payment flow completed successfully.");
      });
    }
  }

  if (page === "admin-portal") {
    const db = getDb();
    const tabs = document.querySelectorAll("[data-tab]");
    const views = document.querySelectorAll("[data-view]");

    function renderRows(targetId, rows, columns) {
      const target = document.getElementById(targetId);
      if (!target) return;
      target.innerHTML = rows
        .map((row) => `<tr>${columns.map((key) => `<td>${row[key] ?? ""}</td>`).join("")}</tr>`)
        .join("");
    }

    renderRows("bookingsTableBody", db.bookings, ["rider", "email", "phone", "className", "studio", "slot", "source", "status"]);
    renderRows("paymentsTableBody", db.payments, ["payer", "email", "pack", "amount", "method", "id", "status", "offerUsed"]);
    renderRows("usersTableBody", db.users, ["name", "email", "phone", "preferredStudio", "packBalance", "waiver", "referral", "notes"]);
    renderRows("franchiseTableBody", db.franchise, ["lead", "city", "phone", "email", "status", "assignedAdmin", "stage"]);
    renderRows("queriesTableBody", db.queries, ["name", "email", "type", "subject", "message", "status"]);
    renderRows("reportsTableBody", db.reports, ["studio", "revenue", "bookings", "utilisation", "noShows", "refunds", "topClass"]);

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((btn) => btn.classList.toggle("active", btn === tab));
        views.forEach((view) => view.classList.toggle("active", view.dataset.view === target));
      });
    });
  }

  function simpleAuthHandler(formId, redirectPath, successMessage) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const required = Array.from(form.querySelectorAll("[required]"));
      const valid = required.every((input) => input.reportValidity());
      if (!valid) return;

      if (formId === "userSignupForm") {
        const first = document.getElementById("firstName")?.value || "";
        const last = document.getElementById("lastName")?.value || "";
        const email = document.getElementById("signupEmail")?.value || "";
        const phone = document.getElementById("signupPhone")?.value || "";
        const location = document.getElementById("signupLocation")?.value || "";
        const fullName = `${first} ${last}`.trim();
        localStorage.setItem("chakraUserName", fullName);
        localStorage.setItem("chakraUserEmail", email);
        appendToDb("users", {
          id: `usr_local_${Date.now()}`,
          name: fullName,
          email,
          phone,
          preferredStudio: location,
          packBalance: "0 Credits",
          waiver: "Pending",
          referral: "",
          notes: "Registered locally from signup page."
        });
      }

      if (formId === "userLoginForm") {
        const email = document.getElementById("userLoginEmail")?.value || "";
        localStorage.setItem("chakraUserEmail", email);
      }

      if (formId === "adminSignupForm") {
        const first = document.getElementById("adminFirstName")?.value || "";
        const last = document.getElementById("adminLastName")?.value || "";
        const email = document.getElementById("adminEmail")?.value || "";
        const role = document.getElementById("adminRole")?.value || "";
        const studio = document.getElementById("adminStudio")?.value || "";
        appendToDb("admins", {
          id: `adm_local_${Date.now()}`,
          name: `${first} ${last}`.trim(),
          email,
          role,
          studio,
          access: "All platform data"
        });
      }

      if (successMessage) alert(successMessage);
      window.location.href = redirectPath;
    });
  }

  simpleAuthHandler("userLoginForm", "../payment/checkout.html", "");
  simpleAuthHandler("userSignupForm", "../payment/checkout.html", "");
  simpleAuthHandler("adminLoginForm", "portal.html", "");
  simpleAuthHandler("adminSignupForm", "portal.html", "Admin account created successfully with access to all platform data.");

  const requestForm = document.getElementById("requestForm");
  if (requestForm) {
    requestForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const required = Array.from(requestForm.querySelectorAll("[required]"));
      const valid = required.every((input) => input.reportValidity());
      if (!valid) return;

      appendToDb("queries", {
        id: `q_local_${Date.now()}`,
        name: document.getElementById("requestName")?.value || "",
        email: document.getElementById("requestEmail")?.value || "",
        type: document.getElementById("requestType")?.value || "",
        subject: document.getElementById("requestSubject")?.value || "",
        message: document.getElementById("requestMessage")?.value || "",
        status: "New"
      });

      alert("Request saved locally. You can now see it in the admin portal queries tab.");
    });
  }
})();
