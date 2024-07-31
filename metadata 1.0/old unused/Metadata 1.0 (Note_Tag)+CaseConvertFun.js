(() => {
    var Meta_1 = {
        insertText: {
            "Name_Tag": async function(app) {
                try {
                    const result = await app.prompt("Enter your filter criteria (Anyone or Both [Name_Tag]!)", {
                        inputs: [
                            {
                                label: "Select Tags to filter (Max 3)",
                                type: "tags",
                                limit: 3,
                                placeholder: "Enter tag/'s' (Max 3)"
                            },
                            {
                                label: "Type Partial or Full name of the Note",
                                type: "string",
                                placeholder: "Enter Partial or Full name"
                            },
                            {
                                label: "Sort by Note Name",
                                type: "select",
                                options: [
                                    { label: "None (Default)", value: "" },
                                    { label: "Ascending (ASC)", value: "asc" },
                                    { label: "Descending (DESC)", value: "desc" }
                                ]
                            },
                            {
                                label: "Sort by Tags",
                                type: "select",
                                options: [
                                    { label: "None (Default)", value: "" },
                                    { label: "Ascending (ASC)", value: "asc" },
                                    { label: "Descending (DESC)", value: "desc" }
                                ]
                            },
                            {
                                label: "Sort tags alphabetically (within a Note!)",
                                type: "checkbox"
                            },
                            {
                                label: "Insert / Export options (Mandatory)",
                                type: "select",
                                options: [
                                    { label: "Insert into current note", value: "current_note" },
                                    { label: "Insert into new note", value: "new_note" },
                                    { label: "Download as markdown", value: "download_md" },
                                    { label: "Download as CSV", value: "download_csv" },
                                    { label: "Download as TXT", value: "download_txt" }
                                ]
                            },
                            {
                                label: "Select format (Mandatory)",
                                type: "select",
                                options: [
                                    { label: "Both (Table format)", value: "both_table" },
                                    { label: "Names only", value: "names_only" },
                                    { label: "Tags only", value: "tags_only" },
                                    { label: "Published only (Table format)", value: "published_only" },
                                    { label: "Raw data", value: "raw_data" }
                                ]
                            },
                            {
                                label: "Select text transformation (Optional)",
                                type: "select",
                                options: [
                                    { label: "None", value: "" },
                                    { label: "Sentence case", value: "sentence_case" },
                                    { label: "lower case", value: "lower_case" },
                                    { label: "UPPER CASE", value: "upper_case" },
                                    { label: "Capitalized Case", value: "capitalized_case" },
                                    { label: "aLtErNaTiNg CASE", value: "alternating_case" },
                                    { label: "Title Case", value: "title_case" },
                                    { label: "lnVeRsE Case", value: "inverse_case" }
                                ]
                            }
                        ]
                    });

                    if (!result) {
                        app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
                        return;
                    }

                    const [tagNames, nameFilter, sortOption, sortTagOption, sortTags, insertOption, insertFormat, textTransform] = result;

                    if (!tagNames && !nameFilter && !sortOption && !sortTagOption && !sortTags) {
                        app.alert("Note: At least one of Optional Items (tagNames, nameFilter, sortOption, sortTagOption, or sortTags) must be selected");
                        return;
                    }

                    if (!insertOption || !insertFormat) {
                        app.alert("Note: Both insertOption and insertFormat (Mandatory Fields) must be selected");
                        return;
                    }

                    const tagsArray = tagNames ? tagNames.split(',').map(tag => tag.trim()) : [];
                    let notes = [];

                    if (tagsArray.length > 0) {
                        for (let tag of tagsArray) {
                            let taggedNotes = await app.filterNotes({ tag });
                            notes = notes.concat(taggedNotes);
                        }
                    } else {
                        notes = await app.filterNotes({});
                    }

                    notes = notes.filter((note, index, self) => index === self.findIndex((n) => n.uuid === note.uuid));

                    if (sortTagOption === "asc") {
                        notes.sort((a, b) => a.tags.join(", ").localeCompare(b.tags.join(", ")));
                    } else if (sortTagOption === "desc") {
                        notes.sort((a, b) => b.tags.join(", ").localeCompare(a.tags.join(", ")));
                    }

                    if (nameFilter) {
                        notes = notes.filter(note => note.name.includes(nameFilter));
                    }

                    if (sortOption === "asc") {
                        notes.sort((a, b) => a.name.localeCompare(b.name));
                    } else if (sortOption === "desc") {
                        notes.sort((a, b) => b.name.localeCompare(a.name));
                    }

                    const self = this;
                    let results = new Set();
                    let publicResults = [];

                    for (let note of notes) {
                        let tags = note.tags;

                        if (sortTags) {
                            tags.sort((a, b) => a.localeCompare(b));
                        }

                        let noteLink = self._createMDLinkFromNoteHandle(note);
                        let tagString = tags.join(", ");

                        if (insertFormat === "both_table") {
                            results.add(`| ${noteLink} | ${tagString} |`);
                        } else if (insertFormat === "names_only") {
                            results.add(noteLink);
                        } else if (insertFormat === "tags_only") {
                            tags.forEach(tag => results.add(tag));
                        } else if (insertFormat === "published_only") {
                            const publicURL = await app.getNotePublicURL({ uuid: note.uuid });
                            if (publicURL) {
                                publicResults.push(`| [${note.name}](https://www.amplenote.com/notes/${note.uuid}) | [${publicURL}](${publicURL}) |`);
                            }
                        } else if (insertFormat === "raw_data") {
                            results.add(`${note.name} | ${note.uuid} | ${tagString}`);
                        }
                    }

                    results = Array.from(results);

                    let resultText;
                    let resultCSV;
                    if (insertFormat === "both_table") {
                        resultText = "| Note Name | Tags |\n|---|---|\n" + results.join("\n");
                        resultCSV = "Note Name,Tags\n" + results.map(row => {
                            let parts = row.split('|').map(s => s.trim());
                            let name = parts[1];
                            let tags = parts[2];
                            return `"${name.replace(/"/g, '""')}", "${tags.replace(/"/g, '""')}"`;
                        }).join("\n");
                    } else if (insertFormat === "published_only") {
                        resultText = "| Notes | Public URL |\n|---|---|\n" + publicResults.join("\n");
                        resultCSV = "Notes,Public URL\n" + publicResults.map(row => {
                            let parts = row.split('|').map(s => s.trim());
                            let name = parts[1];
                            let url = parts[2];
                            return `"${name.replace(/"/g, '""')}", "${url.replace(/"/g, '""')}"`;
                        }).join("\n");
                    } else if (insertFormat === "raw_data") {
                        resultText = results.join("\n");
                        resultCSV = results.map(item => `"${item.replace(/"/g, '""')}"`).join("\n");
                    } else {
                        resultText = results.join("\n");
                        resultCSV = results.map(item => `"${item.replace(/"/g, '""')}"`).join("\n");
                    }

                    if (textTransform) {
                        resultText = transformText(resultText, textTransform);
                    }

                    const now = new Date();
                    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
                    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
                    const filename = `Metadata1_${YYMMDD}_${HHMMSS}`;

                    const inputSummary = `
### Input Selections:
- Tags to filter: ${tagNames || "None"}
- Note name filter: ${nameFilter || "None"}
- Sort by name: ${sortOption || "None"}
- Sort tags by name: ${sortTagOption || "None"}
- Sort tags alphabetically within a Note: ${sortTags ? "Yes" : "No"}
- Insert option: ${insertOption}
- Format to insert: ${insertFormat}
- Text transformation: ${textTransform || "None"}
- Filename: ${filename}
`;

                    resultText += `\n\n${inputSummary}`;
                    resultCSV += `\n\n${inputSummary.replace(/[\n]/g, "")}`;

                    if (insertOption === "current_note") {
                        await app.context.replaceSelection(resultText);
                    } else if (insertOption === "new_note") {
                        let noteUUID = await app.createNote("Metadata 1.0 Report", ["metadata-reports"]);
                        await app.insertContent({ uuid: noteUUID }, resultText);
                    } else if (insertOption === "download_md") {
                        let blob = new Blob([resultText], { type: "text/markdown;charset=utf-8" });
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${filename}.md`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else if (insertOption === "download_csv") {
                        let blob = new Blob([resultCSV], { type: "text/csv;charset=utf-8" });
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${filename}.csv`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else if (insertOption === "download_txt") {
                        let blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${filename}.txt`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }

                    app.alert("Results Generated and Pasted/Downloaded Successfully!");

                } catch (error) {
                    app.alert(String(error));
                }
            }
        },
        _createMDLinkFromNoteHandle(noteHandle) {
            return `[${noteHandle.name}](https://www.amplenote.com/notes/${noteHandle.uuid})`;
        }
    };

    function transformText(text, transformType) {
        switch (transformType) {
            case 'sentence_case':
                return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
            case 'lower_case':
                return text.toLowerCase();
            case 'upper_case':
                return text.toUpperCase();
            case 'capitalized_case':
                return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            case 'alternating_case':
                return text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
            case 'title_case':
                return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            case 'inverse_case':
                return text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
            default:
                return text;
        }
    }

    var plugin_default = Meta_1;
    return Meta_1;
})()