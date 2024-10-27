const catchCostx1 = 1;
const catchCostx5 = 5;
const perCatch = 5;
const totalCatches = [];


const fishies = [
    { name: "Common Fish", rarity: "Common", probability: 0.6 },
    { name: "Rare Fish", rarity: "Rare", probability: 0.25 },
    { name: "Exotic Fish", rarity: "Exotic", probability: 0.1 }

];

const fishImages = {
    "Common": ['red_fish.png', 'green_fish.png', 'purple_fish.png'],
    "Rare": ['blue_jellyfish.png', 'purple_jellyfish.png', 'hammerhead_gray.png', 'hammerhead_purple.png'],
    "Exotic": ['rainbow_jellyfish.png'],

};

const chance = [];
fishies.reduce((acc, fish) => {
    acc += fish.probability;
    chance.push(acc);
    return acc;
}, 0);

function catchFish() {
    const randNum = Math.random();
    for (let i = 0; i < chance.length; i++) {
        if (randNum < chance[i]) {
            item = fishies[i];
            const image = getImage(item.rarity);
            return{...item, image};
        }
    }
}

function getImage(rarity) {
    const images = fishImages[rarity];
    const randIndex = Math.floor(Math.random() * images.length);
    return images[randIndex];
}


function updateTotalcatches() {
    const catchesDiv = document.getElementById("catches");
    catchesDiv.innerHTML = totalCatches.map((fish, index) =>
        `<div class="catch_result">
            <p>Catch ${index + 1}: Caught a ${fish.rarity} ${fish.name}!</p>
            <img src="${fish.image}" alt="${fish.rarity} image" class="catch_image">
        </div>`
        
    ). join("");
}

function catchMultiple() {
    const total = catchCostx1 * perCatch
    if (bait >= catchCostx5) {
        bait -= catchCostx5;
        baitElement.textContent = bait;
        for (let i = 0; i < perCatch; i++ ) {
            const catches = catchFish();
            totalCatches.push(catches);
            updateTotalcatches();           
        }
    } else {
        document.getElementById("catches").innerText = "Need more bait...";
    }
}
document.getElementById("gacha_buttonx1").addEventListener("click", () => {
    if (bait >= catchCostx1) {
        bait -= catchCostx1;
        baitElement.textContent = bait;
        const catches = catchFish();
        totalCatches.push(catches);
        updateTotalcatches();
    //document.getElementById("catches").innerText = `You caught a(n) ${catches.rarity} ${catches.name}!`;
    } else {
        document.getElementById("catches").innerText = "Need more bait...";
    }
});   
document.getElementById("gacha_buttonx5").addEventListener("click", catchMultiple);
baitElement.textContent = bait;