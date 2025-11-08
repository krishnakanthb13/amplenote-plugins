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