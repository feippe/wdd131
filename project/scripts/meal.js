async function loadMeal() {
    const id = getParam("id");
    try {
        let result = await getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        meals = result.meals;
        if (meals != null && meals.length > 0) {
            meals.forEach(m => {
                let meal = {
                    id: m.idMeal,
                    name: m.strMeal,
                    area: m.strArea,
                    category: m.strCategory,
                    ingredients: getIngredients(m),
                    instructions: m.strInstructions,
                    image: m.strMealThumb,
                    source: m.strSource,
                    video: m.strYoutube
                };
                printMeal(meal);
            });
        } else {
            qs("#pdp").innerHTML = "There are no data to show.";
        }
    } catch (error) {
        console.error('Error fetching categories meal pdp :', error);
    }
}

function getIngredients(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] != "") {
            let ingredient = {
                ingredient: meal[`strIngredient${i}`],
                measure: meal[`strMeasure${i}`]
            };
            ingredients.push(ingredient);
        }
    }
    return ingredients;
}

function printMeal(meal) {
    let image = dce("img");
    image.src = meal.image;
    image.height = 100;
    image.width = 100;
    image.alt = meal.name;
    qs("#pdp-image").append(image);
    qs("h2").textContent = meal.name;
    qs("head title").textContent = `TastyTrove - ${meal.name}`;
    qs("#pdp-information-category").textContent = meal.category;
    qs("#pdp-information-area").textContent = meal.area;
    qs("#pdp-information-area-label").textContent = "Area";
    qs("#pdp-information-source-label").textContent = "Source";
    qs("#pdp-information-source").innerHTML = `<a href="${meal.source}" target="_blank">${getDomainFromUrl(meal.source)}</a>`;
    qs("#pdp-information-video iframe").src = `https://www.youtube.com/embed/${getVideoIdFromUrl(meal.video)}?si=bo6yfNuGAd8QRVnK`;

    qs("#pdp-ingredients").innerHTML = "<h3>Ingredients</h3>";
    meal.ingredients.forEach(i => {
        let name = dce("label");
        name.textContent = i.ingredient;
        qs("#pdp-ingredients").append(name);
        let value = dce("span");
        value.textContent = i.measure;
        qs("#pdp-ingredients").append(value);
    });

    qs("#pdp-instructions").innerHTML = "<h3>Instructions</h3>";
    let p = dce("p");
    p.textContent = meal.instructions;
    qs("#pdp-instructions").append(p);

    saveInLastSeen(meal);
}

function mealIsInTheList(meal, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == meal.id) {
            return i;
        }
    }
    return false;
}

function moveToStart(list, position) {
    if (position >= 0 && position < list.length) {
        const [element] = list.splice(position, 1);
        list.unshift(element);
    }
    return list;
}

function saveInLastSeen(meal) {
    let lastSeen = getLocalStorage("lastSeen");
    if (lastSeen == null) {
        lastSeen = [];
    }
    const isInList = mealIsInTheList(meal, lastSeen);
    if (isInList == false) {
        lastSeen.unshift(meal);
    } else {
        moveToStart(lastSeen, isInList);
    }
    setLocalStorage("lastSeen", lastSeen);
}




loadMeal();