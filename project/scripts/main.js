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

function showCategoriesList(categories) {
    let content = qs("#plp");
    let count = 0;
    categories.forEach(category => {
        if (count < 8) {
            const card = getCategoryCard(category);
            content.append(card);
        } else {
            return false;
        }
        count++;
    });
}

getCategories();