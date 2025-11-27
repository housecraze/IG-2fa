// ===========================
//  API URL (dynamic override)
// ===========================
const apiUrl =
  window.overrideApiUrl ||
  "https://script.google.com/macros/s/AKfycbwGm4ouDR7CNIhDhdosW8oCIn_apcAm_PBiDoDCyKJp_6Ogg3gvZYM2CTK0Zg2xASP1gQ/exec";

let profiles = [],
  currentIndex = 0;

async function loadProfiles() {
  const res = await fetch(apiUrl);
  profiles = await res.json();
  currentIndex = parseInt(localStorage.getItem("currentIndex") || 0);
  if (currentIndex >= profiles.length) currentIndex = 0;
  displayProfile();
}

function displayProfile() {
  if (!profiles.length) return;
  const p = profiles[currentIndex];
  ["name", "oldusername", "newusername", "password"].forEach((f) => {
    document.getElementById(f).textContent = p[f] || "";
  });
  localStorage.setItem("currentIndex", currentIndex);
}

function prevProfile() {
  if (currentIndex > 0) {
    currentIndex--;
    displayProfile();
  }
}

function nextProfile() {
  if (currentIndex < profiles.length - 1) {
    currentIndex++;
    displayProfile();
  }
}

function Createcon() {
  window.location.href = "shortcuts://run-shortcut?name=CreateIGCon";
}
function runCreateTH() {
  window.location.href = "shortcuts://run-shortcut?name=CreateTh";
}
function runCont() {
  window.location.href = "shortcuts://run-shortcut?name=NextIGTH";
}

function toggleEdit(field) {
  const span = document.getElementById(field),
    input = document.getElementById(field + "Input");
  if (input.style.display === "none") {
    input.value = span.textContent;
    span.style.display = "none";
    input.style.display = "inline-block";
  } else {
    span.textContent = input.value;
    span.style.display = "inline-block";
    input.style.display = "none";
  }
}

async function saveEdits() {
  const p = profiles[currentIndex];

  const oldusername =
    document.getElementById("oldusernameInput").style.display !== "none"
      ? document.getElementById("oldusernameInput").value
      : p.oldusername;

  const newusername =
    document.getElementById("newusernameInput").style.display !== "none"
      ? document.getElementById("newusernameInput").value
      : p.newusername;

  const updated = { id: p.id, oldusername, newusername };

  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(updated),
    headers: { "Content-Type": "application/json" },
  });

  const result = await res.json();
  if (result.success) {
    showToast("Saved!");
    loadProfiles();
  } else showToast("Error: " + result.message);
}

function openCurrentIG() {
  window.open(`https://Instagram.com/`, "_blank");
}

function openCurrentTG() {
  window.open(`https://Threads.com/`, "_blank");
}

function copyText(field) {
  const text = document.getElementById(field).textContent;
  navigator.clipboard.writeText(text);
  showToast(field + " copied!");
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => {
    t.classList.remove("show");
  }, 1000);
}

