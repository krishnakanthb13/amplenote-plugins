{
  appOption(app) {
// ********************************************************************************************************************* //
"Reports": async function (app) {
    const result = await app.prompt(
        "Select Details on which you want to Report on.",
        {
            inputs: [
                {
                    label: "Select Tags [OR] (Each tag is searched separately)",
                    type: "tags",
                    limit: 10,
                    placeholder: "Enter tag/'s' (Max 10)"
                },
                {
                    label: "Select Tags [AND] (Combined tag is searched)",
                    type: "tags",
                    limit: 10,
                    placeholder: "Enter tag/'s' (Max 10)"
                },
                {
                    label: "Select the Type of the Object", type: "select", options: [
                        { label: "Attachments", value: "attachments" },
                        { label: "Links", value: "links" },
                        { label: "Images", value: "images" }
                    ]
                }
            ]
        }
    );

	const [tagNamesOr, tagNamesAnd, objectType] = result;
    if (!tagNamesOr && !tagNamesAnd) {
        app.alert("Note: At least one of Optional Items (Tag OR, Tag AND) must be selected");
        return;
    }
    let notes = [];
    const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
    let filteredNotes = [];
    if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
        if (Array.isArray(tagsArray) && tagsArray.length > 0) {
            for (const tag of tagsArray) {
                const notesByTag = await app.filterNotes({ tag: tag });
                filteredNotes = [...filteredNotes, ...notesByTag];
            }
        }
        if (tagNamesAnd) {
            const notesByGroup = await app.filterNotes({ tag: tagNamesAnd });
            filteredNotes = [...filteredNotes, ...notesByGroup];
        }
    } else {
        const notesByGroup = await app.filterNotes({ group: "^vault" });
        filteredNotes = [...filteredNotes, ...notesByGroup];
    }
    filteredNotes = [...new Set(filteredNotes)];
    notes = filteredNotes;
    let results = [];
    let finalResults = "";

},
// ********************************************************************************************************************* //
  }
}