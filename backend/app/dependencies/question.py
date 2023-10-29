import json
import os
import random


# this function, given a category, returns a random question from
# that category from the list of questions in questions.json
def get_rand_question(category):
    with open(os.getenv("PATH_TO_QUESTIONS_JSON"), "r") as json_file:
        loaded_data = json.load(json_file)

    question = random.choice(loaded_data[category])

    return question


# print(get_rand_question("Emotional Intelligence"))