// ===========================
//  RANDOM CELEBRITIES
// ===========================
const celebrities = [
  "Selena Gomez",
  "Kylie Jenner",
  "Dwayne Johnson",
  "Ariana Grande",
  "Kim Kardashian",
  "Beyoncé",
  "Khloé Kardashian",
  "Kendall Jenner",
  "Taylor Swift",
  "Jennifer Lopez",
  "Nicki Minaj",
  "Miley Cyrus",
  "Katy Perry",
  "Zendaya",
  "Kevin Hart",
  "Cardi B",
  "LeBron James",
  "Demi Lovato",
  "Leonardo DiCaprio",
  "Vin Diesel",
  "Zac Efron",
  "Will Smith",
  "Tom Cruise",
  "Angelina Jolie",
  "Brad Pitt",
  "Scarlett Johansson",
  "Chris Evans",
  "Chris Hemsworth",
  "Robert Downey Jr.",
  "Mark Ruffalo",
  "Jeremy Renner",
  "Tom Holland",
  "Zendaya",
  "Timothée Chalamet",
  "Florence Pugh",
  "Natalie Portman",
  "Anne Hathaway",
  "Emma Stone",
  "Emma Watson",
  "Margot Robbie",
  "Gal Gadot",
  "Halle Berry",
  "Sandra Bullock",
  "Julia Roberts",
  "Reese Witherspoon",
  "Jennifer Aniston",
  "Courteney Cox",
  "Matthew Perry",
  "Lisa Kudrow",
  "Matt LeBlanc",
  "David Schwimmer",
  "Steve Carell",
  "John Krasinski",
  "Mindy Kaling",
  "BJ Novak",
  "Rainn Wilson",
  "Ed Helms",
  "Jenna Fischer",
  "Ellie Kemper",
  "Jonah Hill",
  "Channing Tatum",
  "Matthew McConaughey",
  "Jake Gyllenhaal",
  "Ryan Reynolds",
  "Ryan Gosling",
  "Blake Lively",
  "Jessica Alba",
  "Eva Mendes",
  "Megan Fox",
  "Shia LaBeouf",
  "Kristen Stewart",
  "Robert Pattinson",
  "Taylor Lautner",
  "Dakota Johnson",
  "Jamie Dornan",
  "Jennifer Lawrence",
  "Josh Hutcherson",
  "Liam Hemsworth",
  "Woody Harrelson",
  "Donald Glover",
  "Childish Gambino",
  "Chance the Rapper",
  "Travis Scott",
  "Post Malone",
  "Billie Eilish",
  "Olivia Rodrigo",
  "Doja Cat",
  "Saweetie",
  "Lil Nas X",
  "Snoop Dogg",
  "Dr. Dre",
  "Ice Cube",
  "Eminem",
  "50 Cent",
  "Jay-Z",
  "Kanye West",
  "Travis Barker",
  "Machine Gun Kelly",
  "Lana Del Rey",
  "Halsey",
];

function randomCelebrity() {
  const rand = celebrities[Math.floor(Math.random() * celebrities.length)];
  navigator.clipboard.writeText(rand);

  const searchUrl =
    "https://www.instagram.com/explore/search/keyword/?q=" +
    encodeURIComponent(rand);

  window.open(searchUrl, "_blank");
  showToast("Opening IG Search: " + rand);
}

// ===========================
//  RANDOM BIO
// ===========================
const girlyEmojis = ["💖", "💕", "🌸", "✨", "🌷", "💅", "👑", "💓", "🦋", "💜"];

function randomBio() {
  const e1 = girlyEmojis[Math.floor(Math.random() * girlyEmojis.length)];
  const e2 = girlyEmojis[Math.floor(Math.random() * girlyEmojis.length)];
  const bio = `18 ${e1}\nSingle ${e2}`;

  navigator.clipboard.writeText(bio);
  showToast("Bio copied!");
}

// ===========================
//  RANDOM CAPTION
// ===========================
const captions = [
  "no reason, just liked these",
  "this light felt kinda nice",
  "another day, another outfit i almost didn’t wear",
  "nothing crazy, just me",
  "this felt like a good time to post",
  "little snapshot of life rn",
  "things are okay and that’s enough",
  "thought these looked kinda cute",
  "just going with it",
  "small things are the big things",
  "no big caption, just vibes",
  "in my own little world",
  "guess who remembered to take pics for once",
  "this week in a few photos",
  "not much going on but that’s fine",
  "just here, doing my best",
  "felt kinda peaceful",
  "no idea what i’m doing but okay",
  "life lately, kinda like this",
  "trying to stay present",
  "quiet moments and blurry photos",
  "moodboard: this",
  "little calm in the chaos",
  "brain = fog, photos = cute",
  "looked up and liked the view",
  "current setting: soft",
  "just a few saved memories",
  "this version of me feels good",
  "casually existing",
];

function randomCaption() {
  const rand = captions[Math.floor(Math.random() * captions.length)];
  navigator.clipboard.writeText(rand);
  showToast("Caption copied!");
}

