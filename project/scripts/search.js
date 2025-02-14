async function loadSearch() {
    const q = getParam("q");
    qs("h2").textContent = `Search by ${q}`;
    try {
        let list = qs("#plp");
        list.innerHTML = "Loading...";
        let result = await getData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
        meals = result.meals;
        if (meals != null && meals.length > 0) {
            list.innerHTML = "";
            meals.forEach(meal => {
                list.append(getMealCard(meal));
            });
        } else {
            list.innerHTML = "There are no meals to show.";
        }
    } catch (error) {
        console.error('Error fetching categories for nav:', error);
    }
}

function getMealCard(meal) {
    let card = dce("a");
    card.href = `meal.html?id=${meal.idMeal}`;
    let image = dce("img");
    image.src = meal.strMealThumb;
    image.alt = meal.strMeal;
    image.height = 200;
    image.width = 320;
    image.loading = "lazy";
    card.append(image);
    let title = dce("h3");
    title.textContent = meal.strMeal;
    card.append(title);
    return card;
}

loadSearch();