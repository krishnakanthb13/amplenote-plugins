{
appOption: {
/* ----------------------------------- */
"Audit!": async function (app) {

    // Audit Report
    const auditNoteName = `Audit`;
    const auditTagName = ['-reports/-audit'];
	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();
    const auditReport = `This is Just an Audit.`;
	await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
    await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`);
	
	}
}
}