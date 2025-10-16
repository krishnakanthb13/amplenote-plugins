---
title: Quotes
uuid: 66a86fe2-9e22-11f0-a1ed-c3ae864d7de0
version: 46
created: '2025-09-30T22:55:06+05:30'
updated: '2025-10-01T20:23:52+05:30'
tags:
  - '-9-permanent'
  - '-amplenote/mine'
---

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":102}} -->|Quotes|
|Icon<!-- {"cell":{"colwidth":105}} -->|format_quote|
|Description|Fetch a random quote with a popup alert.|
|Instructions|Select 'DummyJSON' or 'RealInspire' to get a random quote.|
\

```
{
  appOption: async function(app) {
    // Option selector (two buttons)
    const apiChoice = await app.alert(
      "Pick your quote provider:",
      {
        actions: [
          { label: "DummyJSON", icon: "public", value: "dummy" },
          { label: "RealInspire", icon: "school", value: "realinspire" }
        ],
        preface: "Quotes Plugin"
      }
    );
    if (apiChoice !== "dummy" && apiChoice !== "realinspire") return;

    // Pick API endpoint
    let quoteText = "Unable to fetch quote. Please try again later.";
    let endpoint = apiChoice === "dummy"
      ? "https://dummyjson.com/quotes/random"
      : "https://api.realinspire.live/v1/quotes/random";

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (apiChoice === "dummy" && data.quote && data.author) {
        quoteText = `“${data.quote}”\n— ${data.author}`;
      } else if (apiChoice === "realinspire" && Array.isArray(data) && data[0]?.content && data[0]?.author) {
        quoteText = `“${data[0].content}”\n— ${data[0].author}`;
      }
    } catch (err) {}

    // Show final quote
    await app.alert(quoteText, { preface: "Quotes" });
  }
}
```