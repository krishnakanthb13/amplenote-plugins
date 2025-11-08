---
title: Plugin Settings
uuid: cd96f1c4-bccc-11f0-b212-fdddf8f00bf0
version: 3
created: '2025-11-08T23:30:24+05:30'
updated: '2025-11-08T23:30:42+05:30'
tags:
  - '-9-permanent'
  - '-amplenote/mine'
---

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":102}} -->|Plugin Settings|
|Icon<!-- {"cell":{"colwidth":105}} -->|account_tree|
|Description|Plugin which take you directly to the Plugin Settings, instead of multi-stepped navigation mentioned below.<br />1. Username - Drop down.<br />2. Account Settings.<br />3. Plugins.<br />4. Search for you Plugin.<br />5. Clicking on the Gear Icon.<br />`Note: The note should be in added in the Plugins Page.`|
\

```
{
  async noteOption(app, noteUUID) {
    const link = "https://www.amplenote.com/account/plugins/" + noteUUID;
    console.log(link);
    // app.alert(`${link}`);
    const actionIndex = await app.alert(`Open this link manually by copy pasting into a loggedin browser (Make sure the note is added in the Plugin Page): ${link}`, {
      actions: [
        { icon: "content_copy", label: "Copy URL" }
      ]
    });
 
    if (actionIndex === 0) {
      // Copy
      await app.writeClipboardData(link);
    }
  }
}
```