CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"avatar" TEXT
);



CREATE TABLE "recipes" (
	"id" SERIAL PRIMARY KEY,
	"recipe_name" varchar(100) NOT NULL,
	"fav" BOOLEAN DEFAULT 'false',
	"photo" TEXT,
	"directions" TEXT NOT NULL,
    "servings" INT,
	"meal" varchar(50),
	"user_id" int REFERENCES "user" ON DELETE CASCADE NOT NULL

);



CREATE TABLE "ingredients" (
	"id" SERIAL PRIMARY KEY,
	"quantity" DECIMAL,
	"measure" VARCHAR(100),
	"ingredient" TEXT NOT NULL,
	"need" BOOLEAN NOT NULL DEFAULT 'true',
	"recipe_id" INT REFERENCES "recipes" ON DELETE CASCADE NOT NULL


);



CREATE TABLE "nutrition_info" (
	"id" SERIAL PRIMARY KEY,
	"cal" INT DEFAULT 0,
	"fat" INT DEFAULT 0,
	"sat_fat" INT DEFAULT 0,
	"trans_fat" INT DEFAULT 0,
	"mono_un_fat" INT DEFAULT 0,
	"poly_un_fat" INT DEFAULT 0,
	"carb" INT DEFAULT 0,
	"fiber" INT DEFAULT 0,
	"sugar" INT DEFAULT 0,
	"protein" INT DEFAULT 0,
	"chol" INT DEFAULT 0,
	"sodium" INT DEFAULT 0,
	"calcium" INT DEFAULT 0,
	"magnesium" INT DEFAULT 0,
	"potassium" INT DEFAULT 0,
	"iron" INT DEFAULT 0,
	"zinc" INT DEFAULT 0,
	"phosphorus" INT DEFAULT 0,
	"vit_a" INT DEFAULT 0,
	"vit_c" INT DEFAULT 0,
	"vit_b1" INT DEFAULT 0,
	"vit_b2" INT DEFAULT 0,
	"vit_b3" INT DEFAULT 0,
	"vit_b6" INT DEFAULT 0,
	"vit_b9" INT DEFAULT 0,
	"vit_b12" INT DEFAULT 0,
	"vit_d" INT DEFAULT 0,
	"vit_e" INT DEFAULT 0,
	"vit_k" INT DEFAULT 0,
	"recipes_id" INT REFERENCES "recipes" ON DELETE CASCADE NOT NULL
);


CREATE TABLE "week" (
	"id" SERIAL PRIMARY KEY,
	"meal_index" INT NOT NULL,
	"day_index" INT NOT NULL,
	"recipe_id" int REFERENCES "recipes" ON DELETE CASCADE  NOT NULL,
	"user_id" int REFERENCES "user" ON DELETE CASCADE NOT NULL
);



CREATE TABLE "user_settings" (
	"id" SERIAL PRIMARY KEY,
	"nutrient" varchar(50) NOT NULL,
	"limit" int NOT NULL,
	"tracked" BOOLEAN NOT NULL DEFAULT 'false',
	"user_id" int REFERENCES "user" ON DELETE CASCADE NOT NULL
);

INSERT INTO "recipes" ("recipe_name", "photo", "directions", "meal", "servings", "user_id")
VALUES ('Coconut Chicken Adobo', 'images/chicken_adobo.jpeg', '
Whisk together coconut milk, soy sauce, and vinegar in a high-sided non-reactive Dutch oven. Stir in bay leaves, chiles, garlic, and black pepper. Nestle chicken leg quarters in mixture; add a splash of water, if needed, to submerge chicken. Bring to a gentle simmer over medium. Cover and reduce heat to low to maintain a gentle simmer; cook until chicken is very tender, about 1 hour. Remove from heat; let stand 15 minutes.
\n
Remove chicken from Dutch oven; arrange chicken, skin side up, on a broiler-safe rimmed baking sheet lined with aluminum foil. Pour sauce through a fine wire-mesh strainer into a bowl. Reserve bay leaves and chiles; discard solids, and return sauce, bay leaves, and chiles to Dutch oven. Bring sauce to a simmer over medium-low. Simmer, stirring occasionally, until sauce is thickened and coats the back of a spoon, 12 to 15 minutes. Season with salt to taste. Remove from heat.
\n
Preheat oven to broil with oven rack 6 inches from heat source. Pat chicken dry with paper towels; sprinkle all over with 1/2 teaspoon salt. Broil in preheated oven until chicken skin is sizzling and dark brown, 4 to 5 minutes. Serve with steamed rice, sliced scallions, and sauce.', 'Dinner', 4, 1),

('Roasted Cauliflower Soup with Cumin', 'images/cauliflower_soup.jpeg', '
Preheat the oven to 375º. On a large rimmed baking sheet, toss the cauliflower with the cumin seeds, curry powder and 3 tablespoons of the oil. Season with salt and pepper and roast for about 25 minutes, turning occasionally, until the cauliflower is just tender.
\n
In a large saucepan, heat the remaining 1 tablespoon of oil. Add the onion and cook over moderate heat, stirring occasionally, until softened but not browned, about 5 minutes. Add the roasted cauliflower, butter, bay leaf and water and bring to a simmer. Cook over moderate heat until the liquid is reduced and the cauliflower is very soft, about 15 minutes. Pick out and discard the bay leaf.
\n
In a blender, puree the soup in two batches until very smooth. Return the soup to the saucepan and stir in the milk. Rewarm it over moderate heat, adding more water for a thinner consistency, if desired. Season the soup with salt and pepper and serve hot.', 'Dinner', 4, 1)

;

INSERT INTO "ingredients"("quantity", "measure", "ingredient", "recipe_id")
VALUES (1, 'CAN', '1 (13 1/2-ounces) can coconut milk, well shaken and stirred', 1),
(.5, 'cups', '1/2 cup lower-sodium soy sauce', 1),
(.5, 'cups', '1/2 cup distilled white vinegar', 1),
(8, 'leaves', '8 fresh bay leaves', 1),
(5, 'chiles', '5 dried chiles de árbol or other dried small hot red chiles', 1),
(1, 'head', '1 garlic head, halved crosswise', 1),
(1, 'tsp', '1 teaspoon black pepper', 1),
(4, 'pieces', '4 bone-in, skin-on chicken leg quarters (about 2 pounds)', 1),
(.5, 'tsp', '1/2 teaspoon kosher salt, plus more to taste', 1),
(1, 'cups', 'Steamed rice and thinly sliced scallions, for serving', 1),
(1, 'head', '1 medium head of cauliflower (1 1/2 pounds)—halved, cored and cut into 1 1/2-inch florets', 2),
(1, 'tsp', '1 teaspoon cumin seeds', 2),
(1, 'tsp', '1 teaspoon curry powder', 2),
(.25, 'cups', '1/4 cup sunflower or grapeseed oil', 2),
(1, 'salt', 'Kosher salt', 2),
(1, 'pepper', 'Freshly ground pepper', 2),
(1, 'onion', '1 small onion, diced (1 cup)', 2),
(3, 'tbsp', '3 tablespoons unsalted butter', 2),
(1, 'leaf', '1 bay leaf', 2),
(4, 'cups', '4 cups water', 2),
(.25, 'cups', '1/4 cup whole milk', 2);