// ===========================
//  PROFILE LIST MODAL
// ===========================
function firstProfile() {
  currentIndex = 0;
  displayProfile();
  showToast("Back to first profile");
}

function showProfileList() {
  const modal = document.getElementById("profileModal");
  const list = document.getElementById("profileList");

  list.innerHTML = "";

  profiles.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = p.name || `Profile ${i + 1}`;
    li.onclick = () => {
      currentIndex = i;
      displayProfile();
      closeModal();
    };
    list.appendChild(li);
  });

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("profileModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("profileModal");
  if (event.target === modal) closeModal();
};

// ===========================
//  TWO-FACTOR AUTH
// ===========================
function base32toBytes(base32) {
  base32 = (base32 || "")
    .replace(/=+$/, "")
    .replace(/[^A-Z2-7]/gi, "")
    .toUpperCase();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0,
    value = 0,
    bytes = [];

  for (let i = 0; i < base32.length; i++) {
    const idx = alphabet.indexOf(base32[i]);
    if (idx === -1) continue;

    value = (value << 5) | idx;
    bits += 5;

    if (bits >= 8) {
      bits -= 8;
      bytes.push((value >> bits) & 0xff);
    }
  }
  return new Uint8Array(bytes);
}

function counterToBuffer(counter) {
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);

  const high = Math.floor(counter / 2 ** 32);
  const low = counter >>> 0;

  view.setUint32(0, high);
  view.setUint32(4, low);

  return buf;
}

async function hmacSha1(keyBytes, counterBuf) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign("HMAC", cryptoKey, counterBuf);
  return new Uint8Array(sig);
}

function truncate(hmacBytes, digits) {
  const offset = hmacBytes[hmacBytes.length - 1] & 0x0f;

  const code =
    ((hmacBytes[offset] & 0x7f) << 24) |
    ((hmacBytes[offset + 1] & 0xff) << 16) |
    ((hmacBytes[offset + 2] & 0xff) << 8) |
    (hmacBytes[offset + 3] & 0xff);

  return (code % 10 ** digits).toString().padStart(digits, "0");
}

async function generateTOTP(secret) {
  const keyBytes = base32toBytes(secret);
  if (keyBytes.length === 0) return null;

  const period = 30;
  const digits = 6;
  const counter = Math.floor(Date.now() / 1000 / period);

  const hmac = await hmacSha1(keyBytes, counterToBuffer(counter));
  return truncate(hmac, digits);
}

const secretEl = document.getElementById("secret");
const codeEl = document.getElementById("totp");
const countdownEl = document.getElementById("countdown");
const copyBtn = document.getElementById("copyBtn");
const copy2fa = document.getElementById("copy2fa");
const pasteBtn = document.getElementById("pasteBtn");

async function update() {
  const secret = secretEl.value.trim();
  const period = 30;

  const now = Math.floor(Date.now() / 1000);
  const remaining = period - (now % period);
  countdownEl.textContent = remaining;

  if (!secret) {
    codeEl.textContent = "------";
    return;
  }

  const code = await generateTOTP(secret);
  codeEl.textContent = code || "invalid";
}

setInterval(update, 1000);
update();

// TOTP copy buttons
copyBtn.addEventListener("click", async () => {
  const code = codeEl.textContent.trim();
  if (code && code !== "------" && code !== "invalid") {
    await navigator.clipboard.writeText(code);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  }
});

copy2fa.addEventListener("click", async () => {
  const authValue = document.getElementById("newusername").textContent.trim();
  if (authValue) {
    await navigator.clipboard.writeText(authValue);
    copy2fa.textContent = "Copied!";
    setTimeout(() => (copy2fa.textContent = "Copy"), 1200);
  }
});

pasteBtn.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) secretEl.value = text.trim();
  } catch (e) {
    alert("Clipboard paste not allowed.");
  }
});

// Load profiles at start
loadProfiles();
