async function loadCategory() {
    const id = getParam("id");
    try {
        let result = await getData("https://www.themealdb.com/api/json/v1/1/categories.php");
        categories = result.categories;
        categories.forEach(category => {
            if (id == category.idCategory) {
                qs("h2").textContent = `${category.strCategory} meals`;
                getCategoryData(category.strCategory);
                return true;
            }
        });
    } catch (error) {
        console.error('Error fetching categories for nav:', error);
    }
    return false;
}

async function getCategoryData(name) {
    try {
        let list = qs("#plp");
        let result = await getData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
        meals = result.meals;
        meals.forEach(meal => {
            list.append(getMealCard(meal));
        });
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

loadCategory();