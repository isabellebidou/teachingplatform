# 🌱 Seeding Scripts

This project stores the script seed data in:

server/seeds/data/

The main seed runner is:

server/seeds/seedscripts.js

---

## 1. Edit the seed data

The seed data is currently imported by:

seedscripts.js

from:

./data/scriptsWithTargetVowels.js

Therefore, edit:

server/seeds/data/scriptsWithTargetVowels.js

when adding or modifying scripts.

---

## 2. Check the Script model

Make sure the seed objects match:

server/models/Script.js

In particular, vowel targets should look like:

vowelTargets: [
  {
    word: "decide",
    letters: "i",
    targetVowel: "aɪ",
  },
  {
    word: "begin",
    letters: "i",
    targetVowel: "ɪ",
  },
]

---

## 3. Run the seed

From the directory containing seedscripts.js:

node seedscripts.js

---

## 4. What the seed does

The seed script:

1. Connects to MongoDB.
2. Deletes ALL existing Script documents.
3. Inserts the scripts from scriptsWithTargetVowels.js.
4. Prints the number of inserted scripts.

Example:

🧹 Clearing old scripts...
🌱 Seeding new scripts...
✅ Inserted 20 scripts

---

## ⚠️ IMPORTANT

This seed uses:

await Script.deleteMany({});

Therefore running it DOES NOT add scripts to the existing collection.

It completely replaces the existing Script documents.

Do not run it against a production database unless this is intentional.

---

## 5. After changing the seeds

If you change:

scriptsWithTargetVowels.js

you must run:

node seedscripts.js

again for the changes to appear in MongoDB.

Changing the seed file alone does NOT change the database.

---

## 6. Typical development workflow

Edit:

scriptsWithTargetVowels.js

↓

Save the file

↓

Run:

node seedscripts.js

↓

Check:

MongoDB / application

↓

Test the script in the teaching platform.