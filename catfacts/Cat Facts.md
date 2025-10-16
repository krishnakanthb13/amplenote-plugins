---
title: Cat Facts
uuid: 80cad6c0-9e28-11f0-b7bb-9dca6decd78d
version: 13
created: '2025-09-30T23:38:47+05:30'
updated: '2025-10-01T21:03:38+05:30'
tags:
  - '-9-permanent'
  - '-amplenote/mine'
---

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":102}} -->|Cat Facts|
|Icon<!-- {"cell":{"colwidth":105}} -->|format_quote|
|Description|Fetch a random fact about cats with a popup alert.|
|Instructions|Select 'Meow!' random cat fact.|
\

```
{
  appOption: async function(app) {
    const result = await app.alert(
      "Would you like a random cat fact?",
      {
        actions: [
          { label: "Meow!", icon: "pets", value: "cat" }
        ],
        preface: "Cat Facts"
      }
    );
    if (result !== "cat") return;

    let fact = "Unable to fetch cat fact.";
    try {
      const res = await fetch("https://catfact.ninja/fact");
      const data = await res.json();
      if (data.fact) fact = data.fact;
    } catch (err) {}

    await app.alert(fact, { preface: "Cat Fact" });
  }
}
```