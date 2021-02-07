
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(50) NOT NULL UNIQUE,
	"password" varchar(50) NOT NULL,
	"avatar" TEXT
);



CREATE TABLE "recipes" (
	"id" SERIAL PRIMARY KEY,
	"recipe_name" varchar(100) NOT NULL,
	"fav" BOOLEAN DEFAULT 'false',
	"photo" TEXT,
	"directions" TEXT NOT NULL,
	"meal" varchar(50),
	"user_id" int REFERENCES "user" NOT NULL

);



CREATE TABLE "ingredients" (
	"id" SERIAL PRIMARY KEY,
	"quantity" DECIMAL NOT NULL,
	"measure" VARCHAR(100) NOT NULL,
	"ingredient" TEXT NOT NULL,
	"need" BOOLEAN NOT NULL DEFAULT 'true',
	"recipe_id" INT REFERENCES "recipes" NOT NULL

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
	"recipes_id" INT REFERENCES "recipes" NOT NULL
);


CREATE TABLE "week" (
	"id" SERIAL PRIMARY KEY,
	"meal" varchar NOT NULL,
	"day" varchar NOT NULL,
	"recipe_id" int REFERENCES "recipes" NOT NULL
);



CREATE TABLE "user_settings" (
	"id" SERIAL PRIMARY KEY,
	"nutrient" varchar(50) NOT NULL,
	"limit" int NOT NULL,
	"tracked" BOOLEAN NOT NULL DEFAULT 'false',
	"user_id" int REFERENCES "user" NOT NULL
);


