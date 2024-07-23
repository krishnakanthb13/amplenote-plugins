---
title: Date-Tag - KKB
uuid: 6f5e49a6-4818-11ef-bf57-26e37c279344
version: 22
created: '2024-07-22T16:22:08+05:30'
tags:
  - '-9-permanent'
  - '-loc/amp/mine'
---

| | |
|-|-|
|name<!-- {"cell":{"colwidth":105}} -->|Date-Tag|
|icon<!-- {"cell":{"colwidth":105}} -->|calendar_view_day|
|description|After Extracting the Text to a new Note - Temp Fix to add detail before!|
\

```
{
  async insertText(app) {
    const hLine = `---`;
    const fDate = /* @__PURE__ */ new Date();
    const textFinal = `${hLine}\n${fDate}\n`;
    
    console.log("Formatted Text:", textFinal);
    
    await app.context.replaceSelection(textFinal);
    
    return null;
  }
}
```