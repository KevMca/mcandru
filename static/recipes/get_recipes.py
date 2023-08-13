import json
import requests
import time

with open("recipes.json", "r") as f:
  recipes = json.load(f)["items"][0]["items"][86:]

for recipe in recipes:
  print(recipe["slug"], recipe["recipeId"])
  response = requests.get(f"https://www.hellofresh.ie/_next/data/5.1.0/recipe-detail/{recipe['slug']}-{recipe['recipeId']}.json").json()
  recipe_data = response["pageProps"]["ssrPayload"]["recipe"]

  with open(f"recipes/{recipe['recipeId']}.json", "w") as f:
    json.dump(recipe_data, f)

  time.sleep(1)
