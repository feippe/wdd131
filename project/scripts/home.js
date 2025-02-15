async function getCategories() {
    try {
        let result = await getData("https://www.themealdb.com/api/json/v1/1/categories.php");
        showCategoriesList(result.categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

function getCategoryCard(category) {
    let card = dce("a");
    card.href = `category.html?id=${category.idCategory}`;
    let image = dce("img");
    image.src = category.strCategoryThumb;
    image.alt = category.strCategory;
    image.height = 200;
    image.width = 320;
    image.loading = "lazy";
    card.append(image);
    let title = dce("h3");
    title.textContent = category.strCategory;
    card.append(title);
    return card;
}

function getMealCard(meal) {
    let card = dce("a");
    card.href = `meal.html?id=${meal.id}`;
    let image = dce("img");
    image.src = meal.image;
    image.alt = meal.name;
    image.height = 200;
    image.width = 320;
    image.loading = "lazy";
    card.append(image);
    let title = dce("h3");
    title.textContent = meal.name;
    card.append(title);
    return card;
}

function showCategoriesList(categories) {
    let content = qs("#plp");
    let count = 0;
    categories = shuffleArray(categories);
    categories.forEach(category => {
        if (count < 4) {
            const card = getCategoryCard(category);
            content.append(card);
        } else {
            return false;
        }
        count++;
    });
}

function showLastSeen(list) {
    console.log(list);
    let content = qs("#plp-lastSeen");
    let count = 0;
    //categories = shuffleArray(categories);
    list.forEach(meal => {
        console.log(meal);
        if (count < 4) {
            const card = getMealCard(meal);
            content.append(card);
        } else {
            return false;
        }
        count++;
    });
}

function getLastSeen() {
    const lastSeen = getLocalStorage("lastSeen");
    if (lastSeen != null) {
        let main = qs("main");
        let plpLastSeen = dce("section");
        plpLastSeen.id = "plp-lastSeen";
        plpLastSeen.className = "plp";
        main.prepend(plpLastSeen);
        let titleLastSeen = dce("h2");
        titleLastSeen.textContent = "Last seen";
        main.prepend(titleLastSeen);
        showLastSeen(lastSeen);
    }
}

getCategories();
getLastSeen